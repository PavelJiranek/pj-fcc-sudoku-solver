/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;
const R = require("ramda");
const RA = require("ramda-adjunct");
const SudokuSolver = require("sudoku-solver-js");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite('Functional Tests', () => {
    suiteSetup(() => {
        // DOM already mocked -- load sudoku solver then run tests
        return JSDOM.fromFile('./views/index.html')
            .then((dom) => {
                global.window = dom.window;
                global.document = dom.window.document;
                global.R = R;
                global.RA = RA;
                global.SudokuSolver = SudokuSolver;

                Solver = require('../public/sudoku-solver.js');
                global.PUZZLES = require('../public/puzzle-strings.js').puzzlesAndSolutions;
            });
    });

    suite('Text area and sudoku grid update automatically', () => {
        // Entering a valid number in the text area populates
        // the correct cell in the sudoku grid with that number
        test('Valid number in text area populates correct cell in grid', done => {
            const TESTING_PUZZLE = PUZZLES[0][0];
            const testingInput = document.getElementById('A3');
            const textArea = document.getElementById('text-input');

            textArea.value = TESTING_PUZZLE;
            Solver.fillCells(textArea.value)
            assert.equal(testingInput.value, TESTING_PUZZLE[2]); // '5'

            done();
        });

        // Entering a valid number in the grid automatically updates
        // the puzzle string in the text area
        test('Valid number in grid updates the puzzle string in the text area', done => {

            // done();
        });
    });

    suite('Clear and solve buttons', () => {
        // Pressing the "Clear" button clears the sudoku
        // grid and the text area
        test('Function clearInput()', done => {

            // done();
        });

        // Pressing the "Solve" button solves the puzzle and
        // fills in the grid with the solution
        test('Function showSolution(solve(input))', done => {

            // done();
        });
    });
});

