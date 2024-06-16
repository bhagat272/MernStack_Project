import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../App'; // Adjusted import statement
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Cards() {
  const [record, setRecord] = useState([]);
  const { cart, setCart } = useContext(CartContext); // Use CartContext to access cart state

  useEffect(() => {
    fetch("http://localhost:5000/productinstock")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Log data to check for duplicate keys
        setRecord(data);
      });
  }, []);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    if (existingProductIndex >= 0) {
      // Product exists in the cart, increase its quantity
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Product doesn't exist in the cart, add it with a quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    console.log(cart);
  };

  return (
    <div className='mt-3' style={{ display: "flex", flexWrap: "wrap" }}>
      {record.length === 0 ? (
        <p>Loading...</p>
      ) : (
        record.map((item, index) => (
          <Card key={`${item._id}-${index}`} className="ms-4 mb-3 card" sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
            <CardOverflow>
              <AspectRatio sx={{ minWidth: 200 }}>
                <img
                  src={`http://localhost:5000/${item.ProductImage}`} // Use the dynamic URL to the product image
                  loading="lazy"
                  alt={item.ProductName}
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography level="body-xs">{item.ProductDesc}</Typography>
              <Link
                href="#product-card"
                fontWeight="md"
                color="neutral"
                textColor="text.primary"
                overlay
                endDecorator={<ArrowOutwardIcon />}
              >
                {item.ProductName}
              </Link>
              <Typography
                level="title-lg"
                sx={{ mt: 1, fontWeight: 'xl' }}
                endDecorator={
                  <Chip component="span" size="sm" variant="soft" color="success">
                    Lowest price
                  </Chip>
                }
              >
                ${item.ProductPrice}
              </Typography>
              <Typography level="body-sm">
                (Only <b>{item.Stock}</b> left in stock!)
              </Typography>
            </CardContent>
            <CardOverflow>
              <Button variant="solid" color="danger" size="lg" onClick={() => addToCart(item)}>
                Add to cart
              </Button>
            </CardOverflow>
          </Card>
        ))
      )}
    </div>
  );
}
