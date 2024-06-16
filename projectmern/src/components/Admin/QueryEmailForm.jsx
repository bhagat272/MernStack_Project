import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Left from './Left';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const QueryEmailForm = () => {
  const {id} = useParams()
  const [mailfrom,setmailfrom] = useState("sumitkumarbhagat987@gmail.com")
  const [useremail,setuseremail] = useState("")
  const [mailsub,setmailsub] = useState('')
  const [mailbody,setmailbody] = useState('')

 function handlesubmit(e){
  e.preventDefault()
  console.table({mailfrom,useremail,mailsub,mailbody}) 
  fetch('http://localhost:5000/queryreply',{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({mailfrom,useremail,mailsub,mailbody})
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    toast.success("Query Replied",{
      duration:1800
    })
    }
 



  useEffect(() => {
    fetch(`http://localhost:5000/queryemail/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setuseremail(data.email); 
            console.log(data); // Log the entire data object
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}, [id]);
  return (
    <>
      <Toaster/>
    <p className='ms-2'><Left/></p>
    <div style={{padding:"3rem"}}>
      
      <form action="" className='' onSubmit={handlesubmit}>
        <label htmlFor="from">From</label>
        <input type="email" id="from" value={mailfrom} onChange={(e)=>{setmailfrom(e.target.value)}} className='form-control' />
        <label htmlFor="to">To</label>
        <input type="email" value={useremail} onChange={(e)=>{setuseremail(e.target.value)}} id="to" className='form-control'/>
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" value={mailsub} onChange={(e)=>{setmailsub(e.target.value)}} className='form-control'/>
        <label htmlFor="body">Body</label>
        <textarea className='form-control' name="" value={mailbody} onChange={(e)=>{setmailbody(e.target.value)}} id="body"></textarea>
        <Button variant='contained' color='success' type='submit' className='mt-2 form-control'>SEND Email</Button>
      </form>
    </div>
    </>
  );
};

export default QueryEmailForm;
