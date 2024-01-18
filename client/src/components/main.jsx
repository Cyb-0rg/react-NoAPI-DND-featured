import ".././App.css";
import noapi from 'no-api'

import { useState, useEffect } from "react";
import Axios from "axios"; //no longer needed

import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PulseLoader from "react-spinners/PulseLoader";

import { useSpring, animated } from 'react-spring';


function Main() {


  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [status, setStatus] = useState("");


  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const [newWage, setNewWage] = useState(0);
  const [newName, setNewName] = useState("");

  

  const [employeeList, setEmployeeList] = useState([]);

  const [studentList, setStudentList] = useState();



  const [nameErr, setNameErr] = useState();
  const [positionErr, setPositionErr] = useState(true);
  const [ageErr, setAgeErr] = useState(true);
  const [wageErr, setWageErr] = useState(true);
  const [countryErr, setCountryErr] = useState(true);
  const [loginErr, setLoginErr] = useState("");

  const [showEmployees, setshowEmployees] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [openAnalysis, setOpenAnalysis] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(true);


  const [isValid, setIsValid] = useState(true);

  
  const [studentsList2, setStudentsList] = useState([]);
  const [list_of_students, setList_of_students] = useState([]);

  const [isDragging, setIsDragging] = useState();
  const [draggedIndex, setDraggedIndex] = useState(null);


  useEffect(() => {
    async function fetchData() {
      console.log("list of students:" + list_of_students)
      var  start = await new noapi.datastore('latest-Datastore');
      var list_of_schools = await start.schools;
      var school = list_of_schools.first();
      var list_of_students = await school.students;
      setList_of_students(list_of_students);
      console.log("list of students:" + await list_of_students)
    }
    fetchData();
  }, []);

  const async_get_students = async function() {
//     var start =  await new noapi.datastore("ibrahim_ds")
 
 
//  //  to the items in the list.
//  var list_of_schools = await start.schools
//  var school =   list_of_schools.first()
//  var list_of_students = await school.students
 
 var studentsList = []
 // Iterate through the list of students
 for (let student of list_of_students) {
   let studentInfo = {
     name: await student.name,
     age: await student.age,
     status: await student.status,
     student_link :  student,

   };
   studentsList.push(studentInfo);
   //console.log(`${studentInfo.name}, ${studentInfo.age}, ${studentInfo.status}`);
 }

  setStudentsList(studentsList)
  no_api_getEmployees(studentsList2)
 
 }

 const async_create_student = async function() {

    //create a new object here 
    try {
      // create a new object here
      var new_student = await list_of_students.create();
      await new_student.set("name", name);
      await new_student.set("age", age);
      await new_student.set("status", status ) ;

    } catch (error) {
      console.error("An error occurred:", error);
    } 

}

 const async_update_name = async function(student_link, new_name) {
  
  new_name !== "" ? successToast() || await student_link.set("name", new_name) : "do nothing" || console.log("error updating name")
}

//async_update_name()

  const validateHandleSub = () => { 

     if (name === "") {
        setNameErr("name is required");
        setIsValid(false);
         return false;
     } 

     
     if (age <15 ) {
      setAgeErr("age must be greater than 14");
      setIsValid(false);
       return false;
    }

    if (position === "") {
      //setPositionErr("position is required");
      setIsValid(true);
       return true;
    }

    if (country === "") {
      //setCountryErr("country is required");
      setIsValid(true);
       return true;
    }

    if (wage <8) {
      //setWageErr("minimum score must be greater than 8");
      setIsValid(true);
       return true;
    }


     
    //toast('SUCCESSFULLY ADDED', {position: toast.POSITION.TOP_LEFT} )
    
      
      setIsValid(true);
      setNameErr("");
      setPositionErr("");
      setAgeErr("");
      setCountryErr("");
      setWageErr("");

      //maybe here?

      
      return true;
     

  }


  const handleSub = () => { 

      validateHandleSub() ? successToast() || add_student_noapi() || console.log("valid submission") : errorToast() || console.log("invalid submission")
 
  }


  const userAuth_login = () => { 

    password === '1234' && userName === 'admin' ? setIsLoggedin(true) || setLoginErr("") : setIsLoggedin(false) || setLoginErr("invalid login credenials!") ;

    setTimeout (() => {
      setIsLoadingLogin(false);
    }, 2500)

    setIsLoadingLogin(true)
    setShowForm(false)
    setshowEmployees(false)
  }

  const logout = () => {
    setPassword("")
    setUserName("")
    setIsLoggedin(false)
  }

  const forgetPassword = ()  => {
    //console.log("I am not ready yet")
  }


  const add_student_noapi = () => {


    async_create_student()

  };


  const addEmployee = () => {
    Axios.post("http://localhost:5005/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {

      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          status: status,
        },
      ]);


    });
  };

  //change of order ??

  const getEmployees = () => {

    setShowForm(false)
    setTimeout (() => {
      setIsLoading(false);
      !showEmployees && messageToast();
    }, 3000)

    
    setshowEmployees(!showEmployees); //opens and closes the employees listing
    setIsLoading(true)

    Axios.get("http://localhost:5005/employees-noapi").then((response) => {
      setEmployeeList(response.data);
      console.log(response.data);
    });


  };


  const no_api_getEmployees = (studentsList) => {

    setShowForm(false)

    //while is list_of_students not loaded yet, keep loading
    while(false){
      console.log()

    }

    setTimeout (() => {
      setIsLoading(false);
      !showEmployees && messageToast();
    }, 0)
    setshowEmployees(!showEmployees); //opens and closes the employees listing
    setIsLoading(true)

    setEmployeeList(studentsList);

  };

  const deleteEmployee = (id) => {
    deleteSuccessToast();
    Axios.delete(`http://localhost:5005/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };


  const successToast = () => {
    toast.success("successfully added", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  const errorToast = () => {
    toast.error("invalid attempt !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;


  const messageToast = () => {
    toast.info("scroll down to see the list", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  const deleteSuccessToast = () => {
    toast.error("employee deleted", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;


  const reorderEmployees = (startIndex, endIndex) => {
    const newEmployees = Array.from(employeeList);
    const [draggedEmployee] = newEmployees.splice(startIndex, 1);
    newEmployees.splice(endIndex, 0, draggedEmployee);

    // Update the state with the new order of students
    setEmployeeList(newEmployees);
  };

  return (

    <div className="App-main">

    <>
      <ToastContainer/>
    </>

{


isLoggedIn  ? 

showForm ? 

<div className="information">
    <label>Name:</label>
    <input
      type="text"
      onChange={(event) => {
        setName(event.target.value);
      }}
    />
   
          <div className="errorMessege">
            <p> {nameErr}</p>
          </div>
        

    <label>Age:</label>
    <input
      type="number"
      onChange={(event) => {
        setAge(event.target.value);
      }}
    />

          <div className="errorMessege">
            <p> {ageErr}</p>
          </div>


    <label>Status:</label>
    <input
      type="text"
      onChange={(event) => {
        setStatus(event.target.value);
      }}
    />

          <div className="errorMessege">
            <p> {positionErr}</p>
          </div>



    

    <button className={ isValid ? "successButton" : "invalidButton"}  onClick={ handleSub }>Save</button>
    <button onClick={()=>{setShowForm(!showForm)}}> { !showForm ? "Add Student" : "Close Form"}</button>
    <button onClick={async_get_students}> { !showEmployees ? "Show Student" : "Close Student"}</button>
    <button onClick={logout}> { "Logout"}</button>

</div>

:

!isLoadingLogin?

<div className="information">

{
   !openAnalysis ?
   <>
  <button onClick={()=>{setShowForm(!showForm); setshowEmployees(false)}}> { !showForm ? "Add Student" : "Close Form"}</button>
  <button onClick={async_get_students}> { !showEmployees ? "Show Student" : "Close Student"}</button>
  <button onClick={logout}> { "Logout"}</button>
  </> 
  :
  ""  
}
  
  <button onClick={()=>{setOpenAnalysis(!openAnalysis); setshowEmployees(false)}}> {!openAnalysis ? "See analysis" : "close analysis"}</button>


</div>  

:

<PulseLoader
  color="#000"
  cssOverride={{paddingTop:50}}
  loading
  size={14}
  speedMultiplier={1}
/>

:

  
<div className="information">
  
        <h1>LOGIN</h1>
        <label>UserName:</label>
        <input
          type="text"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />

        
              <div className="errorMessege">
                <p> {nameErr}</p>
              </div>
            

        <label>password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

              <div className="errorMessege">
                <p> {nameErr}</p>
                <p> {loginErr}</p>
              </div>
                       

        <button className={ isValid ? "successButton" : "invalidButton"}  onClick={ userAuth_login  }>LOGIN</button>
        <button onClick={forgetPassword()}>"FORGET PASSWORD"</button>
        

</div>  


}


{
    isLoggedIn ?

    showEmployees ? 

    !isLoading ?


    <div className="employees">
    {

      employeeList.map((student, index) => {

      
      return (   
        <div className={`employee ${isDragging ? 'dragging' : ''}`}
              key={student.student_link}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', index);
                setIsDragging(true); // Set a state to indicate that dragging has started
              }}
              onDragOver={(e) => {
                e.preventDefault();
                const overIndex = index;
                if (overIndex !== draggedIndex) {
                  const newEmployeeList = [...employeeList];
                  const [draggedEmployee] = newEmployeeList.splice(draggedIndex, 1);
                  newEmployeeList.splice(overIndex, 0, draggedEmployee);
                  setEmployeeList(newEmployeeList);
                  setDraggedIndex(overIndex);
                }
              }}
              onDragEnd={() => {
                setIsDragging(false); // Set a state to indicate that dragging has ended
              }}
              onDrop={(e) => {
                e.preventDefault();
                const startIndex = Number(e.dataTransfer.getData('text/plain'));
                const endIndex = index;
                reorderEmployees(startIndex, endIndex);
                setIsDragging(false); // Set a state to indicate that dragging has ended
              }}

              style={{
                backgroundColor: draggedIndex === index ? '#adadad' : '', // Apply background color conditionally
              }}
            >


            <div>
              <h3>Name: {student.name} </h3>
              <h3>Age: {student.age}</h3>
              <h3>Status: {student.status}</h3>
              <h3>link: {typeof student.student_link}</h3>
            </div>
          <div>



            <input
              type="text"
              placeholder="new name"
              onChange={(event) => {
                //setNewWage(event.target.value);
                setNewName(event.target.value);
                
              }}
            />


            <button
              onClick={() => {
                //no api update here
                async_update_name(student.student_link, newName)
                //console.log(`async_update_name(student.student_link, ${newName})`)

              }}
            >
              {"Update"}
              
            </button>

            <button className="deleteButton"
              onClick={() => {
                deleteEmployee(student.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    })}
    </div>

    :

    <PulseLoader
    color="#000000"
    cssOverride={{paddingTop:60}}
    loading
    size={13}
    speedMultiplier={1}
  />

:

//
"" 
:

//
""

}

{
  isLoggedIn ?

  openAnalysis ?

  <div className="analysisLinks"> 
        <a href="http://localhost:5005/min/age" target="blank"> Go to Min Age </a>
        <a href="http://localhost:5005/max/age" target="blank"> Go to Max Age </a>
        <a href="http://localhost:5005/avg/age" target="blank"> Go to Average Age </a>
        <a href="http://localhost:5005/count/diversity" target="blank"> Go to Employees Count </a>
        <a href="http://localhost:5005/join" target="blank"> Go to Join Tables </a>
  </div>
  

  :

  ""
  :

  ""
}
    </div> 
  );
}

export default Main;
