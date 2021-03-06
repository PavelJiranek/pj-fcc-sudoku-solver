// import { puzzlesAndSolutions } from './puzzle-strings.js';
const {
  replace,
  splitEvery,
} = R;
const {
  floor,
  isEmptyString,
  repeatStr,
} = RA;
const solver = new SudokuSolver();

/*
  * Elements
*/
const textArea = document.getElementById('text-input');
const solveButton = document.getElementById('solve-button');
const clearButton = document.getElementById('clear-button');
const errorContainer = document.getElementById('error-msg');
const gridInputs = document.getElementsByClassName('sudoku-input')


/*
  * Constants
*/
const DEFAULT_PUZZLE_STRING = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
const COLUMNS_MAP = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const VALID_CELL_VALUES = COLUMNS_MAP.map(String);
const ROWS_MAP = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const VALID_PUZZLE_LENGTH = 81;
const ROW_COUNT = 9;
const INVALID_PUZZLE_ERROR_MESSAGE = "Error: Expected puzzle to be 81 characters long.";

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = DEFAULT_PUZZLE_STRING;
  fillCells(DEFAULT_PUZZLE_STRING);
  textArea.oninput = handleTextChange;
  Array.from(gridInputs).forEach(input => input.oninput = handleInputChange);
  solveButton.onclick = handleSolve;
  clearButton.onclick = handleClear;
});

const getArrayPuzzle = stringPuzzle => splitEvery(9, stringPuzzle);

const hasValidPuzzleLength = value => value.length === VALID_PUZZLE_LENGTH;

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

const handleSolve = () => {
  const puzzle = textArea.value;
  if (hasValidPuzzleLength(puzzle)) {
    errorContainer.textContent = '';
    const solution = solveStringPuzzle(puzzle);

    textArea.value = solution;
    fillCells(solution);
  } else {
    errorContainer.textContent = INVALID_PUZZLE_ERROR_MESSAGE;
  }
}
const handleClear = () => {
  textArea.value = '';
  fillCells(repeatStr('.', VALID_PUZZLE_LENGTH));
}

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

const updateTextAreaFromGrid = (value, gridCellId) => {
  const [row, col] = gridCellId;
  const rowIdx = ROWS_MAP.indexOf(row);
  const colIdx = COLUMNS_MAP.indexOf(Number(col));
  const rowSum = ROW_COUNT * rowIdx;
  const strValIdx = rowSum + colIdx;
  const newValue = isValidInput(value) ? value : '.';
  textArea.value = textArea.value.substring(0, strValIdx) + newValue + textArea.value.substring(strValIdx + 1);
}

const handleTextChange = (({ target: { value } }) => hasValidPuzzleLength(value) && fillCells(value));

const handleInputChange = (({ target: { value, id } }) => {
  if (isValidInput(value) || isEmptyString(value)) {
    updateTextAreaFromGrid(value, id);
  }
});

/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    isValidInput,
    getArrayPuzzle,
    fillCells,
    updateTextAreaFromGrid,
    solveStringPuzzle,
    handleSolve,
    hasValidPuzzleLength,
    handleClear
  }
} catch (e) {
}
