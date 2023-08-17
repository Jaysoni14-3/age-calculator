import { useReducer } from "react"
import "./Calculator.css"
import DigitButton from "../Components/DigitButton"
import OperationButton from "../Components/OperationButton"

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) {
    switch (type){
        // Add digits you want to calculate with
        case ACTIONS.ADD_DIGIT:
            if(state.overwrite){
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false,
                }
            }
            // only allow single 0 at the start 
            if(payload.digit === "0" && state.currentOperand === "0"){
                return state;
            }

            // Only allow single decimal (.) in the currentOperand
            if(payload.digit === "." && state.currentOperand?.includes(".")){
                return state;
            }

            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
        }
        // Choose an operation (Multiply, divide, add, sub)
        case ACTIONS.CHOOSE_OPERATION:
            // If nothing is selected 
            if(state.currentOperand == null && state.previousOperand == null ){
                return state
            }
            if(state.currentOperand == null) {
                return{
                    ...state,
                    operation: payload.operation,
                }
            }
            // when the operand is selected make it as previous operand 
            if(state.previousOperand == null){
                return{
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
        }
        // Clear all
        case ACTIONS.CLEAR: return {}
        // Delete last digit 
        case ACTIONS.DELETE_DIGIT:
            if(state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null,
                }
            }
            // If nothing to delete return state
            if(state.currentOperand == null) return state;
            if(state.currentOperand.length === 1) {
                return{...state, currentOperand: null}
            }

            // Removes only the last digit
            return{
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
        }
        // When equals to button is clicked
        case ACTIONS.EVALUATE: 
            if(state.operation == null || state.currentOperand == null || state.previousOperand == null){
                return state
            }

            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
        }
    }

}

// Gets the calculation based on currentOperand previousOperand and operation
function evaluate({ currentOperand, previousOperand, operation }){
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(current)) return "";
    let computation = "";

    switch(operation) {
        case "+":
            computation = prev + current 
            break;
        case "-":
            computation = prev - current 
            break;
        case "*":
            computation = prev * current 
            break;
        case "÷":
            computation = prev / current 
            break;
    }

    return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
});

function formatOperand(operand){
    if(operand == null) return;
    // Seperating the operand if decimal found
    const [integer, decimal] = operand.split(".");

    // if no decimal found just run the function
    if(decimal == null) return INTEGER_FORMATTER.format(integer);

    // if decimal found then do not format the decimal values 
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

export default function Calculator () {

    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

    return(
        <>
            <div className="calculator">
                <div className="calculator-wrapper">
                <a href="/" className='go-back'><span>🡐</span> Homepage</a>
        
                    <div className='calculator-app'>
                        <div className="calculator-app-header">
                            <h2>Calculator</h2>
                        </div>
                        <div className="calculator-app-body">
                            <div className="output">
                                <div className="previous-operand">
                                    {formatOperand(previousOperand)} {operation}
                                </div>
                                <div className="current-operand">
                                    {formatOperand(currentOperand)}
                                </div>
                            </div>
                            <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>Clear</button>
                            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>Del</button>
                            <OperationButton operation="÷" dispatch={dispatch} /> 
                            <DigitButton digit="1" dispatch={dispatch} />
                            <DigitButton digit="2" dispatch={dispatch} />
                            <DigitButton digit="3" dispatch={dispatch} />
                            <OperationButton operation="*" dispatch={dispatch} />
                            <DigitButton digit="4" dispatch={dispatch} />
                            <DigitButton digit="5" dispatch={dispatch} />
                            <DigitButton digit="6" dispatch={dispatch} />
                            <OperationButton operation="+" dispatch={dispatch} />
                            <DigitButton digit="7" dispatch={dispatch} />
                            <DigitButton digit="8" dispatch={dispatch} />
                            <DigitButton digit="9" dispatch={dispatch} />
                            <OperationButton operation="-" dispatch={dispatch} />
                            <DigitButton digit="." dispatch={dispatch} />
                            <DigitButton digit="0" dispatch={dispatch} />
                            <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className="span-two">=</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}