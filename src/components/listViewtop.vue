<template>
  <div class="listViewTop">
    <img class="bg" :src="playlist.coverImgUrl" alt="" />
    <div class="listViewNav">
      <div class="back" @click="router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xia"></use>
        </svg>
        <div class="title">歌单</div>
      </div>
      <div class="right">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-xingtaiduICON_sousuo---copy"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-table"></use>
        </svg>
      </div>
    </div>
    <div class="content">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" />
        <div class="count">{{ valueChange(playlist.playCount) }}</div>
      </div>
      <div class="contentRight">
        <h3>{{ playlist.name }}</h3>
        <div class="author">
          <img class="header" :src="playlist.creator.avatarUrl" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
        </div>
        <div class="description">
          {{ playlist.description }}
        </div>
      </div>
    </div>
    <div class="iconList">
      <div class="iconItem">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-comment"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="iconItem">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="iconItem">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-a-xiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="iconItem">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script >
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "listViewTop",
  components: {},
  props: ["playlist"],
  setup(props) {
    let router = useRouter();
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
    onMounted(() => {
      //   setTimeout(() => {
      //     console.log(props.playlist);
      //   });
    });

    return {
      valueChange,
      router,
    };
  },
});
</script>
<style  lang="less" scoped>
.listViewTop {
  width: 7.5rem;
  padding: 0 0.4rem;
  height: 6rem;
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: auto;
    z-index: -1;
    filter: blur(25px);
  }
  .listViewNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    font-size: 0.35rem;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: #fff;
    }
    .title {
      margin-left: 0.4rem;
    }
    .search {
      margin-right: 0.4rem;
    }
    .back,
    .right {
      display: flex;
      color: #fff;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    .contentLeft {
      position: relative;
      img {
        height: 2.8rem;
        width: 2.8rem;
        border-radius: 0.1rem;
      }
      .count {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        font-weight: 900;
        font-size: 0.1rem;
        color: rgb(250, 243, 243);
      }
    }
    .contentRight {
      width: 3.5rem;
      h3 {
        color: #fff;
      }
      .author {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        .header {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          margin-right: 0.2rem;
        }
        span {
          color: #ccc;
          font-size: 0.26rem;
        }
      }
      .description {
        font-size: 0.24rem;
        height: 2rem;
        color: #ccc;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .iconList {
    display: flex;
    justify-content: space-around;
    padding-top: 0.2rem;
    .iconItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: #fff;
      }
      span {
        font-size: 0.28rem;
        padding-top: 0.2rem;
        color: #fff;
      }
    }
  }
}
</style>