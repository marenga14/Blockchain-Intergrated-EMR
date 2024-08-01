# Blockchain-Intergrated EMR  System
 
## Setup
1. Download Metamask Extension from chrome
2. Set your wallet to SEPOLIA FAUCET
3. Get ETH from SEPOLIA Faucet/ contact me @kippajulius2o@gmail.com

## How to Run System

### Install depencies
```
yarn
```


### Depending on the OS yarn could be unavailable

```
npm install --global yarn
```
 
 
### Then run  yarn  to add the dependencies
 

### Run the command to start the project
 ```
yarn dev
```

## Whenever there is a change in Solidity code
1. Take the cotract, edit test it on Remix and deploy it on the network (sepolia -> injected network)
2. After deployment copy the address and the ABI from the compiler deploy and compiler tab in the Remix respectively
3. Add the contract address and ABI on the constant.js file at the root of the project.

### Incase one wants to use the hardhat, on the ethereum follow the steps
####  NB: Remember to take the abi from the build/ artifacts and the contract address on the terminal everytime.
```
cd ethereum
node compile.js
node deploy.js
```


