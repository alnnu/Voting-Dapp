pragma solidity ^0.5.16;

contract Election {
    //read/write candidate
    struct Candidate{
        uint id;
        string  name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;

    uint public candidateCount;

   constructor () public{
       addCandidate("Lula");
       addCandidate("Bolsonaro");
    }

    function addCandidate(string memory _name) private{
        candidateCount ++;
        candidates[candidateCount] = Candidate(candidateCount,_name, 0);
    }
}
