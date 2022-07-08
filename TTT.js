
var turn = "X";

var board = [
    ["","",""],
    ["","",""],
    ["","",""]
]

var gameOver = false;

const Squares = document.querySelectorAll(".Square");

const resetButton = document.querySelector("#Reset");

//This function will change the players turn
function changeTurn()
{

    if(turn == "X"){
        turn = "O";
    }
    else{
        turn = "X";
    }
}

//This function will reset the game
function resetGame()
{
    board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]

    gameOver = false;

    turn = 'X';

    Squares.forEach(squares => {
        squares.innerHTML = "";
        squares.style.backgroundColor = "";
    })


}

//This function will highlight the boxes of the winning combination
function highlightWinningCombination(b1, b2, b3)
{
    let winningColor = '#bacdce';

    var targetSquare = document.getElementById(b1);
    targetSquare.style.backgroundColor = winningColor;
    targetSquare = document.getElementById(b2);
    targetSquare.style.backgroundColor = winningColor;
    targetSquare = document.getElementById(b3);
    targetSquare.style.backgroundColor = winningColor;
}

//This function will briefly flash an invalid spot if clicked on
function flashInvalidSpot(row, col)
{
    let invalidColor = '#b9466b'    

    let targetSquare = document.getElementById(row + col);
    targetSquare.style.backgroundColor = invalidColor;

    setTimeout(function(){
        targetSquare.style.backgroundColor = "";
    }, 100);
}

//This function will check if the player has won
function checkWin()
{
    if(board[0][0] == turn && board[0][1] == turn && board[0][2] == turn)
    {
        highlightWinningCombination('00', '01', '02');
        gameOver = true;
    }
    else if(board[1][0] == turn && board[1][1] == turn && board[1][2] == turn)
    {
        highlightWinningCombination('10', '11', '12');
        gameOver = true;
    }
    else if(board[2][0] == turn && board[2][1] == turn && board[2][2] == turn)
    {
        highlightWinningCombination('20', '21', '22');
        gameOver = true;
    }
    else if(board[0][0] == turn && board[1][0] == turn && board[2][0] == turn)
    {
        highlightWinningCombination('00', '10', '20');
        gameOver = true;
    }
    else if(board[0][1] == turn && board[1][1] == turn && board[2][1] == turn)
    {
        highlightWinningCombination('01', '11', '21');
        gameOver = true;
    }
    else if(board[0][2] == turn && board[1][2] == turn && board[2][2] == turn)
    {
        highlightWinningCombination('02', '12', '22');
        gameOver = true;
    }
    else if(board[0][0] == turn && board[1][1] == turn && board[2][2] == turn)
    {
        highlightWinningCombination('00', '11', '22');
        gameOver = true;
    }
    else if(board[0][2] == turn && board[1][1] == turn && board[2][0] == turn)
    {
        highlightWinningCombination('02', '11', '20');
        gameOver = true;
    }
}



//This function will check if the game is a draw
function checkDraw()
{
    let draw = true;
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(board[i][j] == "")
            {
                draw = false;
            }
        }
    }
   
    if(draw)
    {
        let drawColor = '#7494B0'
        gameOver = true;
        Squares.forEach(squares => {
            squares.style.backgroundColor = drawColor;
        })
    }
}

//This function will check if the player has selected a valid spot
function checkValidSpot(row, col)
{
    if(board[row][col] == "")
    {
        return true;
    }
}

//This function will update the board with the player's selection
function updateBoard(row, col)
{
    
    if(checkValidSpot(row, col) && !gameOver)
    {
        board[row][col] = turn;
        // Squares.item(index).innerHTML = turn;

        var targetSquare = document.getElementById(row + col);
        targetSquare.innerHTML = turn;

        console.log(board);

        checkWin();
        if(!gameOver)
        {
            checkDraw();
        }

        changeTurn();
    }

    else if(!checkValidSpot(row, col) && !gameOver)
    {
        flashInvalidSpot(row, col);
    }
}


Squares.forEach(square => {
    square.addEventListener("click", function(event)
    {

        let row = event.target.id.substring(0,1);
        let col = event.target.id.substring(1,2);

        updateBoard(row, col);
    }
)
})

resetButton.addEventListener("click", () => {resetGame();})


