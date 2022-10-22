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

    //Store accounts that have voted
    mapping(address => bool) public voters;

   constructor () public{
       addCandidate("Lula");
       addCandidate("Bolsonaro");

    }


    //add a candidate
    function addCandidate(string memory _name) private{
        candidateCount ++;
        candidates[candidateCount] = Candidate(candidateCount,_name, 0);
    }

    function vote(uint _candidateId) public{

        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidateCount);

        // record that voter has voted
        voters[msg.sender] = true;


        // update candidate vote Count
        candidates[_candidateId].voteCount ++;
    }
}
