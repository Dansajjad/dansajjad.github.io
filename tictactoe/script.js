var content; //array to see what canvas contains
var painted; //array to check if canvas already has something
var winningCombination;
var turn = 0; //
var theCanvas;
var c;
var squareFilled;
var w;
var y;


window.onload = function() {
  painted = [];
  content = [];
  winningCombination = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for(var i = 0; i < 8; i++) {
    painted[i] = false;
    content[i] = "";
  }


};
