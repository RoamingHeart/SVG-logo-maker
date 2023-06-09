const inquirer = require('inquirer');
const fs = require('fs');
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


//function to initialize app
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