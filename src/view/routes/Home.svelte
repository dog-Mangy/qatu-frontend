<script>
	import ProgressIndicator from '../components/ProgressIndicator.Component.svelte';
</script>
  
  <h1>Progress Indicator Examples</h1>
  
  <h2>Basic Progress Bar</h2>
  <ProgressIndicator value={65} />
  
  <h2>Custom Styled Progress Bar</h2>
  <ProgressIndicator 
	value={60} 
	fillColour="#4285F4" 
	height="30px"
	width="500px" 
	backgroundColour="#e0e0e0"
  />