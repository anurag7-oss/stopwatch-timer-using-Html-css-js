const $ = id => document.querySelector(id);
const lapList = document.getElementById("laplist");

let [minutes, sec, milisec] = [0, 0, 0];
let interval;

const pad = t => t.toString().padStart(2, '0');
const display = () => {
    $("#milisecond").textContent = pad(milisec);
    $("#second").textContent = pad(sec);
    $("#minutes").textContent = pad(minutes);
};

const update = () => {
    if (++milisec === 100) {
        milisec = 0;
        if (++sec === 60) {
            sec = 0;
            minutes++;
        }
    }
    display();
};

const resetData = () => [minutes, sec, milisec] = [0, 0, 0];

const addLap = () => {
    const li = document.createElement('li');
    li.textContent = `Lap ${lapList.childElementCount + 1}: ${pad(minutes)}:${pad(sec)}:${pad(milisec)}`;
    lapList.appendChild(li);
};

$("#startBtn").addEventListener("click", () => {
    clearInterval(interval);
    interval = setInterval(update, 10);
    $("#startBtn").disabled = true;
    $("#pauseBtn").disabled = false;
});

$("#pauseBtn").addEventListener("click", () => {
    clearInterval(interval);
    $("#startBtn").disabled = false;
    $("#pauseBtn").disabled = true;
});

$("#stopBtn").addEventListener("click", () => {
    addLap();
    $("#startBtn").disabled = false;
    $("#pauseBtn").disabled = false;
});

$("#resetBtn").addEventListener("click", () => {
    clearInterval(interval);
    resetData();
    display();
    lapList.innerHTML = "";
    $("#startBtn").disabled = false;
    $("#pauseBtn").disabled = true;
});
