// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

pragma experimental ABIEncoderV2;

contract Items{
    struct Item {
        uint8 id;   // short name (up to 32 bytes)
        uint pointsPerSecond; // number of accumulated votes
        uint pointsPerClick;
        address owner;
    }

    uint8 _id = 0;
    mapping (uint8 => Item) items_list;

    mapping (address => Item[]) itemList;
    

    function createItem(uint8 pointsPerSecond, uint8 pointsPerClick) public returns (uint8) {
        require(pointsPerSecond > 0, "Points per second must be non-zero and non-negative number");
        Item memory newItem = Item(_id, pointsPerSecond, pointsPerClick, msg.sender);
        
        items_list[_id] = newItem;
        itemList[msg.sender].push(newItem);
        
        _id++;
        
        
        return _id;
    }
    
    function hasItem(uint8 id) public view returns (bool) {
        require(id < _id, "Item ID out of range");
        require(items_list[id].owner == msg.sender, "You must be the owner of the item to get it");
        
        return true;
    }
    
    function getItems() public view returns (Item[] memory) {
        return itemList[msg.sender];
    }
}