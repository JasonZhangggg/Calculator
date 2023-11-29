let firstNum = "";
let isFirst = true;
let secondNum = "";
let operator = "";
let resetNext = false;
let match = { "+": ".plus", "-": ".minus", x: ".mult", "/": ".divide" };
let clearHighlight = () => {
  if (operator in match)
    document.querySelector(match[operator]).classList.remove("highlight");
};
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".orange");
const result = document.querySelector(".result");

const precision = 100000000;
const round = (x) => Math.round(x * precision) / precision;

document.querySelector(".clear").addEventListener("click", clear);
document.querySelector(".percent").addEventListener("click", () => {
  if (isFirst || secondNum === "") {
    firstNum = round(+firstNum / 100).toString();
    updateResult(firstNum);
  } else {
    secondNum = round(+secondNum / 100).toString();
    updateResult(secondNum);
  }
  resetNext = true;
});
document.querySelector(".sign").addEventListener("click", () => {
  if ((isFirst || secondNum == "") && +firstNum !== 0) {
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

function clear() {
  clearHighlight();
  firstNum = "";
  secondNum = "";
  isFirst = true;
  operator = "";
  updateResult("0");
}
function processNumber(e) {
  let val = e.target.textContent;
  let fullNum = "";
  // If enter was the last operator, reset numbers
  if (resetNext) {
    clear();
    resetNext = false;
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
    else {
      secondNum = fullNum;
      clearHighlight();
    }
    updateResult(fullNum);
  }
}

function processOperator(e) {
  let val = e.target.textContent;

  console.log(match[operator]);
  console.log(match[val]);
  if (val in match)
    document.querySelector(match[val]).classList.add("highlight");

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

  resetNext = val === "=";
  isFirst = false;
  secondNum = "";
  updateResult(firstNum);
}

function updateResult(val) {
  if (val == "") val = "0";
  if ((!val.includes(".") || val.indexOf(".") >= 8) && val.length > 7) {
    val = (+val).toExponential(2);
  } else if (val.includes(".") && val.length > 8) {
    val = val.slice(0, 7);
  }
  result.textContent = val;
}
