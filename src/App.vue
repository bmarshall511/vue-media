<template>
  <div id="app">
    <MediaList />
  </div>
</template>

<script>
import MediaList from "./components/MediaList.vue";

export default {
  name: "App",
  components: {
    MediaList
  }
};
</script>

<style lang="scss">
@import "./styles/_reset.scss";
@import "./styles/_base.scss";
@import "./styles/_layout.scss";
@import "./styles/_helpers.scss";

#app {
  overflow: hidden;
  margin: 0 auto;
  padding-left: var(--grid-spacing);
  padding-right: var(--grid-spacing);
  max-width: var(--max-width);
}
</style>
