<template>
  <div style="display: flex;align-items: center;justify-content: center;">
<!--    居中显示-->
    <video-player ref="videoPlayer"
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
  components: {
    videoPlayer
  },
  methods: {
    onPlay() {
      console.log('play');
    }
  },
  data() {
    return {
      playerOptions: {
        height: '360',
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
