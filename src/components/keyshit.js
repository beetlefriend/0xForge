const crypto = require('crypto');

const generateHashChain = (secret, chainLength) => {
  const chain = [crypto.createHash('sha256').update(secret).digest('hex')];
  for (let i = 1; i < chainLength; i++) {
    chain.push(crypto.createHash('sha256').update(chain[i - 1]).digest('hex'));
  }
  return chain.reverse();
};

const secret = 'Four_zeros_from_askaban';
const chainLength = 10000000;
const hashChain = generateHashChain(secret, chainLength);
console.log('Terminating hash:', hashChain[0]);



const verifyGameHash = (gameNumber, gameHash, terminatingHash) => {
    let currentHash = gameHash;
    for (let i = 0; i < gameNumber; i++) {
      currentHash = crypto.createHash('sha256').update(currentHash).digest('hex');
    }
    return currentHash === terminatingHash;
  };