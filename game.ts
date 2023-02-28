import { Card, Deck, Hand , Money} from "./main";
import * as readline from 'readline';

let user_balance = new Money(100);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function check_Winner(){
    console.log("check winner");
}

function hit_Or_Stand(player_hand, dealer_hand, deck){
    rl.question("Hit or Stand[H/S]: ", (answer: string) => {
        switch(answer.toUpperCase()) {
            case 'H':
                player_hand.add_Card_To_Hand(deck.draw());
                print_Hands_Game(player_hand, dealer_hand, deck);
                hit_Or_Stand(player_hand, dealer_hand, deck);
                break;
            case 'S':
                while(dealer_hand.get_Hand_value() <= 17){
                    dealer_hand.add_Card_To_Hand(deck.draw());
                }
                print_Hands_Game(player_hand, dealer_hand, deck);
                break;
            default:
                console.log("Invalid input");
                hit_Or_Stand(player_hand, dealer_hand, deck);
        }
        check_Winner();
    });
}

function print_Hands_Game(player_hand, dealer_hand, deck){
        console.log("\n-------------------------------------------------------------------------------------------------------------");
        console.log("\nYour Hand Value: " + player_hand.get_Hand_value());
        console.log("\nYour Hand: ");
        console.log(player_hand.show_hand());
        console.log("\nDealer Hand Value: " + dealer_hand.get_Hand_value());
        console.log("\nDealers Hand: ");
        console.log(dealer_hand.show_hand());
}

function play(){
    let bet: number = 0;
    const deck = new Deck();
    deck.shuffle();
    const player_hand = new Hand();
    const dealer_hand = new Hand();
    console.log("Your Balance: " + user_balance.get_balance() + "$"); 
    rl.question("Place bet: ", (amount: string) => {
        bet += Number(amount);
        player_hand.add_Card_To_Hand(deck.draw());
        dealer_hand.add_Card_To_Hand(deck.draw());
        player_hand.add_Card_To_Hand(deck.draw());
        dealer_hand.add_Card_To_Hand(deck.draw());

        print_Hands_Game(player_hand, dealer_hand, deck);
        // Todo första kortet för dealer ska vara gömt
        hit_Or_Stand(player_hand, dealer_hand, deck);
        
        
    });
}

function show_Menu(){
    console.log("[A] play\n[B] Add money\n[C] Withdraw\n[D] Rules\n[E] Quit\n");
}

function handle_Menu_Input(choice: String){
    switch(choice) {
        case 'A':
            console.log('\n');
            play();
            break;
        case 'B':
            rl.question("Enter amount: ", (amount: string) => {
                user_balance.add_Money(Number(amount))
                console.log(user_balance);
                game();
            });

            break;
        case 'C':
            //TODO implement withdraw, typ färdig
            user_balance.withdraw();
            game();
            break;
        case 'D':
            //TODO print the rules
            console.log("");
            game();
            break;
        default:
            console.log("Invalid choice");
            game();
    }
}

function game() {
    show_Menu();
    rl.question("Enter your choice: ", (answer: String) => {
        if (answer.toLocaleUpperCase() === 'E') {
            rl.close();
        } else {
            handle_Menu_Input(answer.toUpperCase());
        }
    });
}
game();
//var quit_Flag: Boolean = true;
//while(quit_Flag){}

