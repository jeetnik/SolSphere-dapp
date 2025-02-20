import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";


export function SendTokens() {
    const wallet = useWallet();
    const {connection} = useConnection();

    const [Address,setAddress]=useState("");
    const [Amount,setAmount]=useState(0)

    async function sendTokens() {
    if(!wallet.publicKey){
        alert("please connect to wallet");
        return
    }else{
      try{  const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(Address),
            lamports: Amount* LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert(`Sent ${Amount} to ${Address}`);
    }catch(error){
alert(`Error:${error}`)
    }}
    }
    return <div>
        <input  type="text" placeholder="To" onChange={(e)=>{setAddress(e.target.value)}} />
        <input  type="text" placeholder="Amount" onChange={(e)=>setAmount(Number(e.target.value))} />
        <button onClick={sendTokens}>Send</button>
    </div>
}