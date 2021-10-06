import { createStore } from 'vuex'

export default createStore({
  state: {
    //获取的歌单，一个数组包含歌曲
    playlist: [{
      name: "夜晚看见月亮",
      id: 1842135106,
      al: {
        id: 126854786,
        name: "夜晚看见月亮",
        pic: 109951165946343780,
        picUrl: "http://p4.music.126.net/pzPJRUscKVjFZbfj4DWNXA==/109951165946343782.jpg",
        pic_str: "109951165946343782"
      }
    }],
    //当前歌曲在歌单中的索引
    currentPlaylistIndex: 0,
    lyric: '',
    currentTime: 0,
    intervalID: 0,
    user: {
      isLogin: false,
      account: {
      },
      userdata: {}
    }

  },
  getters: {
    lyricList: function (state) {
      let arr = state.lyric.split(/\n/igs).map((item, i) => {
        let m = parseInt(item.slice(1, 3));
        let s = parseInt(item.slice(4, 6));
        let mm = parseInt(item.slice(7, 10));
        let pre = 0
        return {
          pre,
          m,
          content: item,
          lyric: item.slice(11),
          time: mm + s * 1000 + m * 60 * 1000
        }
      })
      arr.forEach((item, i) => {
        if (i === 0) {
          item.pre = 0
        } else {
          item.pre = arr[i - 1].time
        }
      })
      return arr
    }
  },
  mutations: {
    setPlaylist(state, value) {
      state.playlist = value
    },
    pushPlaylist(state, value) {
      state.playlist.push(value)
    },
    setCurrentIndex(state, value) {
      state.currentPlaylistIndex = value
    },
    setLyric(state, value) {
      state.lyric = value
    },
    setCurrentTime(state, value) {
      state.currentTime = value
    },
    setUser(state, value) {
      state.user.isLogin = true;
      state.user.account = value;

    },
    setUserDetail(state, value) {
      state.user.userdata = value;
      localStorage.userData = JSON.stringify(state.user);
    }
  },
  actions: {

  },
  modules: {
  }
})
