const startButton = document.querySelector(".start");
const lapButton = document.querySelector(".lap");
const resetButton = document.querySelector(".reset");
const clearButton = document.querySelector(".lap-clear-button");

const minute = document.querySelector(".minute");
const second = document.querySelector(".sec");
const centiSecond = document.querySelector(".msec");

const laps = document.querySelector(".laps");
const bg = document.querySelector(".outer-circle");

let isRunning = false;
let timer = null;

let minCounter = 0;
let secCounter = 0;
let centiCounter = 0;
let lapItem = 0;

const updateDisplay = () => {
    minute.innerHTML = `${String(minCounter).padStart(2, "0")} :`;
    second.innerHTML = `&nbsp;${String(secCounter).padStart(2, "0")} :`;
    centiSecond.innerHTML = `&nbsp;${String(centiCounter).padStart(2, "0")}`;
};

const toggleButtons = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const start = () => {

    if (!isRunning) {

        startButton.innerHTML = "Pause";
        bg.classList.add("animation-bg");

        timer = setInterval(() => {

            centiCounter++;

            if (centiCounter === 100) {
                centiCounter = 0;
                secCounter++;

                if (secCounter === 60) {
                    secCounter = 0;
                    minCounter++;
                }
            }

            updateDisplay();

        }, 10);

        isRunning = true;

    } else {

        clearInterval(timer);

        startButton.innerHTML = "Start";
        bg.classList.remove("animation-bg");

        isRunning = false;
    }

    toggleButtons();
};

const reset = () => {

    clearInterval(timer);

    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;

    updateDisplay();

    startButton.innerHTML = "Start";

    isRunning = false;

    bg.classList.remove("animation-bg");

    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
};

const lap = () => {

    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.className = "lap-item";
    number.className = "number";
    timeStamp.className = "time-stamp";

    number.innerText = `#${++lapItem}`;

    timeStamp.innerHTML =
        `${String(minCounter).padStart(2, "0")} : ` +
        `${String(secCounter).padStart(2, "0")} : ` +
        `${String(centiCounter).padStart(2, "0")}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
};

const clearAll = () => {

    laps.innerHTML = "";
    laps.append(clearButton);

    clearButton.classList.add("hidden");

    lapItem = 0;
};

startButton.addEventListener("click", start);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);

// Initialize the stopwatch display
updateDisplay();