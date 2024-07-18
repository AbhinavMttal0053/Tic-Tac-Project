const gameInfo = document.querySelector(".game-info");
const newGameButton = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

let CurrentPlayer;
let GameGrid;

const WinningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function InitGame(){
    CurrentPlayer = "X";
    GameGrid = ["","","","","","","","","","",""];
    BoxesClear();
    gameInfo.innerText = `Current Player - ${CurrentPlayer}`;
    newGameButton.classList.remove("active");
}
InitGame();

boxes.forEach((box,index) =>{
    box.addEventListener("click",() =>{
        HandleEvent(index);
    });
});

function SwapPlayer(){
    if(CurrentPlayer === "X"){
        CurrentPlayer = "O";
    }
    else{
        CurrentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${CurrentPlayer}`;
}

function HandleEvent(index){
    if(GameGrid[index] === ""){
        boxes[index].innerText =  CurrentPlayer;

        GameGrid[index] = CurrentPlayer;

        boxes[index].style.pointerEvents = "none";

        SwapPlayer();

        CheckForWinner();
    }
};

newGameButton.addEventListener("click",(InitGame));

function BoxesClear(){
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
};


function CheckForWinner(){
    let Winner = "";

    WinningPositions.forEach((index) =>{

        if(GameGrid[index[0]] !== "" && GameGrid[index[1]] !== "" && GameGrid[index[2]] !== ""
            && (GameGrid[index[0]]  === GameGrid[index[1]] && GameGrid[index[1]] === GameGrid[index[2]])){

            if(GameGrid[index[0]] === "X")
                Winner = "X";
            else
                Winner = "O";
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[index[0]].classList.add("win");
            boxes[index[1]].classList.add("win");
            boxes[index[2]].classList.add("win");

        }
    });
    if(Winner !== ""){
        gameInfo.innerText = `Game Winner - ${Winner}`;
        newGameButton.classList.add("active");
        return;
    }

    let FillCount = 0;
    GameGrid.forEach((box) =>{
        if(box != ""){
            FillCount++;
        }
    });

    if(FillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameButton.classList.add("active");
    }
};


