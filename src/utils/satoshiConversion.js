export default function satoshiToNote(num){
  let note = findNote(num % 7);
  let octave = findOctave(num);
  let notepair = note + octave;
  return notepair;
}

/*
most satoshi transations are in the 2 to 8 digit range,
a handful are above 8 and even less are above 10. So
the octave choice (the findOctave function) is rigged a
little to provide more octavial variation in the mid range
than the top or bottom ranges.
*/

function findOctave(num) {
 // console.log('num inside findOctave', num);
  var str = num.toString().length;
  if(str <= 2){
    return '1';
  }
  if(str === 3){
    return '2';
  }
  if(str === 4){
    return '3';
  }
  if(str === 5){
    return '4';
  }
  if(str === 6){
    return '5';
  }
  if(str === 7){
    return '6';
  }
  if(str === 8){
    return '7';
  }
  if(str <= 10){
    return '8';
  }
  if(str > 10){
    return '9';
  }
}

// D natural minor scale
function findNote(num){
  if(num <= 1){
    return 'A';
  }
  if(num === 2){
    return 'Bb';
  }
  if(num === 3){
    return 'C';
  }
  if(num === 4){
    return 'D';
  }
  if(num === 5){
    return 'E';
  }
  if(num === 6){
    return 'F';
  }
  if(num === 7){
    return 'G';
  }
}