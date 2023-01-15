
//block for handeling decks and hands of player(s) and dealer
var cards = [];
var suits = ["spades", "hearts", "clubs", "diamonds"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var playerHand = [];
var dealerHand = [];

//card count will keep track of number of cards that came out before the 
//game has to make a new deck... similar to the casino style
var cardCount = 0;

//we start new players with $1000 in order to give them 100 chances by
//default.
var playerWallet = 1000;

var endplay   = false;

//these are the variables that are outputed to the browser screen.
var prompt = document.getElementById('prompt');
var output = document.getElementById('output');
var dealerHolder = document.getElementById('dealerHolder');
var playerHolder = document.getElementById('playerHolder');
var playerScoreOutput = document.getElementById('playerScoreOutput');
var dealerScoreOutput = document.getElementById('dealerScoreOutput');
var dollarValue = document.getElementById('dollars');

//this will make the players have to increase their bet in order to play the game.
document.getElementById('mybet').onchange = function () {
    if (this.value < 0) {
        this.value = 0;
    }
    if (this.value > playerWallet) {
        this.value = playerWallet;
    }
}

//this is the code block that actually builds the decks and sets the values to
//their respected css cards 
for (s in suits) {
    var suit = suits[s][0].toUpperCase();
    var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
    for (n in numb) {
        var cardValue = (n > 9) ? 10 : parseInt(n) + 1;
        //card suits will be read in with this block here in order 
        //to make them an object.
        var card = {
            suit: suit,
            icon: suits[s],
            bgcolor: bgcolor,
            cardnum: numb[n],
            cardvalue: cardValue
        }
        cards.push(card);
    }
}



function Start() {
    console.log("Game Started :)");
    shuffleDeck(cards);
    dealNew();
    document.getElementById('start').style.display = 'none';
    dollarValue.innerHTML = playerWallet;
}

//here below this line I would like to make 
//a function called end game in order for us 
//to be able to end the game and go to another
//screen -> like a log out or something.

//we use dealNew in order to reset the round. 
function dealNew() {
    console.log("dealNew()");
    dealerScoreOutput.innerHTML = "?";
    playerHand = [];
    dealerHand = [];
    dealerHolder.innerHTML = "";
    playerHolder.innerHTML = "";
    var bet = document.getElementById('mybet').value;
    playerWallet = playerWallet - bet;
    document.getElementById('dollars').innerHTML = playerWallet;
    document.getElementById('myactions').style.display = 'block';
    prompt.innerHTML = "Current bet is $" + bet;
    document.getElementById('mybet').disabled = true;
    document.getElementById('maxbet').disabled = true;
    deal();
    document.getElementById('btndeal').style.display = 'none';
}

//this block will recreate the deck and reset the stack of 
//cards for the player and dealer to use. This is integral.
function redeal() {
    console.log("redeal()");

    cardCount++;
    console.log("card count: " + cardCount);
    if (cardCount > 40) {
        console.log("NEW DECK");
        shuffleDeck(cards);
        cardCount = 0;
        prompt.innerHTML = "New Shuffle";
    }
}

//hands out the first two cards to all of the players
//and the dealer in order to make the game start.
function deal() {
console.log("deal()");
    for (x = 0; x < 2; x++) {
        dealerHand.push(cards[cardCount]);
        console.log("displaying dealer card");
        dealerHolder.innerHTML += cardOutput(cardCount, x);
        if (x == 0) {
        console.log("displaying cover");
            dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
        }
        redeal();
        playerHand.push(cards[cardCount]);
        playerHolder.innerHTML += cardOutput(cardCount, x);
        redeal();
    }
    var playerScore = updateTotal(playerHand);
    var dealerScore = updateTotal(dealerHand);
    if (playerScore == 21 && playerHand.length == 2) {
        endRound();
    }
    //else if(dealerScore == 21 && dealerHand.length == 2){
      //  endRound();
    //}
    
    playerScoreOutput.innerHTML = playerScore;

}

//this is how we map the cards from the stack to their
//css counterpart.
function cardOutput(n, x) {
    var typeCard = (x > 0) ? x * 60 + 100 : 100; 
    return '<div class="icard ' + cards[n].icon + '" style="left:' + typeCard + 'px;">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
        '<br></div> </div>';
}

//this button allows players to go all in 
function maxbet() {
    document.getElementById('mybet').value = 100;
}

//playable switch function in order to make sure that the game is playable.
function cardAction(a) {
    console.log(a);
    switch (a) {
        case 'hit':
            hit(); //add another card to players hand.
            break;
        case 'hold':
            endRound(); //end round and update the payout function.
            break;
        case 'double': //the good ole fashion double down function. 
            var bet = parseInt(document.getElementById('mybet').value);
            if ((playerWallet - bet) < 0) {
                bet = bet + playerWallet;
                playerWallet = 0;
            } else {
                playerWallet = playerWallet - bet;
                bet = bet * 2;
            }
            document.getElementById('dollars').innerHTML = playerWallet;
            document.getElementById('mybet').value = bet;
            hit(); 
            endRound(); 
            break;
        default:
            console.log('done'); //stay
            endRound(); 
    }
}

function hit() {
    playerHand.push(cards[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, (playerHand.length - 1));
    redeal();
    var rValu = updateTotal(playerHand);
    playerScoreOutput.innerHTML = rValu;
    if (rValu > 21) {
        prompt.innerHTML = "busted!";
        endRound();
    }
}

//endRound will reset all of the game critical peices and will update the 
//player wallet with the winnings/losings.
function endRound() {
    console.log("endRound()");
    endplay = true;
    document.getElementById('cover').style.display = 'none';
    document.getElementById('myactions').style.display = 'none';
    document.getElementById('btndeal').style.display = 'block';
    document.getElementById('mybet').disabled = false;
    document.getElementById('maxbet').disabled = false;
    prompt.innerHTML = "Game Over<br>";
    var payoutJack = 1;
    var dealervalue = updateTotal(dealerHand);
    dealerScoreOutput.innerHTML = dealervalue;

    while (dealervalue < 17) {
        dealerHand.push(cards[cardCount]);
        dealerHolder.innerHTML += cardOutput(cardCount, (dealerHand.length - 1));
        redeal();
        dealervalue = updateTotal(dealerHand);
        dealerScoreOutput.innerHTML = dealervalue;
    }

    
    var playerScore = updateTotal(playerHand);
    if (playerScore == 21 && playerHand.length == 2) {
        prompt.innerHTML = "Blackjack Baby!!! ";
        payoutJack = 1.5;
        
    }
    //below is some code that I was trying to use in order to deal with a dealer who gets dealt
    //21 in the first two cards.

    //else if (dealerScore == 21 && playerHand.length ==2){
      //  prompt.innerHTML = "Hey it's not the Dealers Fault. It's the house's. ";
    //}
    //else if ((dealerScore == 21 && playerHand.length ==2) && (playerScore == 21 && playerHand.length ==2)){
       // prompt.innerHTML = "Wow, that doesn't happen everyday. A ";
    //}


    var bet = parseInt(document.getElementById('mybet').value) * payoutJack;
    if ((playerScore < 22 && dealervalue < playerScore) || (dealervalue > 21 && playerScore < 22)) {
        prompt.innerHTML += '<span style="color:green;">You WIN: $' + bet + '</span>';
        playerWallet = playerWallet + (bet * 2);
        
    } else if (playerScore > 21) {
        prompt.innerHTML += '<span style="color:red;">Dealer Wins! You lost $' + bet + '</span>';
        
    } else if (playerScore == dealervalue) {
        prompt.innerHTML += '<span style="color:blue;">PUSH!</span>';
        playerWallet = playerWallet + bet;
        
    } else {
        prompt.innerHTML += '<span style="color:red;">Dealer Wins! You lost $' + bet + '</span>';
        
    }
    playerScoreOutput.innerHTML = playerScore;
    dollarValue.innerHTML = playerWallet;
    newDeal();
}

//this will show what the score of the player and the dealer.
function updateTotal(arr) {
    var cardV = 0;
    var aceAdjust = false;
    for (var i in arr) {
        if (arr[i].cardnum == 'A' && !aceAdjust) {
            aceAdjust = true;
            cardV = cardV + 10;
        }
        cardV = cardV + arr[i].cardvalue;
    }

    if (aceAdjust && cardV > 21) {
        cardV = cardV - 10;
    }
    return cardV;
}


//shuffles the made deck in order to make the game run like casino blackjack.
function shuffleDeck(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//will pop the card from the stack and assign the color, suit, and value for the card.
function outputCard() {
    output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor + "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
}