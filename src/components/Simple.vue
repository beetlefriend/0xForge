<template>
  <div class="main-container">
    <div class="container">
      <div class="logo-container">
        <img class="logo" src="../assets/logo.png" />
      </div>
      <div class="button-container">
        <a href="https://twitter.com/yeet_dao">
          <button class="button">
            <img src="../assets/twitter.png" />
          </button>
        </a>
        <a href="https://t.me/yeet_dao">
          <button class="button">
            <img src="../assets/telegram.png" />
          </button>
        </a>
        <a
          href="https://dexscreener.com/ethereum/0x599cda43cc0e26030c714617d6a6b300fee16586"
        >
          <button class="button">
            <img src="../assets/dextools.png" />
          </button>
        </a>
      </div>
      <br />
      <h1 style="margin-top: 30px; font-family: Tahoma, sans-serif">
        Coming soon...
      </h1>
      <div class="arrow-container" @click="scrollToNextSection">
        <v-btn icon>
          <v-icon x-large>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </div>

    <section class="pong-container">
      <iframe
        v-if="showIframe"
        class="iframe"
        src="https://jcw87.github.io/c2-smb1/"
      ></iframe>
      <div v-else class="iframe-container"></div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Simple extends Vue {
  private showIframe = false;

  private scrollToNextSection() {
    const nextSection = document.querySelector(".pong-container");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  private mounted() {
    // Show the arrow button initially
    this.showIframe = false;

    // Hide the arrow button when the user has scrolled down to the iframe section
    window.addEventListener("scroll", this.handleScroll);
  }

  private beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  private handleScroll() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const iframeSection = document.querySelector(
      ".pong-container"
    ) as HTMLElement;
    const threshold = iframeSection.offsetTop - window.innerHeight;

    if (scrollPosition > threshold) {
      this.showIframe = true;
      window.removeEventListener("scroll", this.handleScroll);
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
}

.arrow-container {
  margin-top: 50px;
  z-index: 1;
}

.logo {
  max-width: 45%;
  height: auto;
  animation: zoom 2s ease-in-out infinite;
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
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
  width: 80px;
  height: 80px;
}

@media (min-width: 600px) {
  .logo {
    max-width: 35%;
  }

  .button img {
    width: 60px;
    height: 60px;
  }
}

.pong-container {
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 0;
}

.iframe-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
