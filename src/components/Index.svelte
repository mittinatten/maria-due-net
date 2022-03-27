<script lang="ts">
  import PortableText from "@portabletext/svelte";
  import type { FrontMatter } from "../types";

  export let frontMatter: FrontMatter[];
</script>

<div class="wrapper">
  {#each frontMatter as section}
    <article>
      <h2>{section.title}</h2>
      <div class="content">
        {#if section.image}
          <img alt="" src={section.image?.asset.url} />
        {/if}
        <div class="text"><PortableText blocks={section.bodyRaw} /></div>
      </div>
    </article>
  {/each}
</div>

<style>
  article {
    margin-bottom: 32px;
  }

  img {
    max-width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 64px;
  }

  @media (min-width: 600px) {
    .content {
      flex-direction: row;
    }

    img {
      max-width: 50%;
    }
  }
</style>
