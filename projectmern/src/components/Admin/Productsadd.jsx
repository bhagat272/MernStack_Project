import React, { useEffect, useState } from "react";
import Left from "./Left";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";

const Productsadd = () => {
  const [record, setRecord] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await fetch("https://mern-stack-project-rosy.vercel.app/getproductdata");
      const data = await response.json();
      setRecord(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="">
        <p className="ms-2">
          <Left />
        </p>

        <div className="text-4xl text-center text-red-800">
          <Link to={"/productsform"}>
            <Button className="mt-1 mb-2" variant="contained">
              Add Products Here{" "}
              <svg
                className="ms-2"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-plus-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0" />
              </svg>
            </Button>
          </Link>

          <table className="table  bg-dark text-light" >
            <thead>
              <tr className="bg-secondary">
                <th style={{ border: "1px solid black" }}>S.NO</th>
                <th style={{ border: "1px solid black" }}>Product Name</th>
                <th style={{ border: "1px solid black" }}>Product Price</th>
                <th style={{ border: "1px solid black" }}>Product Description</th>
                <th style={{ border: "1px solid black" }}>Stock Availability</th>
                <th style={{ border: "1px solid black" }}>Product Image</th> {/* New column for the image */}
                <th style={{ border: "1px solid black" }}>Update Product</th>
                <th style={{ border: "1px solid black" }}>Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {record?.map((item, i) => (
                <tr key={i} style={{ border: "1px solid black" }}>
                  <td style={{ border: "1px solid black" }}>
                    {i + 1}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {item.ProductName}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    $ {item.ProductPrice}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {item.ProductDesc}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {item.Stock}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {/* Display the product image */}
                    <img
                      src={item.ProductImage} // Use the image path from the server
                      alt={item.ProductName}
                      style={{ width: "100px", height: "80px", objectFit: "cover" }}
                    />
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <Link to={`/updateform/${item._id}`}>
                      <Button variant="contained" color="secondary">
                        <UpdateIcon className="me-1" /> Update
                      </Button>
                    </Link>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <Link to={`/deleteproduct/${item._id}`}>
                      <Button
                        variant="contained"
                        style={{ background: "red" }}
                      >
                        Delete <DeleteIcon className="ms-0.5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productsadd;
