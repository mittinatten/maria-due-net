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
        {album.title}
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
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }
  .albums li {
    flex: 1 1 200px;
    list-style: none;
  }

  .albums li a img {
    display: block;
    max-width: 100%;
    margin-bottom: 12px;
  }

  /* @media (min-width: 600px) {
    ul.albums {
      flex-direction: row;
      flex-wrap: revert;
      gap: 20px;
    }
  } */

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
