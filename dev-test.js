const Blockchain = require('./blockchain');

const bbc = new Blockchain();

for(let i=0; i<11; i++){
    console.log(bbc.addBlock(`Pshew ${i}`).toString());
}


