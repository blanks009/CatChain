const Block = require('./block');
console.log(Block.genesis().toString());
const pshewBlock = Block.mineBlock(Block.genesis(), 'Pshew');
console.log(pshewBlock.toString());
const psheeewie = Block.mineBlock(pshewBlock, 'psheeewie');
console.log(psheeewie.toString());