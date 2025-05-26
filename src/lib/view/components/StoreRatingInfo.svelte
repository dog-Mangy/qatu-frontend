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
