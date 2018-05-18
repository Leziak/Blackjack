'use strict';
let total = 1000;
let bet = 0;
let player = [];
let dealer = [];
let cards = [];
let score = 0;
let dealerScore, playerScore;
let count = 0;
let won = false;
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
        if (won) {
            total += 2 * bet;
        } else {
            total = total;
        }
        $('.amount').html(total);
        bet = 0;
        $('.amount-bet').html(bet);
    }

    const start = () => {
        settleBet();
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
        $('.new-game').click(newGame);
    }

    const playerDraw = () => {
        player.push(cards.pop());
        $('#score').html(calc(player));
        showCards(player, '.player')
        $('.stand').click(stand);
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
        if (dealerScore > 21) {
            $('h1').html('You win!');
            won = true;
            return;
        }
        if (playerScore > 21) {
            $('h1').html('You lose!');
            won = false;
            return;
        }
        if (dealerScore > playerScore) {
            $('h1').html('You lose!');
            won = false;
        } else if (playerScore > dealerScore) {
            $('h1').html('You win!');
            won = true;
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
        // start();
    }

    newGame();



});