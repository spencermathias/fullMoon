/* for debugging purposes only 
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
*/
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
    document.getElementById('gameState').innerText = JSON.stringify(gameState, null, 2);
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
    playerCountInput.placeholder = 'Number of Players';
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
function handleUpdateSelectedCards(gameState) {
    console.log('Selected cards:', gameState);
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear previous content

    // Add a title
    const title = document.createElement('h2');
    title.innerText = 'Selected Cards';
    gameBoard.appendChild(title);

    // Display each selected card with its description
    gameState.selectedCards.forEach((card) => {
        const cardType = allCards.role_cards[card];
        const cardDetails = allCards.role_action_cards[cardType.type][cardType.index]; // Assuming the first card is the one to display
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        const cardName = document.createElement('h3');
        cardName.innerText = cardDetails.name;
        cardDiv.appendChild(cardName);

        const cardDescription = document.createElement('p');
        cardDescription.innerText = cardDetails.description;
        cardDiv.appendChild(cardDescription);

        // Dropdown to select a different card
        const dropdown = document.createElement('select');
        dropdown.addEventListener('change', (event) => {
            const newCardName = event.target.value;
            socket.emit('updateCardSelection', { oldCard: card, newCard: newCardName });
        });

        // Populate dropdown with all available cards
        allCards.role_action_cards[cardType.type].forEach((availableCard) => {
            const option = document.createElement('option');
            option.value = availableCard.name;
            option.text = availableCard.name;
            if (availableCard.name === card.name) {
                option.selected = true;
            }
            dropdown.appendChild(option);
        });

        cardDiv.appendChild(dropdown);
        gameBoard.appendChild(cardDiv);
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

