<script lang="ts">
  import { Song } from "../types";
  import SongCreator from "./SongCreator.svelte";
  import VideoComponent from "./VideoComponent.svelte";

  export let song: Song;
  export let origin: string;
</script>

<h2 property="name">{song.title}</h2>
{#if song.lyrics}
  <div
    property="lyrics"
    typeof="CreativeWork"
    resource={song.resourceURI + "#lyrics"}
  >
    <div class="lyrics" property="text">{song.lyrics}</div>
  </div>
{:else}
  <div class="lyrics">{"[Lyrics not available yet]"}</div>
{/if}

<footer>
  <p property="inAlbum" typeof="MusicAlbum" resource={song.album.resourceURI}>
    Song recorded by
    <span property="byArtist" typeof="MusicGroup" resource={origin}>
      <span property="name">Maria Due</span>
    </span>
    in
    <span property="datePublished">{song.album.year}</span>
    on the album
    <a
      href={song.album.path}
      property="mainEntityOfPage"
      resource={song.album.resourceURI}
    >
      <span property="name">{song.album.title}</span></a
    >.
  </p>
  <p><SongCreator {song} {origin} /></p>
  {#if song.video}
    <div class="video" property="video" typeof="VideoObject">
      <VideoComponent
        video={{ url: song.video, id: song.videoId, title: song.title }}
        showLink={false}
        {origin}
      />
    </div>
  {/if}
</footer>

<style>
  p {
    margin: 16px 0;
  }
  .lyrics {
    font-style: normal;
    white-space: pre-wrap;
  }

  footer {
    margin-top: 32px;
    font-size: calc((14 / 16) * 1rem);
  }
  .video {
    max-width: 400px;
    margin: 32px 0;
  }
</style>
