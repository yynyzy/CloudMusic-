<template>
  <div class="block">
    <el-carousel height="2.8rem">
      <el-carousel-item v-for="item in imgs">
        <div>
          <img :src="item.pic" alt="图片消失了" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive } from "vue";
import { ElCarousel, ElCarouselItem } from "element-plus";
import { getBanner } from "../api/requntil";

export default defineComponent({
  name: "MySwiper",
  components: { ElCarousel, ElCarouselItem },

  setup() {
    let imgs = reactive([]);
    onMounted(async () => {
      const { data } = await getBanner(1);
      imgs.push(...data.banners);
    });
    return {
      imgs,
    };
  },
});
</script>
<style>
.block {
  margin: 0 auto;
  width: 7.1rem;
  height: 2.8rem;
  border-radius: 0.1rem;
  overflow: hidden;
}
.el-carousel__item img {
  width: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__indicators--horizontal {
  display: flex;
  justify-content: center;
  width: 80%;
  overflow: hidden;
}
</style>
