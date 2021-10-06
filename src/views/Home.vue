<template>
  <div class="home">
    <topNav></topNav>
    <mySwiper></mySwiper>
    <iconList></iconList>
    <musicList></musicList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import topNav from "../components/topNav.vue";
import MySwiper from "../components/MySwiper.vue";
import IconList from "../components/IconList.vue";
import musicList from "../components/musicList.vue";
export default defineComponent({
  name: "Home",
  components: {
    topNav,
    mySwiper: MySwiper,
    iconList: IconList,
    musicList,
  },
});
</script>
<style lang="less" scoped>
</style>