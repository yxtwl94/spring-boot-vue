<template>
  <div>
<!--    地图组件-->
    <div id="map" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
export default {
  name: "MapTool",
  data() {
    return {

    };
  },
  methods: {
    getCurrentLocation(){
      const _this = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(_this.showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    showPosition(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(lat, lng);
    },
  },
  mounted() {
    this.getCurrentLocation();
  },
}
</script>

<style scoped>

</style>