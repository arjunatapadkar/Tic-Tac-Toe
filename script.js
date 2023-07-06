
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;


const winningPositions = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];


// function to init the game
function initGame(){
  
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // clear the UI boxes
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // remove green color of winner
        box.classList.remove("win");
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer ="X";
    }

    // update UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkGameOver(){

    let answer = "";

    winningPositions.forEach((position) => {

        // all boxes sholud be non-empty and of exactly same value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) 
        && (gameGrid[position[0]] === gameGrid[position[1]])  && (gameGrid[position[1]] === gameGrid[position[2]])) {


            // check the winner x or o 
            if(gameGrid[position[0]] === "X") {
                answer = "X";
                console.log(answer);
            }
            else {
                answer = "0";
            }


            // disable pointer events
            boxes.forEach( (box) => {
                box.style.pointerEvents = "none";
            });


            // winner shoul get color
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    }); 

    // it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player = ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // check for tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{

        if(box !== "" ) 
            fillCount++;
    });

    // board is fill game is tied
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }

    
}



function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // swapplayer
        swapTurn();

        // check game over
        checkGameOver();
    }
}



boxes.forEach((box, index) =>{
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


newGameBtn.addEventListener("click", initGame);









