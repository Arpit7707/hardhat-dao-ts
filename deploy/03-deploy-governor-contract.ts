import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE} from "../helper-hardhat-config"
import { ethers } from "hardhat";

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const { getNamedAccounts, deployments} = hre;
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    const governanceToken = await ethers.getContract("GovernanceToken", deployer);
    const timeLock = await ethers.getContract("Timeock", deployer);
    log("Deployong Governor Contract")
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [governanceToken.address, timeLock.address, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE ],
        log: true,
    })
}

export default deployGovernorContract;