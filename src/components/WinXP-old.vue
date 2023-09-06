<template>
  <div id="app">
    <div class="container">
      <div class="desktop-icons">
        <div class="desktop-icon" @click="openPurposeWindow">
          <img width="100px" src="../assets/icon.png" />
          <p>About.txt</p>
        </div>
        <div class="desktop-icon" @click="openRoadmapWindow">
          <img width="100px" src="../assets/icon.png" />
          <p>Roadmap.txt</p>
        </div>
        <div class="desktop-icon" @click="openTokenomicsWindow">
          <img width="100px" src="../assets/icon.png" />
          <p>Tokenomics.txt</p>
        </div>
        <div class="desktop-icon" @click="openYeetWindow">
          <img width="100px" src="../assets/logo.svg" />
          <p>Yeet.png</p>
        </div>
        <div class="desktop-icon" @click="openUniswapWindow">
          <img
            width="100px"
            src="https://cryptologos.cc/logos/uniswap-uni-logo.png"
          />
          <p>Uniswap.exe</p>
        </div>
      </div>
    </div>

    <Window
      v-for="window in windows"
      :key="window.id"
      :id="window.id"
      :title="window.title"
      :style="{ left: window.x + 'px', top: window.y + 'px' }"
      :focused="window.focus"
      @focus="focusWindow"
    >
      <!-- window content here -->
      <template v-if="window.id === 1">
        <div>
          <v-card elevation="0" color="transparent">
            <v-card-text>
              Remember to follow us on twitter and telegram
            </v-card-text>
            <div class="social-buttons">
              <a href="https://twitter.com/yeet_dao">
                <v-btn rounded>
                  <v-icon>mdi-twitter</v-icon>
                </v-btn></a
              >
              <a href="https://t.me/yeet_dao">
                <v-btn rounded>
                  <img
                    src="../assets/tg.png"
                    alt="Telegram Icon"
                    width="34"
                    height="34"
                  />
                </v-btn>
              </a>
            </div>
          </v-card>
        </div>
      </template>

      <template v-else-if="window.id === 2">
        <img
          src="../assets/logo.png"
          alt="Logo"
          width="400px"
          style="padding-top: 5px"
        />
      </template>

      <template v-else-if="window.id === 3">
        <v-card width="600" color="transparent" elevation="0">
          <!-- <v-card-title>About</v-card-title> -->
          <v-card-text class="about-text">
            <!-- add your text here -->
            <h4>1. What is YEET DAO?</h4>

            <br />
            A project converging and cross-pollinating DeFi and NFT communities,
            with a strategic focus on engagement within the spheres of
            [redacted] and [redacted]. Expansion into other communities that
            share a common set of values and interests is planned for the
            future.
            <br />
            <br />
            <h4>2. Who is YEET DAO?</h4>
            <br />

            YEET DAO consists of experienced and knowledgeable team members who
            have been actively involved in the blockchain space since 2011. The
            strong backing for the DAO comes from crypto veterans with a
            profound understanding for unique and innovative projects. A deep
            dive into on-chain activity might reveal some useful information.

            <br />
            <br />
            <h4>3. Phase 1 of YEET DAO:</h4>
            <br />

            The initial milestones of the project are anchored on market
            capitalization, whereby select NFTs will be purchased, gifted and
            over time, fractionalized. The decision-making process regarding the
            selection of NFTs will be governed by stakers, who will play a
            crucial role in steering the direction of the project.
            <br />
            <br />
            <h4>4. “We like the cults”:</h4>
            <br />

            There are many communities present in the space, we want to grow and
            reward those we feel have a very strong, based culture. Many will be
            considered, few will be accepted.
            <br />
            <br />
            <h4>5. Phase 2: DAO as a nexus:</h4>
            <br />

            One of the central objectives of YEET DAO is to serve as a hub for
            communities that have traditionally been underrepresented, providing
            them with the necessary exposure and resources they need to thrive.
            To achieve this, YEET will curate panels that allow creators and
            builders to pitch their ideas to communities that have been voted on
            by token holders. This approach will enable the community to be at
            the forefront of identifying and participating in promising projects
            at an early stage.
            <br />
            <br />
            <h4>6. Looking Forward</h4>
            <br />
            Furthermore, with the upcoming NFT/Meme Bull Market, we are excited
            to explore further opportunities to support creators and builders in
            the space. Stay tuned for more updates on this exciting development.
          </v-card-text>
        </v-card>
      </template>

      <template v-else-if="window.id === 4">
        <v-card width="600" elevation="0" color="transparent">
          <v-card-text class="roadmap-text">
            <!-- add your text here -->
            <h4>Phase 1: Market Cap Based Milestones</h4>
            <br />
            For stakers:
            <br />
            10m- Giveaway [redacted]
            <br />
            11m- Giveaway [redacted]
            <br />
            12m- Giveaway [redacted]
            <br />
            13m- Giveaway [redacted]
            <br />
            14m- Giveaway [redacted]
            <br />
            15m- Giveaway [redacted]
            <br />
            <br />
            (AIRDROP/Claim activated for [redacted] and [redacted] holders)
            <br />
            <br />
            20m+ DAO Activated
            <br />
            <br />
            <h4>Phase 2: DAO Launch</h4>
            <br />
            At 20m mc, introduce DAO concept to vote on:
            <br />
            <br />
            Which NFTs to: Burn, Giveaway, Fractionalize.
            <br />
            Panels allowing for underrepresented projects to pitch to the
            community, DAO members will be the first to support and gain
            exposure to these projects via Airdrops and access to presale.
            <br />
            <br />
            <h4>Phase 3: [redacted]</h4>
          </v-card-text>
        </v-card>
      </template>

      <template v-else-if="window.id === 6">
        <iframe
          src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=0&inputCurrency=0x429acA1cCd47296483D1281c85B24e842de0b758"
          height="500"
          width="100%"
          style="
            border: 0;
            margin: 0 auto;
            margin-bottom: 0.5rem;
            display: block;
            border-radius: 10px;
            max-width: 960px;
            min-width: 500px;
          "
        />
      </template>

      <template v-else-if="window.id === 5">
        <v-card width="600" color="transparent" elevation="0">
          <v-card-text class="tokenomics-text">
            <h4>Supply:</h4>
            420,069,000
            <br />
            <br />
            <h4>Tax:</h4>
            0.69% / 0.69%
            <br />
            <br />
            <h4>Token Distribution:</h4>

            6.9% Team
            <br />
            6.9% CEX
            <br />
            23.1% Foundation
            <br />
            28% LP
            <br />
            35.1% Presale
          </v-card-text>
        </v-card>
      </template>
      <template v-else-if="window.id === 7">
        <div class="playlist-player">
          <audio controls id="audio-player">
            <source src="path/to/your/audiofile1.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div class="playlist">
            <ul id="playlist-items">
              <li data-src="path/to/your/audiofile1.mp3">Song 1</li>
              <li data-src="path/to/your/audiofile2.mp3">Song 2</li>
              <li data-src="path/to/your/audiofile3.mp3">Song 3</li>
            </ul>
          </div>
        </div>
      </template>
    </Window>
    <Taskbar :windows="windows" @focus-window="focusWindow">
      <template #logo>
        <img
          src="../assets/logo.png"
          alt="Logo"
          width="45px"
          style="padding-top: 5px"
        />
      </template>
      <template #clock>
        <Clock />
      </template>
    </Taskbar>
    <!-- <div class="add-window" @click="addNewWindow"><v-btn> + </v-btn></div> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Window from "./Window.vue";
import Taskbar from "./Taskbar.vue";
import Clock from "./Clock.vue";

export default {
  data() {
    return {
      player: null,
      playlistItems: null,
    };
  },
  mounted() {
    this.player = document.getElementById("audio-player");
    this.playlistItems = document.querySelectorAll("#playlist-items li");

    for (const item of this.playlistItems) {
      item.addEventListener("click", (e) => {
        this.playSong(e.target);
      });
    }

    this.player.addEventListener("ended", () => {
      for (let i = 0; i < this.playlistItems.length; i++) {
        if (this.playlistItems[i].classList.contains("active")) {
          let nextIndex = i + 1 < this.playlistItems.length ? i + 1 : 0;
          this.playSong(this.playlistItems[nextIndex]);
          break;
        }
      }
    });
  },
  components: {
    Window,
    Taskbar,
    Clock,
  },
  computed: {
    ...mapState(["windows"]),
  },
  methods: {
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
    // focusWindow(windowId) {

    openSocialsWindow() {
      this.$store.dispatch("openWindow", {
        id: 1,
      });
    },
    openYeetWindow() {
      this.$store.dispatch("openWindow", {
        id: 2,
      });
    },
    openPurposeWindow() {
      this.$store.dispatch("openWindow", {
        id: 3,
      });
    },
    openRoadmapWindow() {
      this.$store.dispatch("openWindow", {
        id: 4,
      });
    },
    openTokenomicsWindow() {
      this.$store.dispatch("openWindow", {
        id: 5,
      });
    },

    openUniswapWindow() {
      this.$store.dispatch("openWindow", {
        id: 6,
      });
    },

    //   this.$store.dispatch("focusWindow", windowId);
    // },
    // openWindowFromIcon(windowData) {
    //   this.$store.dispatch("createWindow", windowData);
    // },
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

.playlist-player {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.playlist {
  margin-top: 10px;
}

#playlist-items {
  list-style-type: none;
  padding: 0;
}

#playlist-items li {
  cursor: pointer;
  padding: 5px 10px;
  background-color: #212020;
  margin-bottom: 5px;
}

#playlist-items li:hover,
#playlist-items li.active {
  background-color: #4f4e4e;
}

.desktop-icon p {
  margin: 0;
}
</style>
