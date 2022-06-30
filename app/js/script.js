const billElement = document.querySelector('#bill');
const numberOfPeopleElement = document.querySelector('#number-of-people');
const tipPercentageBtns = document.querySelectorAll('.tip-btns button');
const resetBtn = document.querySelector('#reset');
const tipAmountElement = document.querySelector('.tip-amount');
const totalAmountElement = document.querySelector('.total-amount');
const customTipElement = document.querySelector('#custom-tip');
let billValue;
let numberOfPeople;
let billPerPerson;
let percentage;

function computeBillPerPerson(value, personCount) {
  if (!Number.isNaN(value) && !Number.isNaN(personCount)) {
    return value / personCount;
  }
  return undefined;
}

function toDecimal(num) {
  const numString = num + '';
  let decimal = '.';
  for (let i = 0; i < numString.length - 1; i++) {
    decimal += 0;
  }
  decimal += 1;
  return num * Number(decimal);
}

function computeTipAmount(value, tipPercent) {
  return value * toDecimal(tipPercent);
}

function displayOutput(bill, tipPercent, peopleCount) {
  const popUpText = document.querySelector('.pop-up-text');
  if (peopleCount === 0) {
    popUpText.classList.remove('hide');
    return;
  }
  if (isNaN(bill) || isNaN(tipPercent) || isNaN(peopleCount)) {
    return;
  }
  const tipAmountElement = document.querySelector('.tip-amount');
  const totalAmountElement = document.querySelector('.total-amount');
  const billPerPerson = computeBillPerPerson(bill, peopleCount);
  const tipAmount = computeTipAmount(billPerPerson, tipPercent);
  const totalAmount = billPerPerson + tipAmount;

  tipAmountElement.innerHTML = `$${tipAmount.toFixed(2)}`;
  totalAmountElement.innerHTML = `$${totalAmount.toFixed(2)}`;
  popUpText.classList.add('hide');
}

function resetSelectedBtn(btns) {
  for (const btn of btns) {
    btn.classList.remove('selected-btn');
  }
}

function reset() {
  const billElement = document.querySelector('#bill');
  const numberOfPeopleElement = document.querySelector('#number-of-people');
  const tipAmountElement = document.querySelector('.tip-amount');
  const totalAmountElement = document.querySelector('.total-amount');
  const customTipElement = document.querySelector('#custom-tip');

  billElement.value = '';
  numberOfPeopleElement.value = '';
  tipAmountElement.innerHTML = totalAmountElement.innerHTML = '$0.00';
  customTipElement.value = '';
  resetSelectedBtn(tipPercentageBtns);
  disableButton(this);
}

function disableButton(button) {
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
}

function enableButton(button) {
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
}

billElement.addEventListener('input', function () {
  billValue = Number(this.value);
  displayOutput(billValue, percentage, numberOfPeople);
  enableButton(resetBtn);
});

numberOfPeopleElement.addEventListener('input', function () {
  numberOfPeople = Number(this.value);
  displayOutput(billValue, percentage, numberOfPeople);
  enableButton(resetBtn);
});

tipPercentageBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const text = this.innerHTML;
    percentage = text.substring(0, text.length - 1);
    resetSelectedBtn(tipPercentageBtns);
    this.classList.add('selected-btn');
    displayOutput(billValue, percentage, numberOfPeople);
  });
});

customTipElement.addEventListener('input', function () {
  resetSelectedBtn(tipPercentageBtns);
  percentage = Number(this.value);
});

resetBtn.addEventListener('click', reset);
