<script lang="ts">
  import { Video } from "../types";
  import VideoComponent from "./VideoComponent.svelte";

  export let videos: Video[];
</script>

<h2>Videos</h2>
<div class="wrapper">
  {#each videos as video}
    <VideoComponent {video} />
  {/each}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }
</style>
