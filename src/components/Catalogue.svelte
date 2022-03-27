<script lang="ts">
  import { Album, AppearsOn } from "../types";

  export let albums: Album[];
  export let appearsOn: AppearsOn[];
</script>

<h2>Catalogue</h2>
<ul class="albums">
  {#each albums as album (album.title)}
    <li>
      <a href={album.path}>
        <img src={album.cover.asset.url} alt="Album cover" />
        {album.title} ({album.year})
      </a>
    </li>
  {/each}
</ul>
<h3>Collaborations</h3>
<ul class="collaborations">
  {#each appearsOn as item}
    <li>
      <a href={item.spotify}><i class="fa fa-play-circle" /></a>
      <a href={item.by.homePage}>{item.by.name}</a>:
      <span class="title">{item.title}</span> ({item.year})
    </li>
  {/each}
</ul>

<style>
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  ul {
    margin-bottom: 40px;
  }
  ul.albums {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 32px;
    padding: 16px;
  }
  .albums li {
    list-style: none;
  }

  .albums li a img {
    display: block;
    max-width: 100%;
    margin-bottom: 12px;
  }

  .collaborations li {
    list-style: none;
    margin-bottom: 12px;
  }
  .collaborations i {
    width: 1.5em;
    text-align: center;
  }

  .collaborations .title {
    font-style: italic;
  }
</style>
