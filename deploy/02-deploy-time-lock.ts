import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// import { ethers } from "hardhat";
import {MIN_DELAY} from "../helper-hardhat-config";
import * as dotenv from "dotenv";

const deployTimeLock: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const { getNamedAccounts, network, deployments } = hre;
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    dotenv.config();
    const admin = process.env.ADMIN;
    log("Deploying Time Lock")
    const timeLock = await deploy("Timeock",{
        from: deployer,
        args: [MIN_DELAY, [], [], admin],
        log: true
    }
    ) 
}
export default deployTimeLock;