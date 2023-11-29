let firstNum = "";
let isFirst = true;
let secondNum = "";
let operator = "";

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".orange");
const result = document.querySelector(".result");

document.querySelector(".clear").addEventListener("click", clearResult);

numbers.forEach((elem) => {
  elem.addEventListener("click", processNumber);
});

operators.forEach((elem) => {
  elem.addEventListener("click", processOperator);
});

function processNumber(e) {
  let val = e.target.textContent;
  let fullNum = "";
  fullNum = isFirst ? firstNum : secondNum;

  if (fullNum.replace(".", "").length < 7) {
    if (val !== "." || !firstNum.includes(".")) {
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
    firstNum = (+firstNum + +secondNum).toString();
  } else if (operator === "-") {
    firstNum = (+firstNum - +secondNum).toString();
  } else if (operator === "X") {
    firstNum = (+firstNum * +secondNum).toString();
  } else if (operator === "/") {
    firstNum = (+firstNum / +secondNum).toString();
  }
  operator = val;

  if (val !== "=") {
    isFirst = false;
  }
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
  console.log(val);
  if (val.includes(".") && val.length > 8) {
    val = val.slice(0, 8);
  } else if (!val.includes(".") && val.length > 7) {
    val = (+val).toExponential(2);
  }
  result.textContent = val;
}
