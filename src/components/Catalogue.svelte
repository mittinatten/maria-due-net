<script lang="ts">
  import { Album, AppearsOn } from "../types";
  import PlayButton from "./PlayButton.svelte";

  export let albums: Album[];
  export let appearsOn: AppearsOn[];
</script>

<h2>Albums</h2>
<ul class="albums">
  {#each albums as album (album.title)}
    <li property="album" typeof="MusicAlbum" resource={album.resourceURI}>
      <a href={album.path} property="mainEntityOfPage">
        <picture>
          <source type="image/webp" srcset={album.cover.asset.webp} />
          <img property="image" src={album.cover.asset.url} alt="Album cover" />
        </picture>
        <span property="name">{album.title}</span>
        (<span property="datePublished">{album.year}</span>)
      </a>
    </li>
  {/each}
</ul>
<h2>Collaborations</h2>
<ul class="collaborations">
  {#each appearsOn as item}
    <li property="track" typeof="MusicRecording">
      <PlayButton href={item.spotify} />
      <span property="byArtist" resource={item.by.sameAs} typeof="Artist">
        {#if item.by.homePage}
          <a href={item.by.homePage} property="url">
            <span property="name">
              {item.by.name}
            </span>
          </a>
        {:else}
          <span property="name">
            {item.by.name}
          </span>
        {/if}
      </span>:
      <span class="title" property="name">{item.title}</span>
      (<span property="datePublished">{item.year}</span>)
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
    grid-template-rows: repeat(auto-fill, minmax(300px, 60%));
    gap: var(--large-gap);
  }
  .albums li {
    list-style: none;
    padding-bottom: var(--small-gap);
  }

  .albums li a img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin-bottom: 12px;
    background-color: #e9ded2;
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
