<template>
  <div style="display: flex;align-items: center;justify-content: center;">
<!--    居中显示-->
    <video-player ref="myPlayer"
                  :options="playerOptions"
                  :playsinline="true"
                  @play="onPlay">

    </video-player>
  </div>

</template>

<script>
// require styles
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player/src'

export default {
  name: "LiveComp",
  mounted() {
  },
  components: {
    videoPlayer
  },
  methods: {
    onPlay() {
      console.log('play');
    },
    // 获取屏幕宽度
    getScreenWidth() {
      return document.body.clientWidth;
    },
  },
  data() {
    return {
      playerOptions: {
        // 长宽自适应
        width: this.getScreenWidth()*0.5,
        autoplay: false,
        muted: true,
        controls: true,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: "http://vjs.zencdn.net/v/oceans.mp4",
        }],
        poster: "http://vjs.zencdn.net/v/oceans.mp4?vframe/jpg/offset/1",
      }
    }
  },
}
</script>

<style scoped>
</style>
