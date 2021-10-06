<template>
  <div class="topBar">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-table"></use>
      </svg>
    </div>
    <div class="topCenter">
      <span class="btnNav" @click="$router.push('/my')">我的</span>
      <span class="btnNav active">发现</span>
      <span class="btnNav">云村</span>
      <span class="btnNav">视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/searchView')">
        <use xlink:href="#icon-xingtaiduICON_sousuo---copy"></use>
      </svg>
    </div>
  </div>
</template>

<script  lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "topNav",
});
</script>
<style lang="less" scoped>
.topBar {
  width: 7.5rem;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  .icon {
    width: 0.4rem;
    height: 0.4rem;
  }
  .topCenter {
    width: 4.5rem;
    display: flex;
    justify-content: space-around;
    .active {
      font-weight: 900;
    }
  }
}
</style>