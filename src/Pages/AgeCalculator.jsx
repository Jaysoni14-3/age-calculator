import { useState } from 'react';

import './AgeCalculator.css'
import MemberCard from './MemberCard';

function AgeCalculator() {

  const [dateValue, setDateValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  
  // const [calculatedAge, setCalculatedAge] = useState("");
  const [calculatedYears, setCalculatedYears] = useState("");
  const [calculatedMonths, setCalculatedMonths] = useState("");
  const [calculatedDays, setCalculatedDays] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  
  var userName;
  var userBirthDate;
  const today = new Date();

  //! Issue if no array found it throws an json error 
  // Todo: check if no array found in LS delete "members_list" array from LS


  // If localstorage has data then pass the array to membersList or create an empty array
  var membersList = JSON.parse(localStorage.getItem("members_list")) || [];

  // Adds user to members array
  const submitUser = () => {
  
    userName = document.getElementById("userName").value;
    userBirthDate = document.getElementById("userBirthDate").value;

    if(userName === "" || userName === null){
      alert("Please enter Name of the person you want to add");
    }else if(userBirthDate === ""){
      alert("Please enter a valid date")
    }else{
      var submitBirthdate = new Date(userBirthDate);
      const diffTime = Math.abs(today - submitBirthdate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      const userYears = Math.floor(diffDays / 365);
      const userMonths = Math.floor(diffDays % 365 / 30);
      const userDays = Math.floor(diffDays % 365 % 30);

      var idNum = membersList.length;
     
      var member = { id: idNum, userName: userName, userBirthDate: userBirthDate, userYears: userYears, userMonths: userMonths, userDays: userDays}

      membersList.push(member);
      localStorage.setItem("members_list", JSON.stringify(membersList));
      alert(userName + " Added to list");
      setShowModal(false);

    }
  }

  // method to remove user
  const removeUser = (event) => {
    // alert("Remove");
    var removeId = event.target.parentNode.parentNode.getAttribute("id");
    var removeMemberName = membersList.find((member) => member.id == removeId);
    removeMemberName = removeMemberName.userName;
    var confirmMsg = confirm(`Do you want to remove ${removeMemberName} ?\n this cannot be undone`);
    if(confirmMsg){
      membersList = membersList.filter((member) => member.id != removeId);
      localStorage.setItem("members_list", JSON.stringify(membersList));
      window.location.reload();
    }else{
      return
    }
  }

  // Gets total number of days from subtracting time now by birthdate then dividing it by (1000 * 60 * 60 * 24)
  const calculateAge = () => {

    const today = new Date();
    var submitBirthdate = new Date(`${yearValue}-${monthValue}-${dateValue}`);

    const diffTime = Math.abs(today - submitBirthdate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    getFormatedStringFromDays(diffDays);
  }

  // Get years months and days by total number of days
  function getFormatedStringFromDays(numberOfDays) {
    setCalculatedYears(Math.floor(numberOfDays / 365));
    setCalculatedMonths(Math.floor(numberOfDays % 365 / 30));
    setCalculatedDays(Math.floor(numberOfDays % 365 % 30));
  }

  // Clears form 
  const resetForm = () => {
    setDateValue("");
    setMonthValue("");
    setYearValue("");
    setCalculatedYears("");
    setCalculatedMonths("");
    setCalculatedDays("");
  }

  // Show and hide modal
  const modalToggle = () => {
    setShowModal((currentValue) => !currentValue)
  }

  return (
    <div className='age-calculator'>
      <a href="/" className='go-back'><span>🡐</span> Homepage</a>
      <section className='wrapper'>
      
        <div className='age-app'>

          {/* App logo and a button to add a member */}
          <div className="app-header">
            <h2>Age Calculator</h2>
            <button className='btn addMemberBtn' onClick={modalToggle}>Add Member</button>
          </div>

          {/* Input field container */}
          <div className="app-body">
              <span className="container-header">Date of Birth</span>
              <div className="container-body">
                <div className="input-container">
                  <input type="number" placeholder='Date' value={dateValue} className='dateValue' onChange={(e)=> setDateValue(e.target.value)}  />
                </div>
                <div className="input-container">
                  <input type="number" placeholder='Month' value={monthValue} className='monthValue' onChange={(e)=> setMonthValue(e.target.value)}  />
                </div>
                <div className="input-container">
                  <input type="number" placeholder='Year' value={yearValue} className='yearValue' onChange={(e)=> setYearValue(e.target.value)}  />
                </div>
              </div>
            </div>

          {/* Button container */}
          <div className="app-footer">
            <div className="btn-container">
              {dateValue || monthValue || yearValue ? <button className='btn resetBtn' onClick={resetForm}>Reset</button> : ""}
              <button className='btn submitBtn' onClick={calculateAge}>Calculate</button>
            </div>
          </div>

          {/* Displays your age */}
          <div className="app-results">
            <div className="results">
              <article className="result-article year-container">
                <h3>{calculatedYears ? calculatedYears : "0"} </h3><span>Years</span>
              </article>
              <article className="result-article month-container">
                <h3>{calculatedMonths ? calculatedMonths : "0"} </h3><span>Months</span>
              </article>
              <article className="result-article year-container">
                <h3>{calculatedDays ? calculatedDays : "0"} </h3><span>Days old</span>
              </article>
            </div>
          </div> 

        </div>

        {/* Display members if any */}
        <div className='members-wrapper'>
          {/* Adds member card */}
          {membersList?.map((member, id) => (
            <MemberCard 
              key={id} 
              id={member?.id}
              clickEvent={removeUser}
              username={member?.userName} 
              userYears={member?.userYears}
              userMonths={member?.userMonths}
              userDays={member?.userDays}
            />
          ))}
        </div>

      </section>

      {/* Add Member Modal */}
      {showModal && 
        <div className={`modal-wrapper ${showModal ? "modalActive" : ""}`}>
          <modal className="modal">
            <div className="modal-header">
              <h2>Add member</h2>
              <button className='btn addMemberBtn' onClick={modalToggle}>Close</button>
            </div>
            <div className="modal-body">
              <div className="modal-input-container">
                <input type="text" placeholder='Name' id='userName' />
              </div>
              <div className="modal-input-container">
                <input type="date" placeholder='Birth Date' id='userBirthDate' />
              </div>
            </div>
            <div className="modal-footer">
              <button className='btn submitUserBtn' onClick={submitUser}>Add</button>
            </div>
          </modal>
        </div>
      }
    
    </div>
  )
}

export default AgeCalculator;
