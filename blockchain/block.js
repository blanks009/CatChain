const SHA256 = require('crypto-js/SHA256');

const { DIFFICULTY, MINE_RATE } = require('../config');



class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString(){
        return `Block -
            Timestamp   : ${this.timestamp}
            Last Hash   : ${this.lastHash.substring(0, 10)}
            Hash        : ${this.hash.substring(0, 10)}
            Data        : ${this.data}
            Nonce       : ${this.nonce}
            Difficulty  : ${this.difficulty}`;       
    }

    static genesis(){
        return new this('Peanut Butter Jelly Time','-----', 'f1r5t-h45h',[], 0, DIFFICULTY);
    }

    static mineBlock (lastBlock,data){
        let hash, timestamp;
        let { difficulty } = lastBlock;
        const lastHash = lastBlock.hash;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp,lastHash,data, nonce, difficulty);
        }while(hash.substr(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash (timestamp, lastHash,data, nonce, difficulty){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty +1 : difficulty -1;

        return difficulty;
    }

    static hashBlock (block){
       const {timestamp, lastHash, data, nonce, difficulty} = block;
       return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    };
}

module.exports = Block;