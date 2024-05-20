let boxs = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#newgame");
let msgWinner = document.querySelector(".winner");
let msg = document.querySelector("#msg");
let count = 0;
let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const resetgame = () => {
  count = 0;
  turn0 = true;
  enabledBoxes();
  msgWinner.classList.add("hide");
};

boxs.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.style.color = "blue";
      box.innerText = "O";
      checkWinner();
      turn0 = false;
      count++;
    } else {
      box.style.color = "red";
      box.innerText = "X";
      checkWinner();
      turn0 = true;
      count++;
    }
    box.disabled = true;
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxs[pattern[0]].innerText;
    let pos2Val = boxs[pattern[1]].innerText;
    let pos3Val = boxs[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        showWinner(pos1Val);
      } else if (count >= 8) {
        count++;
      }
      if (count == 9) {
        drawmatch();
      }
    }
  }
};

const disabledBoxes = () => {
  for (let box of boxs) {
    box.disabled = true;
  }
};

const enabledBoxes = () => {
  for (let box of boxs) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgWinner.classList.remove("hide");
  disabledBoxes();
};
//
const drawmatch = () => {
  msg.innerText = `Draw the Match `;
  msgWinner.classList.remove("hide");
  disabledBoxes();
};
//
newbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
