let memory = 0;
const display = document.getElementById('display');
const historyList = document.getElementById('historyList');

let history = [];

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    let expr = display.value;
    expr = expr.replace(/(\d+)%/g, '($1/100)');
    expr = expr.replace(/sin/g, 'Math.sin');
    expr = expr.replace(/cos/g, 'Math.cos');
    expr = expr.replace(/tan/g, 'Math.tan');
    expr = expr.replace(/log/g, 'Math.log10');
    expr = expr.replace(/ln/g, 'Math.log');
    expr = expr.replace(/√/g, 'Math.sqrt');

    let result = eval(expr);
    if (result === undefined) throw new Error();
    display.value = result;
    addToHistory(`${expr} = ${result}`);
  } catch {
    display.value = 'Error';
  }
}
function addToHistory(text) {
  history.push(text);
  if(history.length > 20) history.shift(); 
  renderHistory();
}
function renderHistory() {
  historyList.innerHTML = '';
  for (let i = history.length - 1; i >= 0; i--) {
    const li = document.createElement('li');
    li.textContent = history[i];
    li.title = "Click to edit this expression";
    li.onclick = () => {
      const expr = history[i].split('=')[0].trim();
      display.value = expr;
      display.focus();
    };
    historyList.appendChild(li);
  }
}
function memoryAdd() {
  memory += parseFloat(display.value || 0);
}

function memorySubtract() {
  memory -= parseFloat(display.value || 0);
}

function memoryRecall() {
  display.value += memory;
}

function memoryClear() {
  memory = 0;
}
