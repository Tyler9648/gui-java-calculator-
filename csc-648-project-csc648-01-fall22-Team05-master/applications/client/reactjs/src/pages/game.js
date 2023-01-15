import React, {useRef, useEffect, useState} from "react";
import "../assets/gameboard.css";
import Button from 'react-bootstrap/Button';
import Navbar from '../components/Navbar';
import { renderToString } from 'react-dom/server';
import backgroundImage from '../assets/images/background.jpg';


function Game(){

var cards = [];
const refCards = useRef(new Array());

var suits = ["spades", "hearts", "clubs", "diamonds"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var playerHand = [];
const refPlayerHand = useRef(new Array());

var dealerHand = [];
const refDealerHand = useRef(new Array());

var cardCount = 0;
var refCardCount = useRef(0);

var playerWallet = 1000;
var refPlayerWallet = useRef(1000);
var endplay   = false;


//useRef(null); //document.getElementById('message');
var output = useRef(null);           //document.getElementById('output');
//const dealerHolder = React.useRef<HTMLDivElement>(null);               //document.getElementById('dealerHolder');
var dealerHolder = useRef(null);



var playerHolder = useRef(null);          //document.getElementById('playerHolder');
var pValue = useRef("");                //document.getElementById('pValue');
var dValue = useRef("");            //document.getElementById('dValue');
var dollarValue = useRef(null);           //document.getElementById('dollars');

var mybet = useRef(0);

//var mybetInputDisabled = new Boolean();
//var maxbetButtonDisabled = false;

var startEl = useRef(null);
//var startElStyleDisplay;

var btndeal = useRef(null);
//var btndealStyleDisplay;

var cover = useRef(null);
//var coverStyleDisplay;

var numOfPlayerCards = useRef(0);

var numOfDealerCards = useRef(0);

//var maxbet = useRef(null);

//var myactions = useRef(initialValue);

const [message, setMessage] = useState("Press Start Button");
const [myactionsStyleDisplay, setmyactionsStyleDisplay] = useState("");

const [btndealStyleDisplay, setbtndealStyleDisplay] = useState("");
const [startElStyleDisplay, setStartElStyleDisplay] = useState("");
const [coverStyleDisplay, setCoverStyleDisplay] = useState("");
const [maxbetButtonDisabled, setmaxbetButtonDisabled] = useState(false);
const [mybetInputDisabled, setmybetInputDisabled] = useState(false);

var [dealerHolderCards, setDealerHolderCards] = useState("");
var tempDealerHolderCards = "";

//var [playerHolderCards, setPlayerHolderCards] = useState("");
var playerHolderCards = useRef("");
var tempPlayerHolderCards = "";
//var tempPlayerHolderCards = useRef(null);

var [playerAddedCards, setPlayerAddedCards] = useState("");

useEffect(() => {
console.log("useEffect() dealerHolderCards -> " + dealerHolderCards);
},

 []);

function calculateMyBet(inputBet) {
console.log("check this");
    if (inputBet < 0) {
        mybet.current = 0;

    }
    if (inputBet > refPlayerWallet.current) {
    console.log("bet too big, is lowered");
        mybet.current = refPlayerWallet.current;
    }
    return mybet.current;
}

for (let s in suits) {
    var suit = suits[s][0].toUpperCase();
    var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
    for (let n in numb) {
        //output.innerHTML += "<span style='color:" + bgcolor + "'>&" + suits[s] + ";" + numb[n] + "</span> ";
        var cardValue = (n > 9) ? 10 : parseInt(n) + 1;
        //var cardValue = 1;
        var card = {
            suit: suit,
            icon: suits[s],
            bgcolor: bgcolor,
            cardnum: numb[n],
            cardvalue: cardValue
        }
        cards.push(card);
        refCards.current.push(card);
       // console.log("refCards.current[1].cardnum: " + refCards.current[0].cardnum);
       // console.log("cards: " + cards);
       // console.log("refCards.current: " + refCards.current);
    }
}
//console.log("maxBet button disabled: " + maxbetButtonDisabled);

const Start = () => {
    console.log("Game Started :)");
    console.log("maxBet button disabled: " + maxbetButtonDisabled);
    console.log("maxBet button disabled should be: false");
    shuffleDeck(cards);
    shuffleDeck(refCards.current);
    dealNew();
    setStartElStyleDisplay('none');
    dollarValue.current = refPlayerWallet.current;
}

function dealNew() {
    //dollarValue.current = "?";
    //shuffleDeck(cards);
    console.log("dealNew()");
    dValue.current = "?";
    playerHand = [];
    refPlayerHand.current = [];
    refDealerHand.current = [];
    dealerHand = [];
    dealerHolder.current = "";
    numOfPlayerCards.current = 0;
    numOfDealerCards.current = 0;


    //console.log("calling setDealerHolderCards useState in dealNew(), this message should only pop up once per game");
    //setDealerHolderCards("");
    tempDealerHolderCards = "";
    //tempPlayerHolderCards = "";
    playerHolder.current = "";
    playerHolderCards.current = "";
    setPlayerAddedCards("");
    console.log("playerAddedCards: " + playerAddedCards);

    var betvalue = mybet.current.value;
    console.log("bet value: " + betvalue);
    refPlayerWallet.current = refPlayerWallet.current - betvalue;
    dollarValue.current = refPlayerWallet.current;
    setmyactionsStyleDisplay('block');
    console.log("get up to 21 and beat the dealer to win msg");
    setMessage("Get up to 21 and beat the dealer to win.<br>Current bet is $" + betvalue);
    setmybetInputDisabled(true);
    setmaxbetButtonDisabled(true);
    console.log("maxBet button disabled: should be true");
    console.log("maxBet button disabled: " + maxbetButtonDisabled);
    deal();
    setbtndealStyleDisplay('none');
}

function redeal() {
console.log("redeal()");
    cardCount++;
    refCardCount.current++;
    console.log("card count: " + refCardCount.current);
    if (refCardCount.current > 40) {
        console.log("NEW DECK");
        shuffleDeck(cards);
        shuffleDeck(refCards.current);
        refCardCount.current = 0;
        setMessage("New Shuffle");
    }
}

function deal() {
console.log("deal()");
console.log("start of deal() maxBet button disabled: " + maxbetButtonDisabled);
    for (let x = 0; x < 2; x++) {
        dealerHand.push(cards[refCardCount.current]);
        refDealerHand.current.push(refCards.current[refCardCount.current]);
        numOfDealerCards.current += 1;
        console.log("numOfDealerCards: " + numOfDealerCards.current);
        console.log(refDealerHand.current);
        //setDealerHolderCards(cardOutput(cardCount, x));

        tempDealerHolderCards += cardOutput(refCardCount.current, x);
        console.log("x (number of cards) = " + x);


        if (x == 0) {
            console.log("cover");
            //setDealerHolderCards(dealerHolderCards + '<div id="cover" style="left:100px;"></div>');
            //dealerHolderCards += '<div id="cover" style="left:100px;"></div>';
            tempDealerHolderCards += '<div id="cover" style="left:100px;"></div>';
            //console.log(dealerHolderCards);
            console.log("tempdealerHolderCards: " + tempDealerHolderCards);
        }
        redeal();
        playerHand.push(cards[refCardCount.current]);

        refPlayerHand.current.push(refCards.current[refCardCount.current]);
        numOfPlayerCards.current++;
        //playerHolder.current += cardOutput(cardCount, x);
        tempPlayerHolderCards += cardOutput(refCardCount.current, x);

        redeal();
    }
    playerHolderCards.current += tempPlayerHolderCards;
    console.log("refPlayerHand.current: " + refPlayerHand.current);
    console.log("refDealerHand.current: " + refDealerHand.current);
    var playerScore = checktotal(refPlayerHand.current); //playerhand
    var dealerScore = checktotal(refDealerHand.current);
    if (playerScore == 21 && playerHand.length == 2) {
        endRound();
    }
    //else if(dealerScore == 21 && dealerHand.length == 2){
      //  endRound();
    //}

    pValue.current = playerScore;
    console.log("end of deal() maxBet button disabled: " + maxbetButtonDisabled);
    console.log("calling setDealerHolderCards useState");
    setDealerHolderCards(tempDealerHolderCards);
}

function cardOutput(n, x) {
    var typeCard = (x > 0) ? x * 60 + 100 : 100;
    return '<div class="icard ' + refCards.current[n].icon + '" style="left:' + typeCard + 'px;">  <div class="top-card suit">' + refCards.current[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + refCards.current[n].cardnum +
        '<br></div> </div>';
            //return '<div class="icard ' + cards[n].icon + '" style="left:' + typeCard + 'px;">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
              //  '<br></div> </div>';
}

function maxbet() {

pValue.current = "";
dValue.current = "";
    console.log("maxbet()");
    //mybet.current = refPlayerWallet.current;
    mybet.current.value = 100;//refPlayerWallet.current;
    setMessage("Bet changed to $" + 100); //refPlayerWallet.current

}

function cardAction(a){
    console.log(a);
    switch (a) {
        case 'hit':
            addCard(); //add another card to players hand
            break;
        case 'hold':
            endRound(); //end round and update the payout function
            break;
        case 'double':
        console.log("double called");
            var betvalue = mybet.current.value;
            console.log("refplayerwalletcurrent: " + refPlayerWallet.current);
            if ((refPlayerWallet.current - betvalue) < 0) {
                betvalue = betvalue + refPlayerWallet.current.value;
                refPlayerWallet.current = 0;
                            console.log("if: refplayerwalletcurrent: " + refPlayerWallet.current);
            } else {
                refPlayerWallet.current = refPlayerWallet.current - betvalue;
                betvalue = betvalue * 2;
                            console.log("else: refplayerwalletcurrent: " + refPlayerWallet.current);
            }
            console.log("after: refplayerwalletcurrent: " + refPlayerWallet.current);
            dollarValue.current = refPlayerWallet.current.value;
            mybet.current.value = betvalue;
            addCard();
            endRound();
            break;
        default:    //stay
            console.log('done');
            endRound();
    }
}

function addCard() {
console.log("addCard()");
console.log("cardCount: " + cardCount);
console.log("refCardCount: " + refCardCount.current);
console.log("cards array: " + cards);
console.log("refCArds array: " + refCards.current);
console.log("numOfPlayerCards.current: " + numOfPlayerCards.current);
    playerHand.push(cards[cardCount]);
    //refPlayerHand.current.push(cards[cardCount]);
    refPlayerHand.current.push(refCards.current[refCardCount.current]);
    //playerHolder.current += cardOutput(cardCount, (playerHand.length - 1));
    tempPlayerHolderCards += cardOutput(refCardCount.current, (numOfPlayerCards.current));
    numOfPlayerCards.current++;
    redeal();
    var rValu = checktotal(refPlayerHand.current);
    pValue.current = rValu;
    console.log("refPlayerHand.current: " + refPlayerHand.current);
    console.log("rValu: " + rValu);
    console.log("pValue.current: " + pValue.current);
    if (rValu > 21) {
        setMessage("busted!");
        endRound();
    } else {
    //console.log("call setPlayerHolderCards useState");
    //setPlayerHolderCards(playerHolderCards + tempPlayerHolderCards);
    //playerHolderCards.current += tempPlayerHolderCards;
    console.log("playerHolderCards.current is: " + playerHolderCards.current);
    //setDealerHolderCards(dealerHolderCards +tempDealerHolderCards);
    setPlayerAddedCards(playerAddedCards + tempPlayerHolderCards);
    }
}

function endRound() {
    console.log("endRound()");
    endplay = true;
    setCoverStyleDisplay('none');
    setmyactionsStyleDisplay('none');
    setbtndealStyleDisplay('block');
    setmybetInputDisabled(false);
    setmaxbetButtonDisabled(false);
    console.log("maxBet button disabled = " + maxbetButtonDisabled);
    setMessage("Game Over<br>");
    var payoutJack = 1;
    var dealervalue = checktotal(refDealerHand.current);
    dValue.current = dealervalue;

    while (dValue.current < 17) { //dealervalue
        refDealerHand.current.push(refCards.current[refCardCount.current]);
        numOfDealerCards.current++;
        //setDealerHolderCards(cardOutput(cardCount, (dealerHand.length - 1))); // also try =+ dealerHolderCards
        console.log("dealerHand.length: " + refDealerHand.current - 1);
        console.log("numOfDealerCards: " + numOfDealerCards.current);

        tempDealerHolderCards += cardOutput(refCardCount.current, (numOfDealerCards.current - 1));
        console.log("while dealervalue < 17, dealerHolderCards: " + tempDealerHolderCards); //dealerHolderCards
        redeal();
        dealervalue = checktotal(refDealerHand.current);
        dValue.current = dealervalue;
        //console.log("calling setDealerHolderCards useState");
        //setDealerHolderCards(dealerHolderCards + tempDealerHolderCards)
    }


    var playerScore = checktotal(refPlayerHand.current);
    console.log(refPlayerHand.current);
    if (playerScore == 21 && playerHand.length == 2) {
        setMessage("Blackjack Baby!!! ");
        payoutJack = 1.5;

    }
    //else if (dealerScore == 21 && playerHand.length ==2){
      //  message.innerHTML = "Hey it's not the Dealers Fault. It's the house's. ";
    //}
    //else if ((dealerScore == 21 && playerHand.length ==2) && (playerScore == 21 && playerHand.length ==2)){
       // message.innerHTML = "Wow, that doesn't happen everyday. A ";
    //}

    var betvalue = parseInt(mybet.current.value) * payoutJack;
    console.log("value of betvalue: " + betvalue);
    if ((playerScore < 22 && dealervalue < playerScore) || (dealervalue > 21 && playerScore < 22)) {
        setMessage(message + '<span style="color:green;">You WIN: $' + betvalue + '</span>');
        refPlayerWallet.current = refPlayerWallet.current + (betvalue * 2);

    } else if (playerScore > 21) {
        setMessage(message + '<span style="color:red;">Dealer Wins! You lost $' + betvalue + '</span>');

    } else if (playerScore == dealervalue) {
        setMessage(message + '<span style="color:blue;">PUSH!</span>');
        refPlayerWallet.current = refPlayerWallet.current + betvalue;

    } else {
        setMessage(message + '<span style="color:red;">Dealer Wins! You lost $' + betvalue + '</span>');

    }
    console.log("betvalue: " + betvalue);
    pValue.current = playerScore;
    dollarValue.current = refPlayerWallet.current;
    //dealNew();
            console.log("calling setDealerHolderCards useState");
            setDealerHolderCards(dealerHolderCards + tempDealerHolderCards);

            //console.log("calling setPlayerHolderCards useState");
            //setPlayerHolderCards(playerHolderCards + tempPlayerHolderCards);
            playerHolderCards.current += tempPlayerHolderCards
}

function checktotal(arr) {
    var rValue = 0;
    var aceAdjust = false;
    for (var i in arr) {
        if (arr[i].cardnum == 'A' && !aceAdjust) {
            aceAdjust = true;
            rValue = rValue + 10;
        }
        rValue = rValue + arr[i].cardvalue;
    }

    if (aceAdjust && rValue > 21) {
        rValue = rValue - 10;
    }
    return rValue;
}

function shuffleDeck(array) {
console.log("shuffling deck of " + array.length + " cards");
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//function outputCard() {
//    output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor + "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
//}


    return (
       <div> <Navbar/>

      <div style={{backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', width: '100%', height: '100%', backgroundSize: 'cover'}}>

        <meta charSet="utf-8" />
        <title>BabyBlackJack</title>
        <link rel="stylesheet" href="gameboard.css" />
        <div>
          <div>
            <h1>BabyBlackJack</h1>
            <div id="start" ref={startEl} style={{display: startElStyleDisplay}}>
              <button id="btnstart" type="button" onClick={Start} className="btn">Start Game</button>
            </div>
            <div ref={output} id="output">
              <div id="cards">
                Cursed Dealer: <span className="dValue" ref={dValue} dangerouslySetInnerHTML={{__html: dValue.current}}/>
                <div id="dealerHolder" dangerouslySetInnerHTML={{__html: dealerHolderCards}}/>
                Player: <span className="pValue" ref={pValue} dangerouslySetInnerHTML={{__html: pValue.current}} />

                <div id="playerHolder" dangerouslySetInnerHTML={{__html: playerHolderCards.current + playerAddedCards}}/>
              </div>
              <div id="myactions" style={{display: myactionsStyleDisplay}}>
                <button id="btnstay" type="button" onClick={() => {cardAction('stay');}} className="btn">stay</button>
                <button id="btnhit" type="button" onClick={() => {cardAction('hit');}} className="btn">Hit</button>
                <button id="btndouble" type="button" onClick={() => {cardAction('double');}} className="btn">Double</button>
              </div>
              <div id="deal">
                <button ref={btndeal} style={{display: btndealStyleDisplay}} type="button" onClick={() => { dealNew(); setPlayerAddedCards("");}} className="btn">Play Again?</button>
              </div>
              <div className="Wallet">Wallet: $<span ref={dollarValue}>{renderToString(refPlayerWallet.current)}</span>
                <br />Bet: $<input type="number" ref={mybet} disabled={mybetInputDisabled} defaultValue={10} min={10} max={100}
                onChange={(e) => {
                calculateMyBet(e.target.value);
                }}
                />


                <br/>
                <button id="maxbet" type="button" disabled={maxbetButtonDisabled} onClick={() => {maxbet();}} className="btn">Max Bet</button>

              </div>
              <div id="message">
                <div dangerouslySetInnerHTML={{__html: message}}/>

              </div>
            </div>
          </div></div></div></div>
    );
}

export default Game;