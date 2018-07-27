const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
    let bbc, bbc2;

    beforeEach(() => {
        bbc = new Blockchain();
        bbc2 = new Blockchain();
    });

    it ('starts with genesis block', () => {
        expect(bbc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'wc';
        bbc.addBlock(data);
        
        expect(bbc.chain[bbc.chain.length-1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        bbc2.addBlock('pshew');
        expect(bbc.isValidChain(bbc2.chain)).toBe(true);
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        bbc2.chain[0].data = 'No chick';
        expect(bbc.isValidChain(bbc2.chain)).toBe(false);
    });  
    
    it('invalidates a corrupt chain', () => {
        bbc2.addBlock('pshew');
        bbc2.chain[1].data = 'Still no chicks';
        expect(bbc.isValidChain(bbc2.chain)).toBe(false);       
    });

    it('replaces the chain with a valid chain', () => {
        bbc2.addBlock('crypto');
        bbc.replaceChain(bbc2.chain);
        expect(bbc.chain).toEqual(bbc2.chain);       
    });

    it('does not replaces the chain with one or less than or equal to length', () => {
        bbc.addBlock('caterpillar');
        bbc.replaceChain(bbc2.chain);
        expect(bbc.chain).not.toEqual(bbc2.chain);       
    });

});