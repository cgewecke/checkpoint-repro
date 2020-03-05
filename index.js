#!/usr/bin/env node

const ganache = require('ganache-core');
const pify = require('pify');
const Web3 = require('web3');

async function main(){

  const server = ganache.server({
    accounts: [{
      balance: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    }, {
      balance: '0xffffff'
    }]
  });

  await pify(server.listen)(8545);

  const web3 = new Web3('http://localhost:8545');
  const accounts = await web3.eth.getAccounts();

  try {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: web3.utils.toBN("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
      gas: 21000
    });
  } catch (err) {
    console.log('first error --> ' + err);
  }

  try {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: web3.utils.toBN("0x1"),
      gas: 21000
    });
  } catch (err) {
    console.log('second error --> ' + err);
  }

  await pify(server.close)();
}

// Main
main()
  .then()
  .catch(err => {
    console.log(err);
    process.exit(1);
  })