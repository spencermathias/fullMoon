//for debugging purposes only 
if(true){
    function io() {
        return {
            emit:function (params) {
                console.log(params)
            },
            on:function(params,data) {
                console.log(params,':',data)
            }
        }
    }
}

document.getElementById('submit').addEventListener('click', function () {
    const data = {
        message: document.getElementById('message').value
    };
    socket.send(JSON.stringify(data));
    document.getElementById('message').value = '';
    return false;
});

document.getElementById('title').style.color = '#ff0000'
function titleFunction(){
	socket.e
}

const socket = io();

let allCards = [];

// Fetch cards.json from the server
fetch('./data/cards.json')
    .then(response => response.json())
    .then(data => {
        console.log('Cards fetched:', data);
        allCards = data;
    })
    .catch(error => console.error('Error fetching cards:', error));

document.getElementById('title').addEventListener('click', () => {
    socket.emit('joinGame');
});

// Socket event handlers
socket.on('updateGameState', handleUpdateGameState);
socket.on('chooseGameType', handleChooseGameType);
socket.on('startSelectingCards', handleUpdateSelectedCards);
socket.on('gameReady', handleGameReady);
socket.on('invalidSelection', handleInvalidSelection);

// Function to handle 'updateGameState'
function handleUpdateGameState(gameState) {
    document.getElementById('gameActions').innerText = JSON.stringify(gameState, null, 2);
    if (gameState.state === 'choosing') {
        document.getElementById('gameActions').style.display = 'block';
    } else {
        document.getElementById('gameActions').style.display = 'none';
    }
}

// Function to handle 'chooseGameType'
function handleChooseGameType() {
    const gameTypeContainer = document.getElementById('gameTypeContainer');
    gameTypeContainer.style.display = "block"; // Make the pane visible
    gameTypeContainer.classList.add('slide-down'); // Add the slide-down animation class
    gameTypeContainer.innerHTML = ''; // Clear previous content

    // Create a dropdown for game types
    const gameTypeDropdown = document.createElement('select');
    gameTypeDropdown.id = 'gameTypeDropdown';

    ['beginner', 'random', 'blank'].forEach((type) => {
        const option = document.createElement('option');
        option.value = type;
        option.text = type.charAt(0).toUpperCase() + type.slice(1);
        gameTypeDropdown.appendChild(option);
    });
    gameTypeContainer.appendChild(gameTypeDropdown);

    // Create an input for the number of players
    const playerCountInput = document.createElement('input');
    playerCountInput.type = 'number';
    playerCountInput.id = 'playerCountInput';
    playerCountInput.min = 3;
    playerCountInput.max = 10;
    playerCountInput.value = 4; // Default value';
    gameTypeContainer.appendChild(playerCountInput);

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.addEventListener('click', () => {
        const selectedGameType = gameTypeDropdown.value;
        const requiredPlayers = parseInt(playerCountInput.value, 10);
        if (isNaN(requiredPlayers) || requiredPlayers < 3 || requiredPlayers > 10) {
            alert('Please enter a valid number of players between 3 and 10.');
        } else {
            socket.emit('chooseGameType', { gameType: selectedGameType, requiredPlayers });
            gameTypeContainer.classList.remove('slide-down'); // Remove the animation class
            gameTypeContainer.style.display = "none"; // Hide the pane
        }
    });
    gameTypeContainer.appendChild(submitButton);
}

// Function to handle 'updateSelectedCards'

/**
 * Updates the game board to display the selected cards grouped by their types.
 * 
 * This function hides the title element, clears the game board, and dynamically
 * generates sections for each card type. Each section contains the selected cards
 * of that type and empty slots for cards that still need to be chosen.
 * 
 * @param {Object} cardState - an object containing The state of the selected cards names keyed by their type.
 * @param {number} requestedPlayers - The number of players required for the game.
 * 
 * @returns {void} This function does not return a value. It directly manipulates the DOM.
 */
function handleUpdateSelectedCards(cardState) {
    const requestedPlayers = 4; // Example value, replace with actual logic to get the number of players

    
    // Clear the game board
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    // Add the "Ready" button
    addReadyButton();
    
    // Hide the title
    document.getElementById('content').style.display = 'none';

    // Iterate over each card type
    Object.keys(allCards.role_action_cards).forEach((cardType) => {
        const cardTypeSection = document.createElement('div');
        cardTypeSection.className = 'card-type-section';
        cardTypeSection.setAttribute('data-card-type', cardType);

        // Add a header for the card type
        const cardTypeHeader = document.createElement('h3');
        cardTypeHeader.innerText = cardType.charAt(0).toUpperCase() + cardType.slice(1);
        cardTypeHeader.addEventListener('click', () => {
            // Toggle visibility of the card type section
            const cardContainer = cardTypeSection.querySelector('.card-container');
            cardContainer.style.display = cardContainer.style.display === 'none' ? 'flex' : 'none';
        });
        cardTypeSection.appendChild(cardTypeHeader);

        // Container for cards of this type
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.style.display = 'none'; // Initially collapsed

        populateCardTypeSection(cardContainer, cardType, cardState[cardType], requestedPlayers);
        cardTypeSection.appendChild(cardContainer);
        gameBoard.appendChild(cardTypeSection);
    });
}

// Function to handle 'gameReady'
function handleGameReady(gameState) {
    // Update the UI to show the game is ready to start
    alert('The game is ready to start!');
}

// Function to handle 'invalidSelection'
function handleInvalidSelection(message) {
    alert(message);
}

/**
 * Populates a given card type section with cards and empty slots.
 * 
 * @param {HTMLElement} cardContainer - The container element for the card type.
 * @param {string} cardType - The type of the card (e.g., "werewolves", "villagers").
 * @param {Array} selectedCards - The current cards selected for the current card type.
 * @param {number} requestedPlayers - The number of players required for the game.
 */
function populateCardTypeSection(cardContainer, cardType, selectedCards, requestedPlayers) {
    var emptySlots = allCards.reference_card.values[requestedPlayers][cardType];

    // Display selected cards of this type
    if (selectedCards) {
        let i = 0;
        selectedCards.forEach((card) => {
            const cardDetails = allCards.role_cards[card];
            cardDetails["DivIndex"] = i++; // Increment the DivIndex for each card

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            const cardImage = document.createElement('img');
            cardImage.src = cardDetails.picture;
            cardImage.alt = cardDetails.name;
            cardImage.className = 'card-image';
            cardDiv.appendChild(cardImage);

            const cardName = document.createElement('h4');
            cardName.innerText = cardDetails.name;
            cardDiv.appendChild(cardName);

            const cardDescription = document.createElement('p');
            cardDescription.innerText = cardDetails.description;
            cardDiv.appendChild(cardDescription);

            // Make the card clickable
            cardDiv.addEventListener('click', () => {
                const validOptions = getValidOptionsForCardType(cardType, selectedCards, card);
                // Check if dropdown and confirm button already exist
                if (!cardDiv.querySelector('select') && !cardDiv.querySelector('button')) {
                    const dropdown = document.createElement('select');
                    validOptions.forEach((card) => {
                        const option = document.createElement('option');
                        option.value = card.name;
                        option.text = card.name;
                        dropdown.appendChild(option);
                    });

                    const confirmButton = document.createElement('button');
                    confirmButton.innerText = 'Confirm';
                    confirmButton.addEventListener('click', () => {
                        const selectedCard = dropdown.value;
                        if (selectedCard) {
                            const cardIndex = cardDetails.DivIndex;
                            if (cardIndex !== undefined && cardIndex < selectedCards.length) {
                                if (selectedCard == "Empty Slot") {
                                    selectedCards.splice(cardIndex, 1); // Remove the card from the array
                                }else{ 
                                    selectedCards[cardIndex] = selectedCard;
                                }
                            }
                            cardContainer.innerHTML = ''; // Clear the cardDiv content
                            return populateCardTypeSection(cardContainer, cardType, selectedCards, requestedPlayers); // Re-populate the section
                        }
                    });

                    cardDiv.appendChild(dropdown);
                    cardDiv.appendChild(confirmButton);
                }
            });

            cardContainer.appendChild(cardDiv);
        });
        emptySlots = allCards.reference_card.values[requestedPlayers][cardType] - selectedCards.length;
    }
    // Add empty slots for cards that need to be chosen
    for (let i = 0; i < emptySlots; i++) {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'card empty-slot';
        emptySlot.innerText = 'Empty Slot';
        emptySlot.addEventListener('click', () => {
            const validOptions = getValidOptionsForCardType(cardType, selectedCards, null);
            // Check if dropdown and confirm button already exist
            if (!emptySlot.querySelector('select') && !emptySlot.querySelector('button')) {
                const dropdown = document.createElement('select');
                validOptions.forEach((card) => {
                    const option = document.createElement('option');
                    option.value = card.name;
                    option.text = card.name;
                    dropdown.appendChild(option);
                });

                const confirmButton = document.createElement('button');
                confirmButton.innerText = 'Confirm';
                confirmButton.addEventListener('click', () => {
                    const selectedCard = dropdown.value;
                    if (selectedCard) {
                        if (selectedCards){
                            selectedCards.push(selectedCard); // Add the selected card to the array
                        }else{
                            selectedCards = [selectedCard]; // Initialize the array with the selected card
                        }
                        cardContainer.innerHTML = ''; // Clear the emptySlot content
                        return populateCardTypeSection(cardContainer, cardType, selectedCards, requestedPlayers); // Re-populate the section
                    }
                });

                emptySlot.appendChild(dropdown);
                emptySlot.appendChild(confirmButton);
            }
        });
        cardContainer.appendChild(emptySlot);
    }
}

/**
 * Returns a list of valid card options for a given card type.
 * 
 * This function checks the type of the current card selected and retrieves
 * all cards of that type that are available in the `allCards` object.
 * 
 * @param {string} cardType - The type of the card (e.g., "werewolves", "villagers").
 * @returns {Array} An array of valid card options for the given card type.
 */
function getValidOptionsForCardType(cardType,currentList,currentCard) {
    if (!allCards.role_action_cards[cardType]) {
        console.error(`Invalid card type: ${cardType}`);
        return [];
    }
    // sum the number of cards with the same name in the currentList
    let cardCount = {};
    if(currentList){
        currentList.forEach(card => {
            cardCount[card] = (cardCount[card] || 0) + 1;
        });
    }
    // add the current card to the count
    if(currentCard){
        cardCount[currentCard] = (cardCount[currentCard] || 1) - 1;
    }
    // Retrieve all cards of the given type
    const validOptions = allCards.role_action_cards[cardType].filter(card => {
        return card.quantity - (cardCount[card.name] || 0) > 0; // Ensure the card is available
    });

    // Add an empty slot option
    validOptions.push({ name: "Empty Slot" });

    return validOptions; // Return only the names of the valid options
}

// Add a "Ready" button at the top of the game board
function addReadyButton() {
    const gameBoard = document.getElementById('gameBoard');

    // Check if the button already exists
    if (document.getElementById('readyButton')) return;
    // Create a container div for the button
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';
    buttonContainer.className = 'button-container';

    // Add the container to the game board
    gameBoard.insertBefore(buttonContainer, gameBoard.firstChild);

    const readyButton = document.createElement('button');
    readyButton.id = 'readyButton';
    readyButton.innerText = 'Ready';
    readyButton.className = 'ready-button';

    // Add click event listener to send selected cards to the server
    readyButton.addEventListener('click', () => {
        console.log('Ready button clicked. Sending selected cards to the server.');

        // Collect all selected cards
        const selectedCards = {};
        Object.keys(allCards.role_action_cards).forEach((cardType) => {
            const cardTypeSection = document.querySelector(`.card-type-section[data-card-type="${cardType}"]`);
            if (cardTypeSection) {
                const cardContainer = cardTypeSection.querySelector('.card-container');
                const selectedCardNames = Array.from(cardContainer.querySelectorAll('.card'))
                    .map((cardDiv) => cardDiv.querySelector('h4').innerText);
                selectedCards[cardType] = selectedCardNames;
            }
        });

        console.log('Selected cards:', selectedCards);
        // Emit the selected cards to the server
        socket.emit('clientReady', selectedCards);
    });

    // Append the ready button to the container
    buttonContainer.appendChild(readyButton);
}

