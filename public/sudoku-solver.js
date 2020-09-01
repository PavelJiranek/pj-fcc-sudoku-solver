// import { puzzlesAndSolutions } from './puzzle-strings.js';
const {
  replace,
  splitEvery,
} = R;
const {
  floor,
} = RA;
const solver = new SudokuSolver();

const textArea = document.getElementById('text-input');
const sudoInputs = document.getElementsByClassName('sudoku-input')

const DEFAULT_PUZZLE_STRING = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = DEFAULT_PUZZLE_STRING;
  console.log( // todo remove
      textArea,
      DEFAULT_PUZZLE_STRING.split('').length,
      getArrayPuzzle(DEFAULT_PUZZLE_STRING),
      solveStringPuzzle(DEFAULT_PUZZLE_STRING, 'string'),
      solveStringPuzzle(DEFAULT_PUZZLE_STRING, 'array'),
      sudoInputs,
  );
  fillCells(DEFAULT_PUZZLE_STRING);
  textArea.oninput = handleTextChange;
});


const COLUMNS_MAP = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const VALID_CELL_VALUES = COLUMNS_MAP.map(String);
const ROWS_MAP = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const VALID_PUZZLE_LENGTH = 81;

const getArrayPuzzle = stringPuzzle => splitEvery(9, stringPuzzle);
/**
 *
 * @param stringPuzzle
 * @param {('string'|'array'|'chunks')} resultType
 * @returns {string|string|[]|*}
 */
const solveStringPuzzle = (stringPuzzle, resultType = 'string') => {
  const parsedStr = replace(/\./g, '0', stringPuzzle);
  return solver.solve(parsedStr, { resultType });
};

const isValidInput = strVal => VALID_CELL_VALUES.includes(strVal);

const fillCells = stringPuzzle => stringPuzzle.split('').forEach((val, valIdx) => {
  const rowIdx = floor(valIdx / 9);
  const colIdx = valIdx % 9;
  const cellId = `${ROWS_MAP[rowIdx]}${COLUMNS_MAP[colIdx]}`;

  if (isValidInput(val)) {
    document.getElementById(cellId).value = val;
  } else if (val === '.') {
    document.getElementById(cellId).value = '';
  }
})

const handleTextChange = (({ target: { value } }) => value.length === VALID_PUZZLE_LENGTH && fillCells(value));

/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    isValidInput,
    getArrayPuzzle,
    fillCells
  }
} catch (e) {
}
