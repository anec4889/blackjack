"use strict";
exports.__esModule = true;
exports.Money = exports.Hand = exports.Deck = exports.Card = exports.faces = exports.suit = void 0;
exports.suit = ["Hearts", "Diamonds", "Clubs", "Spades"];
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
var Card = /** @class */ (function () {
    function Card(suit, face) {
        this.suit = suit;
        this.face = face;
    }
    Card.prototype.get_value = function () {
        return this.face[1];
    };
    Card.prototype.get_name = function () {
        return this.face[0];
    };
    Card.prototype.to_string = function () {
        return this.get_name() + " of " + this.suit;
    };
    return Card;
}());
exports.Card = Card;
var Deck = /** @class */ (function () {
    function Deck() {
        this.deck = [];
        for (var i = 0; i < 13; i++) {
            for (var z = 0; z < 4; z++) {
                this.deck.push(new Card(exports.suit[z], exports.faces[i]));
            }
        }
    }
    Deck.prototype.length = function () {
        return this.deck.length;
    };
    Deck.prototype.shuffle = function () {
        return random_permutation(this.deck);
    };
    Deck.prototype.draw = function () {
        return this.deck.pop();
    };
    Deck.prototype.print_deck = function () {
        for (var g = 0; g < this.deck.length; g++) {
            console.log(this.deck[g].to_string());
        }
    };
    return Deck;
}());
exports.Deck = Deck;
var Hand = /** @class */ (function () {
    function Hand() {
        this.hand = [];
        this.total_value = 0;
        this.ace_counter = 0;
    }
    Hand.prototype.add_card_to_hand = function (card) {
        this.hand.push(card);
    };
    Hand.prototype.show_hand = function () {
        return this.hand;
    };
    Hand.prototype.get_card = function (i) {
        return this.hand[i];
    };
    Hand.prototype.get_cards_length = function () {
        return this.hand.length;
    };
    Hand.prototype.get_card_value = function (index) {
        return this.hand[index].get_value();
    };
    Hand.prototype.get_hand_value = function () {
        var _this = this;
        this.total_value = 0;
        this.hand.forEach(function (card) {
            _this.total_value += card.get_value();
            //console.log(card.get_Value());
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
var Money = /** @class */ (function () {
    function Money(balance) {
        this.balance = 0;
        this.balance = balance;
    }
    Money.prototype.get_balance = function () {
        return this.balance;
    };
    Money.prototype.withdraw = function () {
        console.log("\nyou withdrew: " + this.balance + "$\n");
        this.balance = 0;
    };
    Money.prototype.add_money = function (amount) {
        this.balance = this.balance + amount;
        return this.balance;
    };
    Money.prototype.sub_money = function (amount) {
        this.balance = this.balance - amount;
        return this.balance;
    };
    return Money;
}());
exports.Money = Money;
function random_permutation(arr) {
    for (var i = 0; i < arr.length; i++) {
        var swap_index = arr.length - i - 1;
        var random = Math.floor(Math.random() * swap_index);
        var swap_elem = arr[random];
        var last_elem = arr[swap_index];
        arr[swap_index] = swap_elem;
        arr[random] = last_elem;
    }
    return arr;
}
