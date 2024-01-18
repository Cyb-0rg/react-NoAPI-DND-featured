import React, { useState, useEffect } from 'react';
import noapi from 'no-api';

function noapi_loop() {
  const [list_of_students, setList_of_students] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var  start = await new noapi.datastore('ibrahim_ds');
      var list_of_schools = await start.schools;
      var school = list_of_schools.first();
      var list_of_students = await school.students;
      setList_of_students(list_of_students);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <ul>

        {
 
        }
          

   
        
        
      </ul>
    </div>
  );
}

export default noapi_loop;
