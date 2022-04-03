<script lang="ts">
  import { Video } from "../types";

  export let video: Video;
  export let showLink = true;
  export let origin: string;
</script>

<div class="wrapper">
  <span property="musicBy" typeof="MusicGroup" resource={origin} />
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
  <p style={showLink ? "display: none" : undefined}>
    <a href={video.url} property="url">{video.title}</a>
  </p>
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
