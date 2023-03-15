import * as readline from 'readline';
import Canvas from './Canvas';
import { handleCommandCHA, handleCommandPNT, handleCommandLIN, handleCommandREC, handleCommandFILL } from './HandleFunctions';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let canvas: Canvas

rl.setPrompt('Enter Command: ');
rl.prompt();

rl.on('line', (input: string) => {
  const tokens = input.trim().split(' ');
  const command = tokens[0].toUpperCase();

  switch (command) {
    case 'NEW':
      let width: number, height: number
      if (tokens.length !== 3) {
        console.error('Invalid command format');
        return
      }
      width = parseInt(tokens[1], 10);
      height = parseInt(tokens[2], 10);
      if (isNaN(width) || isNaN(height)) {
        console.error('Invalid canvas dimensions');
        return
      }
      canvas = new Canvas(width, height)
      break;
    case 'CHA':
      handleCommandCHA(tokens, canvas)
      break;
    case 'PNT':
      handleCommandPNT(tokens, canvas)
      break;
    case 'LIN':
      handleCommandLIN(tokens, canvas)
      break;
    case 'REC':
      handleCommandREC(tokens, canvas)
      break;
    case 'FILL':
      handleCommandFILL(tokens, canvas)
      break;
    default:
      console.error('Invalid command');
      break;
  }

  rl.prompt();
}).on('close', () => {
  console.log('Exit');
  process.exit(0);
});
