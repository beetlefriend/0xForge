<template>
  <div class="token-manager" v-if="contracts.length > 0">
    <!-- {{ currentNetwork }}
    <br />
    {{ contractNetwork }}

    <br />
    {{ correctNetwork }} -->
    <div class="main-content">
      <h2 class="token-manager-title">Token Manager</h2>

      <div v-if="!correctNetwork">
        <p>
          The contract you have selected is available on the
          <a
            style="font-weight: bold; color: #3273dc; text-transform: uppercase"
            @click="swapNetwork"
            >{{ contractNetwork }}</a
          >
          network
        </p>
      </div>
      <div
        class="section contract-selector"
        style="font-family: 'Courier New', Courier, monospace !important"
      >
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
              {{ contract.address }} | {{ contract.contractName }}
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
      <div v-if="!isContractOwner">
        <h2 style="color: red !important">
          You are not the contract owner, please change your wallet to interact
          with this contract.
        </h2>
      </div>
      <div v-else>
        <div class="section token-info" v-if="correctNetwork">
          <h3>Token Information</h3>
          <div>
            <p>Token Address: {{ selectedContract }}</p>
            <!-- <p>Your Token Balance: {{ tokenBalance }}</p> -->
            <p>Token Name: {{ tokenName }}</p>
            <p>Token Ticker: {{ tokenTicker }}</p>
            <p>Token Supply: {{ tokenSupply }}</p>
            <!-- <p>Token Type:  {{ contract.contractType}}</p> -->

            <p>Contract Verified : {{ isVerified ? "✅" : "❌" }}</p>

            <p>Contract Renounced : {{ isRenounced ? "✅" : "❌" }}</p>

            <p>Network: {{ contractNetwork }}</p>

            <p>
              Etherscan:
              <a
                :href="etherscanLink + 'address/' + selectedContract"
                target="_blank"
                >{{ selectedContract }}</a
              >
            </p>

            <pre></pre>
          </div>

          <div class="action-group" v-if="isContractOwner">
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

          <div v-if="showLiquidityInputs" class="section liquidity-inputs">
            <h3 style="margin-top: 10px">Add Liquidity</h3>
            <div class="input-group">
              <label for="tokenPercentageForLiquidity"
                >Amount of tokens for liquidity (in %)</label
              >
              <input
                id="tokenPercentageForLiquidity"
                v-model="tokenPercentageForLiquidity"
                type="number"
                class="custom-input"
              />
            </div>
            <div class="input-group">
              <label for="ethAmountForLiquidity"
                >Amount of ETH for liquidity</label
              >
              <input
                id="ethAmountForLiquidity"
                v-model="ethAmountForLiquidity"
                type="number"
                class="custom-input"
              />
            </div>
            <button @click="confirmAddLiquidity" class="action-button">
              Confirm
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

        <div class="section advanced-mode-toggle" v-if="correctNetwork">
          <input type="checkbox" id="advancedMode" v-model="simpleMode" />
          <label for="advancedMode">Simple Mode</label>
        </div>

        <div v-if="transactionStatus" class="section transaction-status">
          <h4>Transaction Status:</h4>
          {{ transactionStatus }}
        </div>
      </div>
    </div>
    <div class="contract-functions" v-if="correctNetwork && isContractOwner">
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
      contractNetwork: null,
      verificationStatus: null,
      verificationMessage: "",
      isVerified: false,
      isRenounced: false,
      provider: null,
      verificationApiLink: "",
      etherscanLink: "",
      currentNetwork: "",
      correctNetwork: false,
      showLiquidityInputs: false,
      tokenPercentageForLiquidity: 0,
      ethAmountForLiquidity: 0,
      feedbackMessage: "",
      isContractOwner: false,
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
    if (window.ethereum) {
      window.ethereum.on("chainChanged", async (chainId) => {
        console.log("Network Changed");

        // Reinitialize the provider to connect to the new network
        this.provider = new ethers.providers.Web3Provider(window.ethereum);

        let network = await this.provider.getNetwork();
        let networkData = network.name;

        this.currentNetwork = networkData;

        // Set up new network links
        await this.setupNetworkLinks();
        await this.loadContractDetails();
      });

      // For account changes
      window.ethereum.on("accountsChanged", async (accounts) => {
        // If you want to reload contract details or any other data related to the new account
        await this.loadContractDetails();
      });
    }

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

    async setupNetworkLinks() {
      let network = await this.provider.getNetwork();
      let networkData = network.name;

      this.currentNetwork = networkData;
      console.log(networkData);
      // API Link
      let apiLink;
      let etherscanLink;
      if (networkData === "goerli") {
        apiLink = "https://api-goerli.etherscan.io/api";
        etherscanLink = "https://goerli.etherscan.io/";
      } else if (networkData === "homestead") {
        apiLink = "https://api.etherscan.io/api";
        etherscanLink = "https://etherscan.io/";
      }

      this.etherscanLink = etherscanLink;
      this.verificationApiLink = apiLink;
    },
    async checkVerificationStatus(contractAddress) {
      try {
        const response = await axios.get(
          `${this.verificationApiLink}?module=contract&action=getabi&address=${contractAddress}&apikey=FGF5BR31KUH57GMZ15NXKQ1KS3UFP632GD`
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
          url: this.verificationApiLink,
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
              apikey: "VF3CPRJVFSGFBYBAZPCY5SJ41VF8S8TP2G",
            };
            const checkResponse = await axios({
              method: "post",
              url: this.verificationApiLink,
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

    checkIfOwner() {
      // return false;
    },

    resetVars() {
      this.isVerified = false;
      this.isRenounced = false;
    },

    async loadContractDetails() {
      this.resetVars();
      await this.checkIfWalletIsOwnerOrCreator();
      this.showLiquidityInputs = false;
      const contractDetails = this.contracts.find(
        (contract) => contract.address === this.selectedContract
      );

      if (contractDetails) {
        this.contractNetwork = contractDetails.network;

        if (this.contractNetwork != this.currentNetwork) {
          console.log("Mismatch");
          console.log(this.contractNetwork, this.currentNetwork);
          try {
            await this.swapNetwork();
          } catch (error) {
            console.log(error);
          }

          this.correctNetwork = false;
          return;
        }
        this.correctNetwork = true;
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
    async swapNetwork() {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: this.getChainIdForNetwork(this.contractNetwork),
              },
            ],
          });
        } catch (switchError) {
          console.error(switchError);
        }
      }
    },
    getChainIdForNetwork(network) {
      const networks = {
        homestead: "0x1",
        ropsten: "0x3",
        rinkeby: "0x4",
        goerli: "0x5",
        kovan: "0x2a",
      };
      return networks[network];
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
    async checkIfWalletIsOwnerOrCreator() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedWalletAddress = await signer.getAddress();

      const contractDetails = this.contracts.find(
        (contract) => contract.address === this.selectedContract
      );
      const contractInstance = new ethers.Contract(
        this.selectedContract,
        contractDetails.abi,
        provider
      );

      try {
        // First, check if the contract has the "owner" function (indicating it might be Ownable)
        const contractOwner = await contractInstance.owner();

        // If we're here, the contract likely has an Ownable property.
        // Now we check if the connected wallet is the owner.
        if (
          contractOwner.toLowerCase() === connectedWalletAddress.toLowerCase()
        ) {
          this.isContractOwner = true;
          return;
        } else {
          this.isContractOwner = false;
          return;
        }
      } catch (error) {
        // If there's an error, it might be because the contract doesn't have an "owner" function.
        // In that case, we check if the contract creation was performed by the connected wallet.
      }

      // Fetch the contract creator using Etherscan API as we discussed previously.
      const network = await this.provider.getNetwork();
      const networkMap = {
        homestead: "https://api.etherscan.io",
        ropsten: "https://api-ropsten.etherscan.io",
        rinkeby: "https://api-rinkeby.etherscan.io",
        kovan: "https://api-kovan.etherscan.io",
        goerli: "https://api-goerli.etherscan.io",
      };

      const baseURL = networkMap[network.name];
      const response = await fetch(
        `${baseURL}/api?module=account&action=txlist&address=${this.selectedContract}&startblock=0&endblock=99999999&sort=asc&apikey=XQJ7AEK6A3WUBVAEDW2K7CZ52DMBD3HWPD`
      );
      const data = await response.json();

      if (data.status !== "1" || !Array.isArray(data.result)) {
        console.error(
          "Etherscan API Error or Unexpected Data Structure:",
          data.message,
          data
        );
        this.isContractOwner = false; // Default to false if there's uncertainty
        return;
      }

      // Assuming that the creation transaction is the first one
      const creationTransaction = data.result[0];

      if (
        creationTransaction &&
        creationTransaction.from.toLowerCase() ===
          connectedWalletAddress.toLowerCase()
      ) {
        this.isContractOwner = true;
      } else {
        this.isContractOwner = false;
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
      this.showLiquidityInputs = true;
    },
    async confirmAddLiquidity() {
      try {
        // Validation
        if (
          this.tokenPercentageForLiquidity <= 0 ||
          this.tokenPercentageForLiquidity > 100
        ) {
          alert("Please enter a valid token percentage between 1 and 100.");
          return;
        }
        if (this.ethAmountForLiquidity <= 0) {
          alert("Please enter a valid ETH amount.");
          return;
        }

        // Calculate token amount based on percentage
        const totalTokenSupply =
          await this.currentContractDetails.totalSupply();
        const tokenAmount = totalTokenSupply
          .mul(this.tokenPercentageForLiquidity)
          .div(100);

        // Convert ETH amount to Wei
        const ethAmountInWei = ethers.utils.parseEther(
          this.ethAmountForLiquidity.toString()
        );

        // Execute addLiquidity function with the calculated values
        await this.addLiquidityFinal(tokenAmount, ethAmountInWei);

        // Reset input values
        this.tokenPercentageForLiquidity = 0;
        this.ethAmountForLiquidity = 0;
        this.showLiquidityInputs = false;
      } catch (error) {
        console.error("Error confirming liquidity addition:", error);
      }
    },

    async addLiquidityFinal(tokenAmount, ethAmountInWei) {
      try {
        const UNISWAP_ROUTER_ABI =
          require("@uniswap/v2-periphery/build/IUniswapV2Router02.json").abi;

        const UNISWAP_ROUTER_ADDRESS =
          "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

        const tokenAddress = this.selectedContract;
        const signer = this.provider.getSigner();
        // Fetch the ABI from local storage
        const deployedContracts = JSON.parse(
          localStorage.getItem("deployedContracts")
        );
        const currentContract = deployedContracts.find(
          (c) => c.address === tokenAddress
        );
        if (!currentContract) {
          throw new Error("Contract not found in local storage");
        }
        const tokenABI = currentContract.abi;

        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenABI,
          signer
        );
        // ERC20_ABI is the standard ABI for ERC20 tokens

        // 1. Approve the Uniswap router to spend your tokens
        const amountTokenDesired = ethers.utils.parseUnits(
          (
            (this.tokenPercentageForLiquidity / 100) *
            this.tokenSupply
          ).toString(),
          18
        ); // Convert percentage to actual token amount
        const approveTx = await tokenContract.approve(
          UNISWAP_ROUTER_ADDRESS,
          amountTokenDesired
        );
        await approveTx.wait();

        // 2. Call the addLiquidityETH function on the Uniswap router
        const routerContract = new ethers.Contract(
          UNISWAP_ROUTER_ADDRESS,
          UNISWAP_ROUTER_ABI,
          signer
        ); // UNISWAP_ROUTER_ABI is the ABI for the Uniswap router

        const amountETHDesired = ethers.utils.parseEther(
          this.ethAmountForLiquidity.toString()
        );
        const amountTokenMin = amountTokenDesired; // 95% of desired amount to account for price movement
        const amountETHMin = amountETHDesired; // 95% of desired amount to account for price movement
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

        const liquidityTx = await routerContract.addLiquidityETH(
          tokenAddress,
          amountTokenDesired,
          amountTokenMin,
          amountETHMin,
          signer.getAddress(),
          deadline,
          { value: amountETHDesired }
        );
        await liquidityTx.wait();

        alert("Liquidity added successfully!");
      } catch (error) {
        console.error("Error adding liquidity:", error);
        alert(
          "Error adding liquidity. Please check the console for more details."
        );
      }
    },

    lockLiquidity() {
      // Add your lockLiquidity method implementation here
    },
  },
  async created() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    // Determine current network and set up initial links
    await this.setupNetworkLinks();

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
  width: 900px !important;
  background-color: var(--component-bg-color);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: var(--text-color);

  /* font-family: var(--font-family); */
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
  /* color: white; */
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
  overflow: auto;
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
