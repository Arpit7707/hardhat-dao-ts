import {proposalFile, developementChains, VOTING_DELAY} from "../helper-hardhat-config";
import * as fs from "fs";
import { ethers, network } from "hardhat";
import { moveBlocks } from "../utils/move-blocks";

const index = 0;
async function main(proposalIndex: number){
   const proposals = JSON.parse(fs.readFileSync(proposalFile, "utf-8"))
   const proposalId = proposals[network.config.chainId!][proposalIndex];

   //0=Against, 1=For, 2=Abstrain
   const voteWay = 1; //in favour of proposal
   const governor = await ethers.getContract("GovernorContract")
   const reason = "I like a do da "
   const voteTxResponse = await governor.castVoteWithReason(proposalId, voteWay, reason);
   await voteTxResponse.wait(1);
   
   if(developementChains.includes(network.name)){
    await moveBlocks(VOTING_DELAY + 1);
   }
   console.log("Voted!!!")
   
}

main(index). 
then(()=>process.exit(0)).
catch((error)=>{
    console.log(error); process.exit(1)
});