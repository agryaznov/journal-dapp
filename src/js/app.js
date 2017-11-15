App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    // Load addresses
    $.getJSON('../students.json', function(data) {
      data.forEach(function(student,i,data){
        web3.fromWei(web3.eth.getBalance(student.address,function(err,balance){
          console.log(balance);
          $('#students > tbody:last-child').append('<tr> \
          <th scope="row">'+student.name+'</th> \
          <td>'+student.address+'</td>  \
          <td>'+balance+'</td></tr>  \
          ');
        }));
      });
    });
  },

  bindEvents: function() {

  },

  markAdopted: function(adopters, account) {

  },

  handleAdopt: function(event) {

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
