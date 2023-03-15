import Canvas from "./Canvas";

type tokens = string[]
type canvas = Canvas

const handleCommandCHA = (tokens: tokens, canvas: canvas) => {
    if (!canvas) {
        console.log('Please create a canvas first')
        return
    }
    let char = tokens[1]
    canvas.char = char
    console.log('Setting Character to: ', canvas.char)
}
const handleCommandPNT = (tokens: tokens, canvas: canvas) => {
    if (!canvas) {
        console.error('Please create a canvas first');
        return
    }
    let x1 = parseInt(tokens[1]);
    let y1 = parseInt(tokens[2]);
    canvas.drawPoint(x1, y1)
    canvas.drawCanvas()
    return
}

const handleCommandLIN = (tokens: tokens, canvas: canvas) => {
    if (!canvas) {
        console.error('Please create a canvas first');
        return
    }
    let x1 = parseInt(tokens[1]);
    let y1 = parseInt(tokens[2]);
    let x2 = parseInt(tokens[3]);
    let y2 = parseInt(tokens[4]);
    canvas.drawLine(x1, y1, x2, y2);
}
const handleCommandREC = (tokens: tokens, canvas: canvas) => {
    if (!canvas) {
        console.error('Please create a canvas first');
        return
    }
    if (tokens.length !== 5) {
        console.error('Invalid command format');
        return
    }

    let x1 = parseInt(tokens[1]);
    let y1 = parseInt(tokens[2]);
    let x2 = parseInt(tokens[3]);
    let y2 = parseInt(tokens[4]);
    canvas.drawRectangle(x1, y1, x2, y2);
}
const handleCommandFILL = (tokens: tokens, canvas: canvas) => {
    if (!canvas) {
        console.error('Please create a canvas first')
        return
    }
    if (tokens.length !== 3) {
        console.error('Invalid command format')
        return
    }
    let x1 = parseInt(tokens[1]);
    let y1 = parseInt(tokens[2]);
    canvas.fill(x1, y1)
}


export { handleCommandCHA, handleCommandPNT, handleCommandLIN, handleCommandREC, handleCommandFILL }
