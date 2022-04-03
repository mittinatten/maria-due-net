<script lang="ts">
  import { Song } from "../types";

  export let song: Song;
  export let origin: string;
</script>

<!-- Weird indentation below is to get correct whitespace in output -->
{#if song.lyricsBy && song.musicBy}
  {#if JSON.stringify(song.lyricsBy) === JSON.stringify(song.musicBy)}
    Words and music by
    {#each song.lyricsBy as person, i}
      <span property="composer lyricist" typeof="Person">
        <span property="name">{person.name}</span>
      </span>{#if i < song.lyricsBy.length - 1}{"/"}{/if}
    {/each}
  {:else}
    Music by
    {#each song.musicBy as person, i}
      <span property="composer" typeof="Person">
        <span property="name">{person.name}</span></span
      >{#if i < song.musicBy.length - 1}{" / "}{/if}{/each}.<br />
    Words by
    {#each song.lyricsBy as person, i}
      <span property="lyricist" typeof="Person">
        <span property="name">{person.name}</span></span
      >{#if i < song.lyricsBy.length - 1}{" / "}{/if}{/each}.
  {/if}
{:else}
  Words and music by
  <span property="composer lyricist" typeof="Person" resource={origin}
    >Maria Due</span
  >.
{/if}
