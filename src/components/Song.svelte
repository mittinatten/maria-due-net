<script lang="ts">
  import { Song } from "../types";
  import VideoComponent from "./VideoComponent.svelte";

  export let song: Song;

  let creator: string;

  if (JSON.stringify(song.lyricsBy) === JSON.stringify(song.musicBy)) {
    const lyricsByNames = song.lyricsBy.map((person) => person.name).join(", ");
    creator = `<p className="credits">
                Words and music by ${lyricsByNames}.
            </p>`;
  } else {
    const lyricsByNames = song.lyricsBy
      .map((person) => person.name)
      .join(", ")
      .replace(/,(?!.*,)/, " and");
    const musicByNames = song.musicBy
      .map((person) => person.name)
      .join(", ")
      .replace(/,(?!.*,)/, " and");
    creator = `<p className="credits">
        Composition by ${musicByNames}.<br />
        Lyrics by ${lyricsByNames}.
      </p>`;
  }
</script>

<h2>{song.title}</h2>
<div class="lyrics">{song.lyrics ?? "[Lyrics not available yet]"}</div>
<footer>
  <p>
    Song recorded by Maria Due in
    {song.album.year}
    on the album
    <a href={song.album.path}>{song.album.title}</a>.
  </p>
  <p>{@html creator}</p>
  <p>Words</p>
  {#if song.video}
    <div class="video">
      <VideoComponent
        video={{ url: song.video, id: song.videoId, title: song.title }}
        showLink={false}
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
