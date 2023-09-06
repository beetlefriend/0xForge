<template>
  <div class="jackjack">
    <div class="overlay"></div>
    <v-select
      v-model="selectedSection"
      @change="scrollTo(selectedSection)"
      :items="['home', 'tokenomics', 'about', 'links', 'uniswap', 'contract']"
      label="Select section"
      class="dropdown-button"
      color="dark"
    />
    <div class="app-bar">
      <div class="button-group">
        <button class="centered-button" @click="scrollTo('home')">Home</button>
        <button class="centered-button" @click="scrollTo('tokenomics')">
          Tokenomics
        </button>
        <button class="centered-button" @click="scrollTo('about')">
          About
        </button>
        <button class="centered-button" @click="scrollTo('links')">
          Links
        </button>
        <button class="centered-button" @click="scrollTo('uniswap')">
          Uniswap
        </button>
        <button class="centered-button" @click="scrollTo('contract')">
          Contract
        </button>
      </div>
    </div>

    <div class="content">
      <div id="home" class="card-container">
        <v-card
          class="centered-card"
          width="1000"
          color="transparent"
          elevation="0"
        >
          <img src="../imgs/t6rCGIx.gif" width="600px" />
        </v-card>
      </div>

      <div id="tokenomics" class="card-container">
        <v-card
          class="centered-card"
          width="550"
          color=""
          elevation="0"
          rounded="xl"
          style="padding: 60px"
        >
          <h2>Tokenomics</h2>
          <br />
          <p>0 / 0 tax</p>
          <br />
          <p>3 333 333 333 supply</p>
          <br />
          <p>4% of tokens for team, 5% for marketing</p>
          <br />
          <p>91% for public</p>
        </v-card>
      </div>

      <div id="about" class="card-container">
        <v-card
          class="centered-card"
          width="750"
          color=""
          elevation="0"
          rounded="xl"
          style="padding: 60px"
        >
          <h2>About</h2>
          <br />
          <h3 style="">
            JackJCKjACKJaCkJaackJACKJACkJAcKJaCKjACKJaCkJacKjAcK
            JackJackJACKJACKjACKJaCkJaJaackJACKJACkJAcKJaCKCKjACKJaCkJajACKJaCkJacKjAcK
            JackJackJACKJACkCKjACKJaCkJaJAcKJaCKjACkJAcKJaCKjACKJaCkJacKjAcK
            JackJCKjACKJaCkJaackackJACKJACKjACKJaCkJaJaackJACKJACkJAcKJaCKCKjACKJaCkJajACKJaCkJacKjAcK
            JackJackJACKJACkCKjACKJaCkJaJAcKJaCKjACkJAcKJaCKjACKJaCkJacKjAcK
            JackJCKjACKJaCkJaackJACKJACkJAcKJaCKCKjACKJaCkJajACKJaCkJacKjAcKACKJaCkJaJAcKJaCKjACKJaCkJacKjAcK
            JackJackJACKJACkJAcKJaCKjACKJaCkJacKjAcKKjAcK
          </h3>
          <br />
        </v-card>
      </div>

      <div id="links" class="card-container">
        <v-card
          class="centered-card"
          width="550"
          color=""
          elevation="0"
          rounded="xl"
          style="padding: 60px"
        >
          <!-- <h2>Links</h2> -->
          <p>
            Twitter:
            <a href="https://twitter.com/_jackjackcoin_"
              >https://twitter.com/_jackjackcoin_</a
            >
          </p>
          <p>
            Telegram:
            <a href="https://t.me/JackJackJoin">https://t.me/JackJackJoin</a>
          </p>
          <p>
            Dextools:
            <a
              href="https://www.dextools.io/app/en/ether/pair-explorer/0x32723dee7cef3f055484f70ecdbb735d744c1ea3"
            >
              https://www.dextools.io/app/en/ether/pair-explorer/0x32723dee7cef3f055484f70ecdbb735d744c1ea3
            </a>
          </p>
          <!-- <p>Your mom:</p>
          <p>Meme files:</p> -->
        </v-card>
      </div>

      <div id="uniswap" class="card-container">
        <v-card
          class="centered-card"
          color="transparent"
          width="550"
          elevation="0"
          rounded="xl"
          style="padding: 60px"
        >
          <iframe
            src="https://app.uniswap.org/#/swap?outputCurrency=0xf8616df6de357dfaf3bf0c048d43564b11c9a6b2"
            frameborder="0"
            style="width: 100%; height: 500px"
          ></iframe>
        </v-card>
      </div>

      <div
        id="contract"
        class="card-container"
        width="550"
        color=""
        elevation="0"
        rounded
      >
        <v-card class="centered-card">
          <p>
            <a
              href="https://etherscan.io/token/0xf8616df6de357dfaf3bf0c048d43564b11c9a6b2"
              >0xf8616df6de357dfaf3bf0c048d43564b11c9a6b2</a
            >
          </p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { VSelect } from "vuetify/lib";
export default {
  data() {
    return {
      loremIpsum:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mollis diam, ut dapibus nisi iaculis sed. Nulla facilisi. Vivamus ut dapibus lectus.",
      selectedSection: "",
      audio: new Audio(require("@/assets/[() ().mp3")), // Replace with the path to your audio file
    };
  },
  methods: {
    scrollTo(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    playAudio() {
      this.audio.play();
    },
  },
  components: {
    VSelect,
  },
};
</script>

<style scoped>
.dropdown-button {
  display: none;
  margin: 0 auto;
  padding: 10px;
  border: 2px solid #888;
  border-radius: 5px;
  width: 80%;
  text-align: center;
  background-color: #333;
  color: #fff;
  transition: background-color 0.3s ease;
  margin-top: 20px !important;
}

.dropdown-button:hover {
  background-color: #555;
}

@media only screen and (max-width: 600px) {
  .dropdown-button {
    display: block;
  }

  .button-group {
    display: none;
  }
}

.jackjack {
  position: relative;
  background-image: url("../imgs/org.gif");
  background-repeat: repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Adjust the opacity and color as desired */
  backdrop-filter: blur(3px); /* Adjust the blur radius as desired */
  z-index: 0;
  pointer-events: none; /* Add this line to exclude overlay from capturing pointer events */
}

.app-bar {
  background-color: transparent;
  position: fixed;
  top: 0;
  margin-top: 10px;
  left: 0;
  right: 0;
  height: 60px;
}

.button-group {
  display: flex;
  justify-content: center;
}

.centered-button {
  margin: 0 30px;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.centered-card {
  width: 400px;
  padding: 20px;
  text-align: center;
  /* background-color: white; */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filler-content {
  padding: 20px;
  margin-bottom: 20px;
}

.dropdown-button {
  display: none;
  margin: 0 auto;
  padding: 10px;
}

@media only screen and (max-width: 900px) {
  .dropdown-button {
    display: block;
  }

  .button-group {
    display: none;
  }
  .jackjack {
    height: auto;
  }

  .app-bar {
    flex-wrap: wrap;
    height: auto;
  }

  .button-group {
    flex-direction: column;
    align-items: center;
  }

  .centered-button {
    margin: 10px 0;
  }

  .content {
    padding: 0;
  }

  /* .card-container {
    height: auto;
    margin-bottom: 20px;
  } */

  .centered-card {
    width: 450px !important; /* Adjust based on your preference */
    margin: 0 auto 20px auto;
  }

  /* Add a bit more margin to the card container for space between sections */
  .card-container {
    margin: 40px;
  }

  /* Make the home image smaller */
  #home .centered-card img {
    width: 100%; /* Adjust based on your preference */
  }

  .dropdown-button {
    display: block;
  }

  .button-group {
    display: none;
  }
}
</style>
