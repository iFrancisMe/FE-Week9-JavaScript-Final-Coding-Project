
var expect = chai.expect;

describe("My Classes", function() {
    describe('Card Class', function() {
        it('should return a card object with properties corresponding to a playing card', function() {
            var pointValue = 14;
            var suitValue = 'Spades';
            var faceValue = 'Ace';
            
            var card = new Card(pointValue, suitValue, faceValue);
            expect(card instanceof Card).to.equal(true);
        });

        describe("Card Class Methods", function() {
            describe("getCardPointValue", function() {
                it('should return the point value of the card object defined in the class\'s constructor when instantiating the Card object', function() {
                    let card = new Card(11, 'Clubs', 'Jack');
                    expect(card.getCardPointValue()).equal(11);
                });
            });
            describe("getCardFaceValue", function() {
                it('should return the face value of the card object defined in the class\'s constructor when instantiating the Card object', function() {
                    let card = new Card(11, 'Clubs', 'Jack');
                    expect(card.getCardFaceValue()).equal('Jack');
                });
            });
            describe("getCardSuit", function() {
                it('should return the face value of the card object defined in the class\'s constructor when instantiating the Card object', function() {
                    let card = new Card(11, 'Clubs', 'Jack');
                    expect(card.getCardSuit()).equal('Clubs');
                });
            });
            describe("getCardPrettyValue", function() {
                it('should return the natural language value of the Card object', function() {
                    let card = new Card(12, 'Hearts', 'Queen');
                    expect(card.getCardPrettyValue()).equal('Queen of Hearts');
                });
            });
        });
    });
    describe('Deck Class', function() {
        it('shoould return a deck object with properties corresponding to a deck of cards', function() {
            var deck = new Deck();
            expect(deck instanceof Deck).to.equal(true);
            expect(deck.drawCard() instanceof Card).to.equal(true);
        });
        describe('Deck Class Methods', function() {
            describe('getFullDeck', function() {
                it('should return a list of all the card values that exist in the deck\'s collection of Card objects', function() {
                    var deck = new Deck();
                    expect(typeof(deck.getFullDeck())).to.equal('string');
                });
                //
            });
            describe('getSize', function() {
                it('should return the number of card objects contained within the deck object.', function() {
                    var deck = new Deck(); 
                    expect(deck.getSize()).to.equal(52);
                });
            });
            describe('getFullDeck', function () {
                it('should return a string listing all the cards in the deck object plus 1 extra endofline character', function() {
                    var deck = new Deck();
                    expect(typeof(deck.getFullDeck())).to.equal('string');
                    expect(deck.getFullDeck().split('\n').length).to.equal(52 + 1);
                });
            });
            describe('shuffleDeck', function() {
                it('should rearrange a container of card objects according to the shuffleMethod (i.e, algorithm) parameter.', function() {
                    var deck = new Deck();
                    var arrangement1 = deck.getFullDeck();
                    var arrangement2 = deck.shuffleDeck('random');
                    arrangement2 = deck.getFullDeck();
                    expect(arrangement1.split('\n').length).to.equal(arrangement2.split('\n').length);
                    expect(arrangement1).to.not.equal(arrangement2);
                });
            });
            describe('drawCard and getSize', function() {
                it('drawCard should remove a card object from the deck and getSize should return the size of the deck', function() {
                    var deck = new Deck();
                    var originalSize = deck.getSize();
                    var card = deck.drawCard();
                    var newSize = deck.getSize();
                    expect(card instanceof Card).to.equal(true);
                    expect(newSize).to.equal(originalSize - 1);
                });
            });
        });
    });
    describe('Shuffle Class', function() {
        var testingMethodName = this.titlePath()[this.titlePath().length - 1].split(' ')[0];
        var cards = [];
        for (let i = 0; i < 10; i++) {
           cards.push(new Card(i, 'Sample', i));
        }
        var arrayObject = cards;
        var arrayCopy = cards.slice(0);

        var instanceOfClass = new Shuffle([arrayObject]);
        var testingMethods = [instanceOfClass.random, instanceOfClass.fisherYates, instanceOfClass.orderByValue, instanceOfClass.orderByLowest, instanceOfClass.orderByHighest];
        
        it('should create a shuffle object taking an array as a first parameter and a sortMethod string value given as a second parameter.', function() {
            expect(instanceOfClass instanceof Shuffle).to.equal(true);
        });
        describe("Shuffle Class Methods", function() {
            describe('random', function() {
                var testingMethodName = this.titlePath()[this.titlePath().length - 1];
                it(`should shuffle or sort an array in the manner indicated by algorithm name, \'${testingMethodName}\', passed in as a parameter into class constructor.`, function() {
                    var shuffleAlgorithm = testingMethodName; 
                    var arrayCopy = arrayObject.slice(0);
                    
                    var randomIndex = parseInt((Math.random() * 100) % arrayObject.length); 
                    expect(arrayCopy[randomIndex]).to.equal(arrayObject[randomIndex]);
        
                    var sorter = testingMethods.find(method => method.name.toLowerCase() === shuffleAlgorithm.toLowerCase());
                    while (arrayCopy[randomIndex] === arrayObject[randomIndex]) {
                        sorter(arrayObject);
                    }
                    
                    expect(arrayCopy[randomIndex]).to.not.equal(arrayObject[randomIndex]);
                });
            });
            describe('fisherYates', function() {
                var testingMethodName = this.titlePath()[this.titlePath().length - 1];
                it(`should shuffle or sort an array in the manner indicated by algorithm name, \'${testingMethodName}\', passed in as a parameter into class constructor.`, function() {
                    var shuffleAlgorithm = testingMethodName; 
                    var arrayCopy = arrayObject.slice(0);
                    
                    var randomIndex = parseInt((Math.random() * 100) % arrayObject.length); 
                    expect(arrayCopy[randomIndex]).to.equal(arrayObject[randomIndex]);
        
                    var sorter = testingMethods.find(method => method.name.toLowerCase() === shuffleAlgorithm.toLowerCase());
                    while (arrayCopy[randomIndex] === arrayObject[randomIndex]) {
                        sorter(arrayObject);
                    }
                    
                    expect(arrayCopy[randomIndex]).to.not.equal(arrayObject[randomIndex]);
                });
            });
            describe('orderByValue', function() {
                var testingMethodName = this.titlePath()[this.titlePath().length - 1];
                it(`should sort an array by value (default=lowest to highest) when the algorithm name, \'${testingMethodName}\', is passed in as a parameter into class constructor.`, function() {
                    var shuffleAlgorithm = testingMethodName; 
                    
                    var sorter = testingMethods.find(method => method.name.toLowerCase() === shuffleAlgorithm.toLowerCase());
                    sorter(arrayObject);
                    
                    var randomIndex = parseInt((Math.random() * 100) % arrayObject.length); 
                    expect(arrayCopy[randomIndex]).to.equal(arrayObject[randomIndex]);
                });
            });
            describe('orderByLowest', function() {
                var testingMethodName = this.titlePath()[this.titlePath().length - 1];
                it(`should sort an array by value, lowest to highest, when the algorithm name, \'${testingMethodName}\', is passed in as a parameter.`, function() {
                    var shuffleAlgorithm = testingMethodName; 
                    
                    instanceOfClass.orderByLowest(arrayObject, undefined, 1);
                    var randomIndex = parseInt((Math.random() * 100) % arrayObject.length);
                    //expect(randomIndex).to.equal(1); 
                    expect(arrayCopy[randomIndex].getCardPointValue()).to.equal(arrayObject[randomIndex].getCardPointValue());
                });
            });
            describe('orderByHighest', function() {
                var testingMethodName = this.titlePath()[this.titlePath().length - 1];
                it(`should sort an array by value, lowest to highest, when the algorithm name, \'${testingMethodName}\', is passed in as a parameter.`, function() {
                    var shuffleAlgorithm = testingMethodName; 
                    
                    // Value at index 0 should be greater than value at index 1
                    instanceOfClass.orderByHighest(arrayObject, undefined);
                    expect(arrayObject[0].getCardPointValue()).to.be.greaterThan(arrayObject[1].getCardPointValue());
                    
                    var randomIndex = parseInt((Math.random() * 100) % arrayObject.length);

                    // Value of either array should be the same at any given random index
                    instanceOfClass.orderByHighest(arrayCopy, undefined);
                    expect(arrayObject[randomIndex].getCardPointValue()).to.equal(arrayCopy[randomIndex].getCardPointValue());

                    // Value at any index of one array should equal the value at the inverse index of the opposite sorted array
                    instanceOfClass.orderByLowest(arrayCopy, undefined);
                    var reverseIndex = (arrayObject.length - 1) - randomIndex;
                    expect(arrayCopy[randomIndex].getCardPointValue()).to.equal(arrayObject[reverseIndex].getCardPointValue());
                });
            });
        });
    });
    describe("Player Class", function() {
        var player = new Player('Player 1');
        var deck = new Deck;
        it(`should return player object with properties corresponding to a card player, such as a name`, function () {
            expect(player instanceof Player).to.equal(true);
            expect(player.getPlayerName()).to.equal('Player 1');
        });
        describe('Player Class Methods', function() {
            describe('drawCard', function() {
                it('should receive a quantity of card objects into collection and increase size of collection by number of cards drawn', function() {
                    expect(player.getHand('object').length).to.equal(0);
                    
                    player.drawCard(deck, 5);
                    expect(player.getHand('object').length).to.equal(5);
                    expect(deck.getSize()).to.equal(47);
                });
            });
            describe('playCard', function () {
                it('should return a card object from player\'s hand, removing it from player object making it available for use outsie the player object', function() {
                    let card = player.playCard();
                    expect(player.getHand('object').length).to.equal(4);
                    expect(card instanceof Card).to.equal(true);
                });
            });
            describe('winsRound', function() {
                it('should increment player object\'s points counter by number of points given as a parameter', function() {
                    player.winsRound(5);
                    expect(player.getPlayerPoints()).to.equal(5);
                });
            });
            describe('sortHand', function() {
                it('should sort player\'s hand by value', function() {
                    var randomIndex = parseInt(Math.random() * 100) % player.getHand('object').length;
                    if (randomIndex === player.getHand('object').length - 1) randomIndex--;
                    expect(player.getHand('object')[randomIndex].getCardPointValue()).to.be.lessThanOrEqual(player.getHand('object')[randomIndex + 1].getCardPointValue())
                });
            });
            describe('getPlayerPoints', function() {
                it('should return player\'s point count', function() {
                    expect(player.getPlayerPoints()).to.be.greaterThan(0);
                });
            });
            describe('dealToPlayer', function() {
                it('should receive a card object into player\'s collection.', function() {
                    var card = deck.drawCard();
                    var cardCountBeforeNewCard = player.getHand('object').length;
                    player.dealToPlayer(card);
                    var cardCountAfterNewCard = player.getHand('object').length;
                    expect(cardCountAfterNewCard).to.be.greaterThan(cardCountBeforeNewCard);
                });
            });
        });
    });
});