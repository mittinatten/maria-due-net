<script lang="ts">
  import { Album } from "../types";

  export let album: Album;
</script>

<h2>
  <a href={album.spotify} aria-label="Play album on spotify" property="url">
    <i class="fa fa-play-circle" />
  </a>
  <span property="name">{album.title}</span>
  (<span property="datePublished">{album.year}</span>)
</h2>
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
  h2 a {
    margin-right: 0.5rem;
  }
  h3 {
    margin-top: 0;
    margin-left: 1rem;
  }

  .cover-song-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
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
    padding-left: 2rem;
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
