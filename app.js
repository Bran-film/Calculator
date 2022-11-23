let displayNum = "";
let historyNum = "";
let operator = "";

const displayValue = document.querySelector(".display");
const historyValue = document.querySelector(".history");

window.addEventListener("keydown", handleKeyPress);

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (displayNum != "" && historyNum != "") {
    compute();
  }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", handleDelete);

const plusminus = document.querySelector(".plusminus");
plusminus.addEventListener("click", posNeg);

const percentage = document.querySelector(".percentage");
percentage.addEventListener("click", calcPercent);

const numberBtns = document.querySelectorAll(".number");

const operatorBtns = document.querySelectorAll(".operator");

numberBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
  if (historyNum !== "" && displayNum !== "" && operator === "") {
    historyNum = "";
    displayValue.textContent = displayNum;
  }
  if (displayNum.length <= 11) {
    displayNum += number;
    displayValue.textContent = displayNum;
  }
}

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (historyNum === "") {
    historyNum = displayNum;
    operatorCheck(op);
  } else if (displayNum === "") {
    operatorCheck(op);
  } else {
    compute();
    operator = op;
    displayValue.textContent = "0";
    historyValue.textContent = historyNum + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  historyValue.textContent = historyNum + " " + operator;
  displayValue.textContent = "0";
  displayNum = "";
}

function compute() {
  historyNum = Number(historyNum);
  displayNum = Number(displayNum);

  if (operator === "+") {
    historyNum += displayNum;
  } else if (operator === "-") {
    historyNum -= displayNum;
  } else if (operator === "x") {
    historyNum *= displayNum;
  } else if (operator === "/") {
    if (displayNum <= 0) {
      historyNum = "Error";
      displayResults();
      return;
    }
    historyNum /= displayNum;
  }
  historyNum = roundNumber(historyNum);
  historyNum = historyNum.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  if (historyNum.length <= 11) {
    displayValue.textContent = historyNum;
  } else {
    displayValue.textContent = historyNum.slice(0, 11) + "...";
  }
  historyValue.textContent = "";
  operator = "";
  displayNum = "";
}

function clearCalculator() {
  displayNum = "";
  historyNum = "";
  operator = "";
  displayValue.textContent = "0";
  historyValue.textContent = "";
}

function addDecimal() {
  if (!displayNum.includes(".")) {
    displayNum += ".";
    displayValue.textContent = displayNum;
  }
}

function posNeg() {
  displayNum = Number(displayNum);
  if (displayNum < 0) {
    displayNum = Math.abs(displayNum);
  } else {
    displayNum = -Math.abs(displayNum);
  }
  displayValue.textContent = displayNum;
}

function calcPercent() {
  historyNum = Number(historyNum);
  displayNum = Number(displayNum);

  if (historyNum == "") {
    historyNum = displayNum / 100;
    displayValue.textContent = displayNum + "%";
  } else {
    displayNum = historyNum * (displayNum / 100);
    compute();
    operator = op;
    displayValue.textContent = "0";
    historyValue.textContent = historyNum + " " + operator;
    // historyNum = historyNum * (displayNum / 100);
    // historyNum = historyNum.toString();
    // historyValue.textContent = displayNum / 100;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && displayNum != "" && historyNum != "")
  ) {
    compute();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

function handleDelete() {
  if (displayNum !== "") {
    displayNum = displayNum.slice(0, -1);
    displayValue.textContent = displayNum;
    if (displayNum === "") {
      displayValue.textContent = "0";
    }
  }
  if (displayNum === "" && historyNum !== "" && operator === "") {
    historyNum = historyNum.slice(0, -1);
    displayValue.textContent = historyNum;
  }
}
