class Calculator{
    constructor(prevOpTxtEl, currOpTxtEl){
        this.prevOpTxtEl = prevOpTxtEl
        this.currOpTxtEl = currOpTxtEl
        this.clear()
    }
    // function to clear the entire output screen
    clear(){
        this.currOp = ''
        this.prevOp = ''
        this.operation = undefined 
    }
    // funstion to delete one digit from the entered number
    delete(){
        this.currOp = this.currOp.toString().slice(0,-1)
    }
    // function to append the numbers clicked by the user
    appendNum(number){
        if(number === '.' && this.currOp.includes('.')) return
        this.currOp = this.currOp.toString() + number.toString()
    }
    //function to choose the operation on the button clicked by the user
    chooseOperation(operation){
        if(this.currOp === '')return
        if(this.prevOp !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOp = this.currOp
        this.currOp = ''
    }
    // function to perform the actual calculation
    compute(){
        let computation
        const prev = parseFloat(this.prevOp)
        const curr = parseFloat(this.currOp)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case 'x':
                computation = prev * curr
                break
            case '/':
                computation = prev / curr
                break
            default:
                return
        }
        this.currOp = computation
        this.operation = undefined
        this.prevOp = ''
    }
    // function to get the number displayed on the output screen of calculator
    getDispNum(number){
        const stringNum = number.toString()
        const integerDigs = parseFloat(stringNum.split('.')[0])
        const decimalDigs = stringNum.split('.')[1]
        let integerDisp
        if(isNaN(integerDigs)){
            integerDisp = ''
        }
        else{
            integerDisp = integerDigs.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigs != null){
            return `${integerDisp}.${decimalDigs}`
        }
        else{
            return integerDisp
        }    
    }
    //this is a function which updates the display of the calculator
    updateDisp(){
        this.currOpTxtEl.innerText = this.getDispNum(this.currOp)
        if(this.operation != null){
            this.prevOpTxtEl.innerText = `${ this.getDispNum(this.prevOp)} ${this.operation}`
        }
        else{
            this.prevOpTxtEl.innerText = ''
        }
    }
}

const numB = document.querySelectorAll('[data-number]')
const operationB = document.querySelectorAll('[data-operation]')
const equalsB = document.querySelector('[data-equals]')
const deleteB = document.querySelector('[data-delete]')
const AllCB = document.querySelector('[data-all-clear]')
const prevOpTxtEl = document.querySelector('[data-prev-operand]')
const currOpTxtEl = document.querySelector('[data-curr-operand]')
// Calculator class object
const calculator = new Calculator(prevOpTxtEl, currOpTxtEl)
//on clicking any buttons with numbers the following function is executed
numB.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNum(button.innerText)
        calculator.updateDisp()
    })
})
//on clicking any buttons with operations the following function is executed
operationB.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisp()
    })
})
//on clicking the '=' button the following function is executed
equalsB.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisp()
})
//on clicking the 'AC' button the following function is executed
AllCB.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisp()
})
//on clicking the 'delete' button the following function is executed
deleteB.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisp()
})