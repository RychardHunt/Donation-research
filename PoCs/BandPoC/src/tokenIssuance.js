const Web3 = require("web3");
// import BandProtocolClient from "band.js";
const BandProtocolClient = require("band.js");

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const bandClient = await BandProtocolClient.make({
  provider: web3
});

// Deploy a new community to Band Protocol
const commClient = bandClient.deployCommunity(
  "Last of Ours", // Name
  "LAST", // Symbol
  "https://media.licdn.com/dms/image/C510BAQFf7thmxiORdw/company-logo_400_400/0?e=1557964800&v=beta&t=yZciwSI7s3SPGTaWCMJPUG_TSk1S068xRRtkzPSI46M", // Logo
  "Impact Beyond Your Wildest Dreams.", // Description
  "https://lastofours.io", // URL
  "Rychard Hunt", // Creator
  "x^3 / 1000000000000000000000000000000000000000000000000000000000000000000000000", // Price equation
  "0xa1388b4be755d8a8d3ebeb089b4137be314164b3", // Voting contract
  [
    "params:commit_time", // Initial governance keys
    "params:reveal_time",
    "params:min_participation_pct",
    "params:support_required_pct"
  ],
  ["60", "60", "30", "50"], // Initial goverance values
  "(x^2 / 2000000000000000000000000000000000000)^2" // Collateral equation
);

// Log the community uniquely identifiable address
console.log(commClient.getAddress());

// Get my Band balance
console.log(await bandClient.getBalance());
// Get my community token balance
console.log(await commClient.getBalance());

// Buy 10 community tokens with price limit of 1000 Band tokens. Transaction
// will fail if buying 10 community tokens costs more than 1000 Band tokens.
await (await commClient.createBuyTransaction(
  "10000000000000000000",
  "1000000000000000000000"
)).send();

// Sell 10 community tokens with price limit of 10 Band tokens. Transaction
// will fail if selling 10 community tokens returns less than 10 Band tokens.
await (await commClient.createBuyTransaction(
  "10000000000000000000",
  "10000000000000000000"
)).send();

// Transfer 100 Band tokens to the DEADBEEF address
await (await bandClient.createTransferTransaction(
  "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
  "100000000000000000000"
)).send();

// Transfer 100 community tokens to the DEADBEEF address
await (await commClient.createTransferTransaction(
  "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
  "100000000000000000000"
)).send();
