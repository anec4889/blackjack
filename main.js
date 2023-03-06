"use strict";
exports.__esModule = true;
exports.Money = exports.Hand = exports.Deck = exports.Card = exports.faces = exports.suits = void 0;
exports.suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
exports.faces = [
    ['Ace', 11],
    ['Two', 2],
    ['Three', 3],
    ['Four', 4],
    ['Five', 5],
    ['Six', 6],
    ['Seven', 7],
    ['Eight', 8],
    ['Nine', 9],
    ['Ten', 10],
    ['Jack', 10],
    ['Queen', 10],
    ['King', 10]
];
/**
 * Represents the data for the playing cards in form of a string and a pair of a string and a number.
 */
var Card = /** @class */ (function () {
    /**
     * Initializes Card and creates a new card from the two arguments suit and face.
     * @param {Suit} suit - The suit of the card.
     * @param {Face} face - The face of the card.
     */
    function Card(suit, face) {
        this.suit = suit;
        this.face = face;
    }
    /**
     * Returns the value of the card.
     * @example
     * //returns "6"
     * const new_card = new Card(suits[0], faces[5]);
     * new_card.get_name();
     * @returns {number} Returns the value of the face as a number.
     */
    Card.prototype.get_value = function () {
        return this.face[1];
    };
    /**
     * Returns the face of the card as a string.
     * @example
     * // returns "King"
     * const new_card = new Card(suits[0], faces[12]);
     * new_card.get_name();
     * @returns {string} face of the card as a string.
     */
    Card.prototype.get_name = function () {
        return this.face[0];
    };
    /**
     * Returns a string that represents the current card.
     * @example
     * // returns "Ace of Spades"
     * const new_card = new Card(suits[3], faces[0]);
     * new_card.to_string();
     * @returns {string} Returns a string that represents the card.
     */
    Card.prototype.to_string = function () {
        return this.get_name() + " of " + this.suit;
    };
    return Card;
}());
exports.Card = Card;
/**
 * An array of the type Card, representing a whole deck.
 */
var Deck = /** @class */ (function () {
    /**
     * Initializes Deck and creates new decks depending on the input amount.
     * @param {number} amount_of_decks - The amount of decks to be created.
     */
    function Deck(amount_of_decks) {
        var _this = this;
        this.deck = [];
        for (var i = 0; i < amount_of_decks; i++) {
            exports.faces.forEach(function (face) {
                exports.suits.forEach(function (suit) {
                    _this.deck.push(new Card(suit, face));
                });
            });
        }
    }
    /**
     * Returns the length of the deck, in other words ohw many cards are left.
     * @example
     * // returns 52
     * const new_deck = new Deck(1);
     * new_deck.length();
     * @returns {number} Returns a number that represents the amount of cards in the deck.
     */
    Deck.prototype.length = function () {
        return this.deck.length;
    };
    /**
     * Returns a shuffled deck.
     * @returns {Deck_t} Returns an array with cards in a shuffled order.
     */
    Deck.prototype.shuffle = function () {
        return random_permutation(this.deck);
    };
    /**
     * Removes the last element from the deck.
     * @example
     * // returns [ Card { suit: 'Spades', face: [ 'King', 10 ] } ]
     * const new_deck = new Deck(1);
     * new_deck.draw();
     * @returns {Card} Returns a card and removes it from the deck array.
     */
    Deck.prototype.draw = function () {
        return this.deck.pop();
    };
    /**
     * Prints the entire deck in order.
     */
    Deck.prototype.print_deck = function () {
        for (var g = 0; g < this.deck.length; g++) {
            console.log(this.deck[g].to_string());
        }
    };
    return Deck;
}());
exports.Deck = Deck;
/**
 * Represents and handles the data for the hand of the dealer or player in form of an array of cards.
 */
var Hand = /** @class */ (function () {
    function Hand() {
        this.hand = [];
        this.total_value = 0;
        // Keeps count if an ace is drawn from the deck in order for it to vary its value to either 1 or 11.
        this.ace_counter = 0;
    }
    /**
     * Adds a card to a specific hand where the hand is an array of cards (Deck_t).
     */
    Hand.prototype.add_card_to_hand = function (card) {
        this.hand.push(card);
    };
    /**
     * Returns all of the cards in a hand.
     * @example
     * // returns [ Card { suit: 'Spades', face: [ 'Ace', 11 ] } ]
     * const new_hand = new Hand();
     * new_hand.add_card_to_hand(new Card(suits[3], faces[0]));
     * new_hand.show_hand();
     * @returns {Deck_t} Returns an array with all the cards inside.
     */
    Hand.prototype.show_hand = function () {
        return this.hand;
    };
    /**
     * Returns a desired card from a hand.
     * @example
     * // returns [ Card { suit: 'Spades', face: [ 'Ace', 11 ] } ]
     * const new_hand = new Hand();
     * new_hand.add_card_to_hand(new Card(suits[3], faces[0]));
     * new_hand.add_card_to_hand(new Card(suits[1], faces[7]));
     * new_hand.get_card(0);
     * @param {number} i - Index of which card you want to return from your hand, starting at 0.
     * @returns {Card} Returns the card at the index given from the argument.
     */
    Hand.prototype.get_card = function (i) {
        return this.hand[i];
    };
    /**
     * Returns the amount of cards in a hand.
     * @example
     * // returns 2
     * const new_hand = new Hand();
     * new_hand.add_card_to_hand(new Card(suits[3], faces[0]));
     * new_hand.add_card_to_hand(new Card(suits[2], faces[0]));
     * new_hand.get_cards_length();
     * @returns {number} Returns a number that represents how many cards in a hand.
     */
    Hand.prototype.get_cards_length = function () {
        return this.hand.length;
    };
    /**
     * Returns the value of a specific card in a hand
     * @example
     * // returns 5
     * const new_hand = new Hand();
     * new_hand.add_card_to_hand(new Card(suits[0], faces[4]));
     * new_card.get_card_value(0);
     * @returns {number} Returns a cards value as a number
     */
    Hand.prototype.get_card_value = function (index) {
        return this.hand[index].get_value();
    };
    /**
     * Calculates the total value of the hand and returns the result as a number.
     * Also checks whether to convert an ace to of value of 1 or 11.
     * @example
     * // returns 14
     * const new_hand = new Hand();
     * new_hand.add_card_to_hand(new Card(suits[3], faces[5]));
     * new_hand.add_card_to_hand(new Card(suits[1], faces[7]));
     * new_hand.get_hand_value();
     * @returns {number} Returns the total value of the hand.
     */
    Hand.prototype.get_hand_value = function () {
        var _this = this;
        this.total_value = 0;
        this.hand.forEach(function (card) {
            _this.total_value += card.get_value();
            if (card.get_name() === exports.faces[0][0]) {
                _this.ace_counter++;
            }
            else { }
        });
        if (this.ace_counter > 0 && this.total_value > 21) {
            this.total_value -= 10;
            this.ace_counter--;
        }
        else { }
        return this.total_value;
    };
    return Hand;
}());
exports.Hand = Hand;
/**
 * Represents and handles the data for the money in the game as the type number.
 */
var Money = /** @class */ (function () {
    /**
     * Initializes Money and sets the initial value for the balance.
     * @param {number} balance - The amount of money to be set as balance.
     */
    function Money(balance) {
        this.balance = 0;
        this.balance = balance;
    }
    /**
     * Returns the current balance of the player.
     * @example
     * // returns 100
     * const new_money = new Money(100);
     * new_money.get_balance();
     * @returns {number} Returns the current balance.
     */
    Money.prototype.get_balance = function () {
        return this.balance;
    };
    /**
     * Empties the account from money and resets it to 0
     * @example
     * // returns "You withdrew 200$"
     * const new_money = new Money(200);
     * new_money.withdraw();
     */
    Money.prototype.withdraw = function () {
        console.log("\nYou withdrew: " + this.balance + "$\n");
        this.balance = 0;
    };
    /**
     * Adds money to the account.
     * @example
     * // returns 150
     * const new_money = new Money();
     * new_money.add_money(150);
     * @param {number} amount - Amount of money the players wants to add to the account.
     * @returns {number} Returns the new amount after money has been added.
     */
    Money.prototype.add_money = function (amount) {
        this.balance = this.balance + amount;
        return this.balance;
    };
    /**
     * Subtracts an amount of the current balance and returns the new value.
     * @example
     * // returns 50
     * const new_money = new Money(100);
     * new_money.sub_money(50);
     * @param {number} amount - Input number to be subtracted.
     * @returns {number} Returns the updated balance as a number.
     */
    Money.prototype.sub_money = function (amount) {
        this.balance = this.balance - amount;
        return this.balance;
    };
    return Money;
}());
exports.Money = Money;
/**
 * Needed if we were to implement split or more players
 */
/*export class Player {
    private players: Player_t = [];
    
    public add_players(player: Hand){
        this.players.push(player);
    }
    get_player(){

    }
}
*/
/**
 * Permutes an array of elements of any type.
 * @example
 * MIGHT return [3, 1, 2];
 * random_permutation([1, 2, 3]);
 * @param {Array<T>} arr - input array.
 * @returns {Array<T>} Returns a permuted array of the input array.
 */
function random_permutation(arr) {
    var _a;
    for (var i = arr.length - 1; i > 0; --i) {
        var swap = Math.floor(Math.random() * (i + 1));
        // Destructuring assignment used to swap elements in array.
        _a = [arr[swap], arr[i]], arr[i] = _a[0], arr[swap] = _a[1];
    }
    return arr;
}
