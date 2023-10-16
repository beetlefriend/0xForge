<template>
  <div>
    <wallet-connect ></wallet-connect>
    <div id="appContainer" v-if="!closed && isDesktop">
      <div class="container"></div>

      <Window
        v-for="window in windows"
        :key="window.id"
        :id="window.id"
        :title="window.title"
        :style="{ left: window.x + 'px', top: window.y + 'px', opacity: 0.95 }"
        :focused="window.focus"
        @focus="focusWindow"
      >
        <template v-if="window.id === 1">
          <div>
            <v-card elevation="0" color="transparent" width="400px">
              <v-card-text>
                Welcome to 0xForge! This site is still in development and will
                be available for public use soon. Follow us on
                <a href="https://twitter.com "> twitter </a>
              </v-card-text>
            </v-card>
          </div>
        </template>

        <template v-else-if="window.id === 2">
          <div style="width: 400px">
            <ThemeSwitcher> </ThemeSwitcher>
          </div>
        </template>

        <template v-else-if="window.id === 3">
          <v-card width="400px">
            <v-card-text
              >In the world of blockchain, where innovation takes flight,
              0xForge emerges, a beacon of light. An all-in-one toolkit, with a
              desktop UI so sleek, It simplifies ERC20 tokens, making the
              process unique. With lines of code and smart contracts galore,
              0xForge stands tall, ready to explore. Creating tokens on
              Ethereum's chain, With ease and precision, it's not a strain. No
              need for politics, it's all about the tech, Empowering developers,
              what a great spec! From tokens to tokens, it guides the way,
              0xForge, our ally, here to stay. So code away, dear programmer,
              with glee, For 0xForge is here, your trusted key. To unlock the
              world of blockchain's might, In the realm of crypto, it shines so
              bright.</v-card-text
            >
          </v-card>
        </template>

        <template v-else-if="window.id === 4">
          <TokenDeployer></TokenDeployer>
        </template>
        <template v-else-if="window.id === 5">
          <token-manager></token-manager
        ></template>

        <template v-else-if="window.id === 6"> </template>

        <template v-else-if="window.id === 7"> </template>
        <template v-else-if="window.id === 8"> </template>
        <template v-else-if="window.id === 9"> </template>
        <template v-else-if="window.id === 10"> </template>
        <template v-else-if="window.id === 11"> </template>

        <template v-else-if="window.id === 12"> </template>
        <template v-else-if="window.id === 13"> </template>
        <template v-else-if="window.id === 14"> </template>

        <template v-else-if="window.id === 15"> </template>

        <template v-else-if="window.id === 16"> </template>

        <template v-else-if="window.id === 1337"> </template>
      </Window>
      <Taskbar
        ref="taskbar"
        @shutdown="closed = true"
        :windows="windows"
        @focus-window="focusWindow"
      >
        <template #logo>
          <img
            src=""
            alt="0xF"

            style="width: 30px; margin-right: 10px; margin-bottom: 10px"
          />
        </template>
        <template #clock>
          <Clock />
        </template>
      </Taskbar>
    </div>

    <div v-else-if="!isDesktop" class="mobile-message">
      <div class="console">
        <p>This site does not work with portable devices</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Window from "./Window.vue";
import Taskbar from "./Taskbar.vue";
import Clock from "./Clock.vue";

import ThemeSwitcher from "./ThemeSwitcher.vue";
import TokenDeployer from "./TokenDeployer.vue";
import TokenManager from "./TokenManager.vue";

import WalletConnect from "./WalletConnect.vue";

export default {
  data() {
    return {
      closed: false,
      gradients: {
        light: "linear-gradient(45deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%)",
        cyberpunk:
          "linear-gradient(45deg, #ff206e 25%, #8833ff 50%, #ff206e 75%)",
        solarizedDark:
          "linear-gradient(45deg, #002b36 25%, #073642 50%, #002b36 75%)",
        oceanBlue:
          "linear-gradient(45deg, #0077be 25%, #33a8ff 50%, #0077be 75%)",
        warm: "linear-gradient(45deg, #ff5733 25%, #ff914d 50%, #ff5733 75%)",
        default:
          "linear-gradient(45deg, #8f8f8f 25%, #bfbfbf 50%, #8f8f8f 75%)",
      },
      isDesktop: true,
      useGradientAnimation:
        JSON.parse(localStorage.getItem("useGradientAnimation")) || false,
      useGradientBackground:
        JSON.parse(localStorage.getItem("useGradientBackground")) || false,
      selectedTheme: localStorage.getItem("selectedTheme") || "existing",
      bgImageUrl: localStorage.getItem("bgImageUrl") || "https://i.imgur.com/U0EJEUa.jpeg",
    };
  },

  created() {
    this.changeTheme(this.selectedTheme);
  },
  mounted() {
    // Create an array of image sources
    document.addEventListener("keydown", this.handleKeyDown);
    this.checkDevice();

    window.ethereum.on("accountsChanged", (accounts) => {
      console.log("accounts changed");
      this.connectedAccount = accounts[0];
      // this.updateBalances();
    });
    this.changeBackgroundImage(this.bgImageUrl);
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeyDown);
  },

  components: {
    Window,
    Taskbar,
    Clock,
    ThemeSwitcher,
    TokenDeployer,
    TokenManager,
    WalletConnect,
    // IntroVideo,
    // CollectingGame,
  },
  computed: {
    ...mapState(["windows"]),
  },
  methods: {
    changeTheme() {
      const setInputFieldStyles = (borderColor, backgroundColor, textColor) => {
        document.documentElement.style.setProperty(
          "--input-border-color",
          borderColor
        );
        document.documentElement.style.setProperty(
          "--input-bg-color",
          backgroundColor
        );
        document.documentElement.style.setProperty(
          "--input-text-color",
          textColor
        );
      };
      if (this.selectedTheme === "light") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#d3d3d3"
        ); // Light gray for light theme
        document.documentElement.style.setProperty("--bg-color", "#f0f0f0");
        document.documentElement.style.setProperty("--text-color", "#000");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#ffffff"
        );
        document.documentElement.style.setProperty("--border-color", "#ccc");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(0, 0, 0, 0.1)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#e0e0e0"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#f0f0f0"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#ffffff"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#b0b0b0"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#d0d0d0"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#e0e0e0"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#e0e0e0"
        );
        setInputFieldStyles("#ccc", "#ffffff", "#000");
      } else if (this.selectedTheme === "cyberpunk") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#ff206e"
        ); // Hot Pink for hover effect on buttons
        document.documentElement.style.setProperty("--bg-color", "#0b0033"); // Very dark purple for background
        document.documentElement.style.setProperty("--text-color", "#00ff41"); // Bright green for text
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#190061"
        ); // Dark purple for component background
        document.documentElement.style.setProperty("--border-color", "#800080"); // Purple for borders
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(128, 0, 128, 0.5)"
        ); // Box shadow with a purple hue
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#330086"
        ); // Darker purple for title background
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#bb00bb"
        ); // Purple for buttons
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#120033"
        ); // Slightly lighter purple for content background
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#ff00ff"
        ); // Bright pink for focused border color
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#ff206e"
        ); // Hot Pink for menu item hover background color
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#240066"
        ); // Dark purple for submenu background color
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#ff00ff"
        ); // Bright pink for taskbar logo hover background color

        // Set input field styles with a coherent color scheme
        setInputFieldStyles("#800080", "#240066", "#00ff41");
      } else if (this.selectedTheme === "solarizedDark") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#586e75"
        ); // A shade darker for solarized dark
        document.documentElement.style.setProperty("--bg-color", "#002b36");
        document.documentElement.style.setProperty("--text-color", "#f2ffb3");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#073642"
        );
        document.documentElement.style.setProperty("--border-color", "#586e75");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(0, 43, 54, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#586e75"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#052229"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#002b36"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#268bd2"
        );
        document.documentElement.style.setProperty(
          "--taskbar-bg-color",
          "#073642"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#586e75"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#002b36"
        );
        document.documentElement.style.setProperty(
          "--start-button-hover-bg-color",
          "#586e75"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#586e75"
        );
        setInputFieldStyles("#586e75", "#073642", "#f2ffb3");
      } else if (this.selectedTheme === "oceanBlue") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#005f73"
        ); // A shade darker for ocean blue
        document.documentElement.style.setProperty("--bg-color", "#1b262c");
        document.documentElement.style.setProperty("--text-color", "#bbe1fa");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#1b262c"
        );
        document.documentElement.style.setProperty("--border-color", "#0f4c75");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(0, 78, 117, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#0f4c75"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#3282b8"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#1b262c"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#bbe1fa"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#0f4c75"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#1b262c"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#0f4c75"
        );
        setInputFieldStyles("#0f4c75", "#1b262c", "#bbe1fa");
      } else if (this.selectedTheme === "warm") {
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#fca45d"
        ); // A shade darker for warm theme
        document.documentElement.style.setProperty("--bg-color", "#ffeadb");
        document.documentElement.style.setProperty("--text-color", "#5a4238");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#fddbb1"
        );
        document.documentElement.style.setProperty("--border-color", "#fcb07e");
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(250, 148, 90, 0.5)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#fcb07e"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#fcb07e"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#ffeadb"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "#fca45d"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#fca45d"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#fddbb1"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#fca45d"
        );
        document.documentElement.style.setProperty(
          "--input-bg-color",
          "#fddbb1"
        );
        document.documentElement.style.setProperty(
          "--input-text-color",
          "#5a4238"
        );
        document.documentElement.style.setProperty(
          "--input-border-color",
          "#fca45d"
        );
      } else {
        document.documentElement.style.setProperty("--bg-color", "#3f4455");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#292c37"
        );
        document.documentElement.style.setProperty("--border-color", "#4f5565"); // Adjusted color
        document.documentElement.style.setProperty(
          "--box-shadow",
          "0 0 5px rgba(167, 167, 167, 0.2)"
        );
        document.documentElement.style.setProperty(
          "--title-bg-color",
          "#282b36"
        );
        document.documentElement.style.setProperty(
          "--button-bg-color",
          "#3f4455"
        );
        document.documentElement.style.setProperty(
          "--content-bg-color",
          "#3f4455"
        );
        document.documentElement.style.setProperty(
          "--focused-border-color",
          "rgb(146, 146, 146)"
        );
        document.documentElement.style.setProperty(
          "--menu-item-hover-bg-color",
          "#3f4455"
        );
        document.documentElement.style.setProperty(
          "--submenu-bg-color",
          "#292c37"
        );
        document.documentElement.style.setProperty(
          "--taskbar-logo-hover-bg-color",
          "#4f5565"
        );
        document.documentElement.style.setProperty(
          "--button-hover-bg-color",
          "#1e211f"
        ); // A shade darker for warm theme
        setInputFieldStyles("#4f5565", "#292c37", "#ffffff"); // Adjusted color
      }
      localStorage.setItem("selectedTheme", this.selectedTheme);
    },
    changeBackgroundImage(url) {
      if (!this.useGradientBackground) {
        document.documentElement.style.setProperty("--bg-image", `url(${url})`);
        localStorage.setItem("bgImageUrl", url);
      } else {
        const appElement = document.querySelector("#appContainer");

        if (this.useGradientBackground) {
          let gradientBackground = "";
          if (this.selectedTheme === "light") {
            gradientBackground = this.gradients.light;
          } else if (this.selectedTheme === "cyberpunk") {
            gradientBackground = this.gradients.cyberpunk;
          } else if (this.selectedTheme === "solarizedDark") {
            gradientBackground = this.gradients.solarizedDark;
          } else if (this.selectedTheme === "oceanBlue") {
            gradientBackground = this.gradients.oceanBlue;
          } else if (this.selectedTheme === "warm") {
            gradientBackground = this.gradients.warm;
          } else {
            gradientBackground = this.gradients.default;
          }

          appElement.style.backgroundImage = gradientBackground;

          if (this.useGradientAnimation) {
            this.injectKeyframes();
            appElement.style.backgroundSize = "200% 200%";
            appElement.style.animation = "gradientAnimation 50s ease infinite";
          } else {
            appElement.style.animation = "";
          }
        } else {
          let bgImageUrl = this.bgImageUrl;
          if (bgImageUrl) {
            document.documentElement.style.setProperty(
              "--bg-image",
              `url(${bgImageUrl})`
            );
          } else {
            document.documentElement.style.removeProperty("--bg-image");
          }

          appElement.style.animation = "";
        }
      }
    },
    injectKeyframes() {
      let styleSheet = document.styleSheets[0];
      let keyframes = `
   @keyframes gradientAnimation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
     }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    },
    onVideoEnded() {
      this.showIntro = false;
      this.playvideo = false;
    },

    checkDevice() {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      const isPortable =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isPortable || width < 1000) {
        this.isDesktop = false;
      } else {
        this.isDesktop = true;
      }
    },

    // handleKeyDown(event) {
    //   // this.hideBootupScreen();
    //   // if (event.keyCode === 27) {
    //   //   this.closed = false;
    //   // }
    // },
    playSong(target) {
      for (const item of this.playlistItems) {
        item.classList.remove("active");
      }
      target.classList.add("active");
      this.player.src = target.getAttribute("data-src");
      this.player.play();
    },
    ...mapMutations([
      "createWindow",
      "updateWindow",
      "removeWindow",
      "focusWindow",
    ]),
    ...mapActions(["minimizeWindow"]),

    openWinamp() {
      this.$refs.taskbar.initializeWebamp();
    },

    closeWindow(windowId) {
      this.removeWindow(windowId);
    },
    addNewWindow() {
      this.createWindow({ title: "New Window" });
    },
    minimizeWindow(windowId) {
      this.minimizeWindow({ id: windowId });
    },
  },
};
</script>

<style scoped>
.bootup-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  font-family: "Source Code Pro", monospace;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bootup-screen h1 {
  font-size: 48px;
  margin-bottom: 0;
}

.bootup-screen p {
  font-size: 24px;
  margin-top: 0;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 2em;
  position: relative; /* add this */
  z-index: 1; /* add this */
}

.button {
  background-color: transparent;
  border: none;
  margin: 0 0.5em;
  cursor: pointer;
  padding: 0;
}

.button img {
  width: 35px;
  height: 35px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#appContainer {
  animation: fadeIn 1.5s ease-in-out;
  background-image: var(--bg-image, url("https://i.imgur.com/U0EJEUa.jpeg"));
  background-size: cover;

  /* Add blur effect */
}

/* Disable animation for Firefox */
/* @-moz-document url-prefix() {
  #app {
    animation: none;
  }
} */

#intro-video {
  position: absolute;
  background-color: #000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.mobile-message {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}

.console {
  background-color: black;
  color: white !important;
  /* border: 1px solid #ff0000; */
  padding: 20px;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  border-radius: 5px;
  margin: 5px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
}

.desktop-icons {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.desktop-icons-2 {
  position: absolute;
  top: 15%;
  right: 1.1%;
  display: flex;
  justify-content: left;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.desktop-icons-3 {
  position: absolute;
  top: 30%;
  left: 2%;
  display: flex;
  justify-content: left;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin: 12px;
  height: 120px;
  background-size: contain;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  max-width: calc(25% - 20px); /* 20px = combined margin of two items */
}

.trash-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;

  border: 1px solid #292c37;
}

.trash-icon p {
  margin-top: 20px;
  margin-left: 20px;
}
.trash-icon:hover {
  background-color: #292c37;
}
.iframe {
  width: 600px;
  height: 600px;
}

.desktop-icon img {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}
.social-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.about-text {
  max-height: 300px; /* set a maximum height for the card */
  overflow-y: scroll; /* enable vertical scrolling */
  padding: 10px; /* add some padding to the text */
  font-size: 14px; /* adjust the font size */
  line-height: 1.5; /* adjust the line height */
  text-align: justify; /* justify the text */
}

.about-text {
  overflow: auto;
  max-height: 500px;
  padding: 30px !important;
}

.about-text h4 {
  margin-top: 20px;
}

.about-text {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

.roadmap-text {
  max-height: 500px;
  overflow-y: auto;
  padding: 30px !important;
}

/* .social-buttons v-btn {
  margin: 0 8px;
} */

.desktop-icon p {
  margin: 0;
}

.sacrifice {
  animation: fadeIn 1.5s ease-in-out;
  width: 900px; /* set width to 80% of viewport width */
  height: 500px; /* set height to 60% of viewport height */
  background: #000;
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

.v-img {
  animation: fadeIn 1.5s ease-in-out;
  max-width: 100%;
  max-height: 100%;
}

.jrpg-box {
  background-color: #2b3d4f;
  border: 5px solid #d7ccc8;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  height: 150px;
  padding: 10px;
  position: absolute;
  width: 300px;

  bottom: 30px !important;
}

.jrpg-box-1 {
  background-color: #2c5176;
  border: 5px solid #f3efee;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  height: 100px;
  padding: 10px;
  position: absolute;
  top: 70%;
  left: 30%;
  width: 350px;
  opacity: 80%;
}

.jrpg-box-1::before {
  border-right: 25px solid #f3efee;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  content: "";
  height: 0;
  position: absolute;
  left: -25px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
}

.jrpg-box-2 {
  animation: fadeIn 1.5s ease-in-out;
  background-color: #2c5176;
  border: 5px solid #f3efee;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  height: 100px;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 30%;
  width: 350px;
  opacity: 80%;
}

.jrpg-box-2 .img {
  animation: fadeIn 1.5s ease-in-out;
}

.jrpg-box-2::before {
  border-left: 25px solid #f3efee;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  content: "";
  height: 0;
  position: absolute;
  right: -25px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
}

.jrpg-box-3 {
  /* animation: fadeIn 1.5s ease-in-out; */
  background-color: #2c5176;
  border: 5px solid #f3efee;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  height: 60px;
  padding: 10px;
  position: absolute;
  top: 80%;
  left: 30%;
  width: 350px;
  opacity: 80%;
  z-index: 9999;
}

.jrpg-box::before {
  border-bottom: 25px solid #d7ccc8;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  content: "";
  height: 0;
  position: absolute;
  top: -25px;
  width: 0;
}

.jrpg-text {
  color: #ffffff;
  font-family: "Press Start 2P", cursive;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
  width: 100%;
  height: 100%;
}

.jrpg-button {
  animation: fadeIn 0.5s ease-in-out;
  background-color: #d7ccc8;

  border-radius: 5px;
  color: #2b3d4f;
  font-family: "Press Start 2P", cursive;
  font-size: 16px;
  padding: 10px;
  position: absolute;
  border: 1px solid wheat;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}

.jrpg-button:hover {
  background-color: #a29a97;
}

.jrpg-button:disabled {
  display: none;
}
.bidBtn {
  margin-left: 10px;
  margin-right: 10px;
}

.bidButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#progress-bar-container {
  width: 100%;
  height: 20px;
  background-color: gray;
}

#progress-bar {
  width: 0%;
  height: 100%;
  background-color: blue;
}

.showError {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin: 0 auto;
  overflow: auto;
  border: 5px solid white;
}
</style>
