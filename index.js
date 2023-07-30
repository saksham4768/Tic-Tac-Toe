const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const Newgamebtn = document.querySelector(".btn");

let currentplayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialize the game

function initGame(){
    currentplayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna hai boxes ko
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more missing
        boxes[index].classList.remove("win");
    });
    Newgamebtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}
initGame();
function swapTurn(){
    if(currentplayer === "X"){
        currentplayer = "O";
    }
    else{
        currentplayer = "X";
    }
    //UI update
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}
function checkGameOver(){
    let Answer = "";
    winningPositions.forEach((position)=>{
        //All 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]]  !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){

            //check if winner is X
            if(gameGrid[position[0]] === "X"){
                Answer = "X";
            }
            else{
                Answer = "o";
            }
            //Disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents - "none";
            });
            // new we know X/o is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //It means we have a winner
    if(Answer !== ""){
        gameinfo.innerText = `winner Player - ${Answer}`;
        Newgamebtn.classList.add("active");
    }

    //when there is no winner
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box!==""){
            fillCount++;
        }
    });

    //Board is filled
    if(fillCount === 9){
        gameinfo.innerText = "Game Tied";
        Newgamebtn.classList.add("active");
    }
}
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentplayer;
        gameGrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        //Swap LKaro turn ko
        swapTurn();
        //check koi jeet toh  nhi gya
        checkGameOver();
    }
}
boxes.forEach((box, index)=>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
});
Newgamebtn.addEventListener("click",initGame);



