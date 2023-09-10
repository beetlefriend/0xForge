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
      Continue
    </button>

    <div v-if="showDetails" class="details-section">
      <label for="name" class="label-style">Name: </label>
      <input
        id="name"
        v-model="tokenDetails.name"
        class="input-style"
        type="text"
      />

      <label for="ticker" class="label-style">Ticker: </label>
      <input
        id="ticker"
        v-model="tokenDetails.ticker"
        class="input-style"
        type="text"
      />

      <label for="total-supply" class="label-style">Total Supply: </label>
      <input
        id="total-supply"
        v-model="tokenDetails.totalSupply"
        class="input-style"
        type="number"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenDeployer",
  data() {
    return {
      selectedContractType: "standard",
      showDetails: false,
      tokenDetails: {
        name: "",
        ticker: "",
        totalSupply: null,
      },
    };
  },
  methods: {
    navigateToDetailsPage() {
      this.showDetails = true;
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
  border: 1px solid var(--border-color, #ffffff); /* Adjusted border color to white */
  background-color: var(--component-bg-color, #292c37);
  color: var(--text-color, #ffffff);
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
  border: 1px solid var(--border-color, #ffffff); /* Adjusted border color to white */
  background-color: var(--component-bg-color, #292c37);
  color: var(--text-color, #ffffff);
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
  border: 1px solid var(--border-color, #ffffff); /* Adjusted border color to white */
  background-color: var(--component-bg-color, #292c37);
  color: var(--text-color, #ffffff);
  margin-bottom: 20px;
  width: 100%;
}
</style>
