<script lang="ts">
  import { Video } from "../types";
  import VideoComponent from "./VideoComponent.svelte";

  export let videos: Video[];
  export let origin: string;
</script>

<h2>Videos</h2>
<div class="wrapper">
  {#each videos as video}
    <VideoComponent {video} {origin} />
  {/each}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 32px;
  }
</style>
