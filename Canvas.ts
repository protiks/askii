class Canvas {
    private canvas: string[][] = [];
    public char: string

    constructor(private width: number, private height: number) {
        this.char = 'x'
        this.width = width
        this.height = height
        this.createCanvas()
    }


    private createCanvas() {
        for (let i = 0; i < this.height + 2; i++) {
            const row: string[] = [];
            for (let j = 0; j < this.width + 2; j++) {
                row.push(' ');
            }
            this.canvas.push(row);
        }

        for (let i = 0; i < this.width + 2; i++) {
            this.canvas[0][i] = '-';
            this.canvas[this.height + 1][i] = '-';
        }

        for (let i = 1; i < this.height + 1; i++) {
            this.canvas[i][0] = '|';
            this.canvas[i][this.width + 1] = '|';
        }
        this.drawCanvas()
    }


    private isValidPosition(x: number, y: number): boolean {
        return x > 0 && x <= this.width && y > 0 && y <= this.height;
    }

    public drawCanvas(): void {
        for (let i = 0; i < this.canvas.length; i++) {
            console.log(this.canvas[i].join(('')));
        }
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number): void {
        // Ensure that the line is either horizontal or vertical
        if (x1 !== x2 && y1 !== y2) {
            console.error('Only straight lines are supported');
            return;
        }

        // Ensure that the line is within the bounds of the canvas
        if (!this.isValidPosition(x1, y1) || !this.isValidPosition(x2, y2)) {
            console.error(`Invalid line end coordinates (${x1}, ${y1}) and (${x2}, ${y2})`);
            return;
        }

        // Set the appropriate characters for the line based on its orientation
        const lineChar = this.char;
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);

        // Draw the line by setting the appropriate characters in each cell
        if (x1 === x2) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                this.canvas[y][x1] = lineChar;
            }
        } else {
            for (let x = start; x <= end; x++) {
                this.canvas[y1][x] = lineChar;
            }
        }

        this.drawCanvas();
    }

    public drawPoint(x: number, y: number) {
        this.canvas[y][x] = this.char
    }

    public drawRectangle(x1: number, y1: number, x2: number, y2: number): void {
        // Ensure that x1 <= x2 and y1 <= y2
        if (x1 > x2) {
            [x1, x2] = [x2, x1];
        }
        if (y1 > y2) {
            [y1, y2] = [y2, y1];
        }

        for (let x = x1; x <= x2; x++) {
            this.drawPoint(x, y1)
            this.drawPoint(x, y2)
        }

        for (let y = y1 + 1; y < y2; y++) {
            this.drawPoint(x1, y)
            this.drawPoint(x2, y)
        }

        this.drawCanvas()
    }

    public fill(x: number, y: number): void {
        let char = this.char
        const currentChar = this.canvas[y][x];

        if (currentChar === char) {
            return;
        }

        this.floodFill(x, y, currentChar, char);
        this.drawCanvas()
    }

    private floodFill(x: number, y: number, currentChar: string, fillChar: string): void {
        if (y < 0 || y >= this.canvas.length || x < 0 || x >= this.canvas[0].length) {
            return;
        }

        if (this.canvas[y][x] !== currentChar) {
            return;
        }

        // Setting current character to the fill character
        this.canvas[y][x] = fillChar;

        // right
        this.floodFill(x + 1, y, currentChar, fillChar);
        // left
        this.floodFill(x - 1, y, currentChar, fillChar);
        // down 
        this.floodFill(x, y + 1, currentChar, fillChar);
        // up
        this.floodFill(x, y - 1, currentChar, fillChar);
    }

}

export default Canvas;
