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
        <h2 style="margin: 0">
          <a href="/" style="text-decoration: none"> Maria Due </a>
        </h2>
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
          <span class="item">
            <a href={item.path}>{item.title}</a>
          </span>
        {/each}
      </div>
    {/if}
  </nav>
</header>

<style>
  header {
    margin-bottom: 1.5rem;
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
    border-bottom: 2px solid var(--color-dark);
    padding-bottom: 16px;
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
    margin-top: 0.5rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin: 0px 0.5rem;
  }

  .breadcrumb .item:not(:first-of-type)::before {
    content: "> "; /* todo: put icon here */
  }

  @media only screen and (min-width: 600px) {
    div.menu > div {
      display: inline;
    }
  }
</style>
