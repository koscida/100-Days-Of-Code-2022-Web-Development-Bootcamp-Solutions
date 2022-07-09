// /////
// get elements from page
//
// config overlay
const configOverlay = document.getElementById('configOverlay');
//
// config form
const playerForm = document.querySelector('form');
const playerInput = document.getElementById('playername');
const playernameErrors = document.getElementById('playernameErrors');
//
// config btns
const player1EditBtn = document.getElementById('player1EditBtn');
const player2EditBtn = document.getElementById('player2EditBtn');
const configCancelBtn = document.getElementById('configCancelBtn');
//
// start game btn
const startGameBtn = document.getElementById('startGameBtn')
//
//
// game board
const gameDisplay = document.getElementById('gameDisplay')
//
const gameOver = document.getElementById('gameOver')
const winnerName = document.getElementById('winnerName')
//
const activePlayerName = document.getElementById('activePlayerName')
//
const gameBoard = document.getElementById('gameBoard')
const gameBoardSquares = document.querySelectorAll("#gameBoard li")
//
//
//
// /////
// app vars
let editingPlayer = 0
let activePlayer = 1
let gameDataRound = 0
let gameDataPlayers = [
	{
		name: '',
		symbol: 'X'
	},
	{
		name: '',
		symbol: 'O'
	}
]
let gameDataBoard = [
	[0,0,0],
	[0,0,0],
	[0,0,0],
]
//
//
//
// /////
// game config
//
//
// add event listeners
//
// open edit name
player1EditBtn.addEventListener('click', openPlayerConfig);
player2EditBtn.addEventListener('click', openPlayerConfig);
//
// close edit name
configCancelBtn.addEventListener('click', closePlayerConfig);
//
// click overlay to exit
//configOverlay.addEventListener('click', closePlayerConfig);
//
// form submit
playerForm.addEventListener('submit', savePlayerConfig)
//
//
// event functions
//
// config display
function openPlayerConfig(e) {
	// show
	configOverlay.style.display = 'block';
	// get clicked
	editingPlayer = +e.target.dataset.playerid
}
// config hide
function closePlayerConfig() {
	// hide
	configOverlay.style.display = 'none';
	// remove any errors
	playerForm.firstElementChild.classList.remove('error')
	playernameErrors.textContent = ""
	// reset text
	playerInput.value = ''
	// reset player
	editingPlayer = 0
}
// config save 
function savePlayerConfig(e) {
	e.preventDefault()
	
	// get form data
	const formData = new FormData(e.target)
	let newPlayerName = formData.get('playername')
	// clean name
	newPlayerName = newPlayerName.trim()
	
	// if name invalid
	if(!newPlayerName) {
		playernameErrors.textContent = "Please enter a valid name"
		e.target.firstElementChild.classList.add('error')
		return
	}
	
	// store name
	gameDataPlayers[editingPlayer-1].name = newPlayerName
	// replace in player element
	const playerName = document.getElementById('player' + editingPlayer + 'Name');
	playerName.textContent = newPlayerName
	// replace in step element
	if(editingPlayer == 1 && gameDataRound == 0)
		activePlayerName.textContent = newPlayerName
	
	// close modal
	closePlayerConfig()
}
//
//
//
//
// /////
// game logic
//
//
// add event listeners
//
// start game
startGameBtn.addEventListener('click', startNewGame);
//
// square clicks
for (const gameBoardSquare of gameBoardSquares) {
	gameBoardSquare.addEventListener('click', selectGameSquare);
}
//
//
// event functions
//
// config display
function startNewGame() {
	// check names
	if(gameDataPlayers[0].name == '' || gameDataPlayers[1] == '') {
		alert("Please add custom player names")
		return
	}
	//
	// set data rounds
	gameDataRound = 1
	// set game board
	gameDataBoard = [
		[0,0,0],
		[0,0,0],
		[0,0,0],
	]
	// set game display
	for (const gameBoardSquare of gameBoardSquares) {
		gameBoardSquare.textContent = ''
		gameBoardSquare.classList.remove("disabled")
	}
	//
	// show
	gameDisplay.style.display = 'block';
	// hide
	gameOver.style.display = 'none';
}
// 
function selectGameSquare(e) {
	const square = e.target
	const classList = square.classList
	//
	// if li item
	if(square.tagName !== 'li') {
		// if the square is not disabled
		if(!classList.contains('disabled')) {
			// update square
			//
			// incrament round
			gameDataRound += 1
			// change symbol
			square.textContent = gameDataPlayers[activePlayer - 1].symbol
			// add disabled class
			classList.add('disabled')
			// add to game data
			gameDataBoard[square.dataset.row][square.dataset.col] = activePlayer
			
			//
			//
			// check winners
			const potWinner = checkForGameOver()
			if(potWinner > 0) {
				endGame(potWinner)
				return
			}
			// check for end of round
			if(gameDataRound == 9) {
				endGame(0)
			}
			//
			//
			// go for next round
			//
			// change player
			activePlayer = activePlayer == 1 ? 2 : 1
			// show active player
			activePlayerName.textContent = gameDataPlayers[activePlayer - 1].name
			console.log("gameDataBoard", gameDataBoard)
		}
	}
}
//
//
// helper functions
//
// returns winner (returns 0 if no winner)
function checkForGameOver() {
	// check grid
	for (const i of [0,1,2]) {
		// check rows
		if(
			gameDataBoard[i][0] > 0 &&
			gameDataBoard[i][0] == gameDataBoard[i][1] &&
			gameDataBoard[i][1] == gameDataBoard[i][2]
		) {
			return gameDataBoard[i][0]
		}
		// check columns
		if(
			gameDataBoard[0][i] > 0 &&
			gameDataBoard[0][i] == gameDataBoard[1][i] &&
			gameDataBoard[1][i] == gameDataBoard[2][i]
		) {
			return gameDataBoard[i][0]
		}
	}
	// check diagnals
	if(
		gameDataBoard[0][0] > 0 &&
		gameDataBoard[0][0] == gameDataBoard[1][1] &&
		gameDataBoard[1][1] == gameDataBoard[2][2]
	) {
		return gameDataBoard[0][0]
	}
	if(
		gameDataBoard[2][0] > 0 &&
		gameDataBoard[2][0] == gameDataBoard[1][1] &&
		gameDataBoard[1][1] == gameDataBoard[0][2]
	) {
		return gameDataBoard[0][0]
	}
}
// display end of game
function endGame(winner) {
	if(winner > 0) {
		// update winner name
		winnerName.textContent = gameDataPlayers[winner - 1].name
	} else {
		gameOver.firstElementChild.textContent = "No winners"
	}
	
	// show
	gameOver.style.display = 'block';
}


