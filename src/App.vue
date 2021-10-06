<template>
  <div>
    <router-view />
    <play-controller
      v-if="
        $router.currentRoute.value.path !== '/login' &&
        $router.currentRoute.value.path !== '/my'
      "
    ></play-controller>
  </div>
</template>
<script  lang='ts'>
import { defineComponent, onMounted } from "vue";
import playController from "./components/playController.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "app",
  components: {
    playController,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      let userData = JSON.parse(localStorage.userData);
      store.commit("setUser", userData);
    });
    return {};
  },
});
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "微软雅黑";
}
.icon {
  width: 0.3rem;
  height: 0.3rem;
}
a {
  color: #333;
  text-decoration: none;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
body {
  margin: 0;
}
</style>
