
var expect = chai.expect;

describe("My Classes", function() {
    describe('#Card', function() {
        it('should return a card object with properties corresponding to a playing card', function() {
            var pointValue = 14;
            var suitValue = 'Spades';
            var faceValue = 'Ace';
            
            var card = new Card(pointValue, suitValue, faceValue);
            expect(card instanceof Card).to.equal(true);
        });

        describe("Card Class Methods", function() {
            describe("#getCardPointValue", function() {
                it('should return the point value of the card object defined in the class\'s constructor when instantiating the Card object', function() {
                    let card = new Card(11, 'Clubs', 'Jack');
                    expect(card.getCardPointValue()).equal(11);
                });
            });
            describe("#getCardFaceValue", function() {
                it('should return the face value of the card object defined in the class\'s constructor when instantiating the Card object', function() {
                    let card = new Card(11, 'Clubs', 'Jack');
                    expect(card.getCardFaceValue()).equal('Jack');
                });
            });
            describe("#getCardSuit", function() {
                it('should return the face value of the card object defined in the class\'s constructor when instantiating the Card object', function() {
                    let card = new Card(11, 'Clubs', 'Jack');
                    expect(card.getCardSuit()).equal('Clubs');
                });
            });
            describe("#getCardPrettyValue", function() {
                it('should return the natural language value of the Card object', function() {
                    let card = new Card(12, 'Hearts', 'Queen');
                    expect(card.getCardPrettyValue()).equal('Queen of Hearts');
                });
            });
        });
    });
});