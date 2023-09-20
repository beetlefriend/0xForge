<template>
  <div class="token-deployer">
    <!-- <pre>
 
  Selected type: {{ selectedContractType }}

  Values : {{ tokenDetails }}

    </pre> -->
    <label for="contract-type" class="label-style"
      >Select Contract Type:
    </label>
    <div style="display: flex; flex-direction: row">
      <select
        id="contract-type"
        v-model="selectedContractType"
        class="theme-select"
        style="margin: 10px"
      >
        <option value="standard">
          Standard ERC20 (No special functions, just supply)
        </option>
        <option value="taxAndSwap">
          ERC20 with Buy/Sell Tax and Automatic Swap Handling
        </option>
        <!-- <option value="mintable">
        Mintable ERC20 (Allows for the creation of new tokens)
      </option>

      <option value="capped">Capped ERC20 (Has a maximum supply limit)</option> -->
        <!-- Add other contract types here -->
      </select>
      <button
        @click="navigateToDetailsPage"
        class="continue-button"
        style="margin: 10px"
      >
        {{ showDetails ? "Back" : "Continue" }}
      </button>
    </div>

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
      <div
        v-if="selectedContractType == 'taxAndSwap'"
        style="display: flex; flex-wrap: wrap; gap: 10px"
      >
        <div style="flex: 1 1 45%">
          <label for="max-transaction-amount" class="label-style"
            >Max Transaction Amount:</label
          >
          <input
            id="max-transaction-amount"
            v-model="tokenDetails.maxTransactionAmount"
            class="input-style"
            type="number"
            placeholder="Enter value in %"
            step="0.1"
          />
        </div>

        <div style="flex: 1 1 45%">
          <label for="max-wallet" class="label-style">Max Wallet:</label>
          <input
            id="max-wallet"
            v-model="tokenDetails.maxWallet"
            class="input-style"
            type="number"
            placeholder="Enter value in %"
            step="0.1"
          />
        </div>

        <div style="flex: 1 1 45%">
          <label for="buy-tax" class="label-style">Buy Tax (%):</label>
          <input
            id="buy-tax"
            v-model="tokenDetails.buyTax"
            class="input-style"
            type="number"
            placeholder="Enter value in %"
            step="0.1"
          />
        </div>

        <div style="flex: 1 1 45%">
          <label for="sell-tax" class="label-style">Sell Tax (%):</label>
          <input
            id="sell-tax"
            v-model="tokenDetails.sellTax"
            class="input-style"
            type="number"
            placeholder="Enter value in %"
            step="0.1"
          />
        </div>
      </div>

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
        maxTransactionAmount: null,
        maxWallet: null,
        buyTax: null,
        sellTax: null,
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

      if (
        this.tokenDetails.maxWallet !== null &&
        (isNaN(this.tokenDetails.maxWallet) ||
          this.tokenDetails.maxWallet <= 0 ||
          this.tokenDetails.maxWallet > 100)
      ) {
        this.errorMessage = "Invalid max wallet percentage";
        return false;
      }

      if (
        this.tokenDetails.maxTransactionAmount !== null &&
        (isNaN(this.tokenDetails.maxTransactionAmount) ||
          this.tokenDetails.maxTransactionAmount <= 0 ||
          this.tokenDetails.maxTransactionAmount > 100)
      ) {
        this.errorMessage = "Invalid max transaction amount percentage";
        return false;
      }

      if (
        this.tokenDetails.buyTax !== null &&
        (isNaN(this.tokenDetails.buyTax) ||
          this.tokenDetails.buyTax < 0 ||
          this.tokenDetails.buyTax > 100)
      ) {
        this.errorMessage = "Invalid buy tax percentage";
        return false;
      }

      if (
        this.tokenDetails.sellTax !== null &&
        (isNaN(this.tokenDetails.sellTax) ||
          this.tokenDetails.sellTax < 0 ||
          this.tokenDetails.sellTax > 100)
      ) {
        this.errorMessage = "Invalid sell tax percentage";
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

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];

        let contractSupplyInWei = ethers.utils.parseUnits(
          this.tokenDetails.contractSupply.toString(),
          18
        );
        let encodedConstructorArgs;
        if (this.selectedContractType === "standard") {
          encodedConstructorArgs = ethers.utils.defaultAbiCoder.encode(
            ["string", "string", "uint256"],
            [
              this.tokenDetails.contractName,
              this.tokenDetails.contractTicker,
              contractSupplyInWei,
            ]
          );
        } else {
          const maxWalletAmountInWei = contractSupplyInWei
            .mul(this.tokenDetails.maxWallet)
            .div(100);
          const maxTransactionAmountInWei = contractSupplyInWei
            .mul(this.tokenDetails.maxTransactionAmount)
            .div(100);

          encodedConstructorArgs = ethers.utils.defaultAbiCoder.encode(
            [
              "string",
              "string",
              "uint256",
              "uint256",
              "uint256",
              "uint256",
              "uint256",
            ],
            [
              this.tokenDetails.contractName,
              this.tokenDetails.contractTicker,
              contractSupplyInWei,
              maxWalletAmountInWei,
              maxTransactionAmountInWei,
              this.tokenDetails.buyTax,
              this.tokenDetails.sellTax,
            ]
          );
        }

        const bytecodeWithConstructorArgs =
          result.bytecode + encodedConstructorArgs.slice(2);

        const transaction = {
          from: account,
          data: bytecodeWithConstructorArgs,
        };

        const gasEstimate = await window.ethereum.request({
          method: "eth_estimateGas",
          params: [transaction],
        });

        transaction.gas = gasEstimate;

        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transaction],
        });

        const receipt = await this.getTransactionReceipt(
          txHash,
          window.ethereum
        );

        if (receipt && receipt.contractAddress) {
          let deployedContracts =
            JSON.parse(localStorage.getItem("deployedContracts")) || [];

          let constructorArguments;
          if (this.selectedContractType === "standard") {
            constructorArguments = [
              this.tokenDetails.contractName,
              this.tokenDetails.contractTicker,
              contractSupplyInWei,
            ];
          } else {
            const maxWalletAmountInWei = contractSupplyInWei
              .mul(this.tokenDetails.maxWallet)
              .div(100);
            const maxTransactionAmountInWei = contractSupplyInWei
              .mul(this.tokenDetails.maxTransactionAmount)
              .div(100);

            constructorArguments = [
              this.tokenDetails.contractName,
              this.tokenDetails.contractTicker,
              contractSupplyInWei,
              maxWalletAmountInWei,
              maxTransactionAmountInWei,
              this.tokenDetails.buyTax,
              this.tokenDetails.sellTax,
            ];
          }

          deployedContracts.push({
            address: receipt.contractAddress,
            sourceCode: result.sourceCode,
            abi: result.abi,
            bytecode: result.bytecode,
            contractName: this.tokenDetails.contractName,
            contractTicker: this.tokenDetails.contractTicker,
            constructorArguments: constructorArguments, // saving constructor arguments
            compilerVersion: result.compilerVersion, // assuming that compiler version is available in result, if not please adjust
            contractType: this.selectedContractType, // saving contract type
          });

          localStorage.setItem(
            "deployedContracts",
            JSON.stringify(deployedContracts)
          );

          this.$store.dispatch("openWindow", {
            id: 5,
          });
        }
      } catch (error) {
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
