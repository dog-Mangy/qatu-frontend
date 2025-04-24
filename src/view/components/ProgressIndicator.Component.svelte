<script>
    export let value = 0;
    export let max = 100;
    export let color = "#00C853";
    export let height = "20px";
    export let width = "100%";
    export let backgroundColor = "#e0e0e0";

    $: normalizedValue = Math.min(Math.max(value, 0), max);
    $: percentage = Math.round((normalizedValue / max) * 100);
</script>

<div
    class="progress-container"
    style="background-color: {backgroundColor}; height: {height}; width: {width};"
>
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

<style>
    .progress-container {
        width: 100%;
        overflow: hidden;
        position: relative;
    }

    .progress-bar {
        height: 100%;
        transition: width 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .progress-text {
        color: white;
        font-size: 12px;
        padding: 0 8px;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    }
</style>
