let firstNum = "";
let isFirst = true;
let secondNum = "";
let operator = "";

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".orange");
const result = document.querySelector(".result");

const percision = 100000000;
const round = (x) => Math.round(x * percision) / percision;

document.querySelector(".clear").addEventListener("click", clearResult);
document.querySelector(".sign").addEventListener("click", () => {
  if (isFirst && +firstNum !== 0) {
    firstNum = (-1 * +firstNum).toString();
    updateResult(firstNum);
  } else if (+secondNum !== 0) {
    secondNum = (-1 * +secondNum).toString();
    updateResult(secondNum);
  }
});

numbers.forEach((elem) => {
  elem.addEventListener("click", processNumber);
});

operators.forEach((elem) => {
  elem.addEventListener("click", processOperator);
});

function processNumber(e) {
  let val = e.target.textContent;
  let fullNum = "";
  // If enter was the last operator, reset numbers
  if (operator === "=") {
    operator = "";
    firstNum = "";
  }

  fullNum = isFirst ? firstNum : secondNum;
  if (fullNum.replace(".", "").length < 7) {
    // Add a zero in front if it is the first decimal
    if (val === "." && fullNum.length === 0) {
      fullNum = "0.";
    }
    // Only add a decimal if we don't have one already
    else if (val !== "." || !fullNum.includes(".")) {
      fullNum += e.target.textContent;
    }
    if (isFirst) firstNum = fullNum;
    else secondNum = fullNum;
    updateResult(fullNum);
  }
}

function processOperator(e) {
  let val = e.target.textContent;

  if (operator === "+") {
    firstNum = round(+firstNum + +secondNum).toString();
  } else if (operator === "-") {
    firstNum = round(+firstNum - +secondNum).toString();
  } else if (operator === "x") {
    firstNum = round(+firstNum * +secondNum).toString();
  } else if (operator === "/") {
    firstNum = round(+firstNum / +secondNum).toString();
  }
  operator = val;

  isFirst = val === "=";
  secondNum = "";
  console.log(firstNum);
  updateResult(firstNum);
}

function clearResult() {
  firstNum = "";
  secondNum = "";
  isFirst = true;
  operator = "";
  updateResult("0");
}

function updateResult(val) {
  if ((!val.includes(".") || val.indexOf(".") >= 7) && val.length > 7) {
    val = (+val).toExponential(2);
  } else if (val.includes(".") && val.length > 8) {
    val = val.slice(0, 8);
  }
  result.textContent = val;
}
