const referenceCard = require('./data/cards.json').reference_card;
const roleActionCards = require('./data/cards.json').role_action_cards;

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

    let selectedCards = {};

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
            selectedCards[role] = shuffledCards.slice(0, count).map(card => card.name);
        }
    });

    return selectedCards;
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

    let selectedCards = {};

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
            selectedCards[role] = listOfBeginnerCards.slice(0, count).map(card => card.name);
        }
    });

    return selectedCards
}

/***************************************************
 * validateSelectedCards(selectedCards, numberOfPlayers)
 * returns true if the selected cards are valid for the number of players, false otherwise.
 ***************************************************/
function validateSelectedCards(selectedCards, numberOfPlayers) {
    if (!isValidNumberOfPlayers(numberOfPlayers)) {
        throw new Error("Invalid number of players");
    }

    const roles = referenceCard.axis_types;
    const roleCounts = referenceCard.values[numberOfPlayers];
    
    // Iterate over each selected card type
    for (const cardType of Object.keys(selectedCards)) {
        let selectedCardsMap = {};
        let cards = selectedCards[cardType];

        if (cards.length === roleCounts[cardType]) {
            for (const cardName of cards) {
                if (!roleActionCards[cardType]) {
                    console.log(`Invalid card type: ${cardType}`);
                    return false; // Exits the parent function
                }
                if (!roleActionCards[cardType].some(card => card.name === cardName)) {
                    console.log(`Invalid card name: ${cardName} for type: ${cardType}`);
                    return false; // Exits the parent function
                }
                selectedCardsMap[cardName] = (selectedCardsMap[cardName] || 0) + 1;
            }

            for (const cardName of Object.keys(selectedCardsMap)) {
                let count = selectedCardsMap[cardName];
                let availableCard = roleActionCards[cardType][cardName];
                if (availableCard && count > availableCard.quantity) {
                    console.log(`Too many of card ${cardName} selected for type: ${cardType}`);
                    return false; // Exits the parent function
                }
            }
        } else {
            console.log(`Invalid number of cards for type: ${cardType}. Expected ${roleCounts[cardType]}, got ${cards.length}`);
            return false; // Exits the parent function
        }
    }

    // If all checks pass, return true
    return true;
}

module.exports = { isValidNumberOfPlayers, getBeginnerSet, getRandomSet, validateSelectedCards };
