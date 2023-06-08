const inquirer = require('inquirer');
const {Circle, Square, Triangle} = require('./lib/shapes');



//array of questions
const questions = [
    {
        type: 'list',
        name: 'shape',
        message: 'Please choose which shape you would like: ',
        choices: ['Circle', 'Square', 'Triangle'],
    },
    {
        type: 'input',
        name: 'text',
        message: 'Please type in the THREE(3) letters you would like in the logo: ',
    },
    {
        type: 'input',
        name: 'color',
        message: 'Please type in which color you would like the logo to be in: ',
    }
]