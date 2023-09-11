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
      <button @click="deployContract" class="deploy-button">Deploy</button>
    </div>
  </div>
</template>

<script>
import * as solc from "solc-js";

import { ethers } from "ethers";

export default {
  name: "TokenDeployer",
  data() {
    return {
      selectedContractType: "standard",
      showDetails: false,
      tokenDetails: {
        contractName: "PLACEHOLDER_NAME",
        contractTicker: "PLACEHOLDER_TICKER",
        contractSupply: "PLACEHOLDER_SUPPLY",
      },
    };
  },
  methods: {
    navigateToDetailsPage() {
      this.showDetails = !this.showDetails;
    },

    async deployContract() {
      try {
        // Step 1: Connect to MetaMask
        if (typeof window.ethereum !== "undefined") {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Step 2: Load the contract source code
          const contractSource = "..."; // Load your contract source code here

          // Step 3: Compile the contract
          const solc = require("solc-js");
          let solcInstance;
          solc.loadRemoteVersion(
            "v0.8.7+commit.e28d00a7",
            function (err, solInstance) {
              if (err) {
                console.error(err);
                return;
              }
              solcInstance = solInstance;
            }
          );

          // Ensure solcInstance is loaded before proceeding
          while (!solcInstance) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          const input = {
            language: "Solidity",
            sources: {
              "contract.sol": {
                content: contractSource,
              },
            },
            settings: {
              outputSelection: {
                "*": {
                  "*": ["*"],
                },
              },
            },
          };

          const output = JSON.parse(
            solcInstance.compile(JSON.stringify(input))
          );
          const contractInterface =
            output.contracts["contract.sol"].YourContractName.abi;
          const contractBytecode =
            output.contracts["contract.sol"].YourContractName.evm.bytecode
              .object;

          // Step 4: Deploy the contract
          const ContractFactory = new ethers.ContractFactory(
            contractInterface,
            contractBytecode,
            signer
          );
          const contract = await ContractFactory.deploy();
          console.log("Contract deployed to address:", contract.address);
        } else {
          console.error("MetaMask is not installed");
        }
      } catch (error) {
        console.error("Error deploying contract:", error);
      }
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
</style>
