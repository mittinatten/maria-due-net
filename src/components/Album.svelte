<script lang="ts">
  import { Album } from "../types";

  export let album: Album;
</script>

<header>
  <h2>
    <span property="name">{album.title}</span>
  </h2>
  <a
    href={album.spotify}
    aria-label="Play album on spotify"
    property="url"
    class="play"
  >
    <i class="fa fa-play-circle" />
  </a>
</header>

<div class="cover-song-list">
  <div class="cover">
    <img src={album.cover.asset.url} alt="Album cover" property="image" />
    <p property="producer" typeof="Person" resource={album.producer.sameAs}>
      Produced by
      {#if album.producer.homePage}
        <a href={album.producer.homePage} property="url">
          <span property="name">{album.producer.name}</span>
        </a>
      {:else}
        <span property="name">{album.producer.name}</span>
      {/if}
      (<span property="datePublished">{album.year}</span>).
    </p>
  </div>
  <div class="songs">
    <h3>Songs</h3>
    <ol>
      {#each album.songs as song}
        <li property="track" typeof="MusicRecording">
          <a href={song.path} property="mainEntityOfPage"
            ><span property="name">{song.title}</span>
          </a>
        </li>
      {/each}
    </ol>
  </div>
</div>

<style>
  header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    font-size: var(--h2-font-size);
    gap: 0.5em;
    align-items: baseline;
  }
  h3 {
    margin-top: 0;
  }

  .cover-song-list {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(16px, 16px + 2vw, 32px);
    position: relative;
  }

  .cover {
    max-width: 400px;
  }

  .songs {
    min-width: 200px;
  }

  img {
    max-width: 100%;
    display: block;
    margin-bottom: 12px;
  }

  ol {
    padding-left: 1rem;
  }

  li {
    list-style-type: revert;
    margin-bottom: 4px;
  }

  li a {
    display: inline-flex;
    padding: 4px;
  }
</style>
