$(document).ready(function() {  
    
    $(".btn").click(function(event) {
      $(event.target).blur();
      processButton(event.target);
    });
    $(document).on("click", ".calc-history-eq", function(event) {
      let tokens = calcHistory[parseInt($(event.target).attr("id").substring(2))].tokens;
      tokenList = tokens;
      displayEquation();
    });
});

const operators = [
  {
    id: "op-power",
    numOperands: 2,
    symbol: " ^ ",
    calc: (a, b) => {
      return Math.pow(a, b);
    }
  },
  {
    id: "op-negate",
    numOperands: 1,
    symbol: " -",
    calc: (a) => {
      return -a;
    }
  },
  {
    id: "op-square-root",
    numOperands: 1,
    symbol: " √",
    calc: (a) =>  {
      return Math.sqrt(a);
    }
  },
  {
    id: "op-multiply",
    numOperands: 2,
    symbol: " x ",
    calc: (a, b) => {
      return a * b;
    }
  },
  {
    id: "op-divide",
    numOperands: 2,
    symbol: " / ",
    calc: (a, b) => {
      return a / b;
    }
  },
  {
    id: "op-add",
    numOperands: 2,
    symbol: " + ",
    calc: (a, b) => {
      return a + b;
    }
  },
  {
    id: "op-subtract",
    numOperands: 2,
    symbol: " - ",
    calc: (a, b) => {
      return a - b;
    }
  }
];


getOperator = (opID) => {
  for(let i = 0; i < operators.length; i++) {
    if(operators[i].id === opID) {
      return operators[i];
    }
  }
  return undefined;
}


getOpPrecedence = (opID) => {
  for(let i = 0; i < operators.length; i++) {
    if(operators[i].id === opID) {
      return i;
    }
  }  
  
  return 1000;
}


hasPrecedence = (op1, op2) => {
  if(getOperator(op1) != undefined) {
    return getOpPrecedence(op1) <= getOpPrecedence(op2);
  }
}


let tokenList = [];


let calcHistory = [];


calculate = () => {
  
 
  let valStack = [];
  let opStack = [];
  
  for(let i = 0; i < tokenList.length; i++) {
    if(!isNaN(tokenList[i])) {
      valStack.push(tokenList[i]);
    } else {
      while(opStack.length > 0 && hasPrecedence(opStack[opStack.length - 1], tokenList[i])) {
        let operator = getOperator(opStack.pop());
        if(operator.numOperands === 1){
          valStack.push(applyOperator(operator, [valStack.pop()]));
        } else {
          valStack.push(applyOperator(operator, [valStack.pop(), valStack.pop()]));
        }
      }
      opStack.push(tokenList[i]);
    }
  }
  
  while(opStack.length > 0) {
    let operator = getOperator(opStack.pop());
    if(operator.numOperands === 1){
      valStack.push(applyOperator(operator, [valStack.pop()]));
    } else {
      valStack.push(applyOperator(operator, [valStack.pop(), valStack.pop()]));
    }
  }
  
  
  output(valStack[0], $("#expression").html(), tokenList);
}


applyOperator = (operator, vals) => {
  let valA = vals[0];
  let result;
  
  if(vals.length === 1) {
    result = operator.calc(parseFloat(valA));
  } else {
    let valB = vals[1];
    result = operator.calc(parseFloat(valB), parseFloat(valA));
  }
  return result;
}


deleteLast = () => {
  if(isNaN(tokenList[tokenList.length - 1])) {
    tokenList.pop();
  } else {
    tokenList[tokenList.length - 1] = tokenList[tokenList.length - 1].slice(0, -1);
    if(tokenList[tokenList.length -1].length === 0) {
      tokenList.pop();
    }
  }  
  displayEquation();
}


displayEquation = () => {
  let htmlString = "";
  for(let i = 0; i < tokenList.length; i++) {
    if(isNaN(tokenList[i])) {
        htmlString += getOperator(tokenList[i]).symbol;
    } else {
      htmlString += tokenList[i];
    }
  }
  $("#expression").html(htmlString);
}


addToken = (token) => {
  if(isNaN(token)) {    
    tokenList.push(token);
  } else {
    if(!isNaN(tokenList[tokenList.length - 1])) {
      tokenList[tokenList.length - 1] += token;
    } else {
      tokenList.push(token);
    }
  }
  displayEquation();
}

const roundPlaces = 15;

output = (out, expression, tokens) => {
  out = +out.toFixed(roundPlaces);
  $("#expression").html(out.toString());
  
  calcHistory.push({out: out, expression: expression, tokens: tokens});
  $("#calc-history-box").html("");
  for(let i = calcHistory.length - 1; i >= 0; i--) {
    $("#calc-history-box").append("<p style='color: #b0b0b0; ' class='calc-history-eq' id='eq" + i + "'>" + calcHistory[i].expression + "</p><p style='text-align: right; margin-top: -10px;'>= " + calcHistory[i].out + "</p>");
  }
}

processButton = (button) => {
  switch($(button).attr("id")) {
    case "delete":
      deleteLast();
      break;
    case "clear":
      if(tokenList.length === 0) {
        calcHistory.length = 0;
        $("#calc-history-box").html("");
      } else {
        tokenList.length = 0;
        displayEquation();
      }
      break;
    case "period":
      if(isNaN(tokenList[tokenList.length - 1])) {
        addToken("0.");
      } else {
        if(tokenList[tokenList.length - 1].indexOf(".") === -1) {
          tokenList[tokenList.length - 1] += ".";
        }
      }
      displayEquation();
      break;
    case "equals":
      calculate();
      break;
    default:
      if($(button).hasClass("num")) {
        addToken($(button).html());
      } else {
        addToken($(button).attr("id"));
      }
  }
}