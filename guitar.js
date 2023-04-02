const root = document.documentElement;

const fretboard = document.querySelector('.fretboard');
const selectInstrumentSelector = document.querySelector('#instrument-selector');
const numberOfFrets = 24;
// const numberOfStrings = 6;

const singleFretMarkPositions= [3, 5, 7, 9, 15, 17, 19, 21]
const doubleFretMarkPositions = [12, 24]

const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

let accidentals = 'sharps'
const guitarTuning = [4, 7, 11, 2, 9, 4]

const instrumentTuningPresets = {
  'Guitar': [4, 11, 7, 2, 9, 4],
  'Bass': [7, 2, 9, 4],
  'Ukulele': [9, 4, 0, 7],
  'Violin': [11, 4, 9, 2],
  'Cello': [2, 9, 4, 11],
  'Mandolin': [7, 2, 10, 5],
  'Sitar': [7, 2, 9, 4, 11, 4],
}

let selectedInstrument = 'Guitar';

let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;

const app = {
  // initialize something so make first method init()
  init() {
    this.setupFretboard();
    this.setupEventListeners();
    this.setupSelectInstrumentSelector();
    console.log('app initialized');
  },
  setupFretboard() {
    fretboard.innerHTML = '';
    root.style.setProperty('--number-of-strings', numberOfStrings);
    //Add strings to fretboard by looping through the number of strings
    for (let i = 0; i < numberOfStrings; i++) {
      let string = tools.createElement('div');
      string.classList.add('string');
      fretboard.appendChild(string);

      // Add frets to each string
      for (let fret  = 0; fret <= numberOfFrets; fret++){
        let noteFret = tools.createElement('div');
        noteFret.classList.add('note-fret');
        string.appendChild(noteFret);


        let noteName = this.generateNoteNames(guitarTuning[i] + fret, accidentals);
        noteFret.setAttribute('data-note', noteName);
        // Add fret marks if found in singleFretMarkPositions
        if (i === 0 && singleFretMarkPositions.indexOf(fret) !== -1) {
          console.log('singleFretMarkPositions')
          noteFret.classList.add('single-fretmark');
        }
        if (i === 0 && doubleFretMarkPositions.indexOf(fret) !== -1) {
          console.log('DOUBLEFretMarkPositions')
          let doubleFretMark = tools.createElement('div');
          doubleFretMark.classList.add('double-fretmark');
          noteFret.appendChild(doubleFretMark);
        }
      }
    }
  },
  generateNoteNames(noteIndex, accidentals) {
    console.log('generateNoteNames')
    console.log(noteIndex)
    console.log(accidentals)
    noteIndex = noteIndex % 12
    let noteName;
    if (accidentals === 'flats') {
      noteName = notesFlat[noteIndex];
    } else if (accidentals === 'sharps') {
      noteName = notesSharp[noteIndex];
    }
    return noteName
},

// new method
setupSelectInstrumentSelector () {
  // here we set the content of the option element to the instrument name
  for ( instrument in instrumentTuningPresets) {
    let instrOption = tools.createElement('option', instrument);
    selectInstrumentSelector.appendChild(instrOption);
  }
},
setupEventListeners() {
  fretboard.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('note-fret')) {
      event.target.style.setProperty('--noteDotOpacity', 1);
    }

  });
  fretboard.addEventListener('mouseout', (event) => {
    event.target.style.setProperty('--noteDotOpacity', 0);
  });
  selectInstrumentSelector.addEventListener('change', (event) => {
    selectedInstrument = event.target.value;
    numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
    fretboard.innerHTML = '';
    this.setupFretboard();
  })
}
}




// Every time we want to create an element, we call this method
const tools = {
  createElement(element, content) {
    element = document.createElement(element); // creates the element that we pass in and overwrite the original
    if (arguments.length > 1) { // if we passed in content...
      element.innerHTML = content; // ...set the innerHTML to the content
    }
    return element; // return the element if we dont pass in content
  }
}

app.init();

