<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="left">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">共{{ playlist.tracks.length }}首</div>
        </div>
      </div>
      <div class="btn">+收藏{{ valueChange(playlist.subscribedCount) }}</div>
    </div>
    <div class="list">
      <div class="playItem" v-for="(item, i) in playlist.tracks" :key="i">
        <div class="left">
          <div class="index">{{ i + 1 }}</div>
          <div class="content">
            <div class="title">{{ item.name }}</div>
            <div class="author">
              <span class="tag" v-for="(tag, i) in playlist.tags" :key="i">{{
                tag
              }}</span>
              <span>{{ item.al.name }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <svg
            class="icon search"
            aria-hidden="true"
            @click="setCurrentIndex(i)"
          >
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="icon search" aria-hidden="true">
            <use xlink:href="#icon-table"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "playList",
  components: {},
  props: ["playlist"],
  setup() {
    const store = useStore();
    const setCurrentIndex = (i) => {
      store.commit("setCurrentIndex", i);
    };
    const valueChange = (val) => {
      let res = 0;
      if (val >= 100000000) {
        res = val / 100000000;
        res = res.toFixed(2) + "亿";
      } else if (val > 10000) {
        res = val / 10000;
        res = res.toFixed(2) + "万";
      }
      return res;
    };
    return { valueChange, setCurrentIndex };
  },
});
</script>
<style  lang="less" scoped>
.playlist {
  width: 7.5rem;
  padding: 0 0.4rem;
  background-color: #fff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  margin-top: 0.4rem;
  .playlist-top {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
      }
      .icon {
        width: 0.4rem;
        height: 0.4rem;
      }
      .title {
        font-size: 0.34rem;
        font-weight: 900;
      }
      .num {
        font-size: 0.24rem;
        color: #666;
      }
    }
    .btn {
      font-size: 0.24rem;
      color: #fff;
      background-color: orangered;

      line-height: 0.6rem;
      border-radius: 0.4rem;
      padding: 0.1rem;
    }
  }
  .list {
    .playItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      .left {
        display: flex;
        align-items: center;
        color: #666;
        .index {
          width: 0.4rem;
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 0.4rem;
          width: 4.5rem;
          height: 1rem;
          .title {
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.3rem;
            font-weight: 900;
            color: #000;
            margin-bottom: 0.1rem;
            overflow: hidden;
          }
          .author {
            line-height: 0.3rem;
            height: 0.3rem;
            font-size: 0.25rem;
            color: #666;
            overflow: hidden;
            .tag {
              font-size: 0.2rem;
              color: orangered;
              border: 1px solid orangered;
              border-radius: 0.1rem;
              color: #666;
            }
          }
        }
      }
      .right {
        .icon {
          margin: 0 0.2rem;
        }
      }
    }
  }
}
</style>