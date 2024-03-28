const divs = document.querySelectorAll("#board>div");
let isX = true;
let isGameOver = false;

let counterX = localStorage.x ? Number(localStorage.x) : 0;
let counterY = localStorage.o ? Number(localStorage.o) : 0;

document.querySelector(".scoreX").innerText = localStorage.x;
document.querySelector(".scoreY").innerText = localStorage.o;
// לולאה העוברת על כל המשבצות
divs.forEach(div => {
    // הוספת פונקציה המופעלת בעת לחיצה על אחת המשבצות
    div.addEventListener("click", function (ev) {
        if (isGameOver) {
            return;
        }

        // האלמנט שעליו לחץ השחקן
        const elem = ev.target;

        // אם המשבצת מלאה, הפונקציה נעצרת
        if (elem.innerText) {
            return;
        }

        if (isX) {
            elem.innerText = "X";
        } else {
            elem.innerText = "O";
        }

        // שינוי תור
        isX = !isX;
        // הפעלת הפונקציה של המחווה הויזואלית
        showTurn();
        checkWinner();
    });
})

/**
 * פונקציה הנותנת מחווה של איזה שחקן התור הנוכחי
 */
function showTurn() {
    // קודם כל, הסרנו את הקלאס מהשחקן האחרון
    document.querySelector('.currentTurn').classList.remove('currentTurn');

    // שם את הקלאס בהתאם לתור השחקן
    if (isX) {
        document.querySelector("#players>div:first-child").classList.add('currentTurn');
    } else {
        document.querySelector("#players>div:last-child").classList.add('currentTurn');
    }
}

function checkWinner() {
    // מערך של מערכים של מיקומים אפשריים לניצחון
    const options = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // רץ על המערך של כל האופציות
    for (const op of options) {
        // בודק את המיקומים של כל מערך
        if (op.every(myIndex => divs[myIndex].innerText === 'X')) {
            counterX++;

            winner(op, 'X');

            isX = true;

            document.querySelector('.scoreX').innerHTML = `ניצחונות: ${counterX}`;
            break;
        } else if (op.every(myIndex => divs[myIndex].innerText === 'O')) {
            counterY++;

            winner(op, 'O');

            isX = false;

            document.querySelector('.scoreY').innerHTML = `ניצחונות: ${counterY}`;
            break;



            //תיקו// 
        }

    }

    if (!isGameOver && [...divs].every(x => x.innerText)) {
        setTimeout(() => alert("No winner is!"), 50);
        isGameOver = true;
    }
}

function winner(op, win) {
    setTimeout(() => alert(win + " is winner!"), 50);

    op.forEach(x => divs[x].classList.add('win'));

    isGameOver = true;

    isX = !isX;

    localStorage.x = counterX;
    localStorage.o = counterY;

}


function newGame() {
    divs.forEach(div => {
        div.innerText = "";
        div.classList.remove('win');
    })
    isGameOver = false;

    // שם את הקלאס בהתאם לתור השחקן
    showTurn()

}
function startOver() {
    counterX = 0;
    counterY = 0;
    document.querySelector('.scoreX').innerHTML = `ניצחונות: ${counterX}`;
    document.querySelector('.scoreY').innerHTML = `ניצחונות: ${counterY}`;
}