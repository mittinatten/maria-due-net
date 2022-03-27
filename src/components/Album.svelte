<script lang="ts">
  import { Album } from "../types";

  export let album: Album;
</script>

<h2>
  <a href={album.spotify} aria-label="Play album on spotify">
    <i class="fa fa-play-circle" />
  </a>
  {album.title} ({album.year})
</h2>
<div class="cover-song-list">
  <div>
    <img src={album.cover.asset.url} alt="Album cover" />
  </div>
  <ol>
    {#each album.songs as song}
      <li><a href={song.path}>{song.title}</a></li>
    {/each}
  </ol>
</div>
<p>Produced by <a href={album.producer.homePage}>{album.producer.name}</a></p>

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
