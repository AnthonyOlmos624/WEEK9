/**
 * -Create the game WAR
 * - Needs a deck of cards with face values with suits and ranks.
 * -need to deal 26 cards each out of the 52 cards
 * - Need to iterate through the turns  with each players card
 * - ties do not score points
 * -display winner after all cards are done
 * - need to make classes for Card,Deck, and Player.
 * - iterate through the turns of each player
 * - pointing system needs to be added and ties = 0 points
 * - indicate who won at the end of the game.
 */

//create a class of CARD to represent a single card with a rank, suit, and value. 
class Card{
    constructor (rank, suit, value){
        this.rank = rank;
        this.suit = suit;
        this.value = value; 
    }
    
}
// this will represent a deck of 52 cards
class Deck{
    constructor(){
        this.cards = [];
        this.createDeck();
        this.shuffleDeck();
    }
    //Created a standard deck of cards here
    createDeck(){
        const suits = [`Spades 🗡️`,`Hearts ❤️`,`Diamonds 💎`,`Clubs 🍀` ];
        const ranks = [`2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `J`, `Q`, `K`, `A`];

        for(let suit of suits){
            for (let i = 0; i < ranks.length; i++){
                const rank = ranks[i];
                const value = i + 2;
                this.cards.push(new Card(rank, suit, value)); 
            }
        }
    }
    //this will shuffle the deck by using the Fisher-Yates algorithm explained by Jame Bubb 
    shuffleDeck(){
        for(let i = this.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; 
        }
    }
    // This will deal half the deck to each player. 
    deal(){
        const mid = Math.ceil(this.cards.length / 2);
        return [this.cards.slice(0, mid), this.cards.slice(mid)]
    }
}
// This will be the player class that will represent each player in the game. 
class Player{
    constructor(name){
        this.name = name;
        this.deck = []; 
        this.score = 0;
    }
    // Play the top card from player's deck
    playCard(){
        return this.deck.shift(); 
    }
    // Increment player's score when they win a round
    incrementScore(){
        this.score++;    
    }
}
//This class will manage the game logic and gameplay
class Game{
    constructor(){
        this.player1 = new Player(`Player 1`);
        this.player2 = new Player(`Player 2`);
        this.deck = new Deck();
        this.initializeGame();
    }
    //Will initiate the game by dealing cards to each player
    initializeGame(){
        const[player1Deck, player2Deck] = this.deck.deal();
        this.player1.deck = player1Deck;
        this.player2.deck = player2Deck
    }
    //This will play one round at a time.
    playRound(){
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();

        console.log(`Player 1 played a ${card1.rank} ${card1.suit} against Player 2 ${card2.rank} ${card2.suit}`)
        //made  an if else statement for the winners of the round. 
        if(card1.value > card2.value){
            console.log(`${this.player1.name} wins this round!\n`);
            this.player1.incrementScore();
        }else if(card1.value < card2.value){
            console.log(`${this.player2.name} wins this round!\n`);
            this.player2.incrementScore(); 
        }else{
            console.log(`It's a tie! No points awarded! 😒 \n`);
        }
    }
    //Have this start and play the full game
    playGame(){
        while(this.player1.deck.length > 0 && this.player2.deck.length > 0){
            this.playRound();
        }
        
        this.displayFinalScore();
        this.declareWinner();
    }

    // Need to display the final score for both players
    displayFinalScore(){
        console.log(`Final Scores:`);
        console.log(`${this.player1.name}: has ${this.player1.score} points`)
        console.log(`${this.player2.name} has ${this.player2.score} points`)
    }
    // Need to declare a winner
    declareWinner(){
        if(this.player1.score > this.player2.score){
            console.log(`${this.player1.name} wins the game!`);
        } else if (this.player1.score < this.player2.score){
            console.log(`${this.player2.name} wins the game!`);
        }else{
            console.log(`THE GAME WAS A TIE! 🙈`)
        }
    }

}

const warGame = new Game(); 
warGame.playGame();




