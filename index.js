

class Card { // Represents a single card and properties

    // Private properties to be accessed by methods only
    #pointValue;
    #suit;
    #faceValue

    constructor(value, suit, faceVal) {
        // Typical card properties
        this.#pointValue = value;  // Numerical point value for comparing card with another card object
        this.#suit = suit;  // Symbol or potentially distinguishing characteristic shared by a card group (i.e., hearts, clubs, etc.)
        this.#faceValue = faceVal; // Value to allow for nonumerical values, such as Jack, Queen, King, and Ace
    }

    // Methods for accessing private properties
    getCardPointValue() {  // Returns card's point value
        return this.#pointValue;
    }

    getCardSuit() {  // Returns the card's suit (clubs, diamonds, spades, hearts)
        return this.#suit;
    } 

    getCardFaceValue() {  // Returns value stamped on card, either numerical or symbolic (Jack, Queen, King, or Ace)
        return this.#faceValue;
    }

    getCardObject() {  // Return card object
        return this;
    }

    getCardPrettyValue() {  // Returns prettyfied value of card, such as the value indicated in natural language
        return `${this.#faceValue} of ${this.#suit}`; // Example: Queen of hearts
    }
}

class Deck { // Represents a standard deck of card objects and deck operations

    // Private properties
    #size;   // Number of card objects in deck object
    #cards;  // Container for card objects
    #suits;  // Array of suits or symbols to be made available in deck
    #faces;  // Array of face types a card may have (number or face card or Ace)

    constructor() {
        
        this.#size = 52;  // Size of deck. Described above.
        this.#cards = Array(this.#size); // Array to hold card objects
        this.#suits = ['Clubs', 'Spades', 'Diamonds', 'Hearts']; // Card suits or symbols. Sorry, no Horseshoes or Balloons. These are cards not Lucky Charms.
        this.#faces = ['number', 'Jack', 'Queen', 'King', 'Ace']; // Card faces. See above.
        
        this.#assembleDeck(); // Build Deck of cards
        
        
    }

    #assembleDeck() {  // Privat method for assembling deck 
        
        // Values for dividing card deck into groups according to suits. Used for iterating through deck to create card object
        let sizeOfDeck = this.#size;
        let suitsPerDeck = this.#suits.length; // Number of available suits
        let numberOfCardsPerSuit = sizeOfDeck / suitsPerDeck;  // Divide the deck by available suits
        
        // Begin iteration of deck for creating card object
        let suitIndex = 0; // For iterating through suit values
        let faceIndex = 0; // For iterating through face values
        let startingValue = 2; // Standard deck starts count at #2 not counting Ace, which requires special handling since relative point value does not correspond to apparent printed value
        
        for (let index = 0; index < sizeOfDeck; index++) {  // Iterate through full deck for building card objects

            let cardValue = (index % numberOfCardsPerSuit) + startingValue; // Adjust offset between index and lowest card value
                                                                            // Also account of value reset at each new suit iteration

            // increment face index after 10 so 11=Jack, 12=Queen, 13=King, and 14=Ace.
            if (cardValue > 10) { 
                faceIndex++;
                //console.log(`Card Val = ${cardValue} Face Index = ${faceIndex}`);
            }

            let faceValue = this.#faces[faceIndex];  // Card Value denotes relative point value of card. Face Value denotes value printed on face of card.
            if (faceValue === 'number') {
                faceValue = cardValue; // Face value of numerical face should equal card's point value
            }

            // Create card object and insert into deck
            let suitValue = this.#suits[suitIndex];
            this.#cards[index] = new Card(cardValue, suitValue, faceValue);

            // Increment suit index at highest value of suit and reset face index to 0.
            if (cardValue > numberOfCardsPerSuit) {
                suitIndex++;
                faceIndex = 0;
            }
        }
        
        
    }

    getFullDeck() {  // Return string of all card values in current deck and in the current order
        let cardList = '';
        for (let card of this.#cards) {
            cardList += card.getCardPrettyValue() + '\n';
        }
        
        return cardList;
    }

    shuffleDeck(algorithm) { // Shuffles deck using the algorithm name passed as parameter
        let shuffleAlgorithm = new Shuffle(this.#cards, algorithm);  // Implements Shuffle class, passes in deck of card objects.
    }

    drawCard(fromTop = true) { // Removes card from either top or bottom of deck
        
        // Top of deck will be defined as index 0. Bottom defined as last element.
        let cardObj;

        if (fromTop) { // Default draw location
            cardObj = this.#cards.shift();
        } else {
            cardObj = this.#cards.pop();
        }
        //console.log(cardObj.getCardPrettyValue());

        return cardObj;
    }

    getSize() {
        this.#size = this.#cards.length;
        return this.#size;
    }
}

class Shuffle {  // Class for implementing shuffling algorithms
    
    #algorithms; // To hold container of class methods implementing a sorting or shuffling algorithm
    #algorithm; // To hold the class method object filtered from the array above 

    constructor(arrayObject, sortingMethod = 'random', colIndex) {

        this.#algorithms = [this.random, this.special, this.orderByLowest, this.orderByHighest, this.fisherYates, this.orderByValue]; // Array of sorting methods to match to string parameter representing desired algorithm
        
        this.#algorithm = this.#algorithms.filter((sortMethod) => sortMethod.name.toLowerCase() === sortingMethod.toLowerCase())[0]; // Match desired algorithm string to an existing method 

        // If algorithm match successful, then this.algorithm should point to the desired method. Otherwise this.algorithm is undefined and we default to the random method
        if (this.#algorithm === undefined) {
            this.#algorithm = this.random; // Default algorithm method
        }

        this.#algorithm(arrayObject, colIndex);  // Calls method implementing desired algorithm
    }

    // This method assigns a random number column to each card object, then sorts deck according to random number, then removes column of random numbers
    random(arrayObject) {
        // Random Sorting
        //console.log('Random Function');

        arrayObject.forEach((element, index) => {
            arrayObject[index] = [element, Math.random()]; // Creates 2 dimensional array with random number assigned to 2nd column
            
            //console.log(arrayObject[index]);
        });

        arrayObject.sort((a, b) => {
            // Defining sorting
            a = a[1]; // We want to sort the array according to the 2nd column (random number);
            b = b[1]; // next random number to compare with

            return (a === b) ? 0 : (a < b) ? -1 : 1 // Return 0, -1, or 1 depending on if equal, less, or greater. This defines the sorting.
        });

        // Now we need to discard the random number column
        arrayObject.forEach((element, index) => {
            //console.log(element[0]);
            arrayObject[index] = element[0]; // Keep only first column of each row
            //console.log(arrayObject[index]);
        });
    }

    orderByValue(arrayObject, colIndex, sortOrder = 1) { // Default ordering lowest to highest

        // Sort by point value
        arrayObject.sort((a, b) => {
            
            if (colIndex === undefined || a.length === 0) {
                a = a.getCardPointValue();
                b = b.getCardPointValue();
            } else {
                a = a[colIndex].getCardPointValue();
                b = b[colIndex].getCardPointValue();
            }

            return (a === b) ? 0 : (a < b) ? -1 * sortOrder : 1 * sortOrder;
        });
    }

    orderByLowest(arrayObject, colIndex) {
        // Alias for orderByValue method default ordering - Lowest value at index 0
        this.orderByValue(arrayObject, colIndex);
    }

    orderByHighest(arrayObject, colIndex) {
        // calling orderByValue method reverse ordering - Highest value at index 0
        this.orderByValue(arrayObject, colIndex, -1);
    }

    fisherYates(arrayObject, colIndex) {
        // An implementation of the Fisher Yates shuffling method as I am understanding it
        let shuffledArray = [];
        
        //while (arrayObject.length > 0) {
        let unshuffledItemCount = arrayObject.length;  // Initial value is total size of unshuffled array
        for (let iterator = 0; unshuffledItemCount > 0; iterator++) {  // Iterating until we have accounted for all unshuffled elements

            // Get random index value based on currently available array items 
            let randomizedIndex = parseInt(Math.random() * 100) % unshuffledItemCount--; 
            /* 
                On every iteration, we decrement the counter to indicate we have 1 less item to shuffle, but also 
                to comply with the algorithm to randomize the index of only the unshuffled items. Each permutation
                is a decreased selection until there are no more to operate on.

                The randomized index consists of random number generated from Math.random method which gives us a 
                random decimal value between 0 and 1. We multiply by 100 to give us a new range of random numbers
                between 1 and 100, more than the size of the deck or array. The parseInt method extracts the integer
                portion of the floating value. The modulus operation ensures we end up within range of desired
                elements. As we locate our random element we extract it using the array.splice method and reinsert
                the extracted element into the end of the array, thereby retaining the O(n) time complexity
                offered by the algorithm by not having to iterate through a secondary array holding the shuffled
                contents and having to copy back into our working array reference.

                source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
            */

            arrayObject.push(arrayObject.splice(randomizedIndex, 1)[0]); // Randomized element is extracted and reinserted at end of array
        }
    }

    special(arrayObject) {  // Test method for testing method search filter and dynamic execution
        console.log('This is special');  // This method is not intended to rearrange deck at this time
    }

    getSortingMethods() { // returns list of avaqilable sorting methods
        let returnString = '';
        for (let algorithm of this.#algorithms) {
            returnString += returnString + '\n';
        }
    }
}

class Player { // Class representing player and player's actions
    
    // Standard properties of a player
    #hand; // Player's collection of card objects
    #points; // Points counter for this player
    #name; // Friendly name for this player
    
    constructor(name) {
        this.#hand = [];  // Initialize empty hand of cards
        this.#points = 0; // Initialize point value of 0
        this.#name = name;  // Initialize name from parameter

    }

    drawCard(deckObject, numberOfCardsToDraw, fromTopofDeck = true) {

        // Player method for drawing card. Card object is removed from deck object's container and olaced into player object's container
        for (let drawCount = 1; drawCount <= numberOfCardsToDraw; drawCount++) {
            // Player draws the number of cards required
            this.#hand.push(deckObject.drawCard());
        }
        
    }

    playCard() {
        return this.#hand.pop(); // Removes card object from player and returned to caller
    }

    winsRound(pointValue = 1) { // Player wins, so assign points dictated by game. Default point value = 1.
        this.#points += parseInt(pointValue); // Parse in case we run into string passed in as point value
    }

    sortHand(sortMethod) {
        // Sort hand
        let sort = new Shuffle(this.#hand, 'orderByValue'); // Assuming player would want to play highest card every turn
    }

    getHand(asListOrObject = 'list') {
        // Player method for displaying hand or returning hand object
        if (asListOrObject.toLowerCase() === 'list') {  // Default return type is string formatted as list
            let cardList = '';

            for (let cardInHand of this.#hand) {
                cardList += cardInHand.getCardPrettyValue() + '\n';
            }
        
            return cardList;
        } else if (asListOrObject.toLowerCase() === 'object') { // Optionally return array of card objects
            return this.#hand;
        }
    }

    getPlayerPoints() {
        // Return point count for player
        return this.#points;
    }

    getPlayerName() {
        // Returns player's friendly name
        return this.#name;
    }

    setPlayerName(name) {
        this.#name = name; // Sets player's name
    }

    dealToPlayer(cardObject) {
        this.#hand.push(cardObject); // External card object, such as from deck, is given to player
    }

}

class WarCardGame {  // Class representing the card game, WAR, to define game operation and procedures

    #players = [];  // Collection of player objects
    #gameDeck; // Contains card deck object
    //#currentPlayer; 
    #turnCounter = 0;
    #responseQueue = 0; // Message queue for outputting to console
    #roundsPlayed = 0; // Counter for number of rounds played in a game
    #interactiveMode = true;

    constructor(numberOfPlayers, setInteractiveMode = true) {
        
        // Sets up game and necessary components
        this.#interactiveMode = setInteractiveMode; // Mimics terminal interaction between game and autonimous players or dumps all messages in real time if set to false
        this.#players = Array(numberOfPlayers); // Array of players
        //this.#currentPlayer; // Represents current player's turn

        /*
            WAR Gameplay Operation

            Deal 26 Cards to each Player from a Deck of 52 cards.
            Iterate through the turns where each Player plays a Card.
            The Player who played the higher card is awarded a point.
            Ties result in zero points for both Players.
            After all cards have been played, display the score and declare the winner.
        */

        // Setup deck of cards for game play
        this.#gameDeck = new Deck();
        //this.#gameDeck.shuffleDeck(); // Initial shuffle

        // Setup players (Player 1, Player 2, etc)
        for (let i = 0; i < numberOfPlayers; i++) {
            let playerName = `Player ${i + 1}`;
            this.#players[i] = new Player(playerName);
        }
        //console.log(this.#gameDeck.getFullDeck());

    }

    testSpool() {
        // Testing delayed response operation
        for (let  i = 0; i < 10; i++) {
            this.spoolOutput(`I am Groot #${i}`);
        }
    }

    letsPlayAGame(OptionalShuffleAlgorithm = 'random') {  // Starts game with an Easter Egg I thought of based on the name of the card game

        // Easter Egg from the movie, WarGames (1983)
        let terminalColor = "color: #4aff00"; // Mimic the CRT terminal color
        console.log(`
        \n%cShall we play a game?\n
        `, terminalColor)

        let obj = this; // 'this' object does not exist when calling back after timeout 

        // Delaying output to mimic automated interaction on console
        setTimeout(function() {
            console.log('%c#EasterEgg (WarGames 1983)\n', terminalColor);
            
            setTimeout(function() {
                console.log(`\n\n\t\t\t%cStarting card game now.\n\n`, "color:yellow");

                setTimeout(function() {
                    //obj.startGame('random');
                    obj.startGame(OptionalShuffleAlgorithm);
                }, 1000);
            }, 1000);

        }, 5000);
    }

    // Game will keep delayed output to mimic interactive behavior. 
    // Override by passing interactiveMode value of 'false' into class constructor
    startGame(OptionalShuffleAlgorithm = 'random') {

        // Starting game sequence
        this.spoolOutput(`
        \nWelcome to the card game of War. Take a seat and try your luck.

        \n\t\t\tStarting game.
        \n`)

        // Shuffle deck
        this.spoolOutput(`\nShuffling deck.\n`);
        let algorithm = OptionalShuffleAlgorithm;
        this.#gameDeck.shuffleDeck(algorithm);

        // Who is dealt first?
        //console.log(this.getWhosOnFirst().getPlayerName() + ' is on first.');

        this.spoolOutput(`\nRolling virtual dice to see who goes first.\n`);

        this.spoolOutput(`\n${this.getWhosOnFirst().getPlayerName()} will be dealt first.\n`);

        // Deal cards to players
        this.spoolOutput(`\nDealing ${this.getCurrentDeck().getSize() / this.getNumberOfPlayers()} cards to each of ${this.getNumberOfPlayers()} players. Good luck.\n`);

        // Iterate through deck object, removing card object and giving to player
        let deckCount = this.getCurrentDeck().getSize();
        for (let i = 0; i < deckCount; i++) {
            
            let player = this.getCurrentPlayer();

            player.dealToPlayer(this.getCurrentDeck().drawCard(true));

            this.changeTurn();
        }

        // Reset turns counter and rounds counter to 0 for game play
        this.resetTurnIndex();

        this.spoolOutput(`
        \nThe cards have been dealt. The players are now arranging their hands. Let's begin.\n
        `)

        for (let player of this.getPlayers('object')) { // Sort hand by value. I would imagine players would play the highest value card at hand
            player.sortHand('orderByValue');
        }
        
        this.spoolOutput(`\n\t\t\t%cA few moments later...\n`, "color:yellow") // light humor

        // Set preliminary counters and messages and round data
        let roundIndex = 0;
        let round = [];
        let playByPlayMessage = '';

        for (let player; this.allHandsAreSpent() != true; this.changeTurn()) {
            // Round iteration loads current player object, operates on current player, then increments player index with changeTurn method
            player = this.getCurrentPlayer();
            
            let card = player.playCard(); // Player plays a card
            let playerName = player.getPlayerName(); // Record player name for play-by-play commentary
            let cardPlayed = card.getCardPrettyValue(); // Record played card for play-by-play commentary
            
            round.push([card, this.getWhoseTurnIndex()]); // Record details of current player and card played for this round

            playByPlayMessage += `\n${playerName} plays a ${cardPlayed}`;  // Play-by-play comment
            
            // Reached end of round
            if (this.getWhoseTurnIndex() === this.getNumberOfPlayers() - 1) { // Turns counter has incremented for all players indicating round of turns completed
                this.spoolOutput(`${playByPlayMessage}`);

                let winnerObject = this.getWinnerOfRound(round); // Pass results data to determine winner. Method returns winner or empty if tie game

                if (winnerObject.length > 0) {
                    // We have a clear winner folks
                    let winnerPlayerIndex = winnerObject[1];  // Array has 2 columns. First column is card. 2nd column is index of player.

                    // Reassign winner variable to winning player object
                    let winner = this.getPlayers('object')[winnerPlayerIndex];
                    winner.winsRound(); // Increment player's points counter by 1

                    this.spoolOutput(`\n${winner.getPlayerName()} wins this round.\n\n%c${this.getCommentatorRemark(0)}`, "color:yellow"); // Add color styling to commentator comment
                } else {
                    // Tie game this round, so no winner. Move to next turn without stopping and decrement response que to synchronize next spooled commentary response with last play-by-play to avoid delay for non-winner round
                    this.#responseQueue += -1;
                    this.spoolOutput(`\n%cTie game this round. No winner. Let's move on.`, "color: magenta");
                }
                
                // Reset round and commentary. Increment rounds counter
                round = [];
                playByPlayMessage = '';
                roundIndex++;
            }

        }

        // Hopefully reached the end of gameplay and not an eternal loop. We'll see.
        // And the winner is ...
        this.spoolOutput(`\n\t\t\t%cAnd the winner is...\n`, "color:yellow");
        this.spoolOutput(`
        \n%cAfter ${roundIndex} rounds, the final results are in.
        `, "color:yellow");

        // Variables for game winner details
        let gameChampion; // For player object
        let highScore = 0; // initial value for comparing first player's points with
        let isTieGame = false; // Indicates tie game result

        let playerName;
        let playerPoints;

        // Iterate through players and compare points to determine overall winner
        for (let player of this.getPlayers('object')) {
            
            playerName = player.getPlayerName();
            playerPoints = player.getPlayerPoints();

            let results = `${playerName} has ${playerPoints} points.`;
            this.spoolOutput(`\n${results}\n`)

            if (playerPoints > highScore) {
                highScore = playerPoints;
                gameChampion = playerName;
                isTieGame = false;
            } else if (playerPoints === highScore) {
                gameChampion = undefined;
                isTieGame = true;
            }
        }

        if (isTieGame != true) {
            // Declare winner
            this.spoolOutput(`
        \n%c${gameChampion} has won the game with ${playerPoints} points. Congratulations ${gameChampion}. ${this.getCommentatorRemark(1)}
        `, "color:cyan")

        } else {
            // Tie game
            this.spoolOutput(`
            \n%cWe seem to have a tie game folks. Weird, huh?
            `, "color:red")
        }
        
        this.spoolOutput(`
        \n\t\t\t\"Wheel of Morality, turn, turn, turn, and tell us the lesson that we should learn\". \n\t\t\t- Yakko Warner and The Warner Bothers (Animaniacs)
        `)

        this.spoolOutput(`
        \n%cAnd the lesson for today kids is...
        `, "color:yellow")

        this.spoolOutput(`
        \n%c${this.getCommentatorRemark(2)}\n
        `, "color:yellow")

        this.spoolOutput(`
        \n\n\t\t\t\"Thank you for playing my game\". - James Halliday/Anorak (Ready Player One, 2018)
        \n\t\t\tGood Bye.
        `)
            
    }

    // Delays output to mimic interactive gameplay and make the game progress easier to follow than dumping everything into the console all at once.
    spoolOutput(message, color) {  // Color argument is for commentator comment from gameplay method

        let timeoutValue = 1000;
        let obj = this; // 'this' object does not persist into callback so make a copy of object reference
        let counter = this.#responseQueue++; // Message counter

        if (this.#interactiveMode === false) timeoutValue = 0;

        // Each message passed into this method will increment the message counter to delay the next message that many times longer
        // Otherwise, all messages are delayed the same amount with reference to real time so all messages will appear all at once at timeout
        setTimeout((msg) => {
            obj.output(msg, color);
        },timeoutValue * counter, message);
    }

    // mediates messages to console
    output(message, color = '') { // Color argument is for commentator comment from gameplay method or to distinguish console output from regular gameplay
        console.log(`%c${message}`, "color:white", color);
    }

    // Returns deck object
    getCurrentDeck() {
        return this.#gameDeck;
    }

    // Returns players as a string dilimited by \n or returns the players object if parameter specified as 'object'
    getPlayers(asListOrObject = 'list') { // 'list' is default or you can pass 'object' as string parameter

        if (asListOrObject.toLowerCase() === 'list') {
            let playerList = "";
            for (let player in this.#players) {
                playerList += player + '\n';  // Return string
            }
            
            return playerList;

        } else if(asListOrObject.toLowerCase() === 'object') {
            return this.#players;  // Return object
        }
    }

    // Returns number of players in game
    getNumberOfPlayers() {
        return this.#players.length;
    }

    // Rearranges player ordering within array
    getWhosOnFirst(rollDice) {
        if (typeof(rollDice) === 'boolean' && rollDice === true) {
            let dice = new Shuffle(this.#players);
        }
        //console.log(this.#players[0].getPlayerName());
        return this.#players[0];;    
    }

    // Determines which player is in turn by reducing the turns counter modulo the number of players in game
    getWhoseTurnIndex() {
        let turnIndex = this.#turnCounter % this.getNumberOfPlayers();
        return turnIndex; // Returns index of player with respect to the players object
    }

    getWinnerOfRound(arrayObject) {
        // Determines winner of round by analyzing round results stored in array. Returns array from winning row or returns empty set.
        let sortedResults = new Shuffle(arrayObject, 'orderByHighest', 0);

        // Results are sorted by point value highest to lowest
        // Compare first and second element to make sure there are no ties

        if (arrayObject[0][0].getCardPointValue() > arrayObject[1][0].getCardPointValue()) { // Since array is sorted, first element must be greater or equal
            return arrayObject[0];
        } else {
            return []; // Return empty set since there are no winners
        }
    }

    // Returns player at index given by getWhoseTurnIndex method
    getCurrentPlayer() {
        return this.#players[this.getWhoseTurnIndex()];
    }

    // Returns the number of rounds played so far
    getRoundsPlayed() {
        return this.#roundsPlayed;
    }

    // Since I was playing aqround with randomizing arrays, I decided to randomize canned responses given an index value according to the intended classification of comment group.
    // Any index value passed as an argument will fall within range as it will be reduced to an appropriate range modulo the number of comment groups.
    getCommentatorRemark(index = 0) {
        // Generate a random resonse from commentator
        let emmotive = [];
        
        // Simple emotive responses intended for each round of play. Default comment group if no index passed as parameter.
        emmotive.push(['Wow!', 'Yowza!!!', 'Awesome!!', 'Right On!', 'This is getting to be a habbit', 'Oh, you\'re pretty good at this.', 
        'You\'re on a roll!!', 'Nice!!', 'Oh. yeah!!!']);

        // Emotive responses intended for final outcome
        emmotive.push(['I had a feeling!', 'Ooh!!! Too bad for the other guy', 
        'I did not see that comming.', 'I knew you had potential!!!', 'I suppose even bot players gotta win sometimes.']);

        // Emotive responses intended for end of game
        emmotive.push(['Well, there are winners sometimes, and then there\'s everyone else.\nYay, for the second place...I mean...\"cough\", \"cough\", all the winners!!',
        'Well there are those who win in life, and there those who win in games.',
        'Everyone\'s a winner in this game. The losers are just less so.', 
        `There are things in life that come and go, but this game was only ${this.getRoundsPlayed()} rounds.`,
        `Losers are winners too. They just don't get the prizes or fame or bragging rights or endorsements or the nice house or..., but perhaps the get a lesson, like this one for instance.`]);

        // If index undefined or an invalid number then generate random index value
        if (index === undefined || index === NaN){
            index = Math.random() * 100;
        }

        // Constrain index to range of available comment groups
        index = parseInt(index) % emmotive.length; // Any number passed as parameter will be within index range

        // For 2nd dimension we need random index value and constrain to range
        let index2D = parseInt(Math.random() * 100) % emmotive[index].length; 
        
        // Return response
        return emmotive[index][index2D];

    }

    // Implements a change of turn. Increments turn counter and increments rounds counter when appropriate
    changeTurn() {
        this.#turnCounter++;

        if (this.#turnCounter % this.getNumberOfPlayers() === 0) {
            this.#roundsPlayed++; // Increment roundsPlayed counter once every player has had a turn
        }
    }

    // Reset turns counter
    resetTurnIndex() {
        this.#turnCounter = 0;  // Reset turns counter
        this.#roundsPlayed = 0; // Reset rounds counter
    }

    // Determines if all players have exhausted their hands by collecting the number of remaining card objects for each player into 
    // an array and then joining the string of number values and parsing into a number. When all hands are spent, the resulting number will be 0.
    allHandsAreSpent() {
        // Returns true if all hands have been exhausted
        let handCountArray = [];
        for (let player of this.getPlayers('object')) {
            //console.log(player.getHand('object').length);
            handCountArray.push(player.getHand('object').length);
        }

        if (parseInt(handCountArray.join('')) == 0) { // If all hands are 0 sized, then result string from joiming array values should be parsed as number 0
            return true;
        } else {
            return false;
        }
    }
}
// Do not change this. Gameplay designed and tested for 2 players, however, classes and methods are designed for any number of players (potentially).
const numberOfPlayers = 2; 

// Boolean of true is standard "Interactive" mode, simulating player interactions with game. False value wil disable delay implemented by interactive simulacrum and output all at once.
let game = new WarCardGame(numberOfPlayers, true); 

// Starts with throwback to WarGames (1983) - Note: this short sequence is not affected by the Boolean value. However, the rest of the gameplay will proceed as dictated by the Boolean value.
game.letsPlayAGame('fisherYates');  

// Comment line above and uncomment this one to skip short throwback sequence
//game.startGame('fisherYates');  // Game starts immediately without special gift
