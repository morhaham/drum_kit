"use strict";

const numOfkeys = 9;
let arrayOfDrums = [];
let sounds = [];
let letters = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
let stageNames = ["CLAP", "KICK", "BOOM", "RIDE", "SNARE", "BUMP", "FLOW", "PUNCH", "FLICK"];
let keyCodes = [65, 83, 68, 70, 71, 72, 74, 75, 76];


function drum(letter, keyCode, soundFileName, stageName) {
    return {
        getLetter: () => letter,
        getKeyCode: () => keyCode,
        getSoundFileName: () => soundFileName,
        getstageName: () => stageName,
        setLetter: (l) => letter = l,
        setkeyCode: (code) => keyCode = code,
        setSoundFileName: (fileName) => soundFileName = fileName,
        setStageName: (name) => stageName = name
    }
}

letters.forEach((letter, i) => {
    arrayOfDrums[i] = drum(
        letter, keyCodes[i], i + 1 + '.wav', stageNames[i]   
    );
});

const drumsUl = document.querySelector("#drums-container ul");
arrayOfDrums.forEach(drum => {
    let li = document.createElement('li');
    let letter = document.createElement('h2');
    let stageName = document.createElement('span');
    let sound = document.createElement('audio');
    let keyCode = drum.getKeyCode();
    letter.textContent = drum.getLetter();
    stageName.textContent = drum.getstageName();
    sound.src = './assets/piano-sounds/' + drum.getSoundFileName();
    sound.setAttribute('data-key', keyCode);
    li.setAttribute('data-key', keyCode);
    li.appendChild(letter);
    li.appendChild(stageName);
    li.appendChild(sound);
    drumsUl.appendChild(li);
});

window.addEventListener('keydown', (e) => {
    let keyCode = e.keyCode;
    let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    let key = document.querySelector(`li[data-key="${keyCode}"]`);
    if (!audio) return undefined;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
});

drumsUl.addEventListener('transitionend', (e) => {
    let target = e.target;
    if (e.propertyName !== 'transform') return undefined;
    target.classList.remove('playing');
})




