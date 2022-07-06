document.addEventListener("DOMContentLoaded", () => {
  let fields = document.querySelectorAll(".field");
  /* console.log(fields); */

  fields.forEach((field) => {
    field.addEventListener("click", handleClick);
  });
});

function handleClick(event) {
  let field = event.target.id;
  if (handleMove(field)) {
    let fields = document.querySelectorAll(".field");
    setTimeout(() => {
      for (let i in seqWinner) {
        fields[seqWinner[i]].setAttribute("class", "fieldWinner");
      }
      alert("The Player " + (playerTime + 1) + " Won");
    }, 10);
  }
  updateFields();
}

function updateFields() {
  let fields = document.querySelectorAll(".field");

  fields.forEach((element) => {
    let position = element.id;

    let symbol = board[position];

    if (symbol != "") {
      element.innerHTML = `<div class="${symbol}" ></div>`;
    }
  });
}

function restart() {
  let fields = document.getElementsByClassName("field");
  let fieldsWinner = document.querySelectorAll(".fieldWinner");
  for (let i in board) {
    board[i] = "";
  }
  /* console.log(fieldsWinner.length); */
  if (fieldsWinner.length != 0) {
    for (let i = 0; i < 3; i++) {
      /* console.log(fieldsWinner[i]); */
      /* console.log(i); */
      /* fieldsWinner[i].innerHTML = ""; */
      fieldsWinner[i].setAttribute("class", "field");
      /* fields[seqWinner[i]].setAttribute("class", "fieldWinner"); */
    }
  }
  setTimeout(() => {
    for (let i in fields) {
      fields[i].innerHTML = "";
    }
  }, 10);

  /* console.log(fieldsWinner); */
  playerTime = 0;
  gameOver = false;
  /* seqWinner = ""; */
}
