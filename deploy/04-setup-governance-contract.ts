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
    const proposerRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    const proposerTx = await timeLock.grantRole(proposerRole, governor.address)
    await proposerTx.wait(1)
    const executorRoleTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
    await executorRoleTx.wait(1)
    const revokeTx = await timeLock.revokeRole(adminRole, deployer)  //revoking admin role from deployer so now nobody owns TimeLock controller
    await revokeTx.wait(1)
}

export default setupContracts;