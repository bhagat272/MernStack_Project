import React, { useContext, useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { CartContext } from "../App"; // Import CartContext

const Cart = () => {
  const { cart, setCart } = useContext(CartContext); // Access cart state
  const [cartItems, setCartItems] = useState(cart);

  // Update cartItems when cart changes
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // Synchronize the local cartItems with the global cart state
  useEffect(() => {
    setCart(cartItems);
  }, [cartItems, setCart]);

  // Function to handle removing an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  // Function to handle incrementing quantity
  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity++;
    setCartItems(updatedCart);
  };

  // Function to handle decrementing quantity
  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCartItems(updatedCart);
    } else {
      removeFromCart(index);
    }
  };

  // Calculate total price and total items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.ProductPrice,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                  Cart - {totalItems} items
                </MDBTypography>
              </MDBCardHeader>
              {cartItems.map((item, index) => (
                <MDBCardBody key={`${item._id}-${index}`}>
                  <MDBRow>
                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                      <MDBRipple
                        rippleTag="div"
                        rippleColor="light"
                        className="bg-image rounded hover-zoom hover-overlay"
                      >
                        <img
                          src={item.ProductImage}
                          className="w-100"
                          alt={item.ProductName}
                        />
                      </MDBRipple>
                    </MDBCol>

                    <MDBCol lg="5" md="6" className="mb-4 mb-lg-0">
                      <p>
                        <strong>{item.ProductName}</strong>
                      </p>
                      <p>
                        Price: <strong>${item.ProductPrice}</strong>
                      </p>
                      <p>
                        Quantity: <strong>{item.quantity}</strong>
                      </p>
                      <MDBBtn
                        title="Remove Item"
                        className="px-4 me-1"
                        onClick={() => removeFromCart(index)}
                      >
                        <MDBIcon fas icon="trash" />
                      </MDBBtn>
                    </MDBCol>

                    <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <MDBBtn
                          onClick={() => handleDecrement(index)}
                          className="px-3 me-2"
                        >
                          <MDBIcon fas icon="minus" />
                        </MDBBtn>

                        <MDBInput
                          value={item.quantity}
                          min={1}
                          type="number"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            const updatedCart = cartItems.map((cartItem, i) =>
                              i === index ? { ...cartItem, quantity: value } : cartItem
                            );
                            setCartItems(updatedCart);
                          }}
                        />

                        <MDBBtn
                          onClick={() => handleIncrement(index)}
                          className="px-3 ms-2"
                        >
                          <MDBIcon fas icon="plus" />
                        </MDBBtn>
                      </div>

                      <p className="text-start text-md-center">
                        <strong>${item.quantity * item.ProductPrice}</strong>
                      </p>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              ))}
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Total Products
                    <span>{totalItems}</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                    Total Price
                    <span>${totalPrice}</span>
                  </MDBListGroupItem>
                </MDBListGroup>
                <MDBBtn block size="lg">
                  Go to checkout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Cart;
