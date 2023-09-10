<template>
  <div>
    <div id="app" v-if="!closed && isDesktop">
      <!--  && !showIntro-->
      <div class="container"></div>

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

        <template v-else-if="window.id === 6"> </template>

        <template v-else-if="window.id === 5"> </template>
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
            src="../assets/logo-2.png"
            alt="Logo"
            width="30px"
            style="margin: 4px"
          />
        </template>
        <template #clock>
          <Clock />
        </template>
      </Taskbar>
      <!-- <div class="add-window" @click="addNewWindow"><v-btn> + </v-btn></div> -->
    </div>

    <div v-else-if="!isDesktop" class="mobile-message">
      <div class="console">
        <p>This site does not work with portable devices</p>
      </div>
    </div>

    <!-- <div v-else-if="isDesktop && showIntro">
      <div class="bootup-screen" v-if="!playvideo" @click="playvideo = true">
        <h1>Welcome to YEET OS</h1>
        <p>Press any key to continue...</p>
      </div>

      <div v-else>
        <div id="intro-video">
          <IntroVideo @videoEnded="onVideoEnded"> </IntroVideo>
        </div>
      </div>
    </div>

    <div class="shutdown-screen" v-else>
      <img src="@/assets/windows98bluescreen.jpg" />
    </div> -->
  </div>
</template>

<script>
// import watch from "vue";
import { mapState, mapMutations, mapActions } from "vuex";
import watch from "vue";
import Window from "./Window.vue";
import Taskbar from "./Taskbar.vue";
import Clock from "./Clock.vue";

// import IntroVideo from "./IntroVideo.vue";

import staking from "../hardhatabi/sepiola_staking.json";
import yeet from "../hardhatabi/sepiola_mock.json";
import auction from "../hardhatabi/sepiola_auction.json";

import web3 from "web3";

// import CryptoStaking from "./Staking.vue";

import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import TokenDeployer from "./TokenDeployer.vue";
// import CollectingGame from "./CollectingGame.vue";

export default {
  data() {
    return {
      showError: false,
      showAuctionError: false,
      errorMessage: "",
      auctionerrorMessage: "",
      approvalError: false,
      player: null,
      playlistItems: null,
      closed: false,
      isDesktop: true,
      showAbout: true,
      showRoadpmap: false,
      showIntro: true,
      aboutpass: "",
      roadpass: "",
      tokenpass: "",
      playvideo: false,
      showTokenomics: true,
      showTokenIncorrect: false,
      showAboutIncorrect: false,
      showRoadIncorrect: false,
      firstTimeRecycle: true,
      walletConnected: false,
      connectedAccount: "",
      provider: {},
      signer: {},
      yeetBid: 0,
      network: "",
      jrpg: [
        "Todayy im playink wit min onlin frens on da compootr :3",
        "...  I wnder wat remilio-kun r doing rait naow ",
        "Oh.. looks liek shitkoin seasn going stronk..   We kent let dem do dat..",
        "its taim to activaet mass-rug.exe hehehe",
        "...",
        "Not on my watch.",
        "",
        "",
        "Hmm... Now what to do with these two?",
        "Oh,  I know.",
        "",
        "Lets yeet 'em",
      ],
      jrpgnum: 0,
      jrpgready: false,
      isApproved: false,
      stakingContract: null,
      yeetCoinContract: null,
      auctionContract: null,
      allowance: null,
      stakedBalance: null,
      availableBalance: null,
      showTxPending: false,
      amount: 0,
      AuctionLive: false,
      highestBid: 0,
      nftAddress: "",
      previousAuctionId: 0,
      auctionStartingTime: null,
      auctionEndingTime: null,
      entryPrice: null,
      selectedTheme: localStorage.getItem("selectedTheme") || "existing",
      bgImageUrl: localStorage.getItem("bgImageUrl") || "",
    };
  },

  created() {
    this.changeTheme(this.selectedTheme);
    this.changeBackgroundImage(this.bgImageUrl);
  },
  mounted() {
    // Create an array of image sources
    document.addEventListener("keydown", this.handleKeyDown);
    this.checkDevice();

    window.ethereum.on("accountsChanged", (accounts) => {
      console.log("accounts changed");
      this.connectedAccount = accounts[0];
      this.updateBalances();
    });
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
    // IntroVideo,
    // CollectingGame,
  },
  computed: {
    ...mapState(["windows"]),
  },
  methods: {
    changeTheme(theme) {
      if (theme === "light") {
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
      } else if (theme === "solarizedDark") {
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
      } else if (this.selectedTheme === "oceanBlue") {
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
      } else {
        document.documentElement.style.setProperty("--bg-color", "#3f4455");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
        document.documentElement.style.setProperty(
          "--component-bg-color",
          "#292c37"
        );
        document.documentElement.style.setProperty("--border-color", "#282b36");
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
      }
      localStorage.setItem("selectedTheme", theme);
    },
    changeBackgroundImage(url) {
      document.documentElement.style.setProperty("--bg-image", `url(${url})`);
      localStorage.setItem("bgImageUrl", url);
    },

    async connectWallet() {
      console.log("Connecting to wallet...");
      // this.loading = true;

      /*     this.changeNetwork(); */

      [this.connectedAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(this.provider);
      if (this.connectedAccount != "") {
        this.signer = await this.provider.getSigner();

        await this.loadContracts();
        // await this.updateBalances();
        // this.listContractFunctions(this.yeetCoinContract);

        this.showNotConnected = false;
        await this.provider.getNetwork().then((network) => {
          console.log(network);
          this.network = network.name;
        });

        await this.updateBalances();

        // await this.getContactInfo();
      } else {
        this.walletConnected = false;
      }
      this.walletConnected = true;
      // await this.getContactInfo().then(() => {
      //   this.walletConnected = true;
      // });
      // this.loading = false;
    },
    formatErrorMessage(error) {
      if (typeof error === "string") {
        const reasonIndex = error.indexOf('reason="');
        if (reasonIndex !== -1) {
          const reasonStartIndex = reasonIndex + 'reason="'.length;
          const reasonEndIndex = error.indexOf('"', reasonStartIndex);
          if (reasonEndIndex !== -1) {
            return error.substring(reasonStartIndex, reasonEndIndex);
          }
        }
        return error;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        if ("reason" in error) {
          return error.reason;
        }
        return error.message;
      } else {
        return "Unknown error";
      }
    },

    async updateBalances() {
      if (this.connectedAccount) {
        this.allowance = await this.getAllowance();
        this.stakedBalance = await this.getStakedBalance();
        this.availableBalance = await this.getAvailableBalance();
        this.amount = this.availableBalance;
        this.yeetBid = this.stakedBalance;
      }
    },

    async getAllowance() {
      const allowance = await this.yeetCoinContract.allowance(
        this.connectedAccount,
        this.stakingContract.address
      );
      const decimals = await this.getTokenDecimals();
      return this.fromSmallestUnit(allowance, decimals);
      // return allowance;
    },

    async approveTokens(amountToApprove) {
      try {
        // Estimate the gas needed for the transaction
        const gasEstimate = await this.yeetCoinContract.estimateGas.approve(
          this.stakingContract.address,
          amountToApprove
        );

        // Increase the gas estimate by 20%
        const gasLimit = gasEstimate.mul(120).div(100);

        // Execute the transaction with the increased gas limit
        const approvalTx = await this.yeetCoinContract.approve(
          this.stakingContract.address,
          amountToApprove,
          {
            gasLimit: gasLimit,
          }
        );
        this.showTxPending = true;
        await approvalTx.wait();
        this.updateBalances();
        this.updateAuction();
        this.showTxPending = false;
        this.approvalError = false;
      } catch (error) {
        console.log("error:", typeof error);

        console.error("Error during approval:", error);
        this.showError = true;
        this.errorMessage = this.formatErrorMessage(error);
      }
    },

    async getStakedBalance() {
      const stakedBalance = await this.stakingContract.balanceOf(
        this.connectedAccount
      );
      const decimals = await this.getTokenDecimals();

      return this.fromSmallestUnit(stakedBalance, decimals);
    },

    async getAvailableBalance() {
      const availableBalance = await this.yeetCoinContract.balanceOf(
        this.connectedAccount
      );
      const decimals = await this.getTokenDecimals();
      return this.fromSmallestUnit(availableBalance, decimals);
    },

    async stakeTokens(amountToStake) {
      const al = this.getAllowance();

      if (amountToStake > al) {
        this.errorMessage =
          "You cannot stake more than you have approved, approve more?";
        this.approvalError = true;
        this.showError = true;
        return;
      }

      // Get the token's number of decimals
      const tokenDecimals = await this.getTokenDecimals();

      // Convert the amount to the smallest unit of the token
      const smallestUnitAmount = this.toSmallestUnit(
        amountToStake,
        tokenDecimals
      );

      console.log(smallestUnitAmount);
      const data = this.stakingContract.interface.encodeFunctionData(
        "deposit",
        [smallestUnitAmount]
      );
      console.log(data);

      // Create a new instance of the contract function connected to the provider
      // const contractWithProvider = this.stakingContract.connect(this.provider);
      try {
        // Estimate the gas limit
        const estimatedGasLimit = await this.provider.estimateGas({
          from: this.connectedAccount,
          to: this.stakingContract.address,
          value: 0,
          data: this.stakingContract.interface.encodeFunctionData("deposit", [
            smallestUnitAmount,
          ]),
        });

        // Add 20% to the estimated gas limit
        const increasedGasLimit = estimatedGasLimit.mul(120).div(100);

        // Call the function with the signer and the increased gas limit
        const stakeTx = await this.stakingContract.deposit(smallestUnitAmount, {
          gasLimit: increasedGasLimit,
        });

        this.showTxPending = true;
        await stakeTx.wait();
        this.showTxPending = false;

        this.updateBalances();
        this.errorMessage = "";
      } catch (error) {
        console.log("error:", typeof error);
        this.errorMessage = this.formatErrorMessage(error);
        this.showError = true;
      }
    },
    async unstakeTokens(amountToUnstake) {
      if (amountToUnstake > this.stakedBalance) {
        this.errorMessage = "You cannot unstake more yeet than you have staked";
        this.showError = true;
        return;
      }
      // const contractWithProvider = this.stakingContract.connect(this.provider);
      const tokenDecimals = await this.getTokenDecimals();
      const smallestUnitAmount = this.toSmallestUnit(
        amountToUnstake,
        tokenDecimals
      );

      try {
        const estimatedGasLimit = await this.provider.estimateGas({
          from: this.connectedAccount,
          to: this.stakingContract.address,
          value: 0,
          data: this.stakingContract.interface.encodeFunctionData("withdraw", [
            amountToUnstake,
          ]),
        });
        const increasedGasLimit = estimatedGasLimit.mul(120).div(100);
        const unstakeTx = await this.stakingContract.withdraw(
          smallestUnitAmount,
          {
            gasLimit: increasedGasLimit,
          }
        );
        this.showTxPending = true;
        await unstakeTx.wait();
        this.showTxPending = false;
        this.updateBalances();
      } catch (error) {
        console.log("error:", typeof error);
        this.errorMessage = this.formatErrorMessage(error);
        this.showError = true;
      }
    },

    async getTokenDecimals() {
      const decimals = await this.yeetCoinContract.decimals();
      return decimals;
    },

    fromSmallestUnit(balance, decimals) {
      return balance.div(ethers.BigNumber.from(10).pow(decimals));
    },

    // toSmallestUnit(amountToConvert, tokenDecimals) {
    //   const base = ethers.BigNumber.from(10).pow(tokenDecimals);
    //   return ethers.utils
    //     .parseUnits(amountToConvert.toString(), tokenDecimals)
    //     .mul(base);
    // },

    toSmallestUnit(amountToConvert, tokenDecimals) {
      return ethers.BigNumber.from(amountToConvert).mul(
        ethers.BigNumber.from(10).pow(tokenDecimals)
      );
    },

    async hasPaidEntrance(auctionId, address) {
      try {
        const paid = await this.auctionContract.hasPaidEntrance(
          auctionId,
          address
        );
        console.log("Has paid entrance:", paid);
        return paid;
      } catch (error) {
        console.error("Error checking entrance payment:", error);
      }
    },

    async isAuctionLive(auctionId) {
      try {
        const live = await this.auctionContract.isAuctionLive(auctionId);
        console.log("Is auction live:", live);
        return live;
      } catch (error) {
        console.error("Error checking auction status:", error);
      }
    },

    async placeBid(auctionId, amount) {
      await this.updateAuction();
      try {
        // Check if the wallet is connected
        if (!this.walletConnected) {
          console.log("Wallet not connected");
          return;
        }
        if (amount < this.highestBid) {
          this.showAuctionError = true;
          this.auctionerrorMessage =
            "Your bid is lower than the current top bid";
          return;
        }
        if (amount - this.entryPrice < 0) {
          this.showAuctionError = true;
          this.auctionerrorMessage = "Your bid does not cover the entry price";
          return;
        }

        const tokenDecimals = await this.getTokenDecimals();
        const newAmount = this.toSmallestUnit(amount, tokenDecimals);

        // console.log(newAmount)

        // const data = this.auctionContract.interface.encodeFunctionData("bid", [
        //   auctionId,
        //   amount,
        // ]);

        // console.log(data);

        // Call the contract's `bid` function to place a bid and pay the entrance fee if not paid yet
        const estimatedGasLimit = await this.provider.estimateGas({
          from: this.connectedAccount,
          to: this.auctionContract.address,
          value: 0,
          data: this.auctionContract.interface.encodeFunctionData("bid", [
            auctionId,
            newAmount,
          ]),
        });
        const increasedGasLimit = estimatedGasLimit.mul(120).div(100);

        const receipt = await this.auctionContract.bid(auctionId, newAmount, {
          gasLimit: increasedGasLimit,
        });
        // Wait for the transaction to be mined
        console.log("Transaction receipt:", receipt);
      } catch (error) {
        console.error("Error placing bid:", error);
        this.showAuctionError = true;
        this.auctionerrorMessage = this.formatErrorMessage(error);
      }
    },

    // async bid(auctionId, amount) {
    //   try {
    //     const tx = await this.auctionContract.bid(auctionId, amount);
    //     await tx.wait();
    //     console.log("Bid placed successfully");
    //     this.updateAuction();
    //   } catch (error) {
    //     console.error("Error placing bid:", error);
    //   }
    // },

    async getHighestBid(auctionId) {
      try {
        const bid = await this.auctionContract.bids(auctionId);
        const bidAmount = bid.amount;
        const decimals = 18; // Assuming the token has 18 decimals
        const readableBidAmount = this.fromSmallestUnit(bidAmount, decimals);
        return readableBidAmount.toString();
      } catch (error) {
        console.error("Error getting highest bid:", error);
      }
    },

    async getAuctionDetails(auctionId) {
      try {
        const auction = await this.auctionContract.auctions(auctionId);
        return {
          nftAddress: auction.nftAddress,
          tokenId: auction.tokenId.toString(),
          startingTime: auction.startingTime.toString(),
          endingTime: auction.endingTime.toString(),
          entryPrice: auction.entryPrice.toString(),
        };
      } catch (error) {
        console.error("Error getting auction details:", error);
      }
    },

    async updateAuction() {
      this.AuctionLive = await this.isAuctionLive();
      if (this.AuctionLive) {
        const latestId = await this.latestAuctionId();
        const highestBid = await this.getHighestBid(latestId);
        const auctionDetails = await this.getAuctionDetails(latestId);
        this.highestBid = highestBid;
        this.nftAddress = auctionDetails.nftAddress;
        this.startingTime = auctionDetails.startingTime;
        this.endingTime = auctionDetails.endingTime;
        this.entryPrice = auctionDetails.entryPrice;
      } else {
        this.previousAuctionId = await this.latestAuctionId();
      }
    },

    yeetBidfn(bid) {
      let currentBid = parseFloat(this.yeetBid);
      bid = parseFloat(bid);

      currentBid = currentBid + bid;

      this.yeetBid = currentBid.toFixed(4); // or however many decimal places you want
    },

    onVideoEnded() {
      this.showIntro = false;
      this.playvideo = false;
    },
    // playIntroVideo() {
    //   this.playvideo = true;
    // },
    // hideBootupScreen() {
    //   this.playIntroVideo();
    // },
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

    checkAboutpass() {
      const hashedInput = CryptoJS.SHA256(this.aboutpass).toString(
        CryptoJS.enc.Hex
      );
      console.log(hashedInput);
      const hashedPassword =
        "ed4eb561259d67d2acae80454db6878f1a4d72b6e4cb8da9c02883f34e4f50bc"; // The hashed value of "godtierdev0000"

      if (hashedInput === hashedPassword) {
        this.showAbout = true;
      } else {
        this.showAboutIncorrect = true;
      }
    },

    checkTokenpass() {
      const hashedInput = CryptoJS.SHA256(this.tokenpass).toString(
        CryptoJS.enc.Hex
      );
      const hashedPassword =
        "f248c55b34d30b74cd78088ce1c978f01c9d3698dc388ca0e7d36796427f3597"; // The hashed value of "miladypassword1337"

      if (hashedInput === hashedPassword) {
        this.showTokenomics = true;
      } else {
        this.showTokenIncorrect = true;
      }
    },

    async loadContracts() {
      this.stakingContract = new ethers.Contract(
        staking.address,
        staking.abi,
        this.signer
      );
      this.yeetCoinContract = new ethers.Contract(
        yeet.address,
        yeet.abi,
        this.signer
      );

      this.auctionContract = new ethers.Contract(
        auction.address,
        auction.abi,
        this.signer
      );
    },

    listContractFunctions(contractInstance) {
      const contractFunctions = contractInstance.interface.fragments.filter(
        (fragment) => fragment.type === "function"
      );

      console.log("Contract functions:");
      contractFunctions.forEach((func) => {
        console.log(func.name);
      });
    },

    checkRoadpass() {
      const hashedInput = CryptoJS.SHA256(this.roadpass).toString(
        CryptoJS.enc.Hex
      );
      const hashedPassword =
        "441b7681786fefcf0b41c3952a0ffecb1221315407a031f61d145ae99dbe9bf7"; // The hashed value of "69420"

      if (hashedInput === hashedPassword) {
        this.showRoadmap = true;
      } else {
        this.showRoadIncorrect = true;
      }
    },
    handleKeyDown(event) {
      // this.hideBootupScreen();
      // if (event.keyCode === 27) {
      //   this.closed = false;
      // }
    },
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

    loadImages() {
      const imageSources = [
        require("@/assets/jrpg/1.png"),
        require("@/assets/jrpg/2.png"),
        require("@/assets/jrpg/3.png"),
        require("@/assets/jrpg/4.png"),
        require("@/assets/jrpg/yeet_1.webp"),
        require("@/assets/jrpg/yeet_2.webp"),
        require("@/assets/jrpg/fin.webp"),
        require("@/assets/jrpg/letsyeet.webp"),
        require("@/assets/jrpg/package.webp"),
      ];

      let images = [];
      let imagesLoaded = 0;

      // Get the progress bar element
      // const progressBar = document.getElementById("progress-bar");

      // Preload images into the browser's cache
      for (let i = 0; i < imageSources.length; i++) {
        images[i] = new Image();
        images[i].onload = () => {
          imagesLoaded++;
          // progressBar.style.width = `${
          //   (imagesLoaded / imageSources.length) * 100
          // }%`;
          console.log(this.jrpgready);
          if (imagesLoaded === imageSources.length) {
            // All images have been loaded
            this.jrpgready = true;
            console.log(this.jrpgready);
            console.log("All images have been loaded!");
          }
        };
        images[i].src = imageSources[i];
      }
    },

    openBin() {
      this.jrpgnum = 0;
      this.loadImages();
      this.$store.dispatch("openWindow", {
        id: 14,
      });
    },
    continueBtn() {
      this.jrpgnum += 1;
      var button = document.querySelector(".jrpg-button");

      // Disable the button for 1 second
      button.disabled = true;
      setTimeout(function () {
        button.disabled = false;
      }, 1000);
    },

    openZeroaddr() {
      // this.$store.dispatch("openWindow", {
      //   id: 11,
      // });
      window.open(
        "https://etherscan.io/address/0x000000000000000000000000000000000000dead",
        "_blank"
      );
    },

    openOsOne() {
      // this.$store.dispatch("openWindow", {
      //   id: 11,
      // });
      window.open(
        "https://blur.io/asset/0x5af0d9827e0c53e4799bb226655a1de152a425a5/2575",
        "_blank"
      );
    },
    openOsTwo() {
      // this.$store.dispatch("openWindow", {
      //   id: 12,
      // });
      window.open(
        "https://blur.io/asset/0x32bb5a147b5371fd901aa4a72b7f82c58a87e36d/1100",
        "_blank"
      );
    },
    openOsThree() {
      // this.$store.dispatch("openWindow", {
      //   id: 13,
      // });
      window.open(
        "https://blur.io/asset/0xd3d9ddd0cf0a5f0bfb8f7fceae075df687eaebab/6791",
        "_blank"
      );
    },
    openOsFour() {
      window.open(
        "https://blur.io/asset/0xf729f878f95548bc7f14b127c96089cf121505f8/115",
        "_blank"
      );
    },

    openWinamp() {
      this.$refs.taskbar.initializeWebamp();
    },
    openSuperMario() {
      this.$store.dispatch("openWindow", {
        id: 7,
      });
    },
    openTetris() {
      this.$store.dispatch("openWindow", {
        id: 8,
      });
    },

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

    openSnake() {
      this.$store.dispatch("openWindow", {
        id: 9,
      });
    },

    openStaking() {
      this.$store.dispatch("openWindow", {
        id: 15,
      });
    },
    openAuction() {
      this.$store.dispatch("openWindow", {
        id: 16,
      });
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

#app {
  animation: fadeIn 1.5s ease-in-out;
  background-image: var(--bg-image, url("@/assets/bg.png"));
  background-size: cover;
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
  color: white;
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
