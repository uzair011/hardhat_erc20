const { network, getNamedAccounts, deployments } = require("hardhat")
const { verify } = require("../utils/verify")
const {
    INITIAL_SUPPLY,
    developmentChains,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const ourToken = await deploy("OurToken", {
        from: deployer,
        args: [INITIAL_SUPPLY],
        log: true,
        waitConfirmations: network.config.waitConfirmations || 1,
    })
    log(`OurToken is deployed. The address is: ${ourToken.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(ourToken.address, [INITIAL_SUPPLY])
    }
}
module.exports.tags = ["all", "token"]
