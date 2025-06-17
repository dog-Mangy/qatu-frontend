<script>
  import { onMount, tick } from 'svelte';
  import Message from './Message.Component.svelte';
  import {
    fetchChatsByUserId,
    createChat,
    fetchChatMessages,
    sendMessage,
  } from '../../viewmodel/viewmodels/chatViewModel.js';
  import { authService } from '../../viewmodel/services/authService';

  export let productId;
  export let isOpen = false;

  let messages = [];
  let userId = '';
  let chatId = '';
  let messageInput = '';
  let isLoading = false;
  let errorMessage = '';
  let messagesContainer;

  onMount(() => {
    (async () => {
      try {
        userId = await authService.getUUID();
      } catch (error) {
        errorMessage = 'Error getting user ID';
      }
    })();
    return () => {
      closeChat();
    };
  });

  $: if (isOpen && productId && userId) {
    initializeChat();
  }

  async function initializeChat() {
    if (isLoading) return;
    isLoading = true;
    errorMessage = '';
    try {
      const chats = await fetchChatsByUserId();
      const existingChat = chats.find(chat => chat.productId === productId);
      if (existingChat) {
        chatId = existingChat.id;
      } else {
        const newChat = await createChat({ buyerId: userId, productId });
        chatId = newChat.id;
      }
      await loadMessages();
    } catch (error) {
      errorMessage = 'Failed to initialize chat: ' + error.message;
    } finally {
      isLoading = false;
    }
  }

  async function loadMessages() {
    if (!chatId) return;
    try {
      messages = await fetchChatMessages(chatId);
    } catch (error) {
      if (
        error.message.includes('404') ||
        error.message.includes('No messages found')
      ) {
        messages = [];
      } else {
        errorMessage = 'Failed to load messages: ' + error.message;
      }
    } finally {
      await tick();
      scrollToBottom();
    }
  }

  async function handleSendMessage() {
    if (!messageInput.trim() || !chatId || isLoading) return;
    try {
      await sendMessage({
        chatId,
        messageData: { senderId: userId, content: messageInput },
      });
      messageInput = '';
      await loadMessages();
    } catch (error) {
      errorMessage = 'Failed to send message: ' + error.message;
    }
  }

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function closeChat() {
    isOpen = false;
    chatId = '';
    messages = [];
    errorMessage = '';
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeChat();
    }
  }
</script>

{#if isOpen}
  <div
    class="chat-backdrop"
    role="dialog"
    aria-modal="true"
    aria-label="Chat with Seller"
    tabindex="0"
    on:click={handleBackdropClick}
    on:keydown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleBackdropClick(e);
      } else if (e.key === 'Escape') {
        closeChat();
      }
    }}
  >
    <div
      class="chat-container"
      role="presentation"
      on:click|stopPropagation
      on:keydown|stopPropagation={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
    >
      <div class="chat-header">
        <h2>Chat with Seller</h2>
        <button on:click={closeChat} aria-label="Close chat">✕</button>
      </div>

      <div class="chat-messages" bind:this={messagesContainer}>
        {#if errorMessage}
          <p class="error">{errorMessage}</p>
        {:else if isLoading}
          <p class="loading">Loading...</p>
        {:else if messages.length === 0}
          <p class="no-messages">There are no messages yet.</p>
        {:else}
          {#each messages as message (message.id)}
            <Message {message} isOwnMessage={message.senderId === userId} />
          {/each}
        {/if}
      </div>

      <div class="chat-input">
        <input
          type="text"
          bind:value={messageInput}
          placeholder="Type a message..."
          on:keydown={e => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading || !chatId || errorMessage.length > 0}
          aria-label="Type your message"
        />
        <button
          on:click={handleSendMessage}
          disabled={isLoading || !chatId || errorMessage.length > 0}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .chat-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .chat-container {
    background-color: white;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 32rem;
    height: 600px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f3f4f6;
    border-bottom: 1px solid #e5e7eb;
  }

  .chat-header h2 {
    font-size: 1.125rem;
    font-weight: 600;
  }

  .chat-header button {
    font-size: 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
  }

  .chat-messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    background: #c7c7c7;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }

  .chat-input {
    display: flex;
    padding: 1rem;
    gap: 0.5rem;
    background: #f3f4f6;
    border-top: 1px solid #e5e7eb;
  }

  .chat-input input {
    flex: 1;
    padding: 0.5rem;
    color: black;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
  }

  .chat-input button {
    background-color: #7c3aed;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
  }

  .chat-input button:disabled {
    background-color: #a1a1aa;
    cursor: not-allowed;
  }

  .error {
    color: #dc2626;
    text-align: center;
  }

  .loading {
    text-align: center;
    color: #6b7280;
  }

  .no-messages {
    text-align: center;
    color: #4b5563; /* gray-600 */
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    .chat-container {
      width: 90%;
      height: 85vh;
    }
  }
</style>
