const deck = require ('../game');

test('test to see if the player wins with none 21', () => {
    var playerHand = ["SA", "DK"];
    var playerScore = updateTotal(playerHand);
    var win = false;
    if(playerScore == 21 && playerHand.length == 2){
        win = true;
    }
    expect(win == true);
});