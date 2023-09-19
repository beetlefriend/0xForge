<template>
  <div class="token-deployer">
    <h1>TOKEN CREATION</h1>
    <label for="contract-type" class="label-style"
      >Select Contract Type:
    </label>
    <select
      id="contract-type"
      v-model="selectedContractType"
      class="theme-select"
    >
      <option value="standard">
        Standard ERC20 (No special functions, just supply)
      </option>
      <option value="taxAndSwap">
        ERC20 with Buy/Sell Tax and Automatic Swap Handling
      </option>
      <option value="mintable">
        Mintable ERC20 (Allows for the creation of new tokens)
      </option>

      <option value="capped">Capped ERC20 (Has a maximum supply limit)</option>
      <!-- Add other contract types here -->
    </select>
    <button @click="navigateToDetailsPage" class="continue-button">
      {{ showDetails ? "Back" : "Continue" }}
    </button>

    <div v-if="showDetails" class="details-section">
      <label for="name" class="label-style">Name: </label>
      <input
        id="name"
        v-model="tokenDetails.contractName"
        class="input-style"
        type="text"
      />

      <label for="ticker" class="label-style">Ticker: </label>
      <input
        id="ticker"
        v-model="tokenDetails.contractTicker"
        class="input-style"
        type="text"
      />

      <label for="total-supply" class="label-style">Total Supply: </label>
      <input
        id="total-supply"
        v-model="tokenDetails.contractSupply"
        class="input-style"
        type="number"
      />

      <label for="max-transaction-amount" class="label-style"
        >Max Transaction Amount:
      </label>
      <input
        id="max-transaction-amount"
        v-model="tokenDetails.maxTransactionAmount"
        class="input-style"
        type="number"
      />

      <label for="max-wallet" class="label-style">Max Wallet: </label>
      <input
        id="max-wallet"
        v-model="tokenDetails.maxWallet"
        class="input-style"
        type="number"
      />

      <label for="buy-tax" class="label-style">Buy Tax: </label>
      <input
        id="buy-tax"
        v-model="tokenDetails.buyTax"
        class="input-style"
        type="number"
      />

      <label for="sell-tax" class="label-style">Sell Tax: </label>
      <input
        id="sell-tax"
        v-model="tokenDetails.sellTax"
        class="input-style"
        type="number"
      />

      <div v-if="isLoading" class="loading-section">
        <img
          src="https://media0.giphy.com/media/fphXG8dDcRHVavls9o/giphy.gif?cid=6c09b952xfu2sxfviqq18vx548mdhhwwujnc2t78qvjtzj3b&ep=v1_stickers_related&rid=giphy.gif&ct=s"
          alt="Loading..."
        />
        <br />
        <p>Deploying contract, please interact with metamask appropriately.</p>
      </div>

      <div v-if="errorMessage" class="error-section">
        <p>{{ errorMessage }}</p>
      </div>

      <button @click="deployContract" class="deploy-button">Deploy</button>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";

export default {
  name: "TokenDeployer",
  data() {
    return {
      selectedContractType: "standard",
      showDetails: false,
      tokenDetails: {
        contractName: "PLACEHOLDER",
        contractTicker: "TICKER",
        contractSupply: 100000000,
        maxTransactionAmount: 0,
        maxWallet: 0,
        buyTax: 0,
        sellTax: 0,
      },
      isLoading: false,
      errorMessage: "",
    };
  },
  created() {
    // window.ethereum.on("message", (error) => {
    //   console.error("MetaMask error:", error);
    //   this.errorMessage = error.message;
    // });
  },
  methods: {
    navigateToDetailsPage() {
      this.showDetails = !this.showDetails;
    },
    validateInputs() {
      if (
        !this.tokenDetails.contractName ||
        this.tokenDetails.contractName.includes(" ")
      ) {
        this.errorMessage = "Invalid contract name";
        return false;
      }

      if (
        !this.tokenDetails.contractTicker ||
        this.tokenDetails.contractTicker.includes(" ") ||
        this.tokenDetails.contractTicker.length > 10
      ) {
        this.errorMessage = "Invalid contract ticker";
        return false;
      }

      if (
        !this.tokenDetails.contractSupply ||
        isNaN(this.tokenDetails.contractSupply) ||
        this.tokenDetails.contractSupply <= 0
      ) {
        this.errorMessage = "Invalid contract supply";
        return false;
      }

      return true;
    },

    async deployContract() {
      this.isLoading = true;
      this.errorMessage = "";

      if (!this.validateInputs()) {
        this.isLoading = false;
        this.errorMessage = "One of your inputs is invalid";
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/compile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contractType: this.selectedContractType,
            tokenDetails: this.tokenDetails,
          }),
        });

        const result = await response.json();

        console.log("Result", result);

        console.log("Contract Bytecode:", result.bytecode);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];

        // Encode the constructor arguments
        const encodedConstructorArgs = ethers.utils.defaultAbiCoder.encode(
          ["string", "string", "uint256"],
          [
            this.tokenDetails.contractName,
            this.tokenDetails.contractTicker,
            this.tokenDetails.contractSupply,
          ]
        );

        // Append the encoded constructor arguments to the bytecode
        const bytecodeWithConstructorArgs =
          result.bytecode + encodedConstructorArgs.slice(2);

        // Create the transaction
        const transaction = {
          from: account,
          data: bytecodeWithConstructorArgs, // The bytecode of the contract with constructor args
          gas: "0x2DC6C0", // Gas limit (you might need to adjust this)
        };

        const gasEstimate = await window.ethereum.request({
          method: "eth_estimateGas",
          params: [transaction],
        });

        transaction.gas = gasEstimate;

        // Send the transaction
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transaction],
        });

        console.log("Transaction hash:", txHash);
        this.errorMessage = "Hash: " + txHash;

        // Listen for the receipt
        const receipt = await this.getTransactionReceipt(
          txHash,
          window.ethereum
        );
        if (receipt && receipt.contractAddress) {
          let deployedContracts =
            JSON.parse(localStorage.getItem("deployedContracts")) || [];

          // Add new contract details to the array
          deployedContracts.push({
            address: receipt.contractAddress,
            sourceCode: result.sourceCode, // Assuming result.sourceCode contains the source code
            abi: result.abi,
            bytecode: result.bytecode,
            contractName: this.tokenDetails.contractName,
            contractTicker: this.tokenDetails.contractTicker,
            // ...other details you might want to save
          });

          // Save the updated array back to local storage
          localStorage.setItem(
            "deployedContracts",
            JSON.stringify(deployedContracts)
          );

          // Open the Token Manager component
          this.$store.dispatch("openWindow", {
            id: 5, // or whatever the ID for TokenManager.vue is
          });
        }
      } catch (error) {
        console.error("Error deploying contract:", error);
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async getTransactionReceipt(hash, ethereum) {
      let receipt = null;
      while (receipt == null) {
        receipt = await ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [hash],
        });
        if (!receipt) {
          // Wait for a bit before trying again
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
      return receipt;
    },
  },
};
</script>

<style>
.token-deployer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--component-bg-color, #292c37);
  color: var(--text-color, #ffffff);
}

h1 {
  margin-bottom: 20px;
  color: var(--text-color, #ffffff);
}

.label-style {
  margin-bottom: 10px;
  color: var(--text-color, #ffffff);
}

.theme-select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--input-border-color, #292c37);
  background-color: var(--input-bg-color, #292c37);
  color: var(--input-text-color, #ffffff);
  margin-bottom: 20px;
}

.continue-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--button-bg-color, #3f4455);
  color: var(--text-color, #ffffff);
  cursor: pointer;
  margin-bottom: 20px;
}

.continue-button:hover {
  background-color: var(--button-hover-bg-color, #4f5565);
}

.details-section input[type="text"],
.details-section input[type="number"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--input-border-color, #ffffff);
  background-color: var(--input-bg-color, #292c37);
  color: var(--input-text-color, #ffffff);
  width: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.details-section input[type="text"]:focus,
.details-section input[type="number"]:focus {
  border-color: var(--focused-border-color, rgb(146, 146, 146));
  outline: none;
}

.input-style {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--input-border-color, #ffffff);
  background-color: var(--input-bg-color, #292c37);
  color: var(--input-text-color, #ffffff);
  margin-bottom: 20px;
  width: 100%;
}

.deploy-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--button-bg-color, #3f4455);
  color: var(--text-color, #ffffff);
  cursor: pointer;
  margin-bottom: 20px;
}

.deploy-button:hover {
  background-color: var(--button-hover-bg-color, #4f5565);
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.loading-section img {
  width: 50px;
  height: 50px;
}

.error-section {
  color: red;
  margin-bottom: 20px;
}
</style>
