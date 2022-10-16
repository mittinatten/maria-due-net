<script lang="ts">
  export let href: string;
</script>

<a {href} property="url" aria-label="Play song on spotify">
  <i aria-hidden="true">&#xf144;</i>
</a>

<style>
  a {
    text-decoration: none;
  }
  i {
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    font-style: normal;
  }
</style>
