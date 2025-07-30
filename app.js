const minuteslabel = document.querySelector("#minutes");
const seclabel = document.querySelector("#second");
const miliseclabel = document.querySelector("#milisecond");

const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

const lapList = document.getElementById("laplist");

let minutes = 0;
let sec = 0;
let milisec = 0;
let interval;

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    clearInterval(interval); // to prevent multiple intervals
    interval = setInterval(updateTimer, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

function stopTimer() {
    // clearInterval(interval);
    addToLapList();        // lap add karo
    // Do NOT reset timer or display
    startBtn.disabled = false;
    pauseBtn.disabled = false;
}


function pauseTimer() {
    clearInterval(interval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    displayTimer();
    lapList.innerHTML = ""; // Clear laps
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function updateTimer() {
    milisec++;
    if (milisec === 100) {
        milisec = 0;
        sec++;
        if (sec === 60) {
            sec = 0;
            minutes++;
        }
    }
    displayTimer();
}

function displayTimer() {
    miliseclabel.textContent = padTime(milisec);
    seclabel.textContent = padTime(sec);
    minuteslabel.textContent = padTime(minutes);
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function resetTimerData() {
    minutes = 0;
    sec = 0;
    milisec = 0;
}

function addToLapList() {
    const laptime = `${padTime(minutes)}:${padTime(sec)}:${padTime(milisec)}`;
    const listItem = document.createElement('li');
    listItem.textContent = `Lap ${lapList.childElementCount + 1}: ${laptime}`;
    lapList.appendChild(listItem);
}
