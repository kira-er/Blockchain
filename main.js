const {Blockchain, Transaction} = require('./blockchain');

let test = new Blockchain();

test.ceateTransaction(new Transaction("address1", "anddress2", 100));
test.ceateTransaction(new Transaction("address2", "address1", 500));

console.log("Starting the miner...")
test.minePendingTransaction("miner-address");

console.log("Balance of miner: " + test.getBalanceOfAddress("miner-address"));

console.log("Starting the miner...")
test.minePendingTransaction("miner-address");

console.log("Balance of miner: " + test.getBalanceOfAddress("miner-address"));