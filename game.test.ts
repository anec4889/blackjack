import {
    Card, Deck,
    Hand, suits,
    faces
} from "./main";
import {
    play,
    handle_menu_input,
    print_hands_game
} from "./game";

test('Check if the shuffled deck is not equal to the unshuffled deck but has the same length', () => {
    const unshuffled_deck = new Deck(1);
    const shuffled_deck = new Deck(1);
    shuffled_deck.shuffle();

    expect(shuffled_deck.length()).toStrictEqual(unshuffled_deck.length());
    expect(unshuffled_deck).not.toStrictEqual(shuffled_deck);
});

test('Expect the draw function in Deck to return the last card in the deck', () => {
    const new_deck = new Deck(1);
    const new_card = new Card(suits[suits.length - 1], faces[faces.length - 1]);
    const drawed_card = new_deck.draw();

    expect(drawed_card).toStrictEqual(new_card);
});

test('Expect Card to return correct Value and Name', () => {
    const new_card = new Card(suits[0], faces[0]);
    expect(new_card.get_value()).toStrictEqual(11);
    expect(new_card.get_name()).toStrictEqual("Ace");
});

test('Expect add_card_to_hand in Card to add the correct card', () => {
    const new_card = new Card(suits[0], faces[0]);
    const new_hand = new Hand();
    new_hand.add_card_to_hand(new_card);

    expect(new_hand.show_hand()).toEqual([new_card]);
});

test('Expect Ace to be 11 if total value is under 11 and 1 otherwise', () => {
    const new_hand_eleven = new Hand();
    const new_hand_one = new Hand();

    new_hand_eleven.add_card_to_hand(new Card(suits[0], faces[9]));
    new_hand_eleven.add_card_to_hand(new Card(suits[1], faces[9]));

    new_hand_one.add_card_to_hand(new Card(suits[0], faces[1]));
    new_hand_one.add_card_to_hand(new Card(suits[0], faces[2]));

    new_hand_eleven.add_card_to_hand(new Card(suits[0], faces[0]));
    new_hand_one.add_card_to_hand(new Card(suits[0], faces[0]));

    expect(new_hand_eleven.get_hand_value()).toStrictEqual(21);
    expect(new_hand_one.get_hand_value()).toStrictEqual(16);
});

