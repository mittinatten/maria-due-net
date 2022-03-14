<script lang="ts">
  import { Song } from "../types";

  export let song: Song;
</script>

<h2>{song.title}</h2>
<pre>{song.lyrics}</pre>
