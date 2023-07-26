import { useState } from 'react';
import './App.css'

function App() {

  const [birthDate, setBirthDate] = useState(0);
  const [dateValue, setDateValue] = useState(0);
  const [monthValue, setMonthValue] = useState(0);
  const [yearValue, setYearValue] = useState(0);

  const validateDateChange = event =>{
    const datevalue = Math.max(1, Math.min(31, Number(event.target.value)))
    setDateValue(datevalue);
  }

  const validateMonthChange = event =>{
    const monthvalue = Math.max(1, Math.min(12, Number(event.target.value)))
    setMonthValue(monthvalue);
  }

  const validateYearChange = event =>{
    const yearvalue = Number(event.target.value);
    setYearValue(yearvalue);
  }

  const submitForm = () => {
    var submitBirthdate = new Date(monthValue+'/'+dateValue+'/'+yearValue);
    setBirthDate(submitBirthdate);
  }

  // const resetForm = () => {
  //   setDateValue(0);
  //   setMonthValue(0);
  //   setYearValue(0);
  // }
  
  const today = new Date();
  // const todaysDate = today.toDateString();
  const diffTime = Math.abs(today - birthDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  const calculatedAge = getFormatedStringFromDays(diffDays);

  function getFormatedStringFromDays(numberOfDays) {
    var years = Math.floor(numberOfDays / 365);
    var months = Math.floor(numberOfDays % 365 / 30);
    var days = Math.floor(numberOfDays % 365 % 30);

    years = years + " years";
    months = months + " months";
    days = days + " days";

    return [years, months, days].join(' ');
  }

  return (
    <section className='wrapper'>
      <div className='age-app'>
        <div className="app-header">
          <h2>Age Calculator</h2>
        </div>

        <div className="app-body">
          <div className='container'>
            <span className="container-header">Date of Birth</span>
            <div className="container-body">
              <div className="input-container">
                <input type="number" placeholder='Date' className='dateValue' onChange={validateDateChange} />
              </div>
              <div className="input-container">
                <input type="number" placeholder='Month' className='monthValue' onChange={validateMonthChange} />
              </div>
              <div className="input-container">
                <input type="number" placeholder='Year' className='yearValue' onChange={validateYearChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="app-footer">
          <div className="btn-container">
            {/* <button className='btn resetBtn' onClick={resetForm}>Reset</button> */}
            <button className='btn submitBtn' onClick={() => submitForm()}>Calculate</button>
          </div>
        </div>

        <div className="app-results">
          <div className="results">
            <h3>You are {calculatedAge} old</h3>
          </div>
        </div>
     
      </div>
    </section>
  )
}

export default App
