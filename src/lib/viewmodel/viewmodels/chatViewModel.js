import { fetchAuth } from '../utils/fetchAuth.js';
import { authService } from '../services/authService.js';

// Fetch chats for the current user
export async function fetchChatsByUserId() {
  const userId = await authService.getUUID();
  const response = await fetchAuth(
    `http://localhost:5028/api/Chats?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        Accept: '*/*',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Fetch chats error:', errorText);
    throw new Error(
      `Error loading chats: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();
  return data.map(chat => ({
    id: chat.id,
    buyerId: chat.buyerId,
    sellerId: chat.sellerId,
    productId: chat.productId,
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
  }));
}

// Create a new chat
export async function createChat(newChatData) {
  if (!newChatData.buyerId || !newChatData.productId) {
    throw new Error('buyerId and productId are required');
  }

  const response = await fetchAuth('http://localhost:5028/api/Chats', {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newChatData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Create chat error response:', errorText);
    throw new Error(
      `Error creating chat: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();
  return data;
}

// Fetch messages for a chat
export async function fetchChatMessages(chatId) {
  if (!chatId) {
    throw new Error('Chat ID is required');
  }
  const response = await fetchAuth(
    `http://localhost:5028/api/Chats/${chatId}/messages`,
    {
      method: 'GET',
      headers: {
        Accept: '*/*',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Fetch messages error:', errorText);
    throw new Error(
      `Error loading chat messages: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();
  return data.map(message => ({
    id: message.id,
    chatId: message.chatId,
    senderId: message.senderId,
    content: message.content,
    sentAt: message.sentAt,
  }));
}

// Send a new message
export async function sendMessage({ chatId, messageData }) {
  if (!chatId || !messageData.senderId || !messageData.content) {
    throw new Error('Chat ID, senderId and content are required');
  }
  const response = await fetchAuth(
    `http://localhost:5028/api/Chats/${chatId}/messages`,
    {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Send message error:', errorText);
    throw new Error(
      `Error loading chat messages: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return await response.json();
}
