<template>
  <div id="intro-video">
    <video ref="introVideo" width="100%" height="100%" autoplay>
      <source src="@/assets/videos/intro.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  name: "IntroVideo",
  mounted() {
    this.$refs.introVideo.addEventListener("ended", this.videoEnded);
    this.timeout = setTimeout(() => {
      console.log("Video Self-destruct event");
      this.$emit("videoEnded");
    }, 2000);
  },
  beforeDestroy() {
    this.$refs.introVideo.removeEventListener("ended", this.videoEnded);
  },
  methods: {
    videoEnded() {
      this.$emit("videoEnded");
    },
  },
};
</script>
<style>
#intro-video {
  position: absolute;
  background-color: #000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
</style>
