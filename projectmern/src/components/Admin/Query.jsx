import { Button, Modal, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Left from "./Left";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from '@mui/icons-material/Send';
import { Link, useParams } from "react-router-dom";
const Query = () => {
  const [record, setRecord] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null); // Track selected message
  const {id} = useParams()
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/querysdata");
      const data = await response.json();
      // Initialize the isRead property for each message
      const updatedData = data.map((msg) => ({ ...msg, isRead: false }));
      console.log(data)
      setRecord(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to mark a message as read
  const markAsRead = (index) => {
    const updatedRecord = [...record];
    updatedRecord[index].isRead = true;
    setRecord(updatedRecord);
  };

  // Function to handle opening the modal
  const handleOpenModal = (message,i) => {
    setSelectedMessage(message);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div>
      <div className="mb-3 ms-2 flex justify-center">
        <Left />
      </div>
      <table className="table  bg-dark text-light">
        <thead>
          <tr>
            <th>S.No</th>
            <th>UserEmailID</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {record.map((val, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{val.email}</td>
              <td><Link to ={`/queryemail/${val._id}`}><Button variant="outlined"><SendIcon/>&nbsp;Reply</Button></Link></td>
              <td>{val.isRead ? "Read" : "Unread"}</td>
              <td>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {markAsRead(i);handleOpenModal(val)}}
                >
                  <MessageIcon />
                   Read
                </Button>
              </td>
              <td >
                  <Link to={`/querydelete/${val._id}`}> <Button
                      variant="contained"
                      style={{ background: "red" }}
                      type="submit"
                    >
                      Delete <DeleteIcon className="ms-0.5" />{" "}
                    </Button></Link>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying message */}

      <Modal
  style={{
    display: "flex",
    flexDirection: "column", // Changed to column to stack elements vertically
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid black",
    color: "wheat",
    background: "skyblue"
  }}
  open={selectedMessage !== null}
  onClose={handleCloseModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box sx={{ p: 4, width: 'auto' }}> {/* Adjusted width to 'auto' */}
    <Typography variant="h6" component="h2" id="modal-title">
      Message
    </Typography>
    <Typography id="modal-description" sx={{ mt: 2, mb: 2 }}>
      {selectedMessage?.query}
    </Typography>
    <Button
      variant="contained"
      color="success"
      onClick={handleCloseModal}
      sx={{ mt: 2 }} // Adjusted margin to mt (margin-top)
    >
      Close
    </Button>
  </Box>
</Modal>

    </div>
  );
};

export default Query;

// import { Button } from '@mui/material';
// import React, { useEffect, useState } from 'react'
// import Left from './Left';
// import MessageIcon from '@mui/icons-material/Message';
// import DeleteIcon from "@mui/icons-material/Delete";

// const Query = () => {
//     const [record, setRecord] = useState();
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/querysdata");
//         const data = await response.json();
//         setRecord(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     useEffect(() => {
//       fetchData();
//     }, []);
//   return (
//     <div>
//         <div className='mb-2 ms-2'>
//         <Left/> </div>
//       <table className="table form-control bg-dark text-light">
//         <thead>
//             <tr>
//                 <th>S.No</th>
//                 <th>UserEmailID</th>
//                 <th>Query</th>
//                 <th>Status</th>
//                 <th>Response</th>
//                 <th>Delete</th>
//             </tr>
//         </thead>
//         <tbody>
//              {record?.map((val,i)=>(
//                 <tr key={i}>
//                     <td>{i+1}</td>
//                     <td>{val.email}</td>
//                     <td>{val.query}</td>
//                     <td>Unread</td>
//                     <td><Button variant='contained' color='success'><MessageIcon/>
//                     &nbsp;Reply</Button></td>
//                     <td><Button variant='contained' color='primary'><DeleteIcon/>&nbsp;Delete</Button></td>
//                 </tr>
//              ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default Query
