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
        total = 1000;
        start();
        setTimeout(betHandler, 100);
        $('.continue').prop('disabled', true)
    }

    const next = () => {
        start();
        setTimeout(betHandler, 100);
        $('.continue').prop('disabled', true)
    }

    const loseHandler = () => {
        $('h1').html(`You're broke!`);
        setTimeout(newGame, 2000);
    }

    const betHandler = () => {
        bet = prompt('Place your bet!');
        $('.amount-bet').html(bet);
        total -= bet;
        $('.amount').html(total);
    }

    const settleBet = () => {
        if (won === 1) {
            total += Number(bet);
            $('h1').html(`You win ${bet}!`);
        } else if (won === 2) {
            $('h1').html(`It's a tie!`);
        } else {
            $('h1').html(`You lose ${bet}!`);
            if(total<=0) {
                $('h1').html(`You're broke'`);
            }
        }
        $('.amount').html(total);
        $('.amount-bet').html(bet);
    }

    const start = () => {
        $('.stand').prop('disabled', false);
        $('.draw').prop('disabled', false);
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
    }

    const playerDraw = () => {
        player.push(cards.pop());
        $('#score').html(calc(player));
        showCards(player, '.player');
        if (calc(player) > 21) {
            won = 0;
            settleBet();
            $('.stand').prop('disabled', true);
            $('.draw').prop('disabled', true);
            $('.continue').prop('disabled', false);            
        }
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
        if (playerScore === dealerScore) {
            won = 2;
            return;
        }
        if (playerScore > 21) {
            won = 0;
            return;
        }
        if (dealerScore > 21) {
            won = 1;
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
        settleBet();
        $('.stand').prop('disabled', true);
        $('.draw').prop('disabled', true);
        $('.continue').prop('disabled', false);        
    }

    newGame();
    $('.restart').click(newGame);
    $('.continue').click(next);
    $('.draw').click(playerDraw);
});