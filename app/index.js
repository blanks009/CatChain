require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bbc = new Blockchain();
const p2pServer = new P2pServer(bbc);
bbc.addBlock("psheeeeeeew");

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
    res.json(bbc.chain);
});

app.post('/mine', (req, res) =>{
    const block = bbc.addBlock(req.body.data);
    console.log(`New Block added: ${block.toString()}`);

p2pServer.syncChains();

    res.redirect('/blocks');
});

app.get('/pshew', (req, res) => {
    res.json("PSHEEEEWW");
});

app.listen(HTTP_PORT, () => console.log(`Listening on Port ${HTTP_PORT}`));
p2pServer.listen();