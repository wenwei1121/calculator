const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator-keys')
const display = calculator.querySelector('.calculator-display')

keys.addEventListener('click', e => {
    if(e.target.matches("button")) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displaynum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        if( 
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide' 
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displaynum

            if(firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                calculator.dataset.firstValue = calcValue
            }
            else if(previousKeyType === "clear") {
                display.textContent = firstValue
            }
            else {
                calculator.dataset.firstValue = displaynum
            }

            calculator.dataset.previousKeyType = "operator"
            calculator.dataset.operator = action
        }

        if(action === 'demical') {
            if(!displaynum.includes('.')) {
                display.textContent = displaynum + '.'
            }
            else if(previousKeyType === "operator" || previousKeyType === "calculate") {
                display.textContent = "0."
            }
            calculator.dataset.previousKeyType = "demical"
        }

        if(action === 'clear') {
            if(key.textContent === "ac") {
                calculator.dataset.firstValue = ""
                calculator.dataset.operator = ""
                calculator.dataset.modValue = ""
                calculator.dataset.previousKeyType = ""
            }
            else{
                key.textContent = "ac"
            }

            display.textContent = 0
            calculator.dataset.previousKeyType = "clear"
        }

        if(action !== 'clear') {
            const clearbtn = document.querySelector('[data-action="clear"]')
            clearbtn.textContent = "ce"
        }

        if(action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displaynum

            if(firstValue) {
                if(previousKeyType === "calculate") {
                    firstValue = displaynum
                    secondValue = calculator.dataset.modValue
                }

                display.textContent = calculate(firstValue, operator, secondValue)
            }

            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = "calculate"
        } 

        if(!action) {
            if(displaynum === '0' || previousKeyType === 'operator' || previousKeyType === "calculate") {
                display.textContent = keyContent
            }
            else {
                display.textContent = displaynum + keyContent
            }
            calculator.dataset.previousKeyType = "number"
        }
    }
})

function calculate(firstValue, operator, secondValue) {
    let result = ''

    if(operator === 'add') {
        result = parseFloat(firstValue) + parseFloat(secondValue)
    }
    else if(operator === 'subtract') {
        result = parseFloat(firstValue) - parseFloat(secondValue)
    }
    else if(operator === 'multiply') {
        result = parseFloat(firstValue) * parseFloat(secondValue)
    }
    else if(operator === 'divide') {
        result = parseFloat(firstValue) / parseFloat(secondValue)
    }

    return result
}