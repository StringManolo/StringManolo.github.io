import * as std from "std";

let code = std.loadFile("codeExample.tain");


// Each Line Is An Expression
let getExpressions = code => {
  if (new RegExp("\n").test(code)) {
    return code.split("\n");
  } return code;
}

// Remove Leading And Trailing Spaces From Each Line
let getTrimmedExpressions = expressions => {
  let trimmedExpressions = [];
  for(let i in expressions) {
    trimmedExpressions.push(expressions[i].trim());
  }
  return trimmedExpressions;
}

// Lines Starting By T that are not Tain, are evaluableExpresssions
let getEvaluableExpressions = expressions => {
  let evaluableExpressions = [];

  for(let i = 0; i < expressions.length; ++i) {
    expressions[i] = expressions[i];
    if (/^t/i.test(expressions[i]) && !/^tain/i.test(expressions[i])) {
      if (/\[/g.test(expressions[i])) {
        evaluableExpressions.push( { expression: expressions[i].split(" ")[0].trim(), contained: expressions[i].split(" ").splice(0,2)[1]});
      } 
    }
  }
  return evaluableExpressions;
}

// Lines Starting By Tain Are Container Definitions
let getDefinitions = expressions => {
  let definitions = [];
  for(let i = 0; i < expressions.length; ++i) {
    if (/^tain/i.test(expressions[i])) {
      definitions.push(expressions[i]);
      definitions.push(expressions[++i]);
    }
  }
  return definitions;
}

// Map object and keys
let serialiceDefinitions = definitions => {
  let root = {};
  for (let i = 0; i < definitions.length; i+=2) {
    let values = definitions[+i + 1].split("[")[1].split("]")[0].split("|");
    let ids = definitions[i].split("[")[1].split("]")[0].split("|");

    for (let i in values) {
      values[i] = evaluateValueExpression(values[i].trim());
    }

    for (let i in ids) {
      ids[i] = ids[i].trim();
    }

    root[definitions[i].split(" ")[1]] = {ids: ids, values:  values};
  }

  return root;
}



// Evaluate Value Expression
let evaluateValueExpression = valueExpression => {
  valueExpression = valueExpression.trim();
  let isFunction = expression => {
    if (expression[0] == "<") {
      return 1;
    } 
  }

  let isOperation = expression => {
    for(let i in expression) {
      switch(expression[i]) {
        case "+": case "-": case "*": case "/": case "%":
          return 1;
      }
    }
  }

  let value;
    // detect if operator, function or value
  if (isFunction(valueExpression)) {
    return valueExpression;
  } else if (isOperation(valueExpression)) {
    return eval(valueExpression);
  } else {
    return valueExpression;
  }



  return value;
}





let expr = getExpressions(code);

let trimmedExpr = getTrimmedExpressions(expr);

let definitions = getDefinitions(trimmedExpr);

let evaluableExpressions = getEvaluableExpressions(trimmedExpr);

let serialicedDef = serialiceDefinitions(definitions);

console.log(`Parsing Tain:
EXPRESSIONS: ${expr}


TRIMMED: ${trimmedExpr}


DEFINITIONS: ${definitions}


EVALUABLE: ${JSON.stringify(evaluableExpressions)}


SERIALICED: ${JSON.stringify(serialicedDef)}
`);
