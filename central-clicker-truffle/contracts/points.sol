// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

pragma experimental ABIEncoderV2;

contract Points {
    mapping (address => uint8) private points;
    
    function pushPoints(uint8 new_points) public {
        require(new_points > 0, "Points must be non-zero and non-negative number");
        points[msg.sender] += new_points;
    }

    function removePoints(uint8 new_points) public {
        require(new_points > 0, "Points must be non-zero and non-negative number");
        points[msg.sender] -= new_points;
    }
    
    function getTotalPoints() public view returns (uint8) {
        return points[msg.sender];
    }
}