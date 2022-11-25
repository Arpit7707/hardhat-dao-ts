import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment){
    const { getNamedAccounts, network, deployments } = hre;
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    log("Deploying Governance Token")
    const govenanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
    })
    log(`Deploed Governance Token to address ${govenanceToken.address}`)

    await delegate(govenanceToken.address, deployer)
    log("Delegated")
};

const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
    const tx = await governanceToken.delegate(delegatedAccount)
    await tx.wait(1)
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`)
  }

export default deployGovernanceToken;