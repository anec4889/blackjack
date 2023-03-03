import {
    Card, Deck,
    Hand , Money
} from "./main";
import * as readline from 'readline';

type Busted = boolean;

//2 indicates how many decks you want to play with
const deck = new Deck(2);

//shuffles the whole deck
deck.shuffle();

//start with 100$
let user_balance: Money = new Money(100);

//hidden_card is used to determine when the delears first card should be "hidden"
let hidden_card: boolean = true;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Compares the computers hand value with the players hand value each round and checks if either of them have a total hand value greater than 21. Then prints accordingly.
 * @example
 * // returns false
 * player_hand.get_hand_value() = 22; dealer_hand.get_hand_value() = 20; bet = 50
 * check_busted(player_hand, dealer_hand, bet);
 * @param {Hand} player_hand - The cards of the player.
 * @param {Hand} dealers_hand - The cards of the dealer.
 * @param {number} bet - Number to be added or substracted from your balance.
 * @returns true if neither the player nor the dealer has a hand value smaller than 21, false if the hand value is greater than 21 
 */
function check_busted(player_hand: Hand, dealer_hand: Hand, bet: number): Busted {
    if (player_hand.get_hand_value() > 21) {
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        console.log("You Busted, You Lost!");
        console.log("Your Balance Is Now: " + user_balance.sub_money(bet) + "$");
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        game();
        return false;
    } else if (dealer_hand.get_hand_value() > 21) {
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        console.log("Dealer Busted, You Win!");
        console.log("Your Balance Is Now: " + user_balance.add_money(bet) + "$");
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        game();
        return false;
    }
    return true;
}

/**
 * Compares the result of the game after the player has hit stand provided that both the dealer and the player has a score lower than 22 and declares a winner based on the result.
 * @example 
 * // returns "Push!" "Your Balance Is Now: x $"
 * player_hand.get_hand_value = 18; dealer_hand.get_hand_value = 18; bet = 50;
 * check_winner(player_hand, dealer_hand, 50);
 * @param {Hand} player_hand - The cards of the player.
 * @param {Hand} dealer_hand - The cards of the dealer.
 * @param {number} bet - Number to be added or substracted from your balance.
 */
function check_winner(player_hand: Hand, dealer_hand: Hand, bet: number): void {
    if (dealer_hand.get_hand_value() <= 21) {
        if (player_hand.get_hand_value() == dealer_hand.get_hand_value()){
            console.log("\n-------------------------------------------------------------------------------------------------------------\n");
            console.log("Push!");
            console.log("Your Balance Is Now: " + user_balance.get_balance() + "$");
        } else if (player_hand.get_hand_value() < dealer_hand.get_hand_value()) {
            console.log("\n-------------------------------------------------------------------------------------------------------------\n");
            console.log("You Lose!");
            console.log("Your Balance Is Now: " + user_balance.sub_money(bet) + "$");
        } else if (player_hand.get_hand_value() > dealer_hand.get_hand_value()) {
            console.log("\n-------------------------------------------------------------------------------------------------------------\n");
            console.log("You Win!");
            console.log("Your Balance Is Now: " + user_balance.add_money(bet) + "$");
        }
        
        console.log("\n-------------------------------------------------------------------------------------------------------------\n");
        game();
    }
}

/**
 * Adds cards to the dealers hand after the player has chosen to stand and calls on functions that checks the win conditions.
 * @param {Hand} player_hand - The cards of the player.
 * @param {Hand} dealer_hand - The cards of the dealer.
 * @param {Deck} deck - Array of cards which the dealers or players new card/s is drawn from.
 * @param {number} bet - Number to be added or subtracted from your balance.
 */
function stand(player_hand: Hand, dealer_hand: Hand, deck: Deck, bet: number): void {
    hidden_card = false;
    while (dealer_hand.get_hand_value() < 17) {
        dealer_hand.add_card_to_hand(deck.draw());
    }
    print_hands_game(player_hand, dealer_hand, deck);
    if (check_busted(player_hand, dealer_hand, bet)) {
        check_winner(player_hand, dealer_hand, bet);
    } else {}
}
    

/**
 * Gives the player the option to either "Hit" and receive a new card to its hand or "Stand" and pass the turn to the dealer.
 * @param {Hand} player_hand - The cards of the player.
 * @param {Hand} dealer_hand - The cards of the dealer.
 * @param {Deck} deck - Array of cards which the dealer or players new card/s is drawn from.
 * @param {number} bet - Number to be added or subtracted from your balance.
 */
function hit_or_stand(player_hand: Hand, dealer_hand: Hand, deck: Deck, bet: number): void {
    rl.question("Hit or Stand[H/S]: ", (answer: string) => {
        switch(answer.toUpperCase()) {
            case 'H':
                player_hand.add_card_to_hand(deck.draw());
                print_hands_game(player_hand, dealer_hand, deck);
                if (check_busted(player_hand, dealer_hand, bet)) {
                    hit_or_stand(player_hand, dealer_hand, deck, bet);
                }
                break;
            case 'S':
                stand(player_hand, dealer_hand, deck, bet);
                break;
            default:
                console.log("Invalid input");
                hit_or_stand(player_hand, dealer_hand, deck, bet);
        }
    });
}

/**
 * Prints out the status of the game including cards left in the deck, the dealer and the players hands and their corresponding value.
 * @param {Hand} player_hand - The cards of the player.
 * @param {Hand} dealer_hand - The cards of the dealer.
 * @param {Deck} deck - Array of cards which the dealer or players new card/s is drawn from.
 */
export function print_hands_game(player_hand: Hand, dealer_hand: Hand, deck: Deck): void {
        console.log("\n-------------------------------------------------------------------------------------------------------------");
        console.log("\nCards Left In The Deck: " + deck.length());
        console.log("\n-------------------------------------------------------------------------------------------------------------");
        console.log("\nYour Hand Value: " + player_hand.get_hand_value());
        console.log("\nYour Hand: ");
        for (let i = 0; i < player_hand.get_cards_length(); i++) {
            console.log((player_hand.get_card(i)).to_string());
        }

        if (hidden_card) {
            console.log("\nDealer Hand Value: " + (dealer_hand.get_hand_value() - dealer_hand.get_card_value(0)));
        } else {
            console.log("\nDealer Hand Value: " + dealer_hand.get_hand_value());
        }
        
        console.log("\nDealers Hand: ");
        if (hidden_card) {
            console.log("Hidden card");
        } else {}
        let j: number;
        for (hidden_card ? j = 1: j = 0; j < dealer_hand.get_cards_length(); j++) {
            console.log((dealer_hand.get_card(j)).to_string());
        }
}
/**
 * Gives the player the option to double their bet (provided that the player has enough money) in the first round of each game.
 * In case of a double bet, the player receives one more card and is then forced to stand.
 * @param {Hand} player_hand - The cards of the player.
 * @param {Hand} dealer_hand - The cards of the dealer.
 * @param {Deck} deck - Array of cards which the dealer or players new card/s is drawn from.
 * @param {number} bet - Number to be added or subtracted from your balance.
 */
function double_bet_check(player_hand: Hand, dealer_hand: Hand, deck: Deck, bet: number): void {
    rl.question("Do You Want To Double Your Bet?[Y/N]: ", (answer: string) => {
        switch(answer.toUpperCase()) {
            case 'Y':
                if (bet * 2 > user_balance.get_balance()) {
                    console.log("Insufficient Funds!");
                    hit_or_stand(player_hand, dealer_hand, deck, bet);
                } else {
                    bet = 2 * bet;
                    player_hand.add_card_to_hand(deck.draw());
                    stand(player_hand, dealer_hand, deck, bet);
                }
                
                break;
            case 'N':
                hit_or_stand(player_hand, dealer_hand, deck, bet);
            
                break;
            default:
                console.log("Invalid input!")
                double_bet_check(player_hand, dealer_hand, deck, bet);
        }    
    });
}
//implement split

/**
 * Creates new hands for the dealer and the player, asks how large bet the player would like to place and deals out two cards each to the dealer and the player.
 */
export function play(): void {
    let bet: number = 0;
    const player_hand = new Hand();
    const dealer_hand = new Hand();

    console.log("Your Balance: " + user_balance.get_balance() + "$");
    rl.question("Place bet: ", (amount: string) => {
        if (user_balance.get_balance() < Number(amount)) {
            console.log("Insufficient Funds!");
            play();
        } else {
            bet += Number(amount);
            player_hand.add_card_to_hand(deck.draw());
            dealer_hand.add_card_to_hand(deck.draw());
            player_hand.add_card_to_hand(deck.draw());
            dealer_hand.add_card_to_hand(deck.draw());
            
            print_hands_game(player_hand, dealer_hand, deck);
            double_bet_check(player_hand, dealer_hand, deck, bet);
            
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
            
        }
        
    });
}

/**
 * Prints out all the rules for the game.
 */
function rules(): void {
    console.log("RULES\n");
    console.log("");
    console.log("Before The Game\n");
    console.log("- The goal is to get your hands value to 21 and beat the dealer.\n");
    console.log("- Each face card is worth 10, aces are worth either 1 or 11. Any other card is worth its rank\n");
    console.log("- A bet is placed before the game. If the dealer wins you lose the money.\n In case of a draw you receive the money you bet and if you win, the bet doubles.\n");
    console.log("");
    console.log("Play");
    console.log("");
    console.log("- The player and the dealer starts with two cards each.\n The players cards are faced up and the first of the dealers cards are faced down.\n");
    console.log("- You can choose to hit if you want to receive a new card to your hand or stand if you want to end your turn.\n");
    console.log("- An ace is valued 1 if the players total hand value is greater than 10 and is valued 11 if the total hand value is smaller than 11.\n");
    console.log("- The dealer must take cards up to the value of 16. The dealer must stand if the cards value are 17 or higher.\n");
    console.log("- If your total value over exceeds 21 then you automatically lose and the dealer wins.\n");
    console.log("- If the dealers total value over exceeds 21 then the dealer automaticaly lose and you win.\n");
}

/**
 * Prints out the game menu.
 */
function show_menu(): void {
    console.log("[A] Play\n[B] Add money\n[C] Withdraw\n[D] Rules\n[E] Quit\n");
}

/**
 * Handles the user input from the function game and calls on different functions depending on the chosen alternative.
 * @param {string} choice - user input
 */
export function handle_menu_input(choice: string): void {
    switch(choice) {
        case 'A':
            console.log('\n');
            play();
            break;
        case 'B':
            rl.question("Enter amount: ", (amount: string) => {
                if (Number(amount) < 0) {
                    console.log("Invalid input!");
                    game();
                } else {
                    user_balance.add_money(Number(amount));
                    console.log("Your Balance Is Now: " + user_balance.get_balance() + "$");
                    game();
                }
            });

            break;
        case 'C':
            user_balance.withdraw();
            game();
            break;
        case 'D':
            rules();
            game();
            break;
        default:
            console.log("Invalid choice");
            game();
    }
}

/**
 * Starts the game and prints out the game menu. Asks the player which alternative from the game menu they'd like to choose.
 */
function game(): void {
    console.log("");
    hidden_card = true;
    show_menu();
    rl.question("Enter your choice: ", (answer: string) => {
        if (answer.toLocaleUpperCase() === 'E') {
            rl.close();
        } else {
            handle_menu_input(answer.toUpperCase());
        }
    });
}
game();