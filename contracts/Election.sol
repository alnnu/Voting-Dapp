pragma solidity ^0.8.0;

contract Election {
    //read/write candidate
    string public candidate;

    function Election () public{
        candidate = "Cadidate 1";
    }
}
