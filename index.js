class Calculadora {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.limpar()
    }

    limpar() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    deletar() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    escolherOperador(operador) {

        if (this.currentOperand === '') return

        if (this.previousOperand !== '') {
            this.calcular()
        }

        this.operation = operador
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calcular() {
        let calculo
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return
        
        switch (this.operation) {
            case '+':
                calculo = prev + current
                break;
            case '-':
                calculo = prev - current
                break;
            case '*':
                calculo = prev * current
                break;
            case '/':
                calculo = prev / current
                break;
            default:
                return
        }

        this.currentOperand = calculo
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(intergerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = intergerDigits.toLocaleString('pt-BR', {
                maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
            

        // const floatNumber = parseFloat(number)
        // if(isNaN(floatNumber)) return ''

        // return floatNumber.toLocaleString('en')
    }   

    atualizarVisor() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
             `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
        
    }

}

const botoesNumeros = document.querySelectorAll('[data-numero]')
const botoesOperacao = document.querySelectorAll('[data-operador]')
const botaoIgual = document.querySelector('[data-igual]')
const botaoDelete = document.querySelector('[data-delete]')
const botaoLimpar = document.querySelector('[data-limpar]')
const operandoTextElemento = document.querySelector('[data-operando]')
const calculadoTextElemento = document.querySelector('[data-calculado]')

const calculadora = new Calculadora(operandoTextElemento, calculadoTextElemento)

botoesNumeros.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.appendNumber(botao.innerText)
        calculadora.atualizarVisor()
    })
})

botoesOperacao.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.escolherOperador(botao.innerText)
        calculadora.atualizarVisor()
    })
})

botaoIgual.addEventListener('click', () => {
    calculadora.calcular()
    calculadora.atualizarVisor()
})

botaoLimpar.addEventListener('click', () => {
    calculadora.limpar()
    calculadora.atualizarVisor()
})

botaoDelete.addEventListener('click', () => {
    calculadora.deletar()
    calculadora.atualizarVisor()
})