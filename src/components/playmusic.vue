<template>
  <div class="playMusic">
    <div
      class="bg"
      :style="{ backgroundImage: `url(${playDetail.al.picUrl})` }"
    ></div>
    <div class="playTop">
      <div class="back" @click="$emit('back')">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-xia"></use>
        </svg>
      </div>
      <div class="center">
        <div class="title">
          <marquee behavior="scroll" direction="left" scrollamount="5">
            {{ playDetail.al.name }}</marquee
          >
        </div>
      </div>
      <div class="share">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
      <div v-show="!islyric" class="playContent">
        <img
          class="needle"
          :class="{ active: !paused }"
          src="../assets/imgs/needle.png"
          alt=""
        />
        <img class="disc" src="../assets/imgs/bofangbg.png" alt="" />
        <img class="playimg" :src="playDetail.al.picUrl" alt="" />
      </div>
    </div>
    <div v-show="islyric" ref="playlyric" class="playlyric">
      <p
        :class="{
          active:
            store.state.currentTime * 1000 >= item.pre &&
            store.state.currentTime * 1000 < item.time,
        }"
        v-for="(item, i) in store.getters.lyricList"
        :key="i"
      >
        {{ item.lyric }}
      </p>
    </div>
    <div class="progress"></div>
    <div class="playFooter">
      <svg class="icon search" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use></svg
      ><svg class="icon search" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use></svg
      ><svg
        v-if="paused"
        @click="play()"
        class="icon search play"
        aria-hidden="true"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg v-else class="icon search play" aria-hidden="true" @click="play()">
        <use xlink:href="#icon-zantingtingzhi"></use></svg
      ><svg class="icon search" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-shangyishou"></use></svg
      ><svg class="icon search" aria-hidden="true">
        <use xlink:href="#icon-yinle-liebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script >
import { defineComponent, ref, watch, toRefs } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "playmusic",
  components: {},
  props: ["playDetail", "play", "paused"],
  setup() {
    const store = useStore();
    const islyric = ref(true);
    const playlyric = ref(true);
    watch(currentTime, (newValue) => {
      let p = document.querySelector("p.active");
      playlyric.value.scrollTop = p.offsetTop;
    });
    const { currentTime, playlist, currentPlaylistIndex } = toRefs(store.state);
    const goPlay = function (num) {
      let cIndex = currentPlaylistIndex.value;
      let cplayListLength = playlist.value.length;
      let index = cIndex + num;
      if (index < 0) {
        index = cplayListLength - 1;
      } else if (index === cplayListLength) {
        index = 0;
      }

      store.commit("setCurrentIndex", index);
    };
    return {
      islyric,
      store,
      playlyric,
      goPlay,
    };
  },
});
</script>
<style lang='less' scoped>
.playMusic {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    filter: blur(60px);
    background-position: center center;
  }
  .playTop {
    width: 7.5rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.4rem;
    color: #fff;
    .icon {
      fill: #fff;
      width: 0.4rem;
      height: 0.4srem;
    }
    marquee {
      flex: 1;
      width: 5rem;
    }
    .playContent {
      position: absolute;
      width: 7.5rem;
      height: 7.5rem;
      left: 0;
      top: 1.5rem;
      .needle {
        width: 2.5rem;
        height: auto;
        position: absolute;
        left: 3.5rem;
        transform-origin: 0.3rem 0;
        transform: rotate(-5deg);
        transition: all 1s;
        z-index: 9;
      }
      .needle.active {
        width: 2.5rem;
        height: auto;
        position: absolute;
        left: 3.5rem;
        z-index: 9;
        transform-origin: 0.3rem 0;
        transform: rotate(20deg);
        transition: all 1s;
      }
      .disc {
        width: 5.5rem;
        height: auto;
        position: absolute;
        left: calc(50% - 2.75rem);
        top: 3rem;
      }
      .playimg {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 1.75rem;
        position: absolute;
        left: calc(50% - 1.75rem);
        top: 4rem;
      }
    }
  }
  .playlyric {
    width: 7.5rem;
    height: 9rem;
    position: absolute;
    left: 0;
    top: calc(50% - 4.5rem);
    overflow: scroll;
    text-align: center;
    color: #fff;
    padding: 0.2rem 0;
    .active {
      color: rgb(248, 69, 69);
    }
  }
  .playFooter {
    width: 7.5rem;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 0.4rem;
    .icon {
      fill: #fff;
      width: 0.5rem;
      height: 0.5rem;
      &.play {
        width: 0.8rem;
        height: 0.8rem;
      }
      &:nth-child(4) {
        width: 0.4rem;
        height: 0.4rem;
      }
    }
  }
}
</style>