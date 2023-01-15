const deck = require ('../game');

test('test to see if the dealer wins with 21', () => {
var dealerHand = ["SA", "DK"];
var dealerScore = updateTotal(dealerHand);
var win = false;
if(dealerScore == 21 && dealerHand.length == 2){
    win = true;
}
expect(win == true);
});