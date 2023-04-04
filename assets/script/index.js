'use strict';

/* 
RAMINDER SINGH
*/

const scoreCanvas = select('.score-canvas');
const scoreTable = select('table');
const wordDisplay = select('.word-area');
const timeDisplay = select('.time-area');
const pointsDisplay = select('.points-area');
const startBtn = select('.start-button');
const restartBtn = select('.restart-button');
const wordInput = select('.word-input');
const dialog = select('dialog');
const audioElement = document.querySelector("audio");

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);}

function select(selector, parent = document) {
    return parent.querySelector(selector);}

function randomizer(array) {
    for(let i = 0; i <= array.length; i++) {
        let randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }}

function checkLeaderboard(scoreCanvas) {
    if(localStorage.getItem('Games') == '[]') {
        scoreCanvas.style.display = 'none';
    }}

function readySetGo(countdown) {
    const countdownTime = setInterval(() =>  {
        wordDisplay.innerText = --countdown;

        if(countdown == 0) {
            wordDisplay.innerText = randomWord;
            clearInterval(countdownTime);
        }
    }, 1000);}

function prepStorage() {
    if(localStorage.getItem('Games') == null) {
        localStorage.setItem('Games', '[]');
    }}

function saveData() {
    const stats = {
        score: points,
    };

    const prevGames = JSON.parse(localStorage.getItem('Games'));
    prevGames.push(stats);

    localStorage.setItem('Games', JSON.stringify(prevGames));}

// Show Leaderboard Function
function showData() {
    const allGames = JSON.parse(localStorage.getItem('Games'));
    let index = 0;
    allGames.sort((a, b)=> b.score > a.score ? 1 : b.score < a.score ? -1 : 0);

    for(let game of allGames) {
        scoreTable.innerHTML += `
        <tr>
            <td>#${++index}</td>
            <td>${game.score}</td>
        </tr> `;
    }}

// Running Timer Function
function timer(timeLeft) {
    const timer = setInterval(() => {
        timeDisplay.innerHTML = `<i class="fa-solid fa-clock"></i> ${--timeLeft} seconds`;

        if(timeLeft == 0) {
            wordDisplay.innerText = 'Time over';
            wordDisplay.style.color = '#c8250f';
            startBtn.style.cursor = 'not-allowed';
            startBtn.disabled = true;
            wordInput.disabled = true;
            audioElement.pause();
            saveData();
            clearInterval(timer);
        }
    }, 1000);}

function validate(words) {
    onEvent('keyup', wordInput, () => {
        if(wordInput.value == randomWord) {
            const index = words.indexOf(randomWord);
            words.splice(index, 1);
            wordInput.style.border = 'thin solid #55da4c';
            pointsDisplay.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${points += 1}`;
            wordInput.value = '';
            wordDisplay.innerText = randomWord = randomizer(words);
        } else {
            wordInput.style.border = 'thin solid #c8250f';
        }
    });}

function startGame() {
    timer(timeLeft);
    startBtn.disabled = true;
    wordInput.disabled = false;
    wordInput.focus();}

const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
    'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
    'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window'
];

let timeLeft = 100;
let countdown = 4;
let points = 0;
let randomWord = randomizer(words);
wordInput.value = '';
wordInput.disabled = true;
dialog.showModal();
checkLeaderboard(scoreCanvas);
prepStorage();
showData();
audioElement.pause();
audioElement.currentTime = 0;

onEvent('click', dialog, function(event) {
    const rect = this.getBoundingClientRect();

    if(event.clientY < rect.top || event.clientY > rect.bottom || 
      event.clientX < rect.left || event.clientX > rect.right) {
        dialog.close();
    }
});

const result = () => {
    let resultScore = new Score(score, (wordCount / 99) * 100);
    wordElement.innerHTML=`You score ${resultScore.percentage} and had ${wordCount} correct`;
  };

onEvent('click', startBtn, () => {
    readySetGo(countdown);
    audioElement.volume = 0.2;
    audioElement.play();

    setTimeout(() => {
        startGame();
        validate(words);
    }, 4000);
});

onEvent('click', restartBtn, () => {
    window.location.reload();
    wordInput.value = '';
    audioElement.pause();
    audioElement.currentTime = 0;
});