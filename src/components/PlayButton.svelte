<script lang="ts">
  export let href: string;
</script>

<a {href} property="url" aria-label="Play song on spotify">
  <i aria-hidden="true">&#xf144;</i>
</a>

<style>
  a {
    text-decoration: none;
    min-width: 1.2em;
    display: inline-block;
  }

  i {
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    font-style: normal;
  }
</style>
