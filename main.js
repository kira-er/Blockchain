const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor (fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash =' ') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash()
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) != Array(difficulty +1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransaction = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block ("10/09/2019", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length-1];
    }

    minePendingTransaction(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransaction);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined");
        this.chain.push(block);

        this. pendingTransaction = [ new Transaction(null, miningRewardAddress, this.miningReward) ];
    }

    ceateTransaction(transaction) {
        this.pendingTransaction.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash != currentBlock.calculateHash()){
                return false;
        }

            if (currentBlock.previousHash != previousBlock.hash){
                return false;
            }

            return true;
        }
    }
}

let test = new Blockchain();

test.ceateTransaction(new Transaction("address1", "anddress2", 100));
test.ceateTransaction(new Transaction("address2", "address1", 500));

console.log("Starting the miner...")
test.minePendingTransaction("miner-address");

console.log("Balance of miner: " + test.getBalanceOfAddress("miner-address"));

console.log("Starting the miner...")
test.minePendingTransaction("miner-address");

console.log("Balance of miner: " + test.getBalanceOfAddress("miner-address"));