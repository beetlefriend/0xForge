<template>
  <div class="wallet-connect-overlay" v-if="!walletConnected">
    <div class="wallet-connect-content-wrapper">
      <div class="wallet-connect-overlay-content">
        <h1 class="wallet-connect-overlay-header">Welcome to 0xForge</h1>
        <p class="wallet-connect-overlay-text">
          To interact with the application, please connect your wallet
        </p>
        <button class="wallet-connect-overlay-button" @click="connectWallet">
          Connect Now
        </button>
      </div>
      <div class="social-links">
        <a
          href="https://twitter.com/your_twitter"
          target="_blank"
          class="social-link"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
            alt="Twitter"
            class="social-icon"
          />
        </a>
        <a
          href="https://t.me/your_telegram"
          target="_blank"
          class="social-link"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
            alt="Telegram"
            class="social-icon"
          />
        </a>
        <a
          href="https://dexscreener.com/your_link"
          target="_blank"
          class="social-link"
        >
          <img
            src="https://bubblemaps.io/img/dexscreener.322a5a2d.png"
            alt="Dexscreener"
            class="social-icon"
          />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
/* global ethereum */
export default {
  data() {
    return {
      walletConnected: false,
    };
  },
  methods: {
    async connectWallet() {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        this.walletConnected = true;
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    },
  },
  mounted() {
    if (window.ethereum) {
      this.walletConnected = window.ethereum.isConnected();
    }
  },
};
</script>

<style>
.wallet-connect-overlay
  .wallet-connect-content-wrapper
  .wallet-connect-overlay-content
  .wallet-connect-overlay-header,
.wallet-connect-overlay
  .wallet-connect-content-wrapper
  .wallet-connect-overlay-content
  .wallet-connect-overlay-text,
.wallet-connect-overlay
  .wallet-connect-content-wrapper
  .wallet-connect-overlay-content
  .wallet-connect-overlay-button {
  color: white !important;
}

.wallet-connect-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgba(10, 10, 10, 0);
  padding: 20px;
  border-radius: 10px;
}
.wallet-connect-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;

  background: linear-gradient(315deg, #0b3d91 0%, #ac32e4 50%, #ff0000 100%);
  background-size: 200% 200%;
  animation: gradient 10s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  backdrop-filter: blur(5px);
  z-index: 1000;
}

.wallet-connect-overlay-content {
  background-color: rgba(10, 10, 10, 0.95);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  text-align: center;
  animation: fadeIn 1s ease-in-out;
}

.wallet-connect-overlay-header,
.wallet-connect-overlay-text {
  color: #f0f0f0;
  text-shadow: 0 0 10px #ff0000;
}

.wallet-connect-overlay-header {
  margin-bottom: 10px;
}

.wallet-connect-overlay-text {
  margin-bottom: 20px;
}

.wallet-connect-overlay-button {
  padding: 15px 30px;
  background-color: #ac32e4;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 0 10px #ff0000;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.wallet-connect-overlay-button:hover {
  background-color: #9013fe;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.social-links {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.social-link {
  margin: 0 10px;
}

.social-icon {
  border-radius: 50%;
  width: 32px;
  height: 32px;
}
</style>
