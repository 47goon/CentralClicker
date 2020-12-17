import Web3 from 'web3';
const NETWORK_TYPE = 'private'
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/71202ceaff0145df83b66cf95be2b791"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

let defaultAccount = {
    address: '<your sender account address>', // Replace <> with your Metamask wallet account address
    privateKey: '<private key of your sender account above>' // Replace <> with private key of your Metamask wallet account address, prefixed with 0x
}

let pointABI = [{"constant":false,"inputs":[{"internalType":"uint8","name":"new_points","type":"uint8"}],"name":"pushPoints","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint8","name":"new_points","type":"uint8"}],"name":"removePoints","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalPoints","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]
let pointAddress = '0x4e43FcEDB914f28e58D822dde08C77aaB573A3Ee'

let itemABI = [{"constant":false,"inputs":[{"internalType":"uint8","name":"pointsPerSecond","type":"uint8"},{"internalType":"uint8","name":"pointsPerClick","type":"uint8"}],"name":"createItem","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint8","name":"id","type":"uint8"}],"name":"hasItem","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getItems","outputs":[{"components":[{"internalType":"uint8","name":"id","type":"uint8"},{"internalType":"uint256","name":"pointsPerSecond","type":"uint256"},{"internalType":"uint256","name":"pointsPerClick","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"internalType":"struct Items.Item[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
let itemAddress = '0x4e43FcEDB914f28e58D822dde08C77aaB573A3Ee'
// Initialize the rating contract with web3 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const pointContract = new web3.eth.Contract(pointABI, pointAddress)
const itemContract = new web3.eth.Contract(itemABI, itemAddress)
export {
    web3,
    NETWORK_TYPE,
    defaultAccount,
    pointContract,
    itemContract
}
