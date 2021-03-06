/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const R = require("ramda");
const RA = require("ramda-adjunct");
const SudokuSolver = require("sudoku-solver-js");

let Solver;

suite('UnitTests', () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile('./views/index.html')
        .then((dom) => {
          global.window = dom.window;
          global.document = dom.window.document;
          global.R = R;
          global.RA = RA;
          global.SudokuSolver = SudokuSolver;

          Solver = require('../public/sudoku-solver.js');
        });
  });
  
  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite('Function ____()', () => {
    test('Valid "1-9" characters', (done) => {
      const input = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      input.forEach(val => assert.isTrue(Solver.isValidInput(val)));
      done();
    });

    // Invalid characters or numbers are not accepted 
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ['!', 'a', '/', '+', '-', '0', '10', 0, '.'];
      input.forEach(val => assert.isFalse(Solver.isValidInput(val)));
      done();
    });
  });
  
  suite('Function getArrayPuzzle()', () => {
    test('Parses a valid puzzle string into an object', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      // console.log(Solver.getArrayPuzzle(input))
      assert.deepEqual(Solver.getArrayPuzzle(input), [
        "..9..5.1.",
        "85.4....2",
        "432......",
        "1...69.83",
        ".9.....6.",
        "62.71...9",
        "......194",
        "5....4.37",
        ".4.3..6..",
      ])
      done();
    });
  });

  suite('Show error on invalid puzzle', () => {
    // Puzzles that are not 81 numbers/periods long show the message
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Error: Expected puzzle to be 81 characters long.';
      const errorDiv = document.getElementById('error-msg');
      const textArea = document.getElementById('text-input');

      textArea.value = shortStr;
      Solver.handleSolve();

      assert.equal(errorDiv.textContent, errorMsg);

      textArea.value = longStr;
      Solver.handleSolve();

      assert.equal(errorDiv.textContent, errorMsg);

      done();
    });
  });

  suite('Function hasValidPuzzleLength()', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const input = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
      assert.isTrue(Solver.hasValidPuzzleLength(input))
      done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const input = '7792354188514963724321789561745692833958427616287135492836571945169248379473816';
      assert.isFalse(Solver.hasValidPuzzleLength(input))
      done();
    });
  });

  suite('Function solveStringPuzzle()', () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const solution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';

      assert.equal(Solver.solveStringPuzzle(input), solution)

      done();
    });
  });
});
