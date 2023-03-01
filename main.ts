export type Pair<H, T> = [H, T];
export type Face = Pair<string, number>;
export type Faces = Array<Face>;
export type Suit = string;
export type Suits = Array<Suit>;
export type Deck_t = Array<Card>;
export type Player_t = Array<Hand>;

export const suit: Suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
export const faces: Faces = [
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

export class Card {    
    private suit: Suit;
    private face: Face;

    public constructor(suit: Suit, face: Face) {
        this.suit = suit;
        this.face = face;
    } 

    public get_value(): number {
        return this.face[1];
    }
    
    public get_name(): string {
        return this.face[0];
    }

    public to_string(): string {
        return this.get_name() + " of " + this.suit;
    }
}

export class Deck {
    private deck: Deck_t = [];
    
    public constructor() {
        for (let i = 0; i < 13; i++){
            for(let z = 0; z < 4; z++) {
                this.deck.push(new Card(suit[z], faces[i]));
            }
        }
    }

    public length(): number {
        return this.deck.length;
    }

    public shuffle(): Deck_t {
        return random_permutation(this.deck);
    }

    public draw(): Card {
        return this.deck.pop() as Card;
    }

    public print_deck(): void {
        for (let g = 0; g < this.deck.length; g++) {
            console.log(this.deck[g].to_string());
        }
    }
}

export class Hand{
    private hand: Deck_t = [];
    private total_value: number = 0;
    private ace_counter: number = 0;

    public add_card_to_hand(card: Card): void{
        this.hand.push(card);
    }

    public show_hand(): Deck_t {
        return this.hand;
    }

    public get_card(i: number): Card {
        return this.hand[i];
    }

    public get_cards_length(): number {
        return this.hand.length;
    }
    
    public get_card_value(index: number): number{
        return this.hand[index].get_value();
    }

    public get_hand_value(): number {
        this.total_value = 0;
        this.hand.forEach(card => {
            this.total_value += card.get_value();
            //console.log(card.get_Value());
            if (card.get_name() === faces[0][0]) {
                this.ace_counter++;
            } else {}
        });
        if (this.ace_counter > 0 && this.total_value > 21) {
            this.total_value -= 10;
            this.ace_counter--;
        } else {}

        return this.total_value;
    }
}

export class Money{
    private balance: number = 0;

    public constructor(balance: number) {
        this.balance = balance;
    } 

    public get_balance(): number {
        return this.balance;
    }

    public withdraw(): void {
        console.log("\nyou withdrew: " + this.balance + "$\n");
        this.balance = 0;
    }

    public add_money(amount: number): number {
        this.balance = this.balance + amount;
        return this.balance;
    }

    public sub_money(amount: number): number{
        this.balance = this.balance - amount;
        return this.balance;
    }
}
export class Player{
    private players: Player_t = [];
    
    public add_players(player: Hand){
        this.players.push(player);
    }
    get_player(){

    }
}

function random_permutation<T>(arr: Array<T>): Array<T> {
    for (let i = 0; i < arr.length; i++) {
        const swap_index = arr.length - i - 1;
        const random = Math.floor(Math.random() * swap_index);
        const swap_elem = arr[random];
        const last_elem = arr[swap_index];

        arr[swap_index] = swap_elem;
        arr[random] = last_elem;
    }
    return arr;
}