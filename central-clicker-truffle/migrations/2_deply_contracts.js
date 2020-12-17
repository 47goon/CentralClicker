const Points = artifacts.require("./points.sol");
const Items = artifacts.require("./items.sol");

module.exports = function (deployer) {
  deployer.deploy(Points);
  deployer.deploy(Items);
};
