// import BandProtocolClient from "band.js";
const BandProtocolClient = require("band.js");

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const bandClient = await BandProtocolClient.make({
  // Provider must have administrative access
  provider: web3
});

// Create a community client pointing to an existing community address
const commClient = await bandClient.at(
  "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
);

// Send 1000 community tokens to the community escrow
await commClient.sendRevenue("1000");

// Reward reward allocation for the most recent period. Log reward ID.
console.log(
  await commClient.sendNewReward([
    ["0x53d284357ec70cE289D6D64134DfAc8E511c8a3D", "10"], // 10% of total allocation
    ["0x66f820a414680B5bcda5eECA5dea238543F42054", "30"], // 30% of total allocation
    ["0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8", "20"], // 20% of total allocation
    ["0xfCA70E67b3f93f679992Cd36323eEB5a5370C8e4", "20"], // 20% of total allocation
    ["0x229b5c097F9b35009CA1321Ad2034D4b3D5070F6", "5"], // 5% of total allocation
    ["0x1b3cB81E51011b549d78bf720b0d924ac763A7C2", "15"] // 15% of total allocation
  ])
);

// Log reward of this user for the community's second reward period
console.log(await commClient.getReward(2));

// Send a transaction to claim reward
await commClient.sendClaimReward(2);
