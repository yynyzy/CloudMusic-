<template>
  <div class="playController">
    <div class="left" @click="show = !show">
      <img :src="playlist[currentPlaylistIndex].al.picUrl" alt="" />
      <div class="content">
        <div class="title">{{ playlist[currentPlaylistIndex].name }}</div>
        <div class="tips">横滑可以切换上下手</div>
      </div>
    </div>
    <div class="right">
      <svg
        v-if="controlbtn"
        class="icon search"
        aria-hidden="true"
        @click="play()"
      >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon search" aria-hidden="true" @click="play()">
        <use xlink:href="#icon-zantingtingzhi"></use>
      </svg>
      <svg class="icon search" aria-hidden="true">
        <use xlink:href="#icon-table1 "></use>
      </svg>
      <audio
        ref="audios"
        :src="`https://music.163.com/song/media/outer/url?id=${playlist[currentPlaylistIndex].id}.mp3`"
      ></audio>
    </div>
  </div>
  <playmusic
    :paused="controlbtn"
    :play="play"
    @back="show = !show"
    v-show="show"
    :playDetail="playlist[currentPlaylistIndex]"
  ></playmusic>
</template>

<script >
import {
  defineComponent,
  toRefs,
  onMounted,
  onUpdated,
  ref,
  toRef,
  computed,
} from "vue";
import { useStore, mapState } from "vuex";
import playmusic from "../components/playmusic.vue";
import { getLyric } from "../api/requntil";
export default defineComponent({
  name: "playController",
  components: { playmusic },
  setup() {
    const store = useStore();

    const show = ref(false);
    const { playlist, currentPlaylistIndex } = toRefs(store.state);
    const audios = ref(true);
    const controlbtn = ref(true);
    const play = function () {
      if (audios.value.paused) {
        audios.value.play();
        controlbtn.value = false;
        updateTime();
      } else {
        audios.value.pause();
        controlbtn.value = true;
        clearInterval(store.state.intervalID);
      }
    };

    // let id = toRef(playlist.value[currentPlaylistIndex.value].id);
    const changelyric = async () => {
      let cId = store.state.playlist[currentPlaylistIndex.value].id;
      let { data } = await getLyric(cId);
      store.commit("setLyric", data.lrc.lyric);
    };
    const updateTime = () => {
      store.state.intervalID = setInterval(() => {
        store.commit("setCurrentTime", audios.value.currentTime);
      }, 1000);
    };
    onMounted(() => {
      changelyric();
    });
    onUpdated(() => {
      changelyric();
    });
    return {
      playlist,
      currentPlaylistIndex,
      audios,
      play,
      controlbtn,
      playmusic,
      show,

      // routechange,
    };
  },
});
</script>
<style lang="less" scoped>
.playController {
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  background-color: rgb(176, 245, 202);
  .left {
    display: flex;
    padding: 0 0.2rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }
    .content {
      padding: 0 0.2rem;
      .title {
        max-width: 4rem;
        text-overflow: ellipsis;
      }
      .tips {
        font-size: 0.2rem;
        color: #999;
      }
    }
  }
  .right {
    .icon {
      margin: 0.2rem;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
}
</style>