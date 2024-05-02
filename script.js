var puzzle = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];
var winModel = puzzle;

drawGrid();
start();

function drawGrid() {

    function drawRow(number) {
        let row = document.getElementById("row" + number);
    
        for (let i = 0; i < 4; i++) {
            let value = puzzle[number-1][i];
    
            if(value != 0) row.innerHTML += '<div class="col-3"><button id="' + value + '" class="btn" onclick="actionButton(' + value + ')">' + value + '</button></div>';
            else row.innerHTML += '<div id="empty" class="col-3"></div>';
        }
    }

    clearGrid();
    for (let i = 1; i < 5; i++) drawRow(i);
}

function clearGrid() {

    function clearRow(number) {
        let row = document.getElementById("row" + number);
    
        row.innerHTML = '';
    }

    for (let i = 1; i < 5; i++) clearRow(i);
}

function actionButton(value) {
    let row = getRow(value);
    let col = getCol(value);

    console.log("DEBUG>> riga: " + row + " - colonna: " + col);

    if (check(value, 'top')) invert(value, 'top');
    else if (check(value, 'bottom')) invert(value, 'bottom');
    else if (check(value, 'left')) invert(value, 'left');
    else if (check(value, 'right')) invert(value, 'right');

    drawGrid();
    checkWin();
}

function invert(value, direction) {
    let row = getRow(value);
    let col = getCol(value);
    let temp = value;

    switch (direction) {
        case 'top': {
            puzzle[row][col] = 0;
            puzzle[row - 1][col] = temp;

            console.log("DEBUG>> spostato in alto");
            break;
        }
        case 'bottom': {
            puzzle[row][col] = 0;
            puzzle[row + 1][col] = temp;

            console.log("DEBUG>> spostato in basso");
            break;
        }
        case 'left': {
            puzzle[row][col] = 0;
            puzzle[row][col - 1] = temp;

            console.log("DEBUG>> spostato a sinistra");
            break;
        }
        case 'right': {
            puzzle[row][col] = 0;
            puzzle[row][col + 1] = temp;

            console.log("DEBUG>> spostato a destra");
            break;
        }
    }
}

function check(value, direction) {
    let row = getRow(value);
    let col = getCol(value);

    try {
        switch (direction) {
            case 'top': return (puzzle[row-1][col] == 0) ? true : false; break;
            case 'bottom': return (puzzle[row+1][col] == 0) ? true : false; break;
            case 'left': return (puzzle[row][col-1] == 0) ? true : false; break;
            case 'right': return (puzzle[row][col+1] == 0) ? true : false; break;
        }
    } catch {
        console.log('DEBUG>> errore');
    }
    
}

function getRow(value) {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (puzzle[r][c] == value) return r;
        }
    }
}
function getCol(value) {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (puzzle[r][c] == value) return c;
        }
    }
}

function start() {

    Array.prototype.contains = function(value) {
        for (let r = 0; r < this.length; r++) {
            for (let c = 0; c < this.length; c++) {
                if (this[r][c] == value) return true;
            }
        }
    
        return false;
    }

    let root = document.querySelector(':root');

    root.style.setProperty('--ButtonBG', '#a3a3a3');
    root.style.setProperty('--ButtonHoverBG', '#686868');

    let numbers = [ [],[],[],[] ];
    let rand;

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            rand = Math.floor(Math.random() * 16);

            console.log("DEBUG>>Numero Generato: " + rand);

            if (!numbers.contains(rand)) numbers[r][c] = rand;
            else c--;
        }
    }

    console.log("DEBUG>>array numeri casuali");
    console.table(numbers);

    puzzle = numbers;

    drawGrid();
}

function checkWin() {
    if (isWin()) {
        let root = document.querySelector(':root');

        root.style.setProperty('--ButtonBG', '#41ab35');
        root.style.setProperty('--ButtonHoverBG', '#2d7525');

        let button12 = document.getElementById(12);
        let button15 = document.getElementById(15);
        
        button12.classList = ("btn disabled");
        button15.classList = ("btn disabled");
    }

    function isWin() {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (puzzle[r][c] != winModel[r][c]) {
                    return false;
                }
            }
        }

        return true;
    }
}