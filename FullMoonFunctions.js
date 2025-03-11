const referenceCard = require('./cards.json').reference_card;
const roleActionCards = require('./cards.json').role_action_cards;

function isValidNumberOfPlayers(playerCount) {
    const MIN_PLAYERS = 3;
    const MAX_PLAYERS = 10;
    return playerCount >= MIN_PLAYERS && playerCount <= MAX_PLAYERS;
}
/***************************************************
 * getRandomSet(numberOfPlayers)
 * returns an object with each of the roles paired with an array of cards that match that role and have the length listed in
 *  the reference card for that many players.
 ***************************************************/ 
function getRandomSet(numberOfPlayers) {
    if (!isValidNumberOfPlayers(numberOfPlayers)) {
        throw new Error("Invalid number of players");
    }

    const roles = referenceCard.axis_types;
    const roleCounts = referenceCard.values[numberOfPlayers];

    let selectedCards = [];

    roles.forEach(role => {
        let count = roleCounts[role];
        if (count > 0) {
            // Get the cards for the role
            let availableCards = roleActionCards[role];
            // Ensure the quantity of each card is met
            let cardsToAdd = [];
            availableCards.forEach(card => {
                for (let i = 0; i < card.quantity; i++) {
                    cardsToAdd.push(card);
                }
            });

            // Shuffle the cards
            let shuffledCards = cardsToAdd.sort(() => 0.5 - Math.random());

            // Add the required number of cards to the selectedCards array
            selectedCards = selectedCards.concat(shuffledCards.slice(0, count));
        }
    });

    return selectedCards.map(card => card.name);
}

/***************************************************
 * getBeginnerSet(numberOfPlayers)
 * returns an array of cards for a beginner game. using the reference card to select the correct number of cards from 
 * each type. beginners should use the werewolf, the minion, villagers,the cursed villager, doppelgangers, the seer, 
 * the troublemaker, masons, the hunter, and the lycan in their village set-up when appropriate.
 ***************************************************/
function getBeginnerSet(numberOfPlayers) {
    if (!isValidNumberOfPlayers(numberOfPlayers)) {
        throw new Error("Invalid number of players");
    }

    const beginnerCards = [
        'werewolf', 
        'minion', 
        'villager', 
        'cursed', 
        'doppelganger', 
        'seer', 
        'troublemaker', 
        'mason', 
        'tanner', 
        'lycan',
        'prince',
        'mayor',
        'drunk'
    ];

    // check each role to see how many of the biginner cards are needed
    const roles = referenceCard.axis_types;
    const roleCounts = referenceCard.values[numberOfPlayers];

    let selectedCards = [];

    roles.forEach(role => {
        let count = roleCounts[role];
        if (count > 0) {
            // Get the cards for the roles
            let availableCards = roleActionCards[role];
            // Ensure the quantity of each card is met
            let cardsToAdd = [];
            availableCards.forEach(card => {
                for (let i = 0; i < card.quantity; i++) {
                    cardsToAdd.push(card);
                }
            });

            // choose the cards that are beginner cards
            let listOfBeginnerCards = cardsToAdd.filter(card => beginnerCards.includes(card.name));

            // Add the required number of cards to the selectedCards array
            selectedCards = selectedCards.concat(listOfBeginnerCards.slice(0, count));
        }
    });

    return selectedCards.map(card => card.name);
}

module.exports = { isValidNumberOfPlayers, getBeginnerSet, getRandomSet };
