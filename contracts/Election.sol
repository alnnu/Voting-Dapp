pragma solidity 0.5.16;

contract Election {
    //read/write candidate
    string public candidate;

    constructor() public{
        candidate = "Cadidate 1";
    }
}
