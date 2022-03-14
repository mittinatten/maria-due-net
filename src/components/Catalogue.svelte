<script lang="ts">
  import { Album } from "../types";

  export let albums: Album[];
</script>

<ul>
  {#each albums as album (album.title)}
    <li><a href={album.path}>{album.title}</a></li>
  {/each}
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0;
    list-style: none;
  }
</style>
