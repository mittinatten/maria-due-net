<script lang="ts">
  import { BreadCrumb } from "../types";

  export let url: URL;
  export let breadCrumb: BreadCrumb;

  const menuItems = [
    { link: "/catalogue/", label: "Catalogue" },
    { link: "/calendar/", label: "Calendar" },
    { link: "/videos/", label: "Videos" },
    { link: "/about/", label: "About" },
  ];
</script>

<header>
  <nav>
    <div class="top-row">
      <div class="title">
        <h1 style="margin: 0">
          <a href="/" style="text-decoration: none"> Maria Due </a>
        </h1>
      </div>
      <div class="menu">
        {#each menuItems as item}
          <div>
            <a href={item.link} class:active={url.pathname.includes(item.link)}
              >{item.label}</a
            >
          </div>
        {/each}
      </div>
    </div>
    {#if breadCrumb && breadCrumb.length}
      <div class="breadcrumb">
        {#each breadCrumb.filter((item) => !!item.path) as item}
          <a class="item" href={item.path}>{item.title}</a>
        {/each}
      </div>
    {/if}
  </nav>
</header>

<style>
  header {
    margin-bottom: 0.5rem;
    align-items: center;
  }

  a {
    text-decoration: none;
  }
  a:active {
    font-weight: bold;
  }

  nav {
    margin: 0 auto;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid var(--color-text);
    padding-bottom: 12px;
    gap: 32px;
  }

  .menu .active {
    font-weight: 700;
  }

  div.menu > div {
    margin-right: 8px;
    font-size: 14px;
  }

  .breadcrumb {
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-top: 12px;
  }

  .breadcrumb .item {
    padding: 8px;
  }

  .breadcrumb .item:not(:first-of-type) {
    padding-left: 0px;
  }

  .breadcrumb .item:not(:first-of-type)::before {
    content: "〉";
  }

  @media only screen and (min-width: 600px) {
    div.menu > div {
      display: inline;
    }
  }
</style>
