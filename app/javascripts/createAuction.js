var accounts;
var account;
var auctions;
var currentBlockNumber;
var auctionHouseContract;
var sampleNameContract;

function setStatus(message) {
  var status = document.getElementById("statusMessage");
  status.innerHTML = message;
};

function setAuctionStatus(message) {
  var status = document.getElementById("auctionstatus");
  status.innerHTML = message;
};

function updateAddress() {
    var address = document.getElementById("address");
    address.innerHTML = account;

    var ethBalance = document.getElementById("ethBalance");
    web3.eth.getBalance(account, function(err, bal) {
	ethBalance.innerHTML = web3.fromWei(bal, "ether") + " ETH";
    });
}

function updateNetwork() {
    var network = document.getElementById("network");
    var provider = web3.version.getNetwork(function(err, net) {
	network.innerHTML = net;
    });
}

function updateAuctions() {
    var auctionSection = document.getElementById("userAuctions");
    var res = "";

    auctionHouseContract.getAuctionsCountForUser.call(account).then(function(count) {
	console.log("User has this many auctions " + count);
	for (var i = 0; i < count; i ++) {
	    auctionHouseContract.getAuctionIdForUserAndIdx.call(account, i).then(function(idx) {
		auctionHouseContract.getAuction.call(idx).then(function(auc) {
		    console.log("Found an auction: " + auc[3]);
		    res = res + "<br>" + auc[3] + ": " + auc[10] + " ETH";
		    auctionSection.innerHTML = res;
		});
	    });
	}
    });    
}

function createAsset() {
    var recordId = document.getElementById("nameToReserve").value;

  setStatus("Initiating transaction... (please wait)");

  sampleNameContract.addRecord(recordId, account, recordId, account, {from: account}).then(function(txnId) {
      console.log("Transaction id is : " + txnId);
      setStatus("Transaction complete!");

      sampleNameContract.owner.call(recordId).then(function(res) {
	  if (res === account) {
	      setStatus("You are the proud owner of the name: " + recordId);
	  } else {
	      setStatus("It looks like the owner of that name is: " + res);
	  }
      });
  }).catch(function(e) {
    console.log(e);
    setStatus("Error registering name. See log.");
  });
};

function createAuction() {
    var marketer = "0x536d6b87f21d8bbf23dd7f33fc3ca90e85cba0b6";

    setAuctionStatus("Initiating auction, please wait.");

    var recordId = document.getElementById("nameToAuction").value;
    sampleNameContract.owner.call(recordId).then(function(res) {
	if (!(res === account)) {
	    setAuctionStatus("Looks like you don't own that name");
	    return;
	}
	var startingPrice = web3.toWei(parseFloat(document.getElementById("startingPrice").value), "ether");
	var reservePrice = web3.toWei(parseFloat(document.getElementById("reservePrice").value), "ether");
	var deadline = currentBlockNumber + parseInt(document.getElementById("deadline").value);
	console.log("Setting deadline to " + deadline + " and current block num is " + currentBlockNumber);
	console.log("Prices, starting/reserve " + startingPrice + "/" + reservePrice);
	console.log("Marketer is: " + marketer);

	auctionHouseContract.createAuction(recordId,
			 "Auction for this unique name!",
			 sampleNameContract.address,
			 recordId,
			 deadline,
			 startingPrice,
			 reservePrice,
			 10,
			 marketer,
			 {from: account, gas:500000}).then(function(txId) {

			     setAuctionStatus("Auction created in transaction: " + txId);
			     updateAuctions();
			 });
    });
};

window.onload = function() {
  getContractAddress(function(ah_addr, sn_addr, error) {
    if (error != null) {
      setStatus("Cannot find network");
      console.log(error);
      throw "Cannot load contract address";
    }

    auctionHouseContract = AuctionHouse.at(ah_addr);
    sampleNameContract = SampleName.at(sn_addr);

    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

        accounts = accs;
        account = accounts[0];

        updateAddress();
        updateNetwork();
        updateAuctions();
        updateBlockNumber();
        watchEvents();
    });
  });
}

function watchEvents() {
    var events = auctionHouseContract.allEvents();

    events.watch(function(err, msg) {
  if(err) {
      console.log("Error: " + err);
  } else { 
      console.log("Got an event: " + msg.event);
  }
    });

    var filter = web3.eth.filter("latest");
    filter.watch(function(err, block) {
  // Call get block number on every block
  updateBlockNumber();
    });
}

function updateBlockNumber() {
    web3.eth.getBlockNumber(function(err, blockNumber) {
  currentBlockNumber = blockNumber;
  console.log("Current block number is: " + blockNumber);
    });
}
