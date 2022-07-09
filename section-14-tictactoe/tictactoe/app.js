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
//
//
//
// /////
// game config
//
//
// config vars
let selectedPlayer = 0
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
	selectedPlayer = e.target.dataset.playerid
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
	selectedPlayer = 0
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
	// get name element
	const playerName = document.getElementById('player' + selectedPlayer + 'Name');
	playerName.textContent = newPlayerName
	
	// close modal
	closePlayerConfig()
}