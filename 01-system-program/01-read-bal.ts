import * as Web3 from '@solana/web3.js';

async function main () {
    const publicKey = new Web3.PublicKey('7kh1A6vRzd8VfjQBN7rigxbnHTo8UsQ73JqwWoEwiNXk');

    const url = Web3.clusterApiUrl('devnet');
    const connection = new Web3.Connection(url);

    const balance = await connection.getBalance(publicKey);
    console.log('balance', balance);
}

main();