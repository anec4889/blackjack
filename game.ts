import { Card, Deck, Hand , Money} from "./main";
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const new_money = new Money(0);
function play(){

}

function show_Menu(){

    console.log("[A] play\n[B] Add money\n[C] Withdraw\n[D] Quit\n");
}

function handle_Menu_Input(choice: String){
    switch(choice) {
        case 'A':
            console.log("Play");
            play();
            break;
        case 'B':
            console.log("Add money");
            //const new_money = new Money(amount);
            break;
        case 'C':
            //TODO implement withdraw, typ färdig
            new_money.withdraw();
            game();
            break;
        default:
            console.log("Invalid choice");
            game();
    }
}

function game() {
    show_Menu();
    rl.question('Enter your choice: ', (answer: String) => {
        if (answer.toLocaleUpperCase() === 'D') {
            rl.close();
        } else {
            handle_Menu_Input(answer.toLocaleUpperCase());
        }
    });
}
game();
//var quit_Flag: Boolean = true;
//while(quit_Flag){}

