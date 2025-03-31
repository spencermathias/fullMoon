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
fetch('https://fakestoreapi.com/products/1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

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
    console.log('Selected cards:', cardState);
    // Hide the title
    document.getElementById('title').style.display = 'none';

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear previous content

    // Iterate over each card type
    Object.keys(allCards.role_action_cards).forEach((cardType) => {
        const cardTypeSection = document.createElement('div');
        cardTypeSection.className = 'card-type-section';

        // Add a header for the card type
        const cardTypeHeader = document.createElement('h3');
        cardTypeHeader.innerText = cardType.charAt(0).toUpperCase() + cardType.slice(1);
        cardTypeHeader.addEventListener('click', () => {
            // Toggle visibility of the card type section
            const cardContainer = cardTypeSection.querySelector('.card-container');
            cardContainer.style.display = cardContainer.style.display === 'none' ? 'block' : 'none';
        });
        cardTypeSection.appendChild(cardTypeHeader);

        // Container for cards of this type
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.style.display = 'none'; // Initially collapsed

        // Display selected cards of this type
        cardState[cardType].forEach((card) => {
            const cardDetails = allCards.role_action_cards[cardType][allCards.role_cards[card].index];
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            const cardName = document.createElement('h4');
            cardName.innerText = cardDetails.name;
            cardDiv.appendChild(cardName);

            const cardDescription = document.createElement('p');
            cardDescription.innerText = cardDetails.description;
            cardDiv.appendChild(cardDescription);

            cardContainer.appendChild(cardDiv);
        });

        // Add empty slots for cards that need to be chosen
        const requiredPlayers = requestedPlayers || 0;
        const emptySlots = requiredPlayers - selectedCards.length;
        for (let i = 0; i < emptySlots; i++) {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'card empty-slot';
            emptySlot.innerText = 'Empty Slot';
            cardContainer.appendChild(emptySlot);
        }

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

