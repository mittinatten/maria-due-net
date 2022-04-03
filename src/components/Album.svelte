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
  <div>
    <img src={album.cover.asset.url} alt="Album cover" property="image" />
  </div>
  <ol>
    {#each album.songs as song}
      <li property="track" typeof="MusicRecording">
        <a href={song.path} property="mainEntityOfPage">
          <span property="name">{song.title}</span>
        </a>
      </li>
    {/each}
  </ol>
</div>
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

<style>
  h2 a {
    margin-right: 0.5rem;
  }

  .cover-song-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    width: 100%;
  }

  img {
    width: 100%;
  }

  ol {
    padding-left: 2em;
  }

  li {
    list-style-type: revert;
    margin-bottom: 12px;
  }

  li a {
    padding: 4px;
  }

  @media (min-width: 600px) {
    .cover-song-list {
      flex-direction: row;
    }
    .cover-song-list > * {
      flex: 1 1 50%;
    }
  }
</style>
