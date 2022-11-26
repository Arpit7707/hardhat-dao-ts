import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployBox: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const { getNamedAccounts, deployments} = hre;
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    log("deploying the box")

    const box = await deploy("Box", {
        from: deployer,
        args : [],
        log: true
    })
    //at this point the owner of box is deployer, because deployer is deploying the box contract right now

    //giving ownership of box to TimLeock
    const timeLock = await ethers.getContract("Timeock")
    const boxContract = await ethers.getContractAt("Box",box.address)
    const transferOwnerTx = await boxContract.transferOwnership(timeLock.address)
    await transferOwnerTx.wait(1)
    log("YOU DONE IT!!")
}

export default deployBox;