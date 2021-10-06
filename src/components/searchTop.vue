<template>
  <div class="searchTop">
    <div class="searchNav">
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xia"></use>
        </svg>
      </div>
      <div class="right">
        <input
          v-model="searchkey"
          type="text"
          :placeholder="placeholder"
          @keydown.enter="savekeyword()"
        />
      </div>
    </div>
    <div class="history" v-show="searchkey.length === 0">
      <div class="historyLeft">历史</div>
      <div class="historyRight">
        <div
          class="keyword"
          @click="historySearch(item)"
          v-for="(item, i) in keywordList.key"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="list">
      <div class="playItem" v-for="(item, i) in searchSongs.songs" :key="i">
        <div class="left">
          <div class="index">{{ i + 1 }}</div>
          <div class="content">
            <div class="title">{{ item.name }}</div>
            <div class="author">
              <span>{{ item.album.name }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <svg class="icon search" aria-hidden="true" @click="setPlay(item, i)">
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
import { defineComponent, ref, onBeforeMount, reactive, toRef } from "vue";
import { useStore } from "vuex";
import { searchMusic } from "../api/requntil";
export default defineComponent({
  name: "searchTop",
  props: ["playlist"],
  components: {},
  setup() {
    const placeholder = ref("陈奕迅");
    const store = useStore();
    const keywordList = reactive({ key: [] });
    const searchkey = ref("");
    const searchSongs = reactive({ songs: [] });
    onBeforeMount(() => {
      keywordList.key = localStorage.keylist
        ? JSON.parse(localStorage.keylist)
        : [];
    });
    const savekeyword = async () => {
      if (searchkey.value.trim() == "") {
        searchSongs.songs = [];
        return;
      }
      //如果关键字重复则不加入历史记录
      if (!keywordList.key.includes(searchkey.value)) {
        keywordList.key.push(searchkey.value);
        if (keywordList.key.length > 10) {
          console.log(keywordList.key.length);
          keywordList.key = keywordList.key.slice(
            keywordList.key.length - 10,
            keywordList.key.length
          );
          console.log(keywordList.key.length);
        }
        localStorage.keylist = JSON.stringify(keywordList.key);
      }

      const { data } = await searchMusic(searchkey.value);
      searchSongs.songs = data.result.songs;
    };
    const historySearch = (keyword) => {
      searchkey.value = keyword;
      savekeyword();
    };
    const setPlay = (item, i) => {
      console.log(item);
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      store.commit("pushPlaylist", item);
      store.commit("setCurrentIndex", store.state.playlist.length - 1);
    };
    return {
      placeholder,
      savekeyword,
      searchkey,
      keywordList,
      searchSongs,
      historySearch,
      setPlay,
    };
  },
});
</script>
<style lang="less" scoped>
.searchTop {
  width: 7.5rem;
  padding: 0 0.4rem;
  height: calc(100vh - 1.2rem);

  .searchNav {
    position: fixed;
    display: flex;
    width: 100%;
    height: 1.2rem;
    align-items: center;
    top: 0;
    left: 0;
    .back {
      margin-left: 0.3rem;
    }
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
    .right {
      flex: 1;
      padding: 0 0.4rem 0 0.4rem;
      input {
        width: 100%;
        border: none;
        border-bottom: 1px solid #666;
        outline: none;
        height: 0.5rem;
      }
    }
  }
  .history {
    margin-top: 1.2rem;
    display: flex;
    .historyLeft {
      width: 1rem;
      height: 0.6rem;
      font-weight: 900;
      margin: 0.2rem 0;
      line-height: 0.6rem;
    }
    .historyRight {
      color: #666;
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .keyword {
        background-color: #eee;
        height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
        line-height: 0.6rem;
        margin: 0.2rem 0.1rem;
      }
    }
  }
  .list {
    position: fixed;
    top: 1.2rem;
    bottom: 1.2rem;
    overflow: scroll;
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