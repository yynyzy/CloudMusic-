<template>
  <div class="musicList">
    <div class="mtop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="mlist">
      <el-carousel :interval="4000" type="card" height="2.8rem">
        <el-carousel-item v-for="item in MLists" :key="item">
          <router-link :to="{ path: '/listView', query: { id: item.id } }">
            <div class="list">
              <img :src="item.picUrl" :alt="item.name" />
              <div class="name">{{ item.name }}</div>
              <div class="count">{{ valueChange(item.playCount) }}</div>
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import { ElCarousel, ElCarouselItem } from "element-plus";
import { getRecommend } from "../api/requntil";
import { useStore } from "vuex";
export default defineComponent({
  name: "musicList",
  components: { ElCarousel, ElCarouselItem },
  setup() {
    let MLists = reactive([]);
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
    const store = useStore();

    onMounted(async () => {
      const { data } = await getRecommend();
      MLists.push(...data.result);
    });
    return {
      MLists,
      valueChange,
    };
  },
});
</script>
<style lang="less" scoped>
.musicList {
  padding: 0 0.4rem;
  .mtop {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      padding: 0.06rem;
      border-radius: 0.2rem;
      font-size: 0.24rem;
      text-align: center;
    }
  }
  .mlist {
    background-color: rgb(247, 223, 245);
    padding: 0.2rem 0.1rem;
    .list {
      background-color: #fff;
      position: relative;
      border: 1px solid rgb(250, 248, 248);

      img {
        height: 2.4rem;
      }
      .name {
        padding: 0 0.05rem;
        font-size: 0.05rem;
        text-align: center;
      }
      .count {
        font-size: 0.1rem;
        color: rgb(250, 243, 243);
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>