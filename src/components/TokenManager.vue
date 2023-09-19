<template>
  <div class="token-manager">
    <h2 class="token-manager-title">Token Manager</h2>
    <div class="contract-selector">
      Your Contracts:
      <br />
      <select
        v-model="selectedContract"
        @change="loadContractDetails"
        class="custom-select"
      >
        <option
          v-for="contract in contracts"
          :key="contract.address"
          :value="contract.address"
        >
          {{ contract.address }}
        </option>
      </select>
    </div>

    <div class="token-info">
      <br />
      <hr />
      <br />
      <p class="token-info-item">Token Address: {{ selectedContract }}</p>
      <p class="token-info-item">
        Your Token Balance: {{ tokenBalance }} TOKENS
      </p>
      <p class="token-info-item">Token Name: {{ tokenName }}</p>
      <p class="token-info-item">Token Ticker: {{ tokenTicker }}</p>
      <p class="token-info-item">Token Supply: {{ tokenSupply }}</p>
    </div>

    <div
      class="functions-section"
      :style="{ height: '600px', overflowY: 'scroll' }"
    >
      <div v-for="func in filteredFunctions" :key="func.name">
        <h3 class="section-title">
          {{ func.name }} ({{ func.stateMutability }})
        </h3>
        <div
          class="input-group"
          v-for="(input, index) in func.inputs"
          :key="index"
        >
          <label :for="input.name">{{ input.name }} ({{ input.type }}):</label>
          <input
            :type="input.type === 'address' ? 'text' : 'number'"
            :id="input.name"
            v-model="input.value"
            class="custom-input"
          />
        </div>
        <button @click="executeFunction(func, func.inputs)" class="button">
          {{
            func.stateMutability === "view"
              ? "Read"
              : func.stateMutability === "payable"
              ? "Send"
              : "Write"
          }}
        </button>
      </div>
    </div>

    <div class="advanced-mode-toggle">
      <input type="checkbox" id="advancedMode" v-model="simpleMode" />
      <label for="advancedMode">Simple Mode</label>
    </div>
    <div v-if="transactionStatus" class="transaction-status">
      <h4 class="transaction-status-title">Transaction Status:</h4>
      {{ transactionStatus }}
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";

export default {
  data() {
    return {
      selectedContract: "",
      contracts: JSON.parse(localStorage.getItem("deployedContracts")) || [],
      tokenBalance: 0,
      readAddress: "",
      recipient: "",
      amount: 0,
      transactionStatus: "",
      tokenName: "",
      tokenTicker: "",
      tokenSupply: 0,
      contractFunctions: [],
      simpleMode: true,
    };
  },
  computed: {
    filteredFunctions() {
      return this.simpleMode
        ? this.contractFunctions.filter((func) =>
            ["transfer", "balanceOf"].includes(func.name)
          )
        : this.contractFunctions;
    },
  },
  methods: {
    async loadContractDetails() {
      const contractDetails = this.contracts.find(
        (contract) => contract.address === this.selectedContract
      );
      if (contractDetails) {
        this.currentContractDetails = contractDetails;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractInstance = new ethers.Contract(
          this.selectedContract,
          contractDetails.abi,
          provider
        );
        try {
          this.tokenName = await contractInstance.name();
          this.tokenTicker = await contractInstance.symbol();
          this.tokenSupply = ethers.utils.formatUnits(
            await contractInstance.totalSupply(),
            18
          );
          this.contractFunctions = contractDetails.abi.filter(
            (func) => func.type === "function"
          );
        } catch (error) {
          console.error("Error fetching token details:", error);
        }
      } else {
        console.error("Contract details not found");
      }
    },
    async executeFunction(func, inputs) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          this.selectedContract,
          this.currentContractDetails.abi,
          func.stateMutability === "view" ? provider : signer
        );

        const preparedInputs = inputs.map((input) => input.value);
        const result = await contractInstance[func.name](...preparedInputs);
        if (func.stateMutability === "view") {
          this.transactionStatus = `Result: ${result.toString()}`;
        } else {
          await result.wait();
          this.transactionStatus = `Transaction Successful: ${result.hash}`;
        }
      } catch (error) {
        this.transactionStatus = `Error: ${error.message}`;
      }
    },
  },
  created() {
    if (this.contracts.length > 0) {
      this.selectedContract = this.contracts[0].address;
      this.loadContractDetails();
    }
  },
};
</script>

<style scoped>
.token-manager {
  width: 700px;

  height: auto;
  background-color: var(--component-bg-color, #292c37);
  color: var(--text-color);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin: 0 auto;
  font-family: var(--font-family);
  overflow-y: auto;
  position: relative; /* Make this relative to position the toggle button */
}
.token-manager::-webkit-scrollbar {
  width: 10px;
}
.token-manager::-webkit-scrollbar-track {
  background-color: #2e2e2e;
}
.token-manager::-webkit-scrollbar-thumb {
  background-color: #535353;
}
.token-manager::-webkit-scrollbar-thumb:hover {
  background-color: #636363;
}
.contract-selector,
.token-info,
.read-section,
.transfer-section,
.transaction-status {
  margin-bottom: 20px;
  overflow: auto;
}
.contract-selector select,
.input-group input {
  width: 100%;
  padding: 10px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  margin-bottom: 10px;
}
.section-title {
  font-size: var(--font-size-lg);
  margin-bottom: 10px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
}
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--button-bg-color, #3f4455);
  color: var(--text-color, #ffffff);
  cursor: pointer;
  margin-bottom: 20px;
}
.button:hover {
  background-color: var(--button-hover-bg-color, #4f5565);
}
.advanced-mode-toggle {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  background-color: var(--component-bg-color, #292c37);
  padding: 10px;
  border-radius: var(--border-radius);
}
.advanced-mode-toggle label {
  margin-left: 10px;
  color: var(--text-color);
}
</style>
