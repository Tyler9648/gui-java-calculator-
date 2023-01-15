const deck = require ('../game');

test('test to see if the player wins with none natural 21', () => {
    var playerHand = ["S10", "S8"];
    var playerScore = updateTotal(playerHand);
    var dealerHand = ["S10", "S7"];
    var dealerScore = updateTotal(dealerHand);
    var win = false;
    if(playerScore > dealerScore){
        win = true;
    }
    
    expect(win == true);
});
