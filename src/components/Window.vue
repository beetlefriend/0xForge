<template>
  <div
    v-show="!isMinimized"
    ref="windowElement"
    class="window"
    :class="{ minimized: isMinimized, focused: getFocused }"
    :style="{
      opacity: isMinimized ? 0 : 1,
      left: getPositionX + 'px',
      top: getPositionY + 'px',
      zIndex: getZIndex,
    }"
    @click="focusWindow"
  >
    <div class="window-title" @mousedown="dragStart">
      <span>{{ title }}</span>
      <div class="window-buttons">
        <button class="minimize" @click="minimizeWindow({ id })">-</button>
        <button class="close" @click="removeWindow({ id })">x</button>
      </div>
    </div>
    <div class="window-content" v-if="!getClosed">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import { store } from "@/store";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Window",
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: "New Window",
    },
    focused: {
      type: Boolean,
      default: false,
    },
    xBeforeMinimize: {
      type: Number,
      default: 0,
    },
    yBeforeMinimize: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapState(["windows"]),
  },
  methods: {
    focusWindow() {
      // console.log("Focusing");
      this.$emit("focus", this.id);
    },
  },

  setup(props, { emit }) {
    const windowElement = ref<HTMLElement | null>(null);

    let initialMouseX = 0;
    let initialMouseY = 0;
    let initialWindowX = 0;
    let initialWindowY = 0;

    const drag = (event: MouseEvent) => {
      if (!windowElement.value) return;

      const deltaX = event.clientX - initialMouseX;
      const deltaY = event.clientY - initialMouseY;

      const newX = initialWindowX + deltaX;
      const newY = initialWindowY + deltaY;

      const maxLeft = window.innerWidth - windowElement.value.offsetWidth;
      const maxTop = window.innerHeight - windowElement.value.offsetHeight;

      windowElement.value.style.left = `${Math.min(
        Math.max(newX, 0),
        maxLeft
      )}px`;
      windowElement.value.style.top = `${Math.min(
        Math.max(newY, 0),
        maxTop
      )}px`;
    };

    const dragStart = (event: MouseEvent) => {
      if (
        !(event.target as Element).classList.contains("window-title") ||
        (event.target as Element).tagName === "BUTTON"
      )
        return;

      // Set the zIndex to a very high value to bring the window to the top

      event.preventDefault();
      initialMouseX = event.clientX;
      initialMouseY = event.clientY;

      if (windowElement.value) {
        initialWindowX = parseInt(windowElement.value.style.left, 10) || 0;
        initialWindowY = parseInt(windowElement.value.style.top, 10) || 0;
        window.addEventListener("mousemove", drag);
        window.addEventListener("mouseup", dragEnd);

        // Remove the dragEnd listener immediately after adding it
        event.target.addEventListener("click", dragEnd, { once: true });
      }
      emit("focus", props.id);
    };

    const dragEnd = (event: MouseEvent) => {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("mouseup", dragEnd);

      // Remove the dragEnd listener from the title bar
      if (event.target) {
        event.target.removeEventListener("click", dragEnd);
      }
    };

    const minimizeWindow = ({ id }: { id: number }) => {
      store.dispatch("minimizeWindow", { id });
    };

    const isMinimized = computed(() => {
      const windowObj = store.state.windows.find((w) => w.id === props.id);

      return windowObj ? windowObj.isMinimized : false;
    });

    const getZIndex = computed(() => {
      const windowObj = store.state.windows.find((w) => w.id === props.id);

      return windowObj ? windowObj.zIndex : 0;
    });

    const getPositionX = computed(() => {
      const windowObj = store.state.windows.find((w) => w.id === props.id);

      return windowObj ? windowObj.x : 0;
    });

    const getPositionY = computed(() => {
      const windowObj = store.state.windows.find((w) => w.id === props.id);

      return windowObj ? windowObj.y : 0;
    });

    const getFocused = computed(() => {
      const windowObj = store.state.windows.find((w) => w.id === props.id);

      return windowObj ? windowObj.focused : false;
    });

    const getClosed = computed(() => {
      const windowObj = store.state.windows.find((w) => w.id === props.id);

      return windowObj ? windowObj.closed : false;
    });

    return {
      windowElement,
      dragStart,
      isMinimized,
      ...mapActions(["removeWindow"]),
      minimizeWindow,
      getPositionX,
      getPositionY,
      getFocused,
      getZIndex,
      getClosed,
    };
  },
});
</script>

<style scoped>
.window {
  position: absolute;
  background-color: var(--component-bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  min-width: 200px;
  min-height: 100px;
  font-family: "Tahoma", sans-serif;
  opacity: .5;
}
.window.focused {
  border-color: var(--focused-border-color, rgb(146, 146, 146));
  box-shadow: var(--box-shadow, 0px 0px 10px rgba(0, 0, 0, 0.9));
}

.window-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--title-bg-color, #282b36);
  padding: 4px;
  color: var(--text-color, #fff);
  font-weight: bold;
  font-size: 12px;
  cursor: move;
}

.window-buttons {
  display: flex;
}

.window-buttons button {
  background-color: var(--button-bg-color, #3f4455);
  border: 1px solid var(--border-color, #000);
  margin-left: 2px;
  width: 20px;
  height: 20px;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.window-content {
  padding: 8px;
  background-color: var(--content-bg-color, #3f4455);
  font-size: 12px;
}
</style>
