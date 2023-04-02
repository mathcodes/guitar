import Timer from './metronome-timer.js';

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');
const click1Dropdown = document.querySelector('#click1');
const click2Dropdown = document.querySelector('#click2');
const beatCircle = document.querySelector('.beat-count');

click1Dropdown.addEventListener('change', () => {
  click1.src = click1Dropdown.value;
    console.log(click1.src);
});

click2Dropdown.addEventListener('change', () => {
  click2.src = click2Dropdown.value;
  console.log(click2.src);
});





const click1 = new Audio('click1.mp3');
const click2 = new Audio('click2.mp3');

let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Medium';

decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 20) { return };
    bpm--;
    validateTempo();
    updateMetronome();
});
increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 280) { return };
    bpm++;
    validateTempo();
    updateMetronome();
});
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    validateTempo();
    updateMetronome();
});

subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 2) { return };
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});
addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) { return };
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

startStopBtn.addEventListener('click', () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
});

function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    if (bpm <= 40) { tempoTextString = "Grave – slow and solemn" };
    if (bpm > 40 && bpm < 45) { tempoTextString = "Lento – slowly" };
    if (bpm > 45 && bpm < 55) { tempoTextString = "Largo – broadly" };
    if (bpm > 55 && bpm < 73) { tempoTextString = "Adagio – slow and stately" };
    if (bpm > 73 && bpm < 77) { tempoTextString = "Andante – at a walking pace" };
    if (bpm > 77 && bpm < 97) { tempoTextString = "Moderato – moderately" };
    if (bpm > 98 && bpm < 109) { tempoTextString = "Allegretto – moderately fast" };
    if (bpm > 109 && bpm <= 132) { tempoTextString = "Allegro – fast, quickly and bright" };
    if (bpm > 132 && bpm <= 140) { tempoTextString = "Vivace – lively and fast" };
    if (bpm > 168 && bpm <= 177) { tempoTextString = "Presto – extremely fast" };
    if (bpm > 178 && bpm <= 280) { tempoTextString = "Prestissimo – even faster than Presto" };

    tempoText.textContent = tempoTextString;
}
function validateTempo() {
    if (bpm <= 20) { return };
    if (bpm >= 280) { return };
}

function playClick() {
    console.log(count);
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count === 0) {
        click1.play();
        beatCircle.classList.remove('beat-circle-bottom');
        beatCircle.classList.add('beat-circle-top');
        click1.currentTime = 0;
    } else {
        click2.play();
        beatCircle.classList.remove('beat-circle-top');
        beatCircle.classList.add('beat-circle-bottom');
        click2.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });



