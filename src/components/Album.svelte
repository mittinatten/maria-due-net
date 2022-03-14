<script lang="ts">
  import { Album } from "../types";

  export let album: Album;
</script>

<h2>
  {album.title}
</h2>
<ol>
  {#each album.songs as song}
    <li><a href={song.path}>{song.title}</a></li>
  {/each}
</ol>
