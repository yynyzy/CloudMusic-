<template>
  <div class="searchView">
    <searchTop />
  </div>
</template>

<script  lang='ts'>
import { defineComponent } from "vue";
import searchTop from "../components/searchTop.vue";
export default defineComponent({
  name: "searchView",
  components: { searchTop },
  setup() {
    return {};
  },
});
</script>
<style scoped>
</style>