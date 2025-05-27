<script>
  export let storeRating;

  let showRatingModal = false;
  let rating = 0;
  let comment = '';
  let hoverRating = 0;

  function openRatingModal() {
    showRatingModal = true;
  }

  function closeRatingModal() {
    showRatingModal = false;
    rating = 0;
    comment = '';
    hoverRating = 0;
  }

  function submitRating() {
    alert('Submit rating feature will be implemented soon');
    closeRatingModal();
  }

  function setRating(value) {
    rating = value;
  }

  function setHoverRating(value) {
    hoverRating = value;
  }

  function resetHoverRating() {
    hoverRating = rating;
  }
</script>

<div class="rating-container">
  <div class="rating-header">
    <div class="rating-average">
      <span class="rating-value">{storeRating.average.toFixed(2)}</span>
      <span class="rating-max">/5</span>
    </div>
    <div class="rating-count">
      {storeRating.totalRatings} Ratings
    </div>
  </div>

  <div class="rating-actions">
    <button class="rate-button" on:click={openRatingModal}> Rate store </button>
  </div>

  <div class="comments-section">
    <h3>Comments</h3>
    {#each storeRating.comments as comment}
      <div class="comment-card">
        <div class="comment-header">
          <span class="comment-user">{comment.user}</span>
          <span class="comment-rating">
            {#each Array(5) as _, i}
              <span class={i < comment.rating ? 'star-filled' : 'star-empty'}
                >★</span
              >
            {/each}
          </span>
        </div>
        <div class="comment-date">{comment.date}</div>
        <div class="comment-text">{comment.comment}</div>
      </div>
    {/each}
  </div>
</div>

{#if showRatingModal}
  <div class="modal-overlay" on:click|self={closeRatingModal}>
    <div class="rating-modal">
      <h3>Rate this store</h3>

      <div class="stars-rating">
        {#each Array(5) as _, i}
          <span
            class={i < (hoverRating || rating) ? 'star-filled' : 'star-empty'}
            on:click={() => setRating(i + 1)}
            on:mouseover={() => setHoverRating(i + 1)}
            on:mouseout={resetHoverRating}
          >
            ★
          </span>
        {/each}
      </div>

      <textarea
        bind:value={comment}
        placeholder="Write your comment here"
        class="comment-input"
      ></textarea>

      <div class="modal-buttons">
        <button class="cancel-button" on:click={closeRatingModal}>
          Cancel
        </button>
        <button
          class="submit-button"
          on:click={submitRating}
          disabled={!rating}
        >
          Send
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .rating-container {
    max-width: 800px;
    margin: 0 auto 2rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .rating-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.rating-average {
  font-size: 2rem;
  font-weight: bold;
  color: #3f028f;
}

  .rating-actions {
    margin-bottom: 2rem;
    text-align: center;
  }

  .rate-button {
    background-color: #3f028f;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .rate-button:hover {
    background-color: #6d00fc;
  }

  .comments-section {
    margin-top: 2rem;
  }

  .comments-section h3 {
    margin-bottom: 1rem;
    color: #333;
  }

  .comment-card {
    padding: 1rem;
    margin-bottom: 1rem;
    background: #f9f9f9;
    border-radius: 6px;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .comment-user {
    font-weight: bold;
  }

  .comment-rating {
    color: #ffc107;
  }

  .star-filled {
    color: #ffc107;
  }

  .star-empty {
    color: #ddd;
  }

  .comment-date {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .comment-text {
    line-height: 1.5;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .rating-modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .rating-modal h3 {
    margin-top: 0;
    color: #3f028f;
    text-align: center;
  }

  .stars-rating {
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
    font-size: 2rem;
  }

  .stars-rating span {
    cursor: pointer;
    margin: 0 0.2rem;
    transition: transform 0.2s;
  }

  .stars-rating span:hover {
    transform: scale(1.2);
  }

.comment-input {
  width: 100%;
  min-height: 100px;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 1.5rem;
  font-family: inherit;
  color: black;
}

  .modal-buttons {
    display: flex;
    justify-content: space-between;
  }

  .cancel-button,
  .submit-button {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .cancel-button {
    background-color: #f1f1f1;
    color: #333;
  }

  .cancel-button:hover {
    background-color: #e1e1e1;
  }

  .submit-button {
    background-color: #3f028f;
    color: white;
  }

  .submit-button:hover {
    background-color: #6d00fc;
  }

  .submit-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    .rating-modal {
      padding: 1.5rem;
    }

    .stars-rating {
      font-size: 1.8rem;
    }
  }
</style>
