let display = document.querySelector(".calculator__display")
let equals = document.querySelector(".calculator__button--result")
const cleaner = document.querySelector(".calculator__button--clean")
let displayContent = ""
let buttons = document.querySelectorAll(".calculator__button")


buttons.forEach(button => button.onclick = function () {
    let buttonValue = button.textContent
    display.innerHTML += buttonValue
    displayContent = display.textContent
})

function stringParser(displayContent) {
    let calculation = []
    let hooks = []
    let resultInHooks = 0
    calcHooks = displayContent.split(/([(,)])/)
    console.log(calcHooks);

    for (let i = 0; i < calcHooks.length - 1; i++) {
        if (calcHooks[i] === "(") {
            hooks.push(calcHooks[i + 1])
            resultInHooks = String(priorityCalc(hooks))
            calcHooks.splice(i, i + 2, resultInHooks)
            console.log(hooks)
            console.log(resultInHooks);
            hooks = []
        }
    }
    calcHooks = calcHooks.join("")
    console.log(calcHooks);

    calculation = calcHooks.split(/([+, -])/)
    if (calculation[0] === "-") {
        calculation.unshift("0")
    }
    const stack = calculation.filter(token => {
        return token.includes("*") || token.includes("/") || token.includes("√") || token.includes("^") 
    })

    return [stack, calculation];
};


function priorityCalc(stack) {
    let interimResults = []

    for (token of stack) {
        let result = 0
        let n1 = null
        let n2 = 0
        let op = ""
        let digitalNumbers = ""

        for (char of token) {
            if (isNaN(char) === false) {
                digitalNumbers += char
                if (op === "√") {
                    result = Math.sqrt(+digitalNumbers)
                }
                else if (n1 != null) {
                    n2 = +digitalNumbers
                    result = calc(n1, n2, op)
                    digitalNumbers = result
                }
            } else {
                op = char
                n1 = +digitalNumbers
                digitalNumbers = ""
            }
        }

        interimResults.push(result)
        interimResults = interimResults.filter(char => char !== undefined)
    }
    return interimResults
}

function secondaryCalc(calculation) {
    let result = 0
    let n1 = null
    let n2 = 0
    let op = ""
    for (token of calculation) {
        if (isNaN(token) === false) {
            if (n1 != null) {
                n2 = +token
                result = calc(n1, n2, op)
                n1 = result
            } else {
                n1 = +token
            }
        } else {
            op = token
        }
    }

    return result;
}


equals.onclick = () => {
    const [stack, calculation] = stringParser(displayContent)
    console.log(calculation);
    console.log(stack);
    // console.log(powStack)

    const interimResults = priorityCalc(stack)
    console.log(interimResults);
    calculation.forEach(function (token, i) {
        if (token.includes("*") === true || token.includes("/") === true ||
            token.includes("^") === true || token.includes("√") === true)
            calculation[i] = interimResults.shift();
    });
    console.log(calculation);

    let result = 0
    if (calculation.length > 1) {
        result = secondaryCalc(calculation)
    } else {
        result = calculation
    }

    console.log(result);

    display.innerHTML = result
}

function calc(n1, n2, op) {
    switch (op) {
        case '+':
            return n1 + n2;
        case '-':
            return n1 - n2;
        case '*':
            return n1 * n2;
        case '/':
            return n1 / n2;
        case '^':
            return Math.pow(n1, n2)
    };
}

cleaner.onclick = () => {
    display.innerHTML = ""
}


// я тупая я тупая я тупая я тупая я тупая я тупая я тупая я тупая