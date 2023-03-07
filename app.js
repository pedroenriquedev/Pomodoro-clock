const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const increaseSessionBtn = document.getElementById('increaseSession');
const increaseBreakBtn = document.getElementById('increaseBreak');
const decreaseSessionBtn = document.getElementById('decreaseSession');
const decreaseBreakBtn = document.getElementById('decreaseBreak');

const minLabel = document.getElementById('num-1');
const secLabel = document.getElementById('num-2');
const breakLabel = document.getElementById('breakLength');
const sessionLabel = document.getElementById('sessionLength');

let beep = new Audio('beep.mp3');



let btns = [increaseSessionBtn, increaseBreakBtn, decreaseSessionBtn, decreaseBreakBtn];

let breakMin, sessionMin, sec, min;
let mainTimer = true;
let running = false;
function formatNumber(num) {
    if (num < 10) {
        return `0${num}`
    } else {
        return num
    }
}

function getInput() {
    breakMin = parseInt(breakLabel.textContent);
    sessionMin = parseInt(sessionLabel.textContent);
    sec = 0;
}

function appRunning () {
    pauseBtn.style.pointerEvents = 'auto';
    startBtn.style.pointerEvents = 'none';
    btns.forEach((el)=>{
        el.style.pointerEvents = 'none';
    })
    
}

function appPaused () {
    pauseBtn.style.pointerEvents = 'auto';
    btns.forEach((el)=>{
        el.style.pointerEvents = 'auto';
    })
}

function appStopped () {
    pauseBtn.style.pointerEvents = 'none';
    btns.forEach((el)=>{
        el.style.pointerEvents = 'auto';
    })
}

function updateDisplay() {
    minLabel.innerHTML = formatNumber(min);
    secLabel.innerHTML = formatNumber(sec);
}
function stopWatch(i) {
    sec--;
    if (sec === -1) {
        
        if (min === 0) {
            //clearInterval(i);
            // starts a break
            // get break input
            // set break logic
            
            if (mainTimer) {
                //break
                getInput();
                document.querySelector('.display-title').innerHTML = 'Break';
                min = breakMin;
                mainTimer = false; 
                beep.play();
            } else {
                // session
                // must be greater than 0
                getInput();
                document.querySelector('.display-title').innerHTML = 'Session';
                min = sessionMin;
                mainTimer = true;  
                beep.play();
            }
            
        }
        sec = 59;
        if (min != 0) {
            min--;
        }
        
    }
    
    if (min > -1) {
        //console.log(`${min}:${sec}`);
        //update display
        updateDisplay();
    }
}

let i;

startBtn.addEventListener('click', () => {
    // get break and session interval
    
    getInput();
    sec = 60;
    min = sessionMin;
    min--;
    i = setInterval(() => {
        
        stopWatch(i);
        
    }, speedTest);
    appRunning();
    running = true;
});

pauseBtn.addEventListener('click', () => {
    
    if (running) {
        clearInterval(i);
        appPaused();
        pauseBtn.innerHTML = 'Resume';
        running = false;
    } else {
        i = setInterval(() => {
            
            stopWatch(i);
            
        }, speedTest);
        appRunning();
        pauseBtn.innerHTML = 'Stop';
        running = true;
    }
    
});

resetBtn.addEventListener('click', () => {
    clearInterval(i);
    pauseBtn.innerHTML = 'Pause';
    running = false;
    getInput();
    min = sessionMin;
    updateDisplay();
    startBtn.style.pointerEvents = 'auto';
    document.querySelector('.display-title').textContent = 'Session';
    appStopped();
});

increaseBreakBtn.addEventListener('click', () => {
    num = parseInt(breakLabel.textContent);
    //sessionMin = parseInt(sessionLabel.textContent);
    breakLabel.innerHTML = `${num+1}`;
    if (document.querySelector('.display-title').textContent === 'Break') {
        getInput();
        min = breakMin;
        updateDisplay();
    }
});

increaseSessionBtn.addEventListener('click', () => {
    num = parseInt(sessionLabel.textContent);
    //sessionMin = parseInt(sessionLabel.textContent);
    sessionLabel.innerHTML = `${num+1}`;
    
    if (document.querySelector('.display-title').textContent === 'Session') {
        getInput();
        min = sessionMin;
        updateDisplay();
    }
});

decreaseBreakBtn.addEventListener('click', () => {
    num = parseInt(breakLabel.textContent);
    //sessionMin = parseInt(sessionLabel.textContent);
    if (num !== 1) {
        breakLabel.innerHTML = `${num-1}`;
        
        if (document.querySelector('.display-title').textContent === 'Break') {
            getInput();
            min = breakMin;
            updateDisplay();
        }
    }
});

decreaseSessionBtn.addEventListener('click', () => {
    num = parseInt(sessionLabel.textContent);
    //sessionMin = parseInt(sessionLabel.textContent);
    if (num !== 1) {
        sessionLabel.innerHTML = `${num-1}`;
        
        if (document.querySelector('.display-title').textContent === 'Session') {
            getInput();
            min = sessionMin;
            updateDisplay();
        }
        
    }
    
});

getInput();
min = sessionMin;
updateDisplay();
appStopped();
var speedTest = 1000;