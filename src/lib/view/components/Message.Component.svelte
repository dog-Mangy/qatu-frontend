<script>
  export let message;
  export let isOwnMessage = false;
</script>

<div class="message-container">
  <div
    class="message-box"
    style={isOwnMessage
      ? 'background-color: #e9d5ff !important;'
      : 'background-color: #c4b5fd !important;'}
    role="article"
    aria-label={isOwnMessage ? 'Your message' : 'Seller message'}
  >
    <p class="message-content">{message.content}</p>
    <span class="message-time">
      {new Date(message.sentAt).toLocaleString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </span>
  </div>
</div>

<style>
  .message-container {
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
    width: 90%;
  }

  .message-box {
    width: 90%;
    padding: 12px;
    border-radius: 8px;
    color: #1f2937;
    background-color: inherit !important;
  }

  .message-content {
    font-size: 14px;
  }

  .message-time {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #6b7280;
  }
</style>
