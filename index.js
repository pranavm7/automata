
    // Any live cell with fewer than two live neighbors dies, as if caused by under population.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overcrowding.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        // Calculate distance between live cells to generate candidates
        // *Better approach - when calculating north, south, east, west, get the index numbers of the cells that are inactive, add them to an array and for indexes that repeat exactly three times, turn them live.
        // conditional birth
//  import * as PIXI from 'pixi.js'
import {Cell} from './classes.js';
import {Slider} from './slider.js';
let boardDimension = null;//parseInt(document.getElementById(`size`).innerText.split(' ')[0]);
let rowCount       = null;//boardDimension;
let colCount       = null;//boardDimension;
let cellArray = [];
let rangeElement = document.querySelector('.range [type="range"]');
let valueElement = document.querySelector('.range .range__value span') ;
const options = {
    min: 5,
    max: 255,
    cur: 125,
  };
  const updateBoard = (value)=>{
    for(let idx in cellArray){
        unset(idx);
    }
    currentAlive.length=0;
    futureAlive.length=0;
    iterCount=0;
    cellArray.length=0;
    boardDimension = value;
    rowCount = boardDimension;
    colCount = boardDimension;
    createOutlinedTexture(background);
    cellArray = new Array(boardDimension*boardDimension).fill(null);
    numberOfAlive = getRandomArbitrary(boardDimension/4,(boardDimension*boardDimension)-boardDimension);
    drawBoard();
    // console.log(cellArray);
}
  if (rangeElement) {
    let slider = new Slider(rangeElement, valueElement, options, updateBoard);
    slider.init();
  }
  
//need responsive
let dimension = parseInt(screen.width * 0.7);
const container = new PIXI.Container();
let app = new PIXI.Application({ width : dimension, height : dimension, resolution : window.devicePixelRatio || 1, antialias: true, view: document.getElementById(`game`)});
let iterCount=0;
const fps = 10;
const OFFSET = 1;
let filledSquareTexture = null;
let emptySquareTexture = null;
// array to draw board
boardDimension = parseInt(document.getElementById(`size`).innerText.split(' ')[0]);
rowCount = boardDimension;
colCount = boardDimension;
cellArray = new Array(boardDimension * boardDimension).fill(null);

// array to track the currently 'alive' cells
const currentAlive = Array();
// array to defer the stateChange
const futureAlive = Array();
const futureDead  = Array();
const birthMap = new Map();
let background = `#000000`;
let bordersVisible = false;


document.getElementById(`startBtn`).onclick = startCycle;
document.getElementById(`stopBtn`).onclick = kill;
document.getElementById(`autoplayBtn`).onclick = auto;
document.getElementById(`resetBtn`).onclick = reset;
let numberOfAlive = null;
const randomInitSet = new Set();
createTexture(background);
drawBoard();
app.stage.addChild(container);


function set(index){
        if( !currentAlive.includes(index) ){
            currentAlive.push(index);
            cellArray[index].selected = true;
            cellArray[index].sprite.selected = true;
            cellArray[index].sprite.texture = filledSquareTexture;
        }
}

function unset(index){
    if(currentAlive.includes(index)){
        let spliceIndex = currentAlive.indexOf(index);
        if( spliceIndex > -1 ){
            currentAlive.splice(spliceIndex, 1);
        }
    }
    cellArray[index].selected = false;
    cellArray[index].sprite.selected = false;
    cellArray[index].sprite.texture = emptySquareTexture; 
}

// creates the textures
function createTexture(background){
    bordersVisible = false;
    if(background === `#FFFFFF`){
        let filledSquareTemplate = new PIXI.Graphics();
        filledSquareTemplate.lineStyle(1, 0x000000, 1);
        filledSquareTemplate.beginFill(0x000000);
        filledSquareTemplate.drawRect(0,0, 10, 10);
        filledSquareTemplate.endFill();
        filledSquareTexture = app.renderer.generateTexture(filledSquareTemplate);
        
        let emptySquareTemplate = new PIXI.Graphics();
        emptySquareTemplate.lineStyle(1, 0xFFFFFF,1);
        emptySquareTemplate.beginFill(0xFFFFFF);
        emptySquareTemplate.drawRect(0,0,10,10);
        emptySquareTemplate.endFill();
        emptySquareTexture = app.renderer.generateTexture(emptySquareTemplate);
        return;
    }
    let filledSquareTemplate = new PIXI.Graphics();
    filledSquareTemplate.lineStyle(1, 0xFFFFFF, 1);
    filledSquareTemplate.beginFill(0xFFFFFF);
    filledSquareTemplate.drawRect(0,0, 10, 10);
    filledSquareTemplate.endFill();
    filledSquareTexture = app.renderer.generateTexture(filledSquareTemplate);
    
    let emptySquareTemplate = new PIXI.Graphics();
    emptySquareTemplate.lineStyle(1, 0x000000,1);
    emptySquareTemplate.beginFill(0x000000);
    emptySquareTemplate.drawRect(0,0,10,10);
    emptySquareTemplate.endFill();
    emptySquareTexture = app.renderer.generateTexture(emptySquareTemplate);
}


function createOutlinedTexture(background){
    bordersVisible = true;
    if(background === `#FFFFFF`){
        let filledSquareTemplate = new PIXI.Graphics();
        filledSquareTemplate.lineStyle(1, 0x000000, 1);
        filledSquareTemplate.beginFill(0x000000);
        filledSquareTemplate.drawRect(0,0, 10, 10);
        filledSquareTemplate.endFill();
        filledSquareTexture = app.renderer.generateTexture(filledSquareTemplate);
        
        let emptySquareTemplate = new PIXI.Graphics();
        emptySquareTemplate.lineStyle(1, 0x000000,1);
        emptySquareTemplate.beginFill(0xFFFFFF);
        emptySquareTemplate.drawRect(0,0,10,10);
        emptySquareTemplate.endFill();
        emptySquareTexture = app.renderer.generateTexture(emptySquareTemplate);
        return;
    }
    let filledSquareTemplate = new PIXI.Graphics();
    filledSquareTemplate.lineStyle(1, 0xFFFFFF, 1);
    filledSquareTemplate.beginFill(0xFFFFFF);
    filledSquareTemplate.drawRect(0,0, 10, 10);
    filledSquareTemplate.endFill();
    filledSquareTexture = app.renderer.generateTexture(filledSquareTemplate);
    
    let emptySquareTemplate = new PIXI.Graphics();
    emptySquareTemplate.lineStyle(1, 0xFFFFFF,1);
    emptySquareTemplate.beginFill(0x000000);
    emptySquareTemplate.drawRect(0,0,10,10);
    emptySquareTemplate.endFill();
    emptySquareTexture = app.renderer.generateTexture(emptySquareTemplate);
}

function getSprite(width, height, selected, index) {
    if(selected){
        
        let filledSquareSprite = new PIXI.Sprite(filledSquareTexture);
        filledSquareSprite.width = width;
        filledSquareSprite.height = height;
        filledSquareSprite.interactive = true;
        filledSquareSprite.index = index;
        filledSquareSprite.on('mousedown', onClick);
        return filledSquareSprite;
    }
    
    let emptySquareSprite = new PIXI.Sprite(emptySquareTexture);
    emptySquareSprite.width = width;
    emptySquareSprite.height = height;
    emptySquareSprite.index = index;
    emptySquareSprite.interactive = true;
    emptySquareSprite.on('mousedown', onClick);
    return emptySquareSprite;
}

// Callback triggered when a square is clicked on.
function onClick(){
    if (this.selected){
        unset(this.index);
    }
    else{
        set(this.index);
    }
}


// initializes the board
function drawBoard(){
    container.removeChildren();
    cellArray.forEach((element,index,array) => {
        
        array[index] = new Cell(index,colCount);
        array[index].index = index;
        array[index].cellWidth =  (dimension - OFFSET * 2) / colCount;
        array[index].cellHeight = (dimension - OFFSET * 2) / rowCount;
        array[index].sprite = getSprite(
            array[index].cellWidth, 
            array[index].cellHeight, 
            array[index].selected,
            index);
            array[index].sprite.position.set(
                array[index].col * array[index].cellWidth + OFFSET,
                array[index].row * array[index].cellHeight + OFFSET);
                
                container.addChild(array[index].sprite);
            });
    }

    
function calculateAliveNeighbors(index){
    let north    = null;
    let south    = null;
    let east     = null;
    let northEast= null;
    let southEast= null;
    let west     = null;
    let southWest= null;
    let northWest= null;
    if(index !== 0 && index !== (boardDimension*boardDimension-1) && index % boardDimension !== 0 && (index+1) % boardDimension !== 0 && index > boardDimension && index < ((boardDimension * boardDimension) - (boardDimension+1))){  
        try{
        north    =  cellArray[index - 1].selected ? true : index-1;
        south    =  cellArray[index + 1].selected ? true : index+1;
        east     =  cellArray[index + boardDimension].selected? true : index + boardDimension;
        northEast=  cellArray[index + boardDimension - 1 ].selected ? true : index - 1 + boardDimension;
        southEast=  cellArray[index + boardDimension + 1 ].selected? true :index + 1 + boardDimension;
        west     =  cellArray[index - boardDimension].selected? true : index - boardDimension;
        southWest=  cellArray[index - boardDimension + 1 ].selected? true :index + 1 - boardDimension;
        northWest=  cellArray[index - boardDimension - 1 ].selected ? true : index - 1 - boardDimension;
        }
        catch(err){
            console.log(cellArray[index - 1])
            console.log(cellArray[index + 1])
            console.log(cellArray[index + boardDimension])
            console.log(cellArray[index + boardDimension - 1 ])
            console.log(cellArray[index + boardDimension + 1 ])
            console.log(cellArray[index - boardDimension])
            console.log(cellArray[index - boardDimension + 1 ])
            console.log(cellArray[index - boardDimension - 1 ])
        }
    }
    else{
        // handling edges
        if (index === 0 || index % boardDimension === 0 || index === (boardDimension*boardDimension)-boardDimension){
            // top edge
            north = cellArray[index+boardDimension-1].selected? true : index+boardDimension-1;
            
            if(index===0){
                // left top
                northWest = cellArray[(boardDimension*boardDimension) -1].selected? true : boardDimension*boardDimension -1;
                southWest = cellArray[(boardDimension*boardDimension-1)-boardDimension+index].selected? true : (boardDimension*boardDimension-1)-boardDimension+index;
            }
            else{
                northWest = cellArray[index - 1].selected? true : index - 1;
            }
            if(index===((boardDimension*boardDimension)-boardDimension)){
                // right top
                northEast = cellArray[boardDimension -1].selected? true : boardDimension -1;
            }else{
                northEast = cellArray[index + (boardDimension*2) - 1].selected? true : index + (boardDimension*2) - 1;
            }
            
        }
        if(index === boardDimension - 1 || (index+1) % boardDimension === 0 ||index === (boardDimension*boardDimension -1)){
            // bottom edge
            south = cellArray[index-boardDimension+1].selected? true : index-boardDimension+1;

            if(index === boardDimension - 1){
                // left bottom
                southWest = cellArray[boardDimension*boardDimension-boardDimension].selected? true : boardDimension*boardDimension-boardDimension;
            }
            else{
                southWest = cellArray[index-(boardDimension*2)+1].selected? true : index-(boardDimension*2)+1;
            }
            if(index === (boardDimension*boardDimension -1)){
                //right bottom
                southEast = cellArray[0].selected? true : 0;
            }
            else{
                southEast = cellArray[index+1].selected? true : index+1;
            }
        }
        if(index < boardDimension){
            // left edge
            if(index === boardDimension-1){
                west = cellArray[(boardDimension*boardDimension) - 1].selected? true : (boardDimension*boardDimension) - 1;
                northWest = cellArray[(boardDimension*boardDimension) - 2].selected? true : (boardDimension*boardDimension) - 2;
                southWest = cellArray[boardDimension*boardDimension - boardDimension].selected? true : boardDimension*boardDimension - boardDimension;
            }
            else{
                northWest = cellArray[(boardDimension*boardDimension)-(boardDimension-index-1)].selected? true : (boardDimension*boardDimension)-(boardDimension-index)-1;
                west= cellArray[(boardDimension*boardDimension)-(boardDimension-index-1) -1].selected? true :(boardDimension*boardDimension)-(boardDimension-index-1) -1;
                southWest = cellArray[(boardDimension*boardDimension)-(boardDimension-index-1)].selected? true : (boardDimension*boardDimension)-(boardDimension-index-1);
            }

        }
        if(index > ((boardDimension * boardDimension) - (boardDimension+1))){
            // right edge
            if(index === boardDimension*boardDimension-(boardDimension)){
                east = cellArray[0].selected? true : 0;
                northEast = cellArray[boardDimension -1].selected? true : boardDimension -1;
                southEast = cellArray[(index+1) % boardDimension].selected? true : (index+1) % boardDimension;

            }else{
                east = cellArray[index%boardDimension].selected? true : index%boardDimension;
                southEast = cellArray[index%boardDimension+1].selected? true : index%boardDimension+1;
                northEast = cellArray[index%boardDimension-1].selected? true : index%boardDimension-1;
            }
            
        }
    }

    // console.log(`Passed phase 1`)
    // Processing:
    let tempArr = [north,northWest,northEast,south,southEast,southWest,west,east];
    // console.log(tempArr);
    tempArr.forEach( (val, idx) => {
        if(val === null){
            switch (idx) {
                case 0://north
                    tempArr[idx] = cellArray[index - 1].selected ? true : index-1;
                    break;
                case 1://northwest
                    tempArr[idx] = cellArray[index - boardDimension - 1 ].selected ? true : index - 1 - boardDimension;
                    break;
                case 2://northeast
                    tempArr[idx] = cellArray[index + boardDimension - 1 ].selected ? true : index - 1 + boardDimension;
                    break;
                case 3://south
                    tempArr[idx] = cellArray[index + 1].selected ? true : index+1;
                    break;
                case 4://southeast
                    tempArr[idx] = cellArray[index + boardDimension + 1 ].selected? true :index + 1 + boardDimension; 
                    break;
                case 5://southwest
                    tempArr[idx] = cellArray[index - boardDimension + 1 ].selected? true :index + 1 - boardDimension;
                    break;
                case 6://west
                    tempArr[idx] = cellArray[index - boardDimension].selected? true : index - boardDimension;
                    break;
                case 7://east
                    tempArr[idx] = cellArray[index + boardDimension].selected? true : index + boardDimension;
                    break;
                default:
                    break;
            }
        }
    })
    // console.log(`Passed phase 2`)
    let neighborCount = tempArr.filter(e=>e === true).length;
    if (neighborCount < 2 || neighborCount >3){
        futureDead.push(index);
    }
    else{
        futureAlive.push(index);
    }

    // add index numbers for all the cells where selected = false to a map
        // add index number as key and value as 1
        // add 1 to the value of the key if key exists
        // create a function that will add all the cells which have 3 occurrences to futureAlive
    let currentDead = tempArr.filter(e => e !== true);
    for(let currentDeadIndex in currentDead){
        if(birthMap.has(currentDead[currentDeadIndex])){
            birthMap.set(currentDead[currentDeadIndex],birthMap.get(currentDead[currentDeadIndex])+1);
        }
        else{
            birthMap.set(currentDead[currentDeadIndex],1);
        }
        
    }

    tempArr.length = 0;
    currentDead.length = 0;
    
}

function birth(birthMap){
    birthMap.forEach((value,key) => {
        if(value === 3){
            set(key);
        }
    });
}

let autoPlay=null;
function startCycle(){
    if(currentAlive.length===0){
        Swal.fire({
            title: 'Error!',
            text: 'No alive cells!',
            icon: 'error',
            confirmButtonText: 'Continue'
          });
        return;
    }
    if(autoPlay){
        clearInterval(autoPlay);
    }

    autoPlay = setInterval(()=>{try{ cycle();}catch(err){console.log(err);clearInterval(autoPlay);autoPlay=null;}}, 1000/fps);
}

function kill(){
    if(autoPlay === null || iterCount === 0){
        Swal.fire({
            text: 'No iterations running.',
            icon: 'warning',
            confirmButtonText: 'Continue'
          });
    }
    console.log(`[!]\tstopped\n[+]\titerations:\t${iterCount}`);
    clearInterval(autoPlay);
}


function cycle(){
    // console.log(`${boardDimension}`);
    // console.log(`${cellArray.length}`);
    //  console.log(cellArray);
    iterCount++;
    if(currentAlive.length < 1){
        // clearInterval(autoPlay);
        throw "[!]\tNo cells alive.";
    }
    // Process current state of the board
    for (let currentAliveCell in currentAlive){
            calculateAliveNeighbors(currentAlive[currentAliveCell]);
    }
    // Commit changes
    for(let deadCells in futureDead){
        unset(futureDead[deadCells]);
    }
    for(let aliveCells in futureAlive){
        set(futureAlive[aliveCells]);
    }
    birth(birthMap);
    // flush future arrays
    futureDead.length = new Array();
    futureAlive.length = new Array();
    birthMap.clear();
    }



function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
function auto(){
    // pick a random number between 1 and length of the board
    // pick a random index number for the amount of times decided by prev number
    //set them as on
    //let it run.
    if(bordersVisible){
        boardDimension = parseInt(document.getElementById(`size`).innerText.split(' ')[0]);
        numberOfAlive = getRandomArbitrary(boardDimension/4,(boardDimension*boardDimension)-boardDimension);
        rowCount = boardDimension;
        colCount = boardDimension;
        createTexture(background);
        cellArray = new Array(boardDimension*boardDimension).fill(null);
        drawBoard();
    }
    numberOfAlive = getRandomArbitrary(boardDimension/4,(boardDimension*boardDimension)-boardDimension);
    while(numberOfAlive>=0){
        randomInitSet.add(getRandomArbitrary(0,cellArray.length-1));
        numberOfAlive--;
    }
    randomInitSet.forEach(val => {
        set(Math.floor(val));
    });
    
    startCycle();
    
}

function reset(){
    kill();
    for(let idx in cellArray){
        unset(idx);
    }
    currentAlive.length=0;
    futureAlive.length=0;
    iterCount=0;
    cellArray.length=0;
}