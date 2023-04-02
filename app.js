const root = document.documentElement;

const fretboard = document.querySelector('.fretboard');
const numberOfFrets = 24;
const numberOfStrings = 6;

const singleFretMarkPositions= [3, 5, 7, 9, 15, 17, 19, 21]
const doubleFretMarkPositions = [12, 24]

const notesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

let accidentals = 'flats'
const guitarTuning = [4, 7, 11, 2, 9, 4]

const app = {
  // initialize something so make first method init()
  init() {
    this.setupFretboard();
    console.log('app initialized');
  },
  setupFretboard() {
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