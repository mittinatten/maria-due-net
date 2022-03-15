<script lang="ts">
  import { Album } from "../types";

  export let albums: Album[];
</script>

<h2>Catalogue</h2>
<ul>
  {#each albums as album (album.title)}
    <li>
      <a href={album.path}>
        <img src={album.cover.asset.url} alt="Album cover" />
        {album.title}
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  li {
    margin: 0;
    flex: 1;
    list-style: none;
  }

  li a img {
    display: block;
    max-width: 100%;
    margin-bottom: 12px;
  }

  @media (min-width: 550px) {
    ul {
      flex-direction: row;
      gap: 20px;
    }
  }
</style>
