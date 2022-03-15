<script lang="ts">
  import { Album } from "../types";

  export let album: Album;
</script>

<h2>
  {album.title}
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

<style>
  .cover-song-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    width: 100%;
  }

  img {
    max-width: 100%;
  }

  li {
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
