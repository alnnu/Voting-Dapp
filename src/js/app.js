App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function (){
    return App.initWeb3()
  },
  initWeb3: function () {
    if(typeof  web3 !== 'undefined'){
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new  Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider)
    }
    return App.initContract();
  },
  initContract: function (){
    $.getJSON("Election.json", (election) => {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election)
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider)

      return App.render();
    })
  },

  render: function () {
    let electionIntance
    let loader = $("#loader")
    let content = $("#content")

    loader.show()
    content.hide()

    // Load account data
    web3.eth.getCoinbase((err,account) => {
      if (err === null){
        App.account = account;
        $("#accontAddress").html(`Your Account: ${account}`);
      }else {
        console.error(err)
      }
    })

    // Load contract data
    App.contracts.Election.deployed().then((instance) =>{
      electionIntance = instance
      return electionIntance.candidateCount();
    }).then((candidateCount) => {
      const candidatesResults = $("#candidatesResults")
      candidatesResults.empty()

      const candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (let  i = 1; i<=candidateCount; i++)
      {
        electionIntance.candidates(i).then((candidate) => {
            const id = candidate[0];
            const name = candidate[1];
            const voteCount = candidate[2];
            // Render candidate Result
            const candidateTemplate = `<tr><th>${id}</th><td>${name}</td><td>${voteCount}</td></tr>`
            candidatesResults.append(candidateTemplate)

            // Render candidate ballot option
            const  candidateOption = `<option value="${id}">${name}</ option>`
            candidatesSelect.append(candidateOption)
          })
      }
      return electionIntance.voters(App.account)
    }).then((hasVoted) => {
      if(hasVoted)
        $('form').hide()
      loader.hide()
      content.show()
    }).catch((error) => {
      console.warn((error))
    })
  },
  castVote: function (){
    const candidateId = $('#candidatesSelect').val()
    App.contracts.Election.deployed().then((i) => {
      return i.vote(candidateId, {from: App.account})
    }).then((result) => {
      $("#content").hide()
      $("#loader").show();
    }).catch((e) => {
      console.log(e)
    })
  }
}

$(() =>{
  $(window).load(() =>{
    App.init()
  })
})

