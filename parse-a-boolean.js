/* const ops = {
  t: true,
  f: false,
  true: "t",
  false: "f"
};

function not([operation]) {
  return !ops[operation];
}

function or(operations, res = false) {
  if (res || !operations.length) {
    return res;
  }
  res = res | ops[operations.pop()];
  return !!or(operations, res);
}

function and(operations, res = true) {
  if (!res) {
    return res;
  } else if (res && !operations.length) {
    return res;
  }
  res = res & ops[operations.pop()];
  return !!and(operations, res);
} */

function resolveExp(exp) {
  //   const fn = exp[0];
  //   const operations = exp.slice(2, exp.length - 1).split(",");
  //   switch (fn) {
  switch (exp[0]) {
    case "!":
      //   return not(operations);
      return exp.indexOf("f") > -1;
    case "|":
      //   return or(operations);
      return exp.indexOf("t") > -1;
    case "&":
      //   return and(operations);
      return exp.indexOf("f") === -1;
  }
}

function parseBoolExpr(exp) {
  let openPar = exp.indexOf("(");
  let closePar = exp.indexOf(")");
  for (;;) {
    const c = exp.indexOf("(", openPar + 1);
    if (c !== -1 && c < closePar) {
      openPar = c;
      continue;
    } else if (c === -1 || c > closePar) {
      break;
    }
  }
  openPar--;
  closePar++;
  const expersion = exp.slice(openPar, closePar);
  const last = expersion === exp;
  const v = resolveExp(expersion);
  if (last) return v;
  // return parseBoolExpr(exp.slice(0, openPar) + ops[v] + exp.slice(closePar));
  return parseBoolExpr(exp.slice(0, openPar) + v + exp.slice(closePar));
}
