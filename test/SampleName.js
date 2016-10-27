contract("SampleName", function(accounts) {
    it("should create a new name record and set the owner", function() {
        var recordId = "doug.wallet";
        var owner = accounts[9];
        var eventualOwner;

        // Note that we execute addName directly instead of calling call().
        // This is because .call() will execute a read only call instead of
        // a transaction, modifying state, which is what addName requires       

        return SampleName.new().then(function(sn) {
            return sn.addRecord(recordId, owner, "doug.wallet", owner, {from:owner}).then(function(res) {
                return sn.owner.call(recordId);
            }).then(function(result) {
                eventualOwner = result;
                assert.strictEqual(eventualOwner, owner, "Owner not being set correctly");
            });
        });
    });

    it("should transfer the owner succesfully", function() {
        var firstOwner = accounts[8];
        var secondOwner = accounts[9];
        var recordId = "doug.wallet2";

        return SampleName.new().then(function(sn) {
            return sn.addRecord(recordId, firstOwner, "doug.wallet", firstOwner, {from:firstOwner}).then(function(res) {
                return sn.setOwner(recordId, secondOwner, {from:firstOwner});
            }).then(function() {
                return sn.owner.call(recordId);
            }).then(function(eventualOwner){
                assert.strictEqual(eventualOwner, secondOwner, "Transfer owner didn't work");
            });
        });
    });
});
