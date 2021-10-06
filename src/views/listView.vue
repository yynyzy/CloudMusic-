<template>
  <div class="listView">
    <listView-top :playlist="playlist"></listView-top>
    <play-list :playlist="playlist"></play-list>
  </div>
</template>

<script>
import { getPlayDetail } from "../api/requntil";
import { defineComponent, reactive, onMounted, toRefs, toRef, ref } from "vue";
import { useRoute } from "vue-router";
import listViewTop from "../components/listViewtop.vue";
import playList from "../components/playList.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "listView",
  components: {
    listViewTop,
    playList,
  },
  setup() {
    let state = reactive({
      list: [],
      playlist: {
        creator: {},
        tracks: [],
      },
    });
    const route = useRoute();
    const store = useStore();
    let { playlist } = toRefs(state);
    onMounted(async () => {
      let id = route.query.id;
      let res = await getPlayDetail(id);
      state.playlist = res.data.playlist;
      store.commit("setPlaylist", state.playlist.tracks);
    });
    return {
      playlist,
    };
  },
});
</script>
<style scoped>
</style>