import { publicKey } from '@project-serum/borsh';
import * as Web3 from '@solana/web3.js'
import Dotenv from 'dotenv';
import base58 from 'bs58';
Dotenv.config();



async function main() {
    const publickey = new Web3.PublicKey('5U9v4heCdp2xJYDBjVoPdCMyyv22aH3jwFU2CKsgCsU');
    const secretKey = process.env.PRIVATE_KEY;
    const decoded = base58.decode(secretKey as any);
    const programID = new Web3.PublicKey('F93n56xAZK2mX8LEwJ7cHTz24QjbUXqgCJP5psH5ShjA');
    const userKeypair = Web3.Keypair.fromSecretKey(decoded);
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: publickey,
                isSigner: true,
                isWritable: false,
            }
        ],
        data: Buffer.alloc(20),
        programId: programID,
    });
    const url = Web3.clusterApiUrl('devnet');
    const connection = new Web3.Connection(url);
    const transaction = new Web3.Transaction();
    transaction.add(instruction);

    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [userKeypair]
    )
    console.log('SIGNATURE', signature)
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err)
    });