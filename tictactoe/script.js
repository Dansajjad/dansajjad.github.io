
  var boardContent, isOccupied, winCombo, canvasId, clickedCanvas, cxt;
  var turn = 0;
  var numSquaresFilled = 0;
  window.onload = function() {
    isOccupied = []; //
    boardContent = []; //
    winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    //looping to...
    for (var i = 0; i < 9; i++) {
      isOccupied[i] = false;
      boardContent[i] = "";
    }
  };

  //game logic
  function onCanvasClick(clickedId) {
    //canvasId = Number(clickedId); //getting element ID (send the ID as the function parameter: this.id)
    //console.log(canvasId);
    clickedCanvas = document.getElementById(clickedId);
    cxt = clickedCanvas.getContext("2d");

    if(isOccupied[clickedId] === false) { //make sure ID's are #s starting from 0
      if(turn % 2 === 0) {
        placeX(cxt);
        boardContent[clickedId] = "X";
      }
      else {
        placeO(cxt);
        boardContent[clickedId] = "O";
      }
      turn++;
      numSquaresFilled++;
      isOccupied[clickedId] = true;
      checkForWinners(boardContent[clickedId]);
      console.log(isOccupied);
      console.log(boardContent);

      if(numSquaresFilled == 9) {
        alert("Game Over");
        location.reload(true);
      }
    }
    else { alert("Space occupied! Please select another tile"); }
  }


  function checkForWinners(symbol) {
    console.log(symbol);
    for(var j = 0; j < winCombo.length; j++) {
      if(boardContent[winCombo[j][0]] == symbol &&
        boardContent[winCombo[j][1]] == symbol &&
        boardContent[winCombo[j][2]] == symbol
      ) {
        alert(symbol + " Won!");
        playAgain();
      }
    }
  }

  function playAgain() {
    var response = confirm("Play again?");
    if(response) {
      alert("Starting");
      location.reload(true);
    }
    else { alert("Goodbye!"); }
  }

  function placeX(context) {
    //diagonal line1
    context.strokeStyle = '#fff';
    context.lineWidth = 4;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(20, 20);
    context.lineTo(80, 80);
    context.shadowBlur = 2;
    context.shadowOffsetX = 1.5;
    context.shadowOffsetY = 1.5;
    context.shadowColor = "#444";
    context.stroke();
    //diagonal line2
    context.beginPath();
    context.moveTo(20, 80);
    context.lineTo(80, 20);
    context.stroke();
    context.closePath();
  }

  function placeO(context) {
    context.shadowBlur = 2;
    context.shadowOffsetX = 1.5;
    context.shadowOffsetY = 1.5;
    context.shadowColor = "#444";
    context.strokeStyle = 'red';
    context.lineWidth = 4;
    context.lineCap = 'round';
    context.beginPath();
    context.arc(50, 50, 30, 0, Math.PI * 2);
    context.stroke();
    context.closePath();
  }
