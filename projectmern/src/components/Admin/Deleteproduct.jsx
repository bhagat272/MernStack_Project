import { duration } from '@mui/material'
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const Deleteproduct = () => {
   const {id} = useParams()
   const navigate = useNavigate()
  useEffect(()=>{
    fetch(`https://mern-stack-project-rosy.vercel.app/productdelete/${id}`,{
        method:'DELETE'
        })
        .then(res=>{return res.json()})
        .then(data=>{
            if(data.message){
              toast.success("Product Deleted Successfully" , {
                duration:2000
               }) 
                navigate("/productsadd")
            }
       })
    
  },[id])
  return (
    <div>
     
      <Toaster/>
      <h2>Delete Product Page</h2>
    </div>
  )
}

export default Deleteproduct
