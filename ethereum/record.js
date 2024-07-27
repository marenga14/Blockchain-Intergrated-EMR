import web3 from "./web3";
//import Record from "./build/Record.json";
import { abi, contractAddress } from "../constant";

const instance = new web3.eth.Contract(abi, contractAddress);

export default instance;
