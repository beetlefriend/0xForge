<template>
  <div class="start-menu">
    <ul>
      <li>
        <div class="start-menu-item">
          Programs
          <ul class="start-menu-sub">
            <!-- <li class="start-menu-sub-item" @click="openSuperMario">
              <img src="@/assets/Mario.png" class="start-menu-icon" />
              Super Mario
            </li>
            <li class="start-menu-sub-item" @click="openTetris">
              <img src="https://static.thenounproject.com/png/28580-200.png" class="start-menu-icon" />
              Tetris
            </li>
            <li class="start-menu-sub-item" @click="openUniswap">
              <img
                src="https://cryptologos.cc/logos/uniswap-uni-logo.png"
                class="start-menu-icon"
              />
              Uniswap
            </li> -->
            <li class="start-menu-sub-item" @click="openWinamp">
              <img
                src="https://pawelporwisz.pl/winamp/img/wip/wi.png"
                class="start-menu-icon"
              />
              Winamp
            </li>
            <li class="start-menu-sub-item" @click="openTokencreator">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2165/2165640.png"
                class="start-menu-icon"
              />
              Token Creator
            </li>
            <li class="start-menu-sub-item" @click="openTokenmanager">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2165/2165640.png"
                class="start-menu-icon"
              />
              Token Manager
            </li>
            <li class="start-menu-sub-item" @click="openThemes">
              <img
                src="https://png.pngtree.com/png-vector/20221010/ourmid/pngtree-theme-icon-vector-png-image_6293125.png"
                class="start-menu-icon"
              />
              Theme
            </li>
          </ul>
        </div>
      </li>
      <li>
        <div class="start-menu-item">
          Documents
          <ul class="start-menu-sub">
            <li class="start-menu-sub-item" @click="openYepText">
              <img src="@/assets/icons/icon.png" class="start-menu-icon" />
              Yep.txt
            </li>
            <!-- <li class="start-menu-sub-item" @click="openAbout">
              <img src="@/assets/icons/icon.png" class="start-menu-icon" />
              About.txt
            </li>
            <li class="start-menu-sub-item" @click="openRoadmap">
              <img src="@/assets/icons/icon.png" class="start-menu-icon" />
              Roadmap.txt
            </li>
            <li class="start-menu-sub-item" @click="openYeetWindow">
              <img src="@/assets/logo.png" class="start-menu-icon" />
              Yeet.png
            </li> -->
          </ul>
        </div>
      </li>
      <li>
        <div class="start-menu-item" @click="openHelp">Help</div>
      </li>
      <li @click="shutDown">
        <div class="start-menu-item">Shut Down...</div>
      </li>
    </ul>

    <!-- <div
      class="shutdown-screen"
      v-if="showShutdownScreen"
      :style="{ zIndex: shutdownZIndex }"
    >
      <img src="@/assets/windows98bluescreen.jpg" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "StartMenu",
  data() {
    return {
      showShutdownScreen: false,
      shutdownZIndex: 1000,
    };
  },
  methods: {
    shutDown() {
      //   this.$store.dispatch("minimizeAllWindows");
      //   this.showShutdownScreen = true;
      //     this.shutdownZIndex = 10000;

      this.$emit("shutdown");
    },
    openHelp() {
      window.open("https://chat.openai.com/", "_blank", "noopener noreferrer");
    },
    // openUniswap() {
    //   this.$store.dispatch("openWindow", {
    //     id: 6,
    //   });
    // },
    // openSuperMario() {
    //   // code to open Super Mario here
    //   this.$store.dispatch("openWindow", {
    //     id: 7,
    //   });
    // },
    // openTetris() {
    //   // code to open Super Mario here
    //   this.$store.dispatch("openWindow", {
    //     id: 8,
    //   });
    // },
    openWinamp() {
      //   console.log("attempting to open winamp");
      this.$emit("open-winamp");
    },
    // Documents submenu methods
    // openTokemomics() {
    //   // code to open Tokemomics.txt here'
    //   this.$store.dispatch("openWindow", {
    //     id: 5,
    //   });
    // },
    // openAbout() {
    //   // code to open About.txt here
    //   this.$store.dispatch("openWindow", {
    //     id: 3,
    //   });
    // },
    openThemes() {
      // code to open About.txt here
      this.$store.dispatch("openWindow", {
        id: 2,
      });
    },
    openYepText() {
      // code to open About.txt here
      this.$store.dispatch("openWindow", {
        id: 3,
      });
    },
    openTokencreator() {
      // code to open About.txt here
      this.$store.dispatch("openWindow", {
        id: 4,
      });
    },

    openTokenmanager() {
      this.$store.dispatch("openWindow", {
        id: 5,
      });
    },
    // openRoadmap() {
    //   // code to open Roadmap.txt here
    //   this.$store.dispatch("openWindow", {
    //     id: 4,
    //   });
    // },
    // openYeetWindow() {
    //   this.$store.dispatch("openWindow", {
    //     id: 2,
    //   });
    // },
  },
};
</script>
<style scoped>
.start-menu {
  position: fixed;
  bottom: 40px;
  left: 0px;
  background-color: var(--component-bg-color, #292c37);
  border: 1px solid var(--border-color, #282b36);
  box-shadow: var(--box-shadow, 0 0 5px rgba(167, 167, 167, 0.2));
  width: 200px;
  height: 300px;
  z-index: 9999;
  opacity: 0.9;
  font-family: "Tahoma", sans-serif;
  font-size: 12px;
}

.start-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #464c63;
  border-bottom: none;
}

.start-menu ul li {
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #464c63;
  position: relative;
}

.start-menu ul li:hover {
  background-color: var(
    --menu-item-hover-bg-color,
    #464c63
  ); /* Default hover color */
}

.start-menu-item {
  position: relative;
}

.start-menu-item:hover .start-menu-sub {
  display: block;
}

.start-menu-item:hover {
  background-color: var(
    --menu-item-hover-bg-color,
    #464c63
  ); /* Default hover color */
}

.start-menu-sub {
  display: none;
  position: absolute;
  top: -5px;
  left: 100%;
  background-color: var(
    --submenu-bg-color,
    #3f4455
  ); /* Default background color */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.9);
  width: 200px;
  height: auto;
  z-index: 2;
  font-family: "Tahoma", sans-serif;
  font-size: 12px;
}

.start-menu-sub ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #464c63;
}

.start-menu-sub ul li {
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #464c63;
}

.start-menu-sub ul li:hover {
  background-color: #827d7d;
}

.start-menu-sub-item img {
  margin-right: 10px;
}

.start-menu-sub iframe {
  border: none;
  width: 100%;
  height: calc(100% - 20px);
}

.start-menu-icon {
  width: 20px;
}

.shutdown-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 1000000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shutdown-screen img {
  width: 100%;
  height: auto;
  z-index: 9999999;
}
</style>
