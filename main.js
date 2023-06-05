const positionX = [
  ["0%", "25%", "50%", "75%"],
  ["0%", "25%", "50%", "75%"],
  ["0%", "25%", "50%", "75%"],
  ["0%", "25%", "50%", "75%"],
  ["0%", "25%", "50%", "75%"],
];
const positionY = [
  ["0%", "0%", "0%", "0%"],
  ["25%", "25%", "25%", "25%"],
  ["50%", "50%", "50%", "50%"],
  ["75%", "75%", "75%", "75%"],
];
const completePattern = [
  ["t1", "t2", "t3", "t4"],
  ["t5", "t6", "t7", "t8"],
  ["t9", "t10", "t11", "t12"],
  ["t13", "t14", "t15", "t16"],
];

let randomArray = createRandomArray(16);
let actualPosition = arrayTo2d(randomArray);
let boardClickLock = false;
pasteTiles(randomArray);

const tiles = document.querySelectorAll(".tile");

/***   EVENT LISTENER   ***/
tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (boardClickLock == false) {
      let clickedTilePos = checkTilePosition(tile.id);
      moveTile(tile.id, clickedTilePos);
      setTimeout(() => completionCheck(), 500);
    }
  });
});

/***   FUNCTIONS   ***/
function completionCheck() {
  if (actualPosition.toString() == completePattern.toString()) {
    document.querySelector("#t16").classList.toggle("hide");
    tiles.forEach((tile) => {
      tile.classList.toggle("border");
      tile.style.cursor = "default";
    });
    boardClickLock = true;
  }
}

function moveTile(clickedTileName, clickedTilePos) {
  let emptyTilePos = checkTilePosition("t16");
  let moveLock = true;
  // checking the possibility of movement
  if (clickedTilePos[0] == emptyTilePos[0]) {
    if (
      clickedTilePos[1] == emptyTilePos[1] + 1 ||
      clickedTilePos[1] == emptyTilePos[1] - 1
    ) {
      moveLock = false;
    }
  } else if (clickedTilePos[1] == emptyTilePos[1]) {
    if (
      clickedTilePos[0] == emptyTilePos[0] + 1 ||
      clickedTilePos[0] == emptyTilePos[0] - 1
    ) {
      moveLock = false;
    }
  }

  if (moveLock == false) {
    // moving the tile
    actualPosition[clickedTilePos[1]][clickedTilePos[0]] = "t16";
    actualPosition[emptyTilePos[1]][emptyTilePos[0]] = clickedTileName;

    document.querySelector("#" + clickedTileName).style.left =
      positionX[emptyTilePos[1]][emptyTilePos[0]];
    document.querySelector("#" + clickedTileName).style.top =
      positionY[emptyTilePos[1]][emptyTilePos[0]];

    document.querySelector("#t16").style.left =
      positionX[clickedTilePos[1]][clickedTilePos[0]];
    document.querySelector("#t16").style.top =
      positionY[clickedTilePos[1]][clickedTilePos[0]];

    moveLock = true;
  }
}

function checkTilePosition(tile) {
  let tilePosition = [];
  for (let x = 0; x < actualPosition.length; x++) {
    for (let y = 0; y < actualPosition[x].length; y++) {
      if (actualPosition[x][y] == tile) {
        tilePosition.push(y, x);
        return tilePosition;
      }
    }
  }
}
/* for tests */
// function createRandomArray(length) {
//   arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 15];
//   return arr;
// }

function createRandomArray(length) {
  let array = [];
  let index = 0;
  // create an array of length
  while (array.length < length) {
    array[index] = index + 1;
    index++;
  }

  let randomArray = [];
  let randomNr;
  while (length--) {
    randomNr = Math.floor(Math.random() * (length + 1));
    randomArray.push(array[randomNr]);
    array.splice(randomNr, 1);
  }

  return randomArray;
}

function pasteTiles(randomArray) {
  let arrNr = 0;
  let itemNr = 0;
  for (let nr = 0; nr < randomArray.length; nr++) {
    let tile = document.querySelector("#t" + randomArray[nr]);
    tile.style.left = positionX[arrNr][itemNr];
    tile.style.top = positionY[arrNr][itemNr];
    itemNr++;
    if (itemNr > 3) {
      itemNr = 0;
      arrNr++;
    }
  }
}

function arrayTo2d(arr) {
  return [
    ["t" + arr.at(0), "t" + arr.at(1), "t" + arr.at(2), "t" + arr.at(3)],
    ["t" + arr.at(4), "t" + arr.at(5), "t" + arr.at(6), "t" + arr.at(7)],
    ["t" + arr.at(8), "t" + arr.at(9), "t" + arr.at(10), "t" + arr.at(11)],
    ["t" + arr.at(12), "t" + arr.at(13), "t" + arr.at(14), "t" + arr.at(15)],
  ];
}

// console.log(randomArray);
// console.log(actualPosition);
