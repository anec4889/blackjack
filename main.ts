type Pair<H, T> = [H, T];
type Face = Pair<string, number>;
type Faces = Array<Face>;
type Suit = string;
type Suits = Array<Suit>;
type Deck_t = Array<Card>;

const suit: Suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const faces: Faces = [['Ace', 11],
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

class Card {    
    private suit: Suit;
    private face: Face;

    public constructor (suit: Suit, face: Face) {
        this.suit = suit;
        this.face = face;
    } 

    public get_Value(): number {
        return this.face[1];
    }
    
    public get_Name(): string {
        return this.face[0];
    }

    public to_String(): string {
        return this.get_Name() + " of " + this.suit;
    }
}

//const new_card = new Card(suit[0], faces[0]);
//console.log(new_card.to_String());

class Deck {
    private deck: Deck_t = [];
    
    public constructor () {
        for (let i = 0; i < 13; i++){
            for(let z = 0; z < 4; z++){
                this.deck.push(new Card(suit[z], faces[i]));
            }
        }
    }

    public shuffle(): Deck_t {
        return random_permutation(this.deck);
    }

    public draw(): Card {
        return this.deck.pop() as Card;
        
    }

    public print_Deck (): void {
        for (let g = 0; g < this.deck.length; g++) {
            console.log(this.deck[g].to_String());
        }
    }
}

//console.log(new_deck);
/*const permutation: Permutation = random_permutation(52);
const deck: Array<Card> = build_array(permutation.length, x => x);
for (let i = 0; i < permutation.length; i++) {
    deck[permutation[i]] = new Card(suit[], faces[i % 14]);
}*/

class Hand{
    private hand: Deck_t = [];
    private total_value: number = 0;
    private ace_counter: number = 0;

    public add_Card_To_Hand(card: Card ): void{
        this.hand.push(card);
        console.log(this.hand);
    }

    public get_Hand_value(): number {
        this.hand.forEach(card => {
            this.total_value += card.get_Value();
            console.log(card.get_Value());
            if (card.get_Name() === faces[0][0]) {
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
const new_deck = new Deck();
const new_hand = new Hand();
new_deck.shuffle();
//console.log(new_deck.draw());
//console.log("");
//new_deck.print_Deck();
console.log("");
new_hand.add_Card_To_Hand(new_deck.draw());
new_hand.add_Card_To_Hand(new_deck.draw());
new_hand.add_Card_To_Hand(new_deck.draw());
console.log(new_hand.get_Hand_value());

class Play{
    
}

type Permutation = Array<number>;

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

function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}