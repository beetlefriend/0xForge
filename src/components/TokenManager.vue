<template>
  <div class="token-manager" v-if="contracts.length > 0">
    
    <div class="main-content">
      <h2 class="token-manager-title">Token Manager</h2>

      <div class="section contract-selector">
        <label for="contractSelector">Your Contracts:</label>
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
      </div>

      <div class="section token-info">
        <h3>Token Information</h3>
        <div>
          <p>Token Address: {{ selectedContract }}</p>
          <!-- <p>Your Token Balance: {{ tokenBalance }}</p> -->
          <p>Token Name: {{ tokenName }}</p>
          <p>Token Ticker: {{ tokenTicker }}</p>
          <p>Token Supply: {{ tokenSupply }}</p>

          <pre>
            
          </pre>
        </div>

        <div class="action-group">
          <button class="action-button" @click="addLiquidity">
            Add Liquidity (via Uniswap)
          </button>
          <button class="action-button" @click="lockLiquidity">
            Lock Liquidity (via Unicrypt)
          </button>
          <button class="verify-button" @click="verifyContract">
            Verify Contract
          </button>
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
      <div class="section functions-section">
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

import axios from "axios";

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
      currentContractDetails: null,
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
    async verifyContract() {
      const contractAddress = this.selectedContract;
      const deployedContracts = JSON.parse(
        localStorage.getItem("deployedContracts")
      );

      // Find the specific contract using the contractName or other unique identifier
      const contract = deployedContracts.find(
        (c) => c.address === contractAddress
      );
      if (!contract) {
        console.error("Contract not found");
        return;
      }

      // Determine the types array based on the contract's contractType property
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
        // Add other contract types here as necessary
        default:
          console.error("Unknown contract type");
          return;
      }

      const abiCoder = new ethers.utils.AbiCoder();
      const cArgs = abiCoder.encode(types, contract.constructorArguments);
      const decodedArguments = abiCoder.decode(types, cArgs);

      const contractDeploymentData = contract.bytecode + cArgs.slice(2);

      console.log(contractDeploymentData)

      const data = {
        apikey: "FGF5BR31KUH57GMZ15NXKQ1KS3UFP632GD", // Assuming you have stored the API key directly in the localStorage
        module: "contract",
        action: "verifysourcecode",
        contractaddress: contract.address,
        sourceCode: contract.sourceCode, // This should be the full source code of the contract
        contractname: contract.contractName,
        compilerversion: "v0.8.21+commit.d9974bed", // Adjust this to your actual compiler version
        optimizationUsed: 1, // Adjust based on your contract's settings
        runs: 200, // Adjust based on your contract's settings
        constructorArguements: cArgs.slice(2), // ABI encoded constructor arguments
      };

      try {
        const response = await axios({
          method: "post",
          url: "https://api-goerli.etherscan.io/api",
          data: qs.stringify(data),
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });

        if (response.data.status == "1") {
          console.log(
            "Contract verification initiated successfully. Check the GUID in the message below for progress"
          );
          console.log(response.data);

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

            console.log("Verification check response:", checkResponse.data);

            if (checkResponse.data.result != "Pending in queue") {
              clearInterval(verificationCheckInterval);
            }
          }, 5000);
        } else {
          console.log(
            "Contract verification failed. See the message below for more details"
          );
          console.log(response.data);
        }
      } catch (error) {
        console.log("Error during contract verification:", error);
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
    async executeFunction(func, inputs) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          this.selectedContract,
          this.currentContractDetails.interface,
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
    addLiquidity() {
      // Add your addLiquidity method implementation here
    },
    lockLiquidity() {
      // Add your lockLiquidity method implementation here
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
  display: flex;
  width: 900px;
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
</style>
