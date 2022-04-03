<script lang="ts">
  import { BreadCrumb } from "../types";

  export let url: URL;
  export let breadCrumb: BreadCrumb;

  const menuItems = [
    { link: "/", label: "Catalogue" },
    { link: "/calendar/", label: "Calendar" },
    { link: "/videos/", label: "Videos" },
    { link: "/about/", label: "About" },
  ];
</script>

<header>
  <nav>
    <div class="top-row">
      <div class="title">
        <h1 style="margin: 0" property="name">
          <a href="/" style="text-decoration: none">Maria Due</a>
        </h1>
      </div>
      <ul class="menu">
        {#each menuItems as item}
          <li>
            <a href={item.link} class:active={url.pathname === item.link}
              >{item.label}</a
            >
          </li>
        {/each}
      </ul>
    </div>

    <div class="breadcrumb">
      {#each breadCrumb.filter((item) => !!item.path) as item}
        <a class="item" href={item.path}>{item.title}</a>
      {/each}
    </div>
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
    align-items: baseline;
    border-bottom: 2px solid var(--color-text);
    padding-bottom: 4px;
    gap: 32px;
  }

  h1 {
    white-space: nowrap;
  }

  .menu .active {
    font-weight: 700;
  }

  .menu {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
    max-width: 60%;
    margin-right: -8px;
  }

  .menu li {
    font-size: calc((14 / 16) * 1rem);
  }

  .menu li a {
    display: inline-block;
    padding: 8px;
  }

  .breadcrumb {
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-top: 12px;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .breadcrumb .item {
    padding: 8px 2px;
    white-space: nowrap;
    overflow: hidden;
  }

  .breadcrumb .item::after {
    content: "〉";
    padding-left: 10px;
  }
</style>
