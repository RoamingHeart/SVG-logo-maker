const inquirer = require('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require('./lib/shapes');
const { generate } = require('rxjs');

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
        name: 'shape-color',
        message: 'Please type in which color you would like the logo to be in: ',
    },
    {
        type: 'input',
        name: 'text',
        message: 'Please type in the THREE(3) characters you would like in the logo: ',
    },
    {
        type: 'input',
        name: 'text-color',
        message: 'Please type what color you would like the text to be in: ',
    },
]

//renders and sets shape and text elements for the logo
class SVG {
    constructor(){
        this.textEl = '';
        this.shapeEl = '';
    }
    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeEl}${this.textEl}</svg>`
    }
    setText(text, color) {
        if(text.length > 3 && text.length < 1) {
            throw new Error('please input between 1-3 characters please.')
        }

        this.textEl = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShape(shape) {
        this.shapeEl = shape.render();
    }
}

//creates the file
// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, data, function(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log('You have finished generating a logo.svg...')
//     })
// }


// async function init() {
//     var svgText = '';
//     var svgFile = 'logo.svg';

//     //ask the users for their input
//     const answers = await inquirer.prompt(questions);

//     //user selected shape
//     var userShape = answers.shape;

//     //user input shape color
//     var userShapeColor = answers['shape-color'];

//     //user input text
//     var userText = '';

//     //user input text color
//     var userTextColor = answers['text-color'];

    


//     //check if the user input 3 letters for the text input
//     if(answers.text.length > 0 && answers.text.length < 4) {
//         //within 3 characters
//         userText = answers.text;
//     } else {
//         //not within three characters
//         console.log("Invalid Input! User needs to have 1-3 characters!");
//         return;
//     }

//     //print out the user selections into the console
//     console.log('User Selected Shape: ' + userShape);
//     console.log('User Inputed Shape Color: ' + userShapeColor);
//     console.log('User Inputed Text: ' + userText );
//     console.log('User Inputed Text Color:' + userTextColor);


//     let selectedShape;
//     if(userShape === 'Circle') {
//         selectedShape = new Circle();
//     } else if(userShape === 'Square') {
//         selectedShape = new Square();
//     } else if(userShape === 'Triangle'){
//         selectedShape = new Triangle();
//     } else {
//         console.log('invalid')
//     }

//     selectedShape.setColor(userShapeColor);

//     //create a new svg and add shape + text elements to it
//     var svg = new SVG();
//     svg.setText(userText, userTextColor);
//     svg.setShape(selectedShape);
//     svgText = svg.render();

//     writeToFile(svgFile, svgText);

// }

function init() {
    inquirer.prompt(questions)
        .then((data) => {
            //defines what text the user inputted
            const logoText = data.text;
            const svg = new SVG();
            //generate the shape of the logo
            let userShape = '';
            if(data.shape == 'Circle'){
                userShape = new Circle();
            } else if(data.shape == 'Square') {
                userShape = new Square();
            } else if(data.shape == 'Triangle') {
                userShape = new Triangle();
            } else {
                console.log("Don't know how you got here, but please go back and choose a valid shape")
            }

            //set the logo color
            userShape.setColor(data['shape-color']);
            
            svg.setText(logoText, data['text-color']);
            svg.setShape(userShape);
            fs.writeFileSync(`${data.shape}.svg`, svg.render());
            

        })
}

init();