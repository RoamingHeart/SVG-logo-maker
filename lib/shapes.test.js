//import the shapes from shapes.js
const {Circle, Square, Triangle} = require('./shapes');

//test whether the shapes will render
describe('Circle', () => {
    test('will render right', () => {
        const shape = new Circle();
        var color = ('blue');
        shape.setColor(color);
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" fill="${color}">`)
    })
})

describe('Square', () => {
    test('will render right', () => {
        const shape = new Square();
        var color = ('red');
        shape.setColor(color);
        expect(shape.render()).toEqual(`<rect x="50" fill="${color}">`)
    })
})

describe('Triangle', () => {
    test('will render right', () => {
        const shape = new Triangle();
        var color = ('yellow');
        shape.setColor(color);
        expect(shape.render()).toEqual(`<polygon points="0,200 300,200 150,0" fill="${color}">`)
    })
})