const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { isValidNumberOfPlayers, getBeginnerSet, getRandomSet } = require('./FullMoonFunctions');
const { validateSelectedCards } = require('./FullMoonSharedFunctions');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

let gameState = {
    state: 'lobby',
    players: [],
    selectedCards: null,
    readyPlayers: [],
    requiredPlayers: null
};

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinGame', (playerName) => {
        if (gameState.state === 'lobby') {
            gameState.players.push({ id: socket.id, name: playerName, roleCards: [], coins: 2 });
            io.emit('updateGameState', gameState);

            if (isValidNumberOfPlayers(gameState.players.length)) {
                gameState.state = 'choosing';
                io.emit('chooseGameType', gameState);
            }
        }
    });

    socket.on('chooseGameType', (gameChoice) => {
        if (gameState.state === 'choosing') {
            gameState.requiredPlayers = gameChoice.requiredPlayers;

            if (gameChoice.gameType === 'beginner') {
                gameState.selectedCards = getBeginnerSet();
            } else if (gameChoice.gameType === 'random') {
                gameState.selectedCards = getRandomSet();
            } else if (gameChoice.gameType === 'blank') {
                gameState.selectedCards = [];
            }
            gameState.state = 'selecting';
            io.emit('startSelectingCards', gameState);
        }
    });

    socket.on('updateRequiredPlayers', (requiredPlayers) => {
        if (gameState.state === 'lobby' || gameState.state === 'choosing') {
            gameState.requiredPlayers = requiredPlayers;
            io.emit('updateGameState', gameState);
        }
    });

    socket.on('selectCards', (selectedCards) => {
        if (gameState.state === 'selecting') {
            if (validateSelectedCards(selectedCards, gameState.players.length)) {
                gameState.selectedCards = selectedCards;
                gameState.readyPlayers = [];
                io.emit('updateSelectedCards', gameState.selectedCards);
            } else {
                socket.emit('invalidSelection', 'The selected cards are not valid for the current number of players.');
            }
        }
    });

    socket.on('acceptCards', () => {
        if (gameState.state === 'selecting') {
            if (!gameState.readyPlayers.includes(socket.id)) {
                gameState.readyPlayers.push(socket.id);
            }

            if (gameState.readyPlayers.length === gameState.players.length) {
                gameState.state = 'ready';
                io.emit('gameReady', gameState);
            }
        }
    });

    socket.on('disconnect', () => {
        gameState.players = gameState.players.filter(player => player.id !== socket.id);
        gameState.readyPlayers = gameState.readyPlayers.filter(id => id !== socket.id);
        io.emit('updateGameState', gameState);
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));