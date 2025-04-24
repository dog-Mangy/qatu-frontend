<script>
    export let value = 0;
    export let max = 100;
    export let barColour = "#00C853";
    export let backgroundColour = "#e0e0e0";
    export let height = "20px";
    export let width = "100%";
    
    $: normalizedValue = Math.min(Math.max(value, 0), max);
    $: percentage = Math.round((normalizedValue / max) * 100);
</script>

<div
    class="progress-container"
    style="background-color: {backgroundColour}; height: {height}; width: {width};"
>
    <div
        class="progress-bar"
        style="width: {percentage}%; background-color: {barColour};"
        role="progressbar"
        aria-valuenow={normalizedValue}
        aria-valuemin="0"
        aria-valuemax={max}
    >
        <span class="progress-text">{percentage}%</span>
    </div>
</div>

<style>
    .progress-container {
        overflow: hidden;
        position: relative;
        border-radius: 6px;
    }

    .progress-bar {
        height: 100%;
        transition: width 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-radius: 6px;
    }

    .progress-text {
        color: white;
        font-size: 12px;
        padding: 0 8px;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    }
</style>
