<script>
    export let value = 0;
    export let max = 100;
    export let color = "#4CAF50";
    export let height = "20px";
    export let backgroundColor = "#f3f3f3";
  
    $: normalizedValue = Math.min(Math.max(value, 0), max);
    $: percentage = Math.round((normalizedValue / max) * 100);
  </script>
  
  <div class="progress-container" style="background-color: {backgroundColor}; height: {height};">
    <div 
      class="progress-bar" 
      style="width: {percentage}%; background-color: {color}"
      role="progressbar"
      aria-valuenow={normalizedValue}
      aria-valuemin="0"
      aria-valuemax={max}
    >
    <span class="progress-text">{percentage}%</span>
    </div>
  </div>
