var puzzle = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];
var winModel = puzzle;
var counter = 0;
var timerInterval;
var startTime;


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
    counter++;
    if (counter == 1) startTimer();

    document.getElementById("moves").innerText = counter;

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

            break;
        }
        case 'bottom': {
            puzzle[row][col] = 0;
            puzzle[row + 1][col] = temp;

            break;
        }
        case 'left': {
            puzzle[row][col] = 0;
            puzzle[row][col - 1] = temp;

            break;
        }
        case 'right': {
            puzzle[row][col] = 0;
            puzzle[row][col + 1] = temp;

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

    counter = 0;
    document.getElementById("timer").innerText = "0:00";
    document.getElementById("moves").innerText = "0";

    let root = document.querySelector(':root');

    root.style.setProperty('--ButtonBG', '#9e2a2b');
    root.style.setProperty('--ButtonHoverBG', '#540b0e');

    let numbers = [ [],[],[],[] ];
    let rand;

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            rand = Math.floor(Math.random() * 16);

            if (!numbers.contains(rand)) numbers[r][c] = rand;
            else c--;
        }
    }

    puzzle = numbers;

    drawGrid();
    /** AVVISO
    * per qualche motivo sconosciuto, la combo stop + start da problemi alla generazione dei numeri
    * (metterne uno prima e uno dopo non causa problemi)
    * quindi sono messi alla fine in modo da non causare danni
    **/
    stopTimer();
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

        stopTimer();
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

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
}
    
function stopTimer() {
    clearInterval(timerInterval);
}
    
function updateTimer() {
    var now = new Date().getTime();
    var elapsedTime = now - startTime;
    var minutes = Math.floor(elapsedTime / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    seconds = (seconds < 10 ? "0" : "") + seconds;
    document.getElementById("timer").innerText = minutes + ":" + seconds;
}