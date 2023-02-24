"use strict";
exports.__esModule = true;
exports.Play = exports.Hand = exports.Deck = exports.Card = exports.faces = exports.suit = void 0;
exports.suit = ["Hearts", "Diamonds", "Clubs", "Spades"];
exports.faces = [['Ace', 11],
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
    ['King', 10]];
var Card = /** @class */ (function () {
    function Card(suit, face) {
        this.suit = suit;
        this.face = face;
    }
    Card.prototype.get_Value = function () {
        return this.face[1];
    };
    Card.prototype.get_Name = function () {
        return this.face[0];
    };
    Card.prototype.to_String = function () {
        return this.get_Name() + " of " + this.suit;
    };
    return Card;
}());
exports.Card = Card;
//const new_card = new Card(suit[0], faces[0]);
//console.log(new_card.to_String());
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
    Deck.prototype.print_Deck = function () {
        for (var g = 0; g < this.deck.length; g++) {
            console.log(this.deck[g].to_String());
        }
    };
    return Deck;
}());
exports.Deck = Deck;
//console.log(new_deck);
/*const permutation: Permutation = random_permutation(52);
const deck: Array<Card> = build_array(permutation.length, x => x);
for (let i = 0; i < permutation.length; i++) {
    deck[permutation[i]] = new Card(suit[], faces[i % 14]);
}*/
var Hand = /** @class */ (function () {
    function Hand() {
        this.hand = [];
        this.total_value = 0;
        this.ace_counter = 0;
    }
    Hand.prototype.add_Card_To_Hand = function (card) {
        this.hand.push(card);
    };
    Hand.prototype.show_hand = function () {
        return this.hand;
    };
    Hand.prototype.get_Hand_value = function () {
        var _this = this;
        this.hand.forEach(function (card) {
            _this.total_value += card.get_Value();
            //console.log(card.get_Value());
            if (card.get_Name() === exports.faces[0][0]) {
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
var Play = /** @class */ (function () {
    function Play() {
    }
    return Play;
}());
exports.Play = Play;
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
function build_array(size, content) {
    var result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
