import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import moment from "moment"; // Import moment for date formatting
import Left from './Left';
import { useParams } from 'react-router-dom';

const User = () => {
  const [record, setRecord] = useState([]);
  

  useEffect(() => {
    fetch('http://localhost:5000/userlist')
      .then((res) => res.json())
      .then((data) => setRecord(data))
      .catch((err) => console.log(err));
  });

  function handleSuspend(id) {
    // Corrected the parameter name to userId
    fetch(`http://localhost:5000/userstatus/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err)); // Handle any errors
  }

  return (
    <div>
      <p className="mb-3 ms-2 flex justify-center"> <Left /></p>
      <table className='table  bg-dark text-light'>
        <thead>
          <tr className='bg-secondary'>
            <th>S.No</th>
            <th>Username</th>
            <th>RegDate</th>
            <th>Account Status</th>
          </tr>
        </thead>
        <tbody>
          {record.map((user, i) => (
            <tr key={user._id}>
              <td>{i + 1}</td>
              <td>{user.userName}</td>
              <td>{moment(user.regdate).format("MMMM DD, YYYY")}</td>
              <td>
                <Button variant='outlined' onClick={() => { handleSuspend(user._id) }}>
                  {user.status}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
