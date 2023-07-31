import { useState } from "react"
import "./BmiCalculator.css"

export default function BmiCalculator() {

    const [userFeetHeight, setUserFeetHeight] = useState("");
    const [userInchHeight, setUserInchHeight] = useState("");
    const [userWeight, setUserWeight] = useState("");
    const [userBMI, setUserBMI] = useState("");

    var bmiMessage;
    var bmi_message_style;

    const calculateBMI = () => {
        if(userInchHeight == ""){
            setUserInchHeight(0)
        }
        if(userFeetHeight && userWeight){
            // combines userFeetHeight + userInchHeight
            const combinedHeight = userFeetHeight + '.' + userInchHeight;
            // Convert the given height into meters 
            const heightInMeters = combinedHeight / 3.281;

            // Formula to calculate BMI (weight / (height)square)
            const BMI = userWeight / (heightInMeters.toFixed(2) * heightInMeters.toFixed(2));
            setUserBMI(BMI.toFixed(2));
        }else{
            alert("Please provide required details so that we can give you your Body Mass Index")
        }

    }

    // Underweight - BMI less than 18.5
    // Normal healthy weight - BMI between 18.5 and 24.9
    // Overweight - BMI between 25.0 and 29.9
    // Obese - BMI between 30.0 and 39.9
    // Morbidly obese – BMI 40.0 and above

    if(userBMI < 18.5){
        bmiMessage = "Underweight";
        bmi_message_style = "yellow"
    }else if(userBMI >= 18.5 && userBMI < 24.9){
        bmiMessage = "Normal";
        bmi_message_style = "green"
    }else if(userBMI >= 25.0 && userBMI < 29.9){
        bmiMessage = "Overweight";
        bmi_message_style = "orange"
    }else if(userBMI >= 30.0){
        bmiMessage = "Obese";
        bmi_message_style = "red"
    }else if(userBMI == isNaN(userBMI)){
        bmiMessage = "";
        bmi_message_style = "";
    }
    
    const resetForm = () => {
        setUserFeetHeight("")
        setUserInchHeight("")
        setUserWeight("")
    }

    
    return (
        <div className="bmi-calculator">
            <div className="bmi-wrapper">
            <a href="/" className='go-back'><span>🡐</span> Homepage</a>
    
                <div className='bmi-app'>

                    <div className="bmi-app-header">
                        <h2>BMI Calculator</h2>
                    </div>

                    <div className="bmi-app-body">
                        <div className="weight-height-container">
                            <div className="height-container">
                                <label htmlFor="height">Height (in feets)</label>
                                <div>
                                    <input 
                                        id="height" 
                                        className="height-input" 
                                        placeholder="feets" 
                                        type="number" 
                                        min='0'
                                        value={userFeetHeight} 
                                        onChange={(e) => setUserFeetHeight(e.target.value)}
                                    />
                                
                                    <input 
                                        type="number" 
                                        className="height-input" 
                                        placeholder="inches" 
                                        min='0'
                                        value={userInchHeight} 
                                        onChange={(e) => setUserInchHeight(e.target.value)}
                                    />
                                
                                </div>
                            </div>
                            <div className="weight-container">
                                <label htmlFor="weight">Weight (in kgs)</label>
                                <div>
                                    <input 
                                        id="weight" 
                                        className="weight-input" 
                                        type="number" 
                                        placeholder="weight"
                                        min='0'
                                        value={userWeight}
                                        onChange={(e) => setUserWeight(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bmi-app-footer">
                        <div className="btn-container">
                        {/* if(userFeetHeight && userWeight) */}
                            {userFeetHeight || userWeight ? <button className='btn resetBtn' onClick={resetForm}>Reset</button> : ""}
                            <button className='btn submitBtn' onClick={calculateBMI}>Calculate</button>
                        </div>
                    </div>

                </div>

                {userBMI && 
                    <div className="bmi-app-results">
                        <p>Your BMI is</p>
                        <h2>{userBMI} kg/m<sup>2</sup></h2>
                        <span className={bmi_message_style}>{bmiMessage}</span>
                    </div> 
                }


            </div>
        </div>
    )
}

