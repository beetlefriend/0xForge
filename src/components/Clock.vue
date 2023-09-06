<template>
  <div>{{ time }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Clock",
  setup() {
    const time = ref("");
    let intervalId: number | undefined;

    const updateTime = () => {
      const now = new Date();
      time.value = now.toLocaleTimeString();
    };

    onMounted(() => {
      updateTime();
      intervalId = window.setInterval(updateTime, 1000);
    });

    onUnmounted(() => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    });

    return {
      time,
    };
  },
});
</script>

<style scoped>
div {
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
}
</style>
