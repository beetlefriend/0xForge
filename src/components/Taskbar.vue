<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="webamp" id="webamp-container"></div>
    <div class="taskbar" style="color: white; !important">
      <button
        ref="taskbarLogo"
        class="taskbar-logo"
        @click="startMenuOpen = !startMenuOpen"
      >
        <slot name="logo"></slot>
      </button>

      <v-divider elevation="0" style="opacity: 0.01"></v-divider>
      <div class="taskbar-items" v-if="filteredWindows.length > 0">
        <div
          class="taskbar-item"
          v-for="window in filteredWindows"
          :key="window.id"
        >
          <div v-if="!window.closed">
            <div
              class="taskbar-item-border"
              :class="{ focused: window.focused, closed: window.closed }"
              @click="toggleMinimizeWindow(window.id)"
            >
              <div class="taskbar-item-title">{{ window.title }}</div>
            </div>
          </div>
        </div>
        <div class="taskbar-item" v-if="filteredWindows.length === 0">
          <div class="taskbar-item-border" :class="{ focused: false }">
            <!-- <div class="taskbar-item-title">New Window</div> -->
          </div>
        </div>
      </div>
      <div class="taskbar-clock">
        <slot name="clock"></slot>
      </div>
    </div>
    <StartMenu
      ref="startMenu"
      @open-winamp="initializeWebamp"
      @shutdown="emitShutdown"
      v-if="startMenuOpen"
    ></StartMenu>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import StartMenu from "./StartMenu.vue";
import Webamp from "webamp";

export default {
  components: {
    StartMenu, // register StartMenu component
  },
  data() {
    return {
      showWebamp: false,
      startMenuOpen: false,
    };
  },
  computed: {
    ...mapState(["windows"]),
    ...mapGetters(["isWindowMinimized"]),
    showNewWindow() {
      return this.windows.length === 0;
    },
    filteredWindows() {
      return this.windows.filter((window) => !window.closed);
    },
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentClick);
  },

  methods: {
    handleDocumentClick(event) {
      if (
        this.$refs.startMenu &&
        !this.$refs.startMenu.$el.contains(event.target) &&
        !this.$refs.taskbarLogo.contains(event.target)
      ) {
        this.startMenuOpen = false;
      }
    },
    emitShutdown() {
      this.$emit("shutdown");
    },

    initializeWebamp() {
      const webamp = new Webamp({
        zIndex: 1000, // zIndex will ensure that Webamp appears above other elements on the page
        initialPosition: {
          x: 500, // Desired starting x position
          y: 500, // Desired starting y position
        },
        initialTracks: [
          {
            url: require("@/assets/AngelTouch.mp3"),
            metaData: {
              title: "Angel Touch",
              artist: "CINDY",
            },
          },
          {
            url: require("@/assets/RainbowTown.mp3"),
            metaData: {
              title: "Rainbow Town",
              artist: "kiki vivi lily × SUKISHA",
            },
          },

          {
            url: require("@/assets/DressDown.mp3"),
            metaData: {
              title: "Dress Down",
              artist: "Kaoru Akimoto",
            },
          },
          {
            url: require("@/assets/留学生.mp3"),
            metaData: {
              title: "留学生",
              artist: "MONKEY MAJIK",
            },
          },
          {
            url: require("@/assets/sigma.mp3"),
            metaData: {
              title: "Sigma",
              artist: "Unknown",
            },
          },
          // {
          //   url: require("@/assets/sigma.mp3"),
          //   metaData: {
          //     title: "Sigma",
          //     artist: "Unknown",
          //   },
          // },
        ],
      });

      webamp.renderWhenReady(document.getElementById("webamp-container"));
    },
    ...mapMutations(["createWindow", "updateWindow"]),
    ...mapActions(["toggleMinimizeWindow"]),
    focusWindow(windowId) {
      const targetWindow = this.windows.find((w) => w.id === windowId);

      if (targetWindow) {
        targetWindow.focused = true;
        this.$store.dispatch("updateWindow", {
          id: windowId,
          data: {
            focused: true,
          },
        });
      }
    },
    minimizeWindow(windowId) {
      this.$store.dispatch("updateWindow", {
        id: windowId,
        data: {
          isMinimized: true,
        },
      });
    },
    toggleMinimizeWindow(windowId) {
      this.$store.dispatch("toggleMinimizeWindow", { id: windowId });
      this.focusWindow(windowId);
    },
  },
};
</script>

<style scoped>
.taskbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: var(--bg-color, #3f4455);
  opacity: 1;
  box-shadow: var(--box-shadow, 0 0 5px rgba(167, 167, 167, 0.2));
  border: 1px solid var(--border-color, #282b36);
}

.taskbar.closed {
  display: none;
}

.taskbar-logo {
  padding: 0 10px;
  margin-right: 10px;
  border: 1px solid var(--border-color, #282b36);
  box-shadow: var(
    --box-shadow-inset,
    inset 0.05em 0.05em 0.05em 0 rgba(255, 255, 255, 0.5),
    inset -0.05em -0.05em 0.05em 0 rgba(0, 0, 0, 0.5)
  );
  background-color: var(--component-bg-color, #292c37);
}

.taskbar-logo:hover {
  background-color: var(--taskbar-logo-hover-bg-color, 4f5565);
}

.taskbar-new-window {
  padding: 0 5px;
}

.taskbar-windows {
  display: flex;
  align-items: center;
}

.taskbar-item {
  background-color: var(--component-bg-color, #373b4a);
  border: 1px solid var(--border-color, #282b36);
  color: var(--text-color, #ffffff);
  padding: 0 15px;
  height: 100%;
  margin: 5px;
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
}

.taskbar-item.active {
  background-color: var(--active-item-bg-color, #e8e7ec);
}

.taskbar-clock {
  padding: 0 10px;
  color: var(--text-color, white);
}

.taskbar-items {
  display: flex;
  align-items: center;
  width: 100%;
}

.closed-window {
  display: none;
}

.webamp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
