<script lang="ts">
  import { Song } from "../types";

  export let song: Song;
</script>

<h2>{song.title}</h2>
<div class="lyrics">{song.lyrics}</div>

<style>
  .lyrics {
    font-style: normal;
    white-space: pre-wrap;
  }
</style>
