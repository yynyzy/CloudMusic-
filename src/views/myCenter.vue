<template>
  <section class="aui-flexView">
    <header class="top">
      <div class="back left" @click="$router.push('/')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xia"></use>
        </svg>
      </div>
      <div class="aui-center">
        <span>个人中心</span>
      </div>
      <div class="back right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-table"></use>
        </svg>
      </div>
    </header>
    <section class="aui-scrollView">
      <div class="aui-mine-head">
        <div class="aui-mine-user">
          <img :src="user.account.userdata.profile.avatarUrl" alt="" />
        </div>
        <div class="aui-mine-text">
          <h2>{{ user.account.userdata.profile.nickname }}</h2>
        </div>
      </div>
    </section>
  </section>
</template>

<script  lang='ts'>
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "",
  components: {},
  setup() {
    const store = useStore();
    const user = store.state.user;
    return {
      user,
    };
  },
});
</script>
<style lang="less" scoped>
.icon {
  width: 0.4rem;
  height: 0.4rem;
}
.aui-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding: 15px;
  position: relative;
}

.aui-flex-box {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  color: #333;
}

.aui-flexView {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.aui-scrollView {
  width: 100%;
  height: 100%;

  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  margin-top: 0;
}

.top {
  height: 0.5rem;
  position: relative;
  display: flex;
  z-index: 1002;
  background: #75aef5;
}

.back {
  margin: 0.1rem;
  width: 0.5rem;
}

.aui-center {
  flex: 1;
  display: flex;
  justify-content: center;
  span {
    text-align: center;
    font-size: 0.3rem;
    color: #333;
  }
}

.aui-mine-head {
  width: 100%;
  background-image: url("../assets/imgs/head-bg.png");
  background-size: cover;
  height: 160px;
}

.aui-mine-user {
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: 100%;
    height: 100%;
    border: 3px solid #add7f4;
    border-radius: 50%;
  }
}

.aui-mine-text {
  display: flex;
  justify-content: center;
}
</style>