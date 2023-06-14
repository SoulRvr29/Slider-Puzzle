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

generateThumbials(29);
// localStorage.clear("Sliding puzzle progress");
let progress = localStorage.getItem("Sliding puzzle progress");

let randomArray = createRandomArray(16);
let actualPosition = arrayTo2d(randomArray);
let boardClickLock = false;
let moves = 0;
pasteTiles(randomArray);
let actualImage = 0;
progressLoad();

const tiles = document.querySelectorAll(".tile");
const mainImage = document.querySelector(".mainImage");

const thumbials = document.querySelectorAll(".imgList img");
const imgList = document.querySelector(".imgList");

const imagesBtn = document.querySelector(".imagesBtn");
const movesCouter = document.querySelector(".movesCounter");
const restartBtn = document.querySelector(".restartBtn");
const templateBtn = document.querySelector(".templateBtn");
const goBack = document.querySelector(".goBack");
const complete = document.querySelector(".complete");

/***************************/
/***   EVENT LISTENERS   ***/
/***************************/
/* Complete screen */
complete.addEventListener("click", () => {
  complete.style.opacity = "0";
  setTimeout(() => {
    complete.style.display = "none";
  }, 1010);
});

/* Go back */
goBack.addEventListener("click", () => {
  imgList.style.opacity = "0";
  setTimeout(() => {
    imgList.style.display = "none";
  }, 1000);
});

/* Images */
imagesBtn.addEventListener("click", () => {
  imgList.style.display = "flex";
  setTimeout(() => {
    imgList.style.opacity = "100%";
  }, 10);
  complete.style.opacity = "0";
  setTimeout(() => {
    complete.style.display = "none";
  }, 1010);
});

/* Template */
let tempBtnPos = false;
templateBtn.addEventListener("click", () => {
  if (tempBtnPos == true) {
    tempBtnPos = false;
    mainImage.style.display = "flex";
    setTimeout(() => {
      mainImage.style.opacity = "1";
    }, 5);
  } else {
    tempBtnPos = true;
    mainImage.style.opacity = "0";
    setTimeout(() => {
      mainImage.style.display = "none";
    }, 1000);
  }
});

/* Restart */
restartBtn.addEventListener("click", restart);

/* Thumbials */
thumbials.forEach((thumb) => {
  tempBtnPos = false;
  thumb.addEventListener("click", () => {
    actualImage = thumb.alt.substr(3, thumb.alt.length);
    mainImage.style.backgroundImage = `url(images/${thumb.alt}.jpg)`;
    tiles.forEach((tile) => {
      tile.style.backgroundImage = `url(images/${thumb.alt}.jpg)`;
    });
    imgList.style.opacity = "0";
    setTimeout(() => {
      imgList.style.display = "none";
      restart();
    }, 1000);
    mainImage.style.display = "flex";
    setTimeout(() => {
      mainImage.style.opacity = "1";
    }, 5);
  });
});

/* Main Image */
mainImage.addEventListener("click", () => {
  tempBtnPos = true;
  mainImage.style.opacity = "0";
  setTimeout(() => {
    mainImage.style.display = "none";
  }, 1000);
});

/* Single Tile */
tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (boardClickLock == false) {
      let clickedTilePos = checkTilePosition(tile.id);
      moveTile(tile.id, clickedTilePos);
      setTimeout(() => completionCheck(), 300);
    }
  });
});

/*********************/
/***   FUNCTIONS   ***/
/*********************/
function restart() {
  randomArray = createRandomArray(16);
  actualPosition = arrayTo2d(randomArray);
  boardClickLock = false;
  pasteTiles(randomArray);
  document.querySelector("#t16").classList.add("hide");
  tiles.forEach((tile) => {
    tile.classList.add("border");
    tile.style.cursor = "pointer";
  });
  moves = 0;
  movesCouter.innerHTML = `moves: ${moves}`;
  // mainImage.style.display = "flex";
  // setTimeout(() => {
  //   mainImage.style.opacity = "1";
  // }, 5);
}

function completionCheck() {
  if (actualPosition.toString() == completePattern.toString()) {
    boardClickLock = true;
    document.querySelector("#t16").classList.toggle("hide");
    tiles.forEach((tile) => {
      tile.classList.toggle("border");
      tile.style.cursor = "default";
      complete.innerHTML = `Puzzle complete!<br />in ${moves} moves`;
      complete.style.display = "grid";
      setTimeout(() => {
        complete.style.opacity = "100%";
      }, 10);
    });
    progressUpdate();
  }
}

function progressLoad() {
  if (progress === null) {
    progress = [];
    for (let i = 0; i < 29; i++) {
      progress.push("0");
    }
  } else {
    progress = progress.split(",");
  }
  // console.log(progress);
  for (let i = 0; i < progress.length; i++) {
    if (progress[i] === "0") {
      document.querySelector(`.img${i} .icon-ok`).style.display = "none";
    } else {
      document.querySelector(`.img${i} .icon-ok`).style.display = "grid";
      document.querySelector(`.img${i} .thumbMoves`).innerHTML = progress[i];
    }
  }
}

function progressUpdate() {
  progress[actualImage] = `${moves}`; // 1 == complete
  document.querySelector(`.img${actualImage} .thumbMoves`).innerHTML = moves;
  // console.log(progress);
  for (let i = 0; i < progress.length; i++) {
    if (progress[i] === "0") {
      document.querySelector(`.img${i} .icon-ok`).style.display = "none";
    } else {
      document.querySelector(`.img${i} .icon-ok`).style.display = "grid";
    }
    localStorage.setItem("Sliding puzzle progress", progress);
  }
  // console.log(progress);
}

function moveTile(clickedTileName, clickedTilePos) {
  // console.log(clickedTileName, clickedTilePos);
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
    moves++;
    movesCouter.innerHTML = `moves: ${moves}`;
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
/* for ending tests */
// function createRandomArray(length) {
//   arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
//   return arr;
// }

function createRandomArray(length) {
  let solvable = false;
  let newArr = [];
  while (solvable == false) {
    let array = [];
    let index = 0;
    let arrayLength = length;
    // create an array of length
    while (array.length < arrayLength) {
      array[index] = index + 1;
      index++;
    }
    // console.log(array);
    let randomArray = [];
    while (arrayLength--) {
      let randomNr = Math.floor(Math.random() * (arrayLength + 1));
      randomArray.push(array[randomNr]);
      array.splice(randomNr, 1);
    }
    solvable = solvableCheck(randomArray);
    if (solvable == true) newArr = randomArray;
  }
  console.log(solvable);
  console.log(newArr);
  return newArr;
}

function solvableCheck(arr) {
  // remove empty tile from array (empty is last in arr)
  let emptyTileNr = Math.max.apply(null, arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == emptyTileNr) arr.splice(i, 1);
  }

  // inversions counting
  let inversions = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) inversions++;
    }
  }
  if (inversions % 2 === 0) arr.push(arr.length + 1);
  console.log(inversions);
  return inversions % 2 === 0;
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

function generateThumbials(amount) {
  let imgList = document.querySelector(".imgList");
  for (let i = 0; i < amount; i++) {
    imgList.innerHTML += `<div class="img${i} thumb"><div class="thumbMoves"></div><i class="icon-ok"></i><img src="images/img${i}.jpg" alt="img${i}" /></div>`;
  }
}
