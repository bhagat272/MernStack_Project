import { duration } from '@mui/material'
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const Querydelete = () => {
   const {id} = useParams()
   const navigate = useNavigate()
  useEffect(()=>{
    fetch(`http://localhost:5000/querydelete/${id}`,{
        method:'DELETE'
        })
        .then(res=>{return res.json()})
        .then(data=>{
            if(data.message){
              toast.success("Query Deleted Successfully" , {
                duration:2000
               }) 
                navigate("/query")
            }
       })
    
  },[id])
  return (
    <div>
     
      <Toaster/>
      <h2>Delete query</h2>
    </div>
  )
}

export default Querydelete
