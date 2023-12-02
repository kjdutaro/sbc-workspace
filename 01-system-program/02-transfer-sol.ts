import * as Web3 from '@solana/web3.js';
import Dotenv from 'dotenv';
import base58 from 'bs58';
Dotenv.config();

async function main () {
    const secretKey = process.env.PRIVATE_KEY;
    const decoded = base58.decode(secretKey as any);
    const userKeypair = Web3.Keypair.fromSecretKey(decoded);

    const url = Web3.clusterApiUrl('devnet');
    const connection = new Web3.Connection(url);

    const publicKeyTo = new Web3.PublicKey('5U9v4heCdp2xJYDBjVoPdCMyyv22aH3jwFU2CKsgCsUN');
    const instruction = Web3.SystemProgram.transfer({
        fromPubkey: userKeypair.publicKey,
        toPubkey: publicKeyTo,
        lamports: Web3.LAMPORTS_PER_SOL * 1,
});
    const transaction = new Web3.Transaction();
    transaction.add(instruction);

    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [userKeypair]
    );

    console.log('txSig', signature);
   
}

main();