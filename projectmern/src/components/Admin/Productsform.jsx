import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Productsform = () => {
  const [Pname, setpname] = useState("");
  const [Pprice, setpprice] = useState("");
  const [Pdesc, setpdesc] = useState("");
  const [Stock, setstock] = useState("");
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate();

  function handleform(e) {
    e.preventDefault();
    
    // Validate if all fields are filled
    if (!Pname || !Pprice || !Pdesc || !Stock || !productImage) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("Pname", Pname);
    formData.append("Pprice", Pprice);
    formData.append("Pdesc", Pdesc);
    formData.append("Stock", Stock);
    formData.append("productImage", productImage);

    fetch("http://localhost:5000/productsformdata", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          toast.success("Product Added Successfully");
          navigate("/productsadd");
        } else {
          toast.error(data.message || "Please Add Data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while adding the product");
      });
  }

  return (
    <div className="bg-dark">
      <Toaster />
      <Link to="/productsadd">
        <Button className="mt-2 ms-2" variant="contained" color="success">
          Products
        </Button>
      </Link>
      <h1 className="text-2xl text-center text-red-800">
        <p className="mt-2">Products Add Here</p>
      </h1>
      <div style={{ padding: "3rem" }}>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleform}
        >
          <label className="label">Product Name</label>
          <input
            type="text"
            value={Pname}
            onChange={(e) => setpname(e.target.value)}
          />
          <label className="label">Product Price</label>
          <input
            type="number"
            value={Pprice}
            onChange={(e) => setpprice(e.target.value)}
          />
          <label className="label">Product Description</label>
          <input
            type="text"
            value={Pdesc}
            onChange={(e) => setpdesc(e.target.value)}
          />
          <select
            className="mt-2 bg-danger label"
            value={Stock}
            onChange={(e) => setstock(e.target.value)}
          >
            <option className="bg-primary">-Select Stock-</option>
            <option>In-Stock</option>
            <option>Out-of-Stock</option>
          </select>
          <label className="mt-1 label">Product Image</label>
          <input
            className="form-control bg-success"
            type="file"
            name="productImage"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
          <Button
            className="mt-2"
            type="submit"
            variant="contained"
            color="primary"
          >
            <i className="bi bi-bag-check-fill"></i>Add Products &nbsp;
            <svg
              className="mb-1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bag-check-fill"
              viewBox="0 0 16 16"
              style={{ verticalAlign: "middle" }}
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"
              />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Productsform;
