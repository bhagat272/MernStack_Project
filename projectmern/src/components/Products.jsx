import React from 'react'
import  Cards  from './products/Cards'
import QueryForm from './Admin/QueryForm'
const Products = () => {
  return (
    <div>
      <h2 className='flex justify-center items-center mt-4 font-bold'>Products</h2>
      <Cards/>
      <QueryForm/>
    </div>
  )
}

export default Products
