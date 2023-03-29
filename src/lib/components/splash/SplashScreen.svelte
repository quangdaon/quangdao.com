<script>
	import SplashPanel from './SplashPanel.svelte';
</script>

<div class="splash">
  <!-- well-versed -->
  <SplashPanel label="Blog" />

  <!-- multi-talented -->
  <SplashPanel label="Uses" />
  
  <!-- highly-functional -->
  <SplashPanel label="Projects" />
  
  <!-- robot -->
  <SplashPanel label="Bio" />
</div>

<style lang="scss">
  @use '/src/styles/utils/mixins';
  .splash {
    display: flex;
    justify-content: stretch;
    flex-direction: column;
    position: absolute;
    @include mixins.fill-container;
  }
</style>