'use strict';
let total = 1000;
let bet = 0;
let player = [];
let dealer = [];
let cards = [];
let score = 0;
let dealerScore, playerScore;
let count = 0;
let won = 0;
// let bet = 0;


$(document).ready(function () {

    const newGame = () => {
        start();
        setTimeout(betHandler, 100);
    }

    const betHandler = () => {
        bet = prompt('Place your bet!');
        $('.amount-bet').html(bet);
        total -= bet;
        $('.amount').html(total);
    }

    const settleBet = () => {
        if (won===1) {
            total += 2 * Number(bet);
            $('h1').html(`You win ${bet}!`);
        } else if(won===2){
            $('h1').html(`It's a tie!`);
            total += Number(bet);
        } else {
            $('h1').html(`You lose ${bet}!`);
        }
        $('.amount').html(total);
        bet = 0;
        $('.amount-bet').html(bet);
    }

    const start = () => {
        bet = 0;
        dealer = [];
        player = [];
        dealerScore = 0;
        playerScore = 0;
        cards = shuffleArray(generateCards());
        dealer.push(cards.pop(), cards.pop());
        player.push(cards.pop(), cards.pop());
        $('#score').html(calc(player));
        $('h1').html('');
        showCards(dealer, '.dealer');
        showCards(player, '.player');
        $('.amount').html(total);
        $('.stand').click(stand);
        $('.draw').click(playerDraw);
    }

    const playerDraw = () => {
        player.push(cards.pop());
        $('#score').html(calc(player));
        showCards(player, '.player');
        if(calc(player)>21) {
            won===0;
            settleBet();
        }
        $('.stand').click(stand);
        $('.draw').click(playerDraw);
    }

    const dealerDraw = () => {
        while (dealerScore < 18) {
            dealer.push(cards.pop());
            dealerScore = calc(dealer);
        }
        showCards(dealer, '.dealer')
    }

    const calc = (arr) => {
        count = 0;
        for (let card of arr) {
            if (card.rank === 'ace') count += 11;
            else if (card.rank === 'jack' || card.rank === 'queen' || card.rank === 'king') count += 10;
            else count += card.rank;
        }
        return count;
    }

    const showCards = (arr, select) => {
        $(select).children().remove('.card');
        arr.forEach(card => {
            document.querySelector(select).innerHTML += `<div class="card ${card.suit}-${card.rank}"></div>`
        })
    }

    const winLose = () => {
        if(playerScore===dealerScore || (playerScore>21 && dealerScore>21)) {
            won = 2;
            return;
        }
        if (dealerScore > 21) {
            won = 1;
            return;
        }
        if (playerScore > 21) {
            won = 0;
            return;
        }
        if (dealerScore > playerScore) {
            won = 0;
        } else if (playerScore > dealerScore) {
            won = 1;
        } else {
            $('h1').html('Tie!')
        }
    }


    const stand = () => {
        dealerScore = calc(dealer);
        playerScore = calc(player);
        dealerDraw();
        winLose();
        console.log(playerScore);
        console.log(dealerScore);
        settleBet();
    }

    newGame();
    $('.new-game').click(newGame);

});