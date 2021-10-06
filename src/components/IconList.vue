<template>
  <div class="iconlist">
    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanjutuijian"></use></svg
      ><span>每日推荐</span>
    </div>
    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xingtaiduICON_sousuo---copy"></use></svg
      ><span>私人FM</span>
    </div>
    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use></svg
      ><span>歌单</span>
    </div>
    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use></svg
      ><span>排行榜</span>
    </div>
  </div>
</template>

<script  lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "IconList",
  components: {},
  setup() {
    return {};
  },
});
</script>
<style lang="less" scoped>
.iconlist {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  .iconitem {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    width: 1.5em;
    height: 1.5em;
  }
  span {
    font-size: 0.22rem;
  }
}
</style>