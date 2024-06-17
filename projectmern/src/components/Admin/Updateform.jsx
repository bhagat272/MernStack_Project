import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const Updateform = () => {
  const [Pname, setPname] = useState("");
  const [Pprice, setPprice] = useState("");
  const [Pdesc, setPdesc] = useState("");
  const [Stock, setStock] = useState("");
  const [ProductImage, setProductImage] = useState(null); // New state for handling image
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://mern-stack-project-rosy.vercel.app/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPname(data.ProductName);
        setPprice(data.ProductPrice);
        setPdesc(data.ProductDesc);
        setStock(data.Stock); // Initialize Stock if available
        console.log(data); // Log the entire data object
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  function handleform(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Pname", Pname);
    formData.append("Pprice", Pprice);
    formData.append("Pdesc", Pdesc);
    formData.append("Stock", Stock);
    if (ProductImage) {
      formData.append("productImage", ProductImage); // Add the image file to the form data
    }

    fetch(`https://mern-stack-project-rosy.vercel.app/${id}`, {
      method: "PUT",
      body: formData, // Send form data including the image file
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data._id) {
          toast.success("Product Updated Successfully", {
            duration: 1800,
          });
          navigate("/productsadd");
        } else {
          toast.error("Please Fill all Data");
        }
      });
  }

  return (
    <div className="bg-dark p-4">
      <Toaster />
      <Link to="/productsadd">
        <Button className="mt-2 ms-2" variant="contained" color="success">
          Products
        </Button>
      </Link>
      <h1 className="text-2xl text-center text-red-800">
        <p className="text-success mt-2 font-bold">Update Products</p>
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
            onChange={(e) => setPname(e.target.value)}
          />
          <label className="label">Product Price</label>
          <input
            type="number"
            value={Pprice}
            onChange={(e) => setPprice(e.target.value)}
          />
          <label className="label">Product Description</label>
          <input
            type="text"
            value={Pdesc}
            onChange={(e) => setPdesc(e.target.value)}
          />
          <label className="label">Stock Availability</label>
          <select
            className="mt-2 bg-danger"
            value={Stock}
            onChange={(e) => setStock(e.target.value)}
          >
            <option className="bg-primary">-Select Stock-</option>
            <option>In-Stock</option>
            <option>Out-of-Stock</option>
          </select>
          <label className="label mt-3">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])} // Handle file input change
          />
          <Button className="mt-4" type="submit" variant="contained" color="primary">
            Update Product &nbsp;
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

export default Updateform;
