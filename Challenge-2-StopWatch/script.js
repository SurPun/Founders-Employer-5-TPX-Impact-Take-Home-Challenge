// Variables

const playButton = document.getElementsByClassName('play')[0];
const lapButton = document.getElementsByClassName('lap')[0];
const resetButton = document.getElementsByClassName('reset')[0];
const clearButton = document.getElementsByClassName('lap-clear-button')[0];

const hour = document.getElementsByClassName('hour')[0];
const minute = document.getElementsByClassName('minute')[0];
const second = document.getElementsByClassName('sec')[0];
const centiSecond = document.getElementsByClassName('msec')[0];
const laps = document.getElementsByClassName('laps')[0];

const bg = document.getElementsByClassName('outer-circle')[0];

let isPlay = false;

let hr;
let min;
let sec;
let centiSec;
let hrCounter = 0
let minCounter = 0;
let secCounter = 0;
let centiCounter = 0;

let lapItem = 0;
let isReset = false;

// Single digit convertor 

function timer(n) {
    return (n < 10) ? '0' + n : n;
 }

// Button

const toggleButton = () => {
    lapButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');
}

// Play Button

const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = 'Pause'
        bg.classList.add('animation-bg');

        hr = setInterval(() => {
            if (hrCounter === 24) {
                hrCounter = 0;
            }
            hour.innerHTML = `${timer(++hrCounter)} :`;
        }, 1000*60*60)

        min = setInterval(() => {
            // if (minCounter === 60) {
            //     minCounter = 0;
            // }
            minute.innerHTML = `&nbsp;${timer(++minCounter)} :`;
            if (minCounter === 60) {
                minute.innerHTML = `&nbsp;${timer(0)} :`;
                minCounter = 0;
            }
            }, 60*1000);

        sec = setInterval(() => {
            // if (secCounter === 60) {
            //     secCounter = 0;
            // }
            second.innerHTML = `&nbsp;${timer(++secCounter)} :`;
            if (secCounter === 60) {
                second.innerHTML = `&nbsp;${timer(0)} :`
                secCounter = 0;
            }
        }, 1000);

        centiSec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${timer(++centiCounter)}`;
        }, 10);

        isPlay = true;
        isReset = true;

    } else {
        playButton.innerHTML = 'Play'
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;7
        isReset = false;

        bg.classList.remove('animation-bg');
    }
    toggleButton();
}

// Reset Button

const reset = () => {
    isReset = true;
    hrCounter = 0
    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;
    play();
    lapButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    hour.innerHTML = `00 :`;
    minute.innerHTML = `&nbsp;00 :`;
    second.innerHTML = `&nbsp;00 :`;
    centiSecond.innerHTML = `&nbsp;00`;
}

// Lap Button

const lap = () => {
    const li = document.createElement('li');
    const number = document.createElement('span');
    const timeStamp = document.createElement('span');

    li.setAttribute('class', 'lap-item');
    number.setAttribute('class', 'number');
    timeStamp.setAttribute('class', 'time-stamp');

    number.innerText = `Lap ${timer(++lapItem)}`
    timeStamp.innerHTML = `${timer(hrCounter)} : ${timer(minCounter)} : ${timer(secCounter)} : ${timer(centiCounter)}`

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove('hidden');
}

// Clear Button

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton)
    clearButton.classList.add('hidden');
    lapItem = 0;
}

// EventListener

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
clearButton.addEventListener('click', clearAll)