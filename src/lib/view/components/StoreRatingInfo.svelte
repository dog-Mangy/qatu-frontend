<script>
  export let storeRating;
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
    <button class="rate-button">
      Rate store
    </button>
  </div>

  <div class="comments-section">
    <h3>Comments</h3>
    {#each storeRating.comments as comment}
      <div class="comment-card">
        <div class="comment-header">
          <span class="comment-user">{comment.user}</span>
          <span class="comment-rating">
            {#each Array(5) as _, i}
              <span class={i < comment.rating ? 'star-filled' : 'star-empty'}>★</span>
            {/each}
          </span>
        </div>
        <div class="comment-date">{comment.date}</div>
        <div class="comment-text">{comment.comment}</div>
      </div>
    {/each}
  </div>
</div>

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

.rating-value {
  font-size: 2.5rem;
}

.rating-max {
  font-size: 1.5rem;
  color: #666;
}

.rating-count {
  font-size: 1rem;
  color: #666;
}

@media (max-width: 600px) {
  .rating-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .rating-count {
    margin-top: 0.5rem;
  }
}
</style>