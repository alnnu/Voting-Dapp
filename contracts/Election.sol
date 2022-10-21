pragma solidity ^0.5.16;

contract Election {
    //define candidate
    struct Candidate{
        uint id;
        string  name;
        uint voteCount;
    }

    //mapping and feching a Candidate
    mapping(uint => Candidate) public candidates;

    //counting for the number of candidates
    uint public candidateCount;

   constructor () public{
       addCandidate("Lula");
       addCandidate("Bolsonaro");
    }


    //add a candidate
    function addCandidate(string memory _name) private{
        candidateCount ++;
        candidates[candidateCount] = Candidate(candidateCount,_name, 0);
    }
}
