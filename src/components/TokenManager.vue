<template>
  <div class="token-manager" v-if="contracts.length > 0">
    <div class="main-content">
      <h2 class="token-manager-title">Token Manager</h2>

      <div class="section contract-selector">
        <div class="contract-selector-wrapper">
          <select
            id="contractSelector"
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
          <span
            v-if="selectedContract"
            @click="deleteContract(getSelectedContractObject)"
            class="delete-icon"
            title="Delete Contract"
            >🗑️</span
          >
        </div>
      </div>

      <div class="section token-info">
        <h3>Token Information</h3>
        <div>
          <p>Token Address: {{ selectedContract }}</p>
          <!-- <p>Your Token Balance: {{ tokenBalance }}</p> -->
          <p>Token Name: {{ tokenName }}</p>
          <p>Token Ticker: {{ tokenTicker }}</p>
          <p>Token Supply: {{ tokenSupply }}</p>

          <p>Contract Verified : {{ isVerified ? "✅" : "❌" }}</p>

          <p>Contract Renounced : {{ isRenounced ? "✅" : "❌" }}</p>

          <p>
            Etherscan:
            <a
              :href="'https://goerli.etherscan.io/address/' + selectedContract"
              target="_blank"
              >{{ selectedContract }}</a
            >
          </p>

          <pre></pre>
        </div>

        <div class="action-group">
          <button class="action-button" @click="addLiquidity">
            Add Liquidity (via Uniswap)
          </button>
          <button class="action-button" @click="lockLiquidity">
            Lock Liquidity (via Unicrypt)
          </button>
          <button
            class="verify-button"
            @click="verifyContract"
            v-if="!isVerified"
          >
            Verify Contract
          </button>
        </div>
        <div
          v-if="verificationStatus === 'verifying'"
          class="verification-status"
        >
          <SpinnerComponent />
          <p>{{ verificationMessage }}</p>
        </div>

        <div
          v-if="verificationStatus === 'success'"
          class="verification-status verification-success"
        >
          <p>{{ verificationMessage }}</p>
        </div>
        <div
          v-if="verificationStatus === 'failure'"
          class="verification-status verification-failure"
        >
          <p>{{ verificationMessage }}</p>
        </div>
      </div>

      <div class="section advanced-mode-toggle">
        <input type="checkbox" id="advancedMode" v-model="simpleMode" />
        <label for="advancedMode">Simple Mode</label>
      </div>

      <div v-if="transactionStatus" class="section transaction-status">
        <h4>Transaction Status:</h4>
        {{ transactionStatus }}
      </div>
    </div>

    <div class="contract-functions">
      <div class="section simple-section" v-if="simpleMode">
        <!-- <h3>Simple Actions</h3> -->
        <div
          v-for="func in filteredFunctions"
          :key="func.name"
          class="simple-function-item"
        >
          <h4>{{ func.displayName }}</h4>
          <div class="simple-action-group">
            <div
              v-for="(input, index) in func.inputs"
              :key="index"
              class="input-wrapper"
            >
              <input
                :type="input.type === 'address' ? 'text' : 'number'"
                :placeholder="`${input.type} | ${
                  input.type === 'address' ? 'Text' : 'Number'
                }`"
                v-model="input.value"
                class="custom-input"
              />
            </div>
            <div class="button-wrapper">
              <button
                @click="executeFunction(func, func.inputs)"
                class="action-button-simple"
              >
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
        </div>
      </div>

      <div class="section functions-section" v-if="!simpleMode">
        <h3>Contract Functions</h3>
        <div
          v-for="func in filteredFunctions"
          :key="func.name"
          class="function-item"
        >
          <h4>{{ func.name }} ({{ func.stateMutability }})</h4>
          <div
            v-for="(input, index) in func.inputs"
            :key="index"
            class="input-group"
          >
            <label :for="input.name"
              >{{ input.name }} ({{ input.type }}):</label
            >
            <input
              :type="input.type === 'address' ? 'text' : 'number'"
              :id="input.name"
              v-model="input.value"
              class="custom-input"
            />
          </div>
          <button
            @click="executeFunction(func, func.inputs)"
            class="action-button"
          >
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
    </div>
  </div>
  <div v-else>You have no deployed contracts</div>
</template>

<script>
import { ethers } from "ethers";
import qs from "qs";
import SpinnerComponent from "./SpinnerComponent.vue";
import axios from "axios";

export default {
  components: {
    SpinnerComponent,
  },
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
      currentContractDetails: null,
      verificationStatus: null,
      verificationMessage: "",
      isVerified: false,
      isRenounced: false,
    };
  },
  computed: {
    getSelectedContractObject() {
      return this.contracts.find((c) => c.address === this.selectedContract);
    },
    filteredFunctions() {
      const humanReadableNames = {
        updateBuyFees: "Update Buy Fees",
        updateMaxTxnAmount: "Update Maximum Transaction Amount (not in %)",
        updateMaxWalletAmount: "Update Maximum Wallet Amount (not in %)",
        updateSellFees: "Update Sell Fees",
        renounceOwnership: "Renounce Ownership",
      };

      return this.simpleMode
        ? this.contractFunctions
            .filter((func) =>
              Object.keys(humanReadableNames).includes(func.name)
            )
            .map((func) => {
              func.displayName = humanReadableNames[func.name];
              return func;
            })
        : this.contractFunctions;
    },
  },

  async mounted() {
    this.isVerified = await this.checkVerificationStatus(this.selectedContract);
  },
  watch: {
    async selectedContract(newContractAddress, oldContractAddress) {
      // Avoid unnecessary calls if the address hasn't changed
      if (newContractAddress !== oldContractAddress) {
        const received = await this.checkVerificationStatus(newContractAddress);

        this.isVerified = received.verified;
        this.isRenounced = received.renounced;
      }
    },
  },
  methods: {
    loadContractsFromLocalStorage() {
      this.contracts =
        JSON.parse(localStorage.getItem("deployedContracts")) || [];
    },
    async checkVerificationStatus(contractAddress) {
      try {
        const response = await axios.get(
          `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=FGF5BR31KUH57GMZ15NXKQ1KS3UFP632GD`
        );

        console.log(response);
        // Contract hasn't been verified
        if (response.data.status !== "1") {
          return { verified: false, renounced: false };
        }

        // Contract ABI
        const contractAbi = JSON.parse(response.data.result);

        // Initialize ethers contract instance
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          provider
        );

        // Get owner of the contract
        let ownerAddress;
        try {
          // Try getting owner of the contract
          ownerAddress = await contract.owner();
        } catch (error) {
          // Handle case when owner() function doesn't exist or fails
          return { verified: true, renounced: false };
        }

        // Check if renounced
        const isRenounced =
          ownerAddress === "0x0000000000000000000000000000000000000000" ||
          ownerAddress.toLowerCase() ===
            "0x000000000000000000000000000000000000dEaD";

        return { verified: true, renounced: isRenounced };
      } catch (error) {
        console.error("Error checking verification status:", error);
        return { verified: false, renounced: false };
      }
    },
    async verifyContract() {
      try {
        this.verificationStatus = "verifying";
        this.verificationMessage = "Verification in progress...";

        const contractAddress = this.selectedContract;
        const deployedContracts = JSON.parse(
          localStorage.getItem("deployedContracts")
        );
        const contract = deployedContracts.find(
          (c) => c.address === contractAddress
        );
        if (!contract) throw new Error("Contract not found");

        let types;
        switch (contract.contractType) {
          case "standard":
            types = ["string", "string", "uint256"];
            break;
          case "taxAndSwap":
            types = [
              "string",
              "string",
              "uint256",
              "uint256",
              "uint256",
              "uint256",
              "uint256",
            ];
            break;
          default:
            throw new Error("Invalid contract type");
        }

        const abiCoder = new ethers.utils.AbiCoder();
        const cArgs = abiCoder.encode(types, contract.constructorArguments);

        const data = {
          apikey: "FGF5BR31KUH57GMZ15NXKQ1KS3UFP632GD",
          module: "contract",
          action: "verifysourcecode",
          contractaddress: contract.address,
          sourceCode: contract.sourceCode,
          contractname: contract.contractName,
          compilerversion: "v0.8.21+commit.d9974bed",
          optimizationUsed: 1,
          runs: 200,
          constructorArguements: cArgs.slice(2),
        };

        const response = await axios({
          method: "post",
          url: "https://api-goerli.etherscan.io/api",
          data: qs.stringify(data),
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });

        if (response.data.status == "1") {
          const guid = response.data.result;
          const verificationCheckInterval = setInterval(async () => {
            const checkData = {
              guid: guid,
              module: "contract",
              action: "checkverifystatus",
              apikey: "FGF5BR31KUH57GMZ15NXKQ1KS3UFP632GD",
            };
            const checkResponse = await axios({
              method: "post",
              url: "https://api-goerli.etherscan.io/api",
              data: qs.stringify(checkData),
              headers: {
                "content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            });

            if (checkResponse.data.result !== "Pending in queue") {
              clearInterval(verificationCheckInterval);

              // Check for the "Unable to locate ContractCode" message first
              if (
                checkResponse.data.result.includes(
                  "Unable to locate ContractCode"
                )
              ) {
                this.verificationStatus = "failure";
                this.verificationMessage =
                  "The contract was recently deployed, and it might not be indexed by block explorers yet. Please wait a few minutes and try again.";
              } else if (checkResponse.data.status == "1") {
                this.verificationStatus = "success";
                this.verificationMessage = "Verification successful!";
                this.isVerified = true;
              } else {
                this.verificationStatus = "failure";
                this.verificationMessage = checkResponse.data.result;
              }
            }
          }, 5000);
        } else {
          this.verificationStatus = "failure";
          this.verificationMessage = response.data.result;
        }
      } catch (error) {
        this.verificationStatus = "error";
        this.verificationMessage = error.message;
      }
    },
    async deleteContract(contract) {
      // Confirm before deletion
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the contract with address: ${contract.address} and name: ${this.tokenName}?`
      );
      if (!isConfirmed) return;

      // Find the index of the contract
      let index = this.contracts.findIndex(
        (c) => c.address === contract.address
      );

      // Remove the contract from the contracts array
      if (index > -1) {
        this.contracts.splice(index, 1);
      }

      // Update local storage
      localStorage.setItem("deployedContracts", JSON.stringify(this.contracts));

      // If the deleted contract was the currently selected one, reset selectedContract and reload details
      if (this.selectedContract === contract.address) {
        this.selectedContract = this.contracts[0]
          ? this.contracts[0].address
          : "";
        await this.loadContractDetails(); // Assuming you have a method named loadContractDetails to fetch the details
      }
    },

    async loadContractDetails() {
      const contractDetails = this.contracts.find(
        (contract) => contract.address === this.selectedContract
      );
      if (contractDetails) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractInstance = new ethers.Contract(
          this.selectedContract,
          contractDetails.abi,
          provider
        );
        this.currentContractDetails = contractInstance; // Updating currentContractDetails here

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
          console.error(error);
        }
      } else {
        console.error("Contract details not found");
      }
    },
    getInputTypePlaceholder(inputType) {
      switch (inputType) {
        case "address":
          return "(Address | Text)";
        case "uint256":
        case "uint8":
        case "uint16": // ... and other uint variations
        case "int256":
        case "int8":
        case "int16": // ... and other int variations
          return "(Number)";
        case "bool":
          return "(Boolean | True/False)";
        case "bytes32":
        case "string":
          return "(String | Text)";
        // Add more Ethereum types if needed
        default:
          return `(Unknown type: ${inputType})`;
      }
    },
    async executeFunction(func, inputs) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          this.selectedContract,
          this.currentContractDetails.interface,
          func.stateMutability === "view" ? provider : signer
        );

        // Process input values based on the function type
        const processedInputs = inputs.map((input, index) => {
          if (func.name === "updateMaxTxnAmount" && this.isPercentageInput) {
            return this.totalSupply * (input.value / 100);
          }
          // Add similar conditions for other functions that need special handling
          return input.value;
        });

        const result = await contractInstance[func.name](...processedInputs);

        if (func.stateMutability === "view") {
          this.transactionStatus = `Result: ${result.toString()}`;
        } else {
          this.transactionStatus = "Transaction in progress, please wait...";
          await result.wait();
          this.transactionStatus = `Transaction Successful: ${result.hash}`;
          await this.checkVerificationStatus();
        }
      } catch (error) {
        this.transactionStatus = `Error: ${error.message}`;
      }
    },
    addLiquidity() {
      // Add your addLiquidity method implementation here
    },
    lockLiquidity() {
      // Add your lockLiquidity method implementation here
    },
  },
  created() {
    this.loadContractsFromLocalStorage();
    if (this.contracts.length > 0) {
      this.selectedContract = this.contracts[this.contracts.length - 1].address; // select the last (newest) contract
      this.loadContractDetails();
    }
    this.$root.$on("tokenDeployed", () => {
      console.log("tokenDeployed event caught in TokenManager");
      this.loadContractsFromLocalStorage();
      if (this.contracts.length > 0) {
        this.selectedContract =
          this.contracts[this.contracts.length - 1].address; // select the last (newest) contract after refreshing
        this.loadContractDetails();
      }
    });
  },

  beforeDestroy() {
    this.$root.$off("tokenDeployed", this.loadContractDetails());
  },
};
</script>

<style scoped>
.token-manager {
  display: flex;
  width: 1100px;
  background-color: var(--component-bg-color);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: var(--text-color);
  font-family: var(--font-family);
}

.token-manager-title {
  margin-bottom: 20px;
  font-size: var(--font-size-lg);
}

.main-content {
  width: 60%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: var(--border-radius);
  background-color: var(--component-bg-color);
  margin-right: 20px;
}

.contract-functions {
  width: 35%;
  padding: 20px;
  max-height: 600px;
  overflow-y: auto;
  box-sizing: border-box;
  border-radius: var(--border-radius);
  background-color: var(--component-bg-color);
}

.section {
  margin-bottom: 20px;
}

.section h3 {
  margin-bottom: 15px;
  font-size: 1.25em;
}

.action-group {
  display: flex;
  gap: 10px;
}

.simple-section {
  padding: 15px 0;
}

.simple-function-item {
  margin-bottom: 20px;
}

.simple-action-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input-wrapper {
  flex: 2;
  padding-right: 10px;
  margin-bottom: 5px; /* Added to give space between input fields */
}

.button-wrapper {
  flex: 1;
}

.action-button-simple {
  width: 100%;
  background-color: var(
    --button-bg-color
  ); /* Updated to use the custom property */

  padding: 5px 10px;
  margin: 5px;
  color: white;
  cursor: pointer;
  text-align: center;
}

/* .action-button-simple :hover {
  background-color: var(--button-hover-bg-color);
} */

.custom-input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.custom-input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.action-button,
.verify-button {
  padding: 10px;
  border: none;
  background-color: var(--button-bg-color);
  color: var(--text-color);
  cursor: pointer;
  border-radius: var(--border-radius);
  font-size: 0.9em;
  margin-top: 10px;
}

.action-button-simple:hover,
.action-button:hover,
.verify-button:hover {
  background-color: var(--button-hover-bg-color);
}

.function-item {
  margin-bottom: 15px;
}

.function-item h4 {
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.custom-select,
.custom-input {
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--component-bg-color);
  color: var(--text-color);
}

.custom-input {
  margin-top: 5px;
}

.advanced-mode-toggle {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.transaction-status {
  margin-top: 20px;
}

/* Scrollbar Styles */
.contract-functions::-webkit-scrollbar {
  width: 8px;
}
.contract-functions::-webkit-scrollbar-track {
  background-color: #2e2e2e;
}
.contract-functions::-webkit-scrollbar-thumb {
  background-color: #535353;
}
.contract-functions::-webkit-scrollbar-thumb:hover {
  background-color: #636363;
}

.verification-status {
  padding: 20px;
}

.delete-icon {
  display: inline-block;
  padding: 2px 5px;
  margin-left: 5px;
  border: 1px solid var(--button-bg-color);
  border-radius: 3px;
  cursor: pointer;
  vertical-align: middle;
}

.delete-icon:hover {
  background-color: rgba(0, 0, 0, 0.05); /* light gray background on hover */
}

.contract-selector-wrapper {
  display: flex;
  align-items: center;
}

.delete-icon {
  margin-left: 10px; /* spacing it away from the dropdown */
  padding: 2px 5px;
  border: 1px solid var(--button-bg-color);
  border-radius: 3px;
  cursor: pointer;
}

.delete-icon:hover {
  background-color: rgba(0, 0, 0, 0.05); /* light gray background on hover */
}

.custom-select {
  flex-grow: 1; /* ensures that the select takes the available space */
}
</style>
