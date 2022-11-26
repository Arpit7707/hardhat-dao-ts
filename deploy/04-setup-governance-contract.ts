import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import {ADDRESS_ZERO} from "../helper-hardhat-config"

const setupContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const { getNamedAccounts, deployments} = hre;
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    const governanceToken = await ethers.getContract("GovernanceToken", deployer)
    const governor = await ethers.getContract("GovernorContract", deployer);
    const timeLock = await ethers.getContract("Timeock", deployer);
    
    log("Setting up roles...")
    log( governor.address)
    const proposerRole = await timeLock.PROPOSER_ROLE()
    log("1")
    const executorRole = await timeLock.EXECUTOR_ROLE()
    log("2")
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()
    log("4")

    const proposerTx = await timeLock.grantRole(proposerRole, governor.address)
    log("5")
    await proposerTx.wait(1)
    log("6")
    const executorRoleTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
    log("7")
    await executorRoleTx.wait(1)
    log("8")
    const revokeTx = await timeLock.revokeRole(adminRole, deployer)  //revoking admin role from deployer so now nobody owns TimeLock controller
    log("9")
    await revokeTx.wait(1)
    log("10")
}

export default setupContracts;