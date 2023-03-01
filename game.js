"use strict";
exports.__esModule = true;
var main_1 = require("./main");
var readline = require("readline");
var user_balance = new main_1.Money(100);
var hidden_card = true;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function check_busted(player_hand, dealer_hand, bet) {
    if (player_hand.get_hand_value() > 21) {
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        console.log("You Busted, You Lost!");
        console.log("Your Balance Is Now: " + user_balance.sub_money(bet) + "$");
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        game();
        return false;
    }
    else if (dealer_hand.get_hand_value() > 21) {
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        console.log("Dealer Busted, You Win!");
        console.log("Your Balance Is Now: " + user_balance.add_money(bet) + "$");
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        game();
        return false;
    }
    return true;
}
function check_winner(player_hand, dealer_hand, bet) {
    if (dealer_hand.get_hand_value() <= 21) {
        if (player_hand.get_hand_value() == dealer_hand.get_hand_value()) {
            console.log("\n-------------------------------------------------------------------------------------------------------------\n");
            console.log("Push");
            console.log("Your Balance Is Now: " + user_balance + "$");
        }
        else if (player_hand.get_hand_value() < dealer_hand.get_hand_value()) {
            console.log("\n-------------------------------------------------------------------------------------------------------------\n");
            console.log("You Lose!");
            console.log("Your Balance Is Now: " + user_balance.sub_money(bet) + "$");
        }
        else if (player_hand.get_hand_value() > dealer_hand.get_hand_value()) {
            console.log("\n-------------------------------------------------------------------------------------------------------------\n");
            console.log("You Win!");
            console.log("Your Balance Is Now: " + user_balance.add_money(bet) + "$");
        }
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        game();
    }
    //console.log("check winner");
}
function hit_or_stand(player_hand, dealer_hand, deck, bet) {
    rl.question("Hit or Stand[H/S]: ", function (answer) {
        switch (answer.toUpperCase()) {
            case 'H':
                player_hand.add_card_to_hand(deck.draw());
                print_hands_game(player_hand, dealer_hand);
                if (check_busted(player_hand, dealer_hand, bet)) {
                    hit_or_stand(player_hand, dealer_hand, deck, bet);
                }
                break;
            case 'S':
                hidden_card = false;
                while (dealer_hand.get_hand_value() < 17) {
                    dealer_hand.add_card_to_hand(deck.draw());
                }
                print_hands_game(player_hand, dealer_hand);
                check_busted(player_hand, dealer_hand, bet);
                check_winner(player_hand, dealer_hand, bet);
                break;
            default:
                console.log("Invalid input");
                hit_or_stand(player_hand, dealer_hand, deck, bet);
        }
    });
}
function print_hands_game(player_hand, dealer_hand) {
    console.log("\n-------------------------------------------------------------------------------------------------------------");
    console.log("\nYour Hand Value: " + player_hand.get_hand_value());
    console.log("\nYour Hand: ");
    for (var i = 0; i < player_hand.get_cards_length(); i++) {
        console.log((player_hand.get_card(i)).to_string());
    }
    if (hidden_card) {
        console.log("\nDealer Hand Value: " + (dealer_hand.get_hand_value() - dealer_hand.get_card_value(0)));
    }
    else {
        console.log("\nDealer Hand Value: " + dealer_hand.get_hand_value());
    }
    console.log("\nDealers Hand: ");
    if (hidden_card) {
        console.log("Hidden card");
    }
    else { }
    var j;
    for (hidden_card ? j = 1 : j = 0; j < dealer_hand.get_cards_length(); j++) {
        console.log((dealer_hand.get_card(j)).to_string());
    }
}
function play() {
    var bet = 0;
    var deck = new main_1.Deck();
    deck.shuffle();
    var player_hand = new main_1.Hand();
    var dealer_hand = new main_1.Hand();
    console.log("Your Balance: " + user_balance.get_balance() + "$");
    rl.question("Place bet: ", function (amount) {
        if (user_balance.get_balance() < Number(amount)) {
            console.log("Insufficient Funds!");
            play();
        }
        else {
            bet += Number(amount);
            player_hand.add_card_to_hand(deck.draw());
            dealer_hand.add_card_to_hand(deck.draw());
            player_hand.add_card_to_hand(deck.draw());
            dealer_hand.add_card_to_hand(deck.draw());
            print_hands_game(player_hand, dealer_hand);
            /*
            if(player_hand.get_card_value(0) == player_hand.get_card_value(1)){
                rl.question("Do You Want To Split?[Y/N]: ", (answer: string) => {
                    if(answer.toUpperCase() == 'Y'){
                        const split_hand_1 = new Hand();
                        const split_hand_2 = new Hand();
                        split_hand_1.add_Card_To_Hand(player_hand.get_card(0));
                        split_hand_2.add_Card_To_Hand(player_hand.get_card(1));
                        split_hand_1.add_Card_To_Hand(deck.draw());
                        split_hand_2.add_Card_To_Hand(deck.draw());
                        hit_Or_Stand(split_hand_1, dealer_hand, deck, bet);
                        hit_Or_Stand(split_hand_2, dealer_hand, deck, bet);
                    }
                });
            }
            */
            //Om vi ska fixa split måste hitOrStand ta en lista av spelare
            hit_or_stand(player_hand, dealer_hand, deck, bet);
        }
    });
}
function show_menu() {
    console.log("[A] play\n[B] Add money\n[C] Withdraw\n[D] Rules\n[E] Quit\n");
}
function handle_menu_input(choice) {
    switch (choice) {
        case 'A':
            console.log('\n');
            play();
            break;
        case 'B':
            rl.question("Enter amount: ", function (amount) {
                user_balance.add_money(Number(amount));
                console.log("Your Balance Is Now: " + user_balance.get_balance() + "$");
                game();
            });
            break;
        case 'C':
            user_balance.withdraw();
            game();
            break;
        case 'D':
            console.log("RULES\n");
            console.log("");
            console.log("Before The Game\n");
            console.log("- The goal is to get your hands value to 21 and beat the dealer.\n");
            console.log("- Each face card is worth 10, aces are worth either 1 or 11. Any other card is worth its rank\n");
            console.log("- A bet is placed before the game. If the dealer wins you lose the money.\n In case of a draw you recieve the money you bet and if you win, the bet doubles.\n");
            console.log("");
            console.log("Play");
            console.log("");
            console.log("- The player and the dealer starts with two cards each.\n The players cards are faced up and the first of the dealers cards are faced down.\n");
            console.log("- You can choose to hit if you want to recieve a new card to your hand or stand if you want to end your turn.\n");
            console.log("- An ace is valued 1 if the players total hand value is greater than 10 and is valued 11 if the total hand value is smaller than 11.\n");
            console.log("- The dealer must take cards up to the value of 16. The dealer must stand if the cards value are 17 or higher.\n");
            console.log("- If your total value over exceeds 21 then you automatically lose and the dealer wins.\n");
            console.log("- If the dealers total value over exceeds 21 then the dealer automaticaly lose and you win.\n");
            game();
            break;
        default:
            console.log("Invalid choice");
            game();
    }
}
function game() {
    console.log("");
    hidden_card = true;
    show_menu();
    rl.question("Enter your choice: ", function (answer) {
        if (answer.toLocaleUpperCase() === 'E') {
            rl.close();
        }
        else {
            handle_menu_input(answer.toUpperCase());
        }
    });
}
game();
