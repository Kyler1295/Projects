function _(id){return document.getElementById(id);}
var display = '0';
var twoNumbers = false;
var firstNumber = '';
var secondNumber = '';
var operation = '';
changeDisplay()


var button = document.querySelectorAll('.button');
for(let i = 0; i < button.length; i++){
  button[i].addEventListener('click', getValue);
  button[i].className += ' blue btn';
}

function getValue(e){
  let numberPassed = e.target.innerHTML.toString();

  if(numberPassed === '+' ||
     numberPassed ==='-' ||
      numberPassed === '*' ||
      numberPassed === '/'){
    equation(numberPassed);
  }
  else if (numberPassed === 'Enter') {
    if(secondNumber != ''){
      doMath();
    } else {

    }
  }
  else {
  newNumber(numberPassed)
  }
}

function newNumber(newNumber){
  if (display == 0 ){
  display = ''
  display = display + newNumber;
} else {
  if(twoNumbers == false){
    display = display + newNumber;
  } else {
    secondNumber = secondNumber + newNumber;
    display = display + newNumber;
    console.log(secondNumber);
  }
}
  changeDisplay()
}

function equation(operator){
  if(twoNumbers == false){
    operation = operator;
    twoNumbers = true;
    firstNumber = _('display').innerHTML;
    display = display + ' ' + operator + ' ';
    changeDisplay()
  } else {
    doMath()
  }
}

function doMath(){
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  console.log(firstNumber, secondNumber);
  switch(operation){
    case '+':
      display = firstNumber + secondNumber;
      changeDisplay()
      firstNumber = firstNumber + secondNumber;
      secondNumber = '';
      twoNumbers = false;
      break;
    case '-':
      display = firstNumber - secondNumber;
      changeDisplay()
      firstNumber = firstNumber + secondNumber;
      secondNumber = '';
      twoNumbers = false;
      break;
    case '*':
      display = firstNumber * secondNumber;
      changeDisplay()
      firstNumber = firstNumber + secondNumber;
      secondNumber = '';
      twoNumbers = false;
      break;
    case '/':
      display = firstNumber / secondNumber;
      changeDisplay()
      firstNumber = firstNumber + secondNumber;
      secondNumber = '';
      twoNumbers = false;
      break;
    default:
      console.log('error');
  }
}

function changeDisplay(){
  _('display').innerHTML = display;
}

function reset(){
  display = '0';
  twoNumbers = false;
  firstNumber = '';
  secondNumber = '';
  operation = '';
  changeDisplay()
}
