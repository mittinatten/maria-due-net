<script lang="ts">
  import { Video } from "../types";

  export let video: Video;
  export let showLink = true;
</script>

<div class="wrapper">
  <div class="iframe-wrapper">
    <iframe
      allow-fullscreen="allowfullscreen"
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      src={"https://www.youtube.com/embed/" +
        video.id +
        "?autoplay=0&modestbranding=1"}
      title={video.title}
      frameBorder="0"
    />
  </div>
  {#if showLink}
    <p><a href={video.url}>{video.title}</a></p>
  {/if}
</div>

<style>
  .iframe-wrapper {
    position: relative;
    height: 0;
    padding-top: 25px;
    padding-bottom: 68%;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    width: 100%;
    height: 96%;
    background-color: black;
  }
</style>
