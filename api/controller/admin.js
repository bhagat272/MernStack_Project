const ProductTable = require("../models/Product");
const nodemailer = require("nodemailer");
const Reg = require("../models/reg");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Filename
  },
});

// exports.productinsertController = async(req, res) => {
//     const { Pname, Pprice, Pdesc,Stock } = req.body;

//     // Check if any of the fields are empty
//     if (!Pname || !Pprice || !Pdesc || !Stock) {
//         return res.status(400).json({ message: "!!  Please enter data  !!"});
//     }

//     const record = new ProductTable({
//         ProductName: Pname,
//         ProductPrice: Pprice,
//         ProductDesc: Pdesc,
//         Stock:Stock
//     });

//     await record.save();
//     res.json(record);
// }
// Properly apply the multer middleware to handle file uploads
exports.productinsertController = [
  upload.single("productImage"),
  async (req, res) => {
    try {
      const { Pname, Pprice, Pdesc, Stock } = req.body;
      const productImage = req.file ? req.file.path : null;

      // Check if any of the required fields are empty
      if (!Pname || !Pprice || !Pdesc || !Stock || !productImage) {
        return res.status(400).json({ message: "!! Please enter data !!" });
      }

      const record = new ProductTable({
        ProductName: Pname,
        ProductPrice: Pprice,
        ProductDesc: Pdesc,
        Stock: Stock,
        ProductImage: productImage, // Save the path to the image
      });

      await record.save();
      res.json(record);
    } catch (error) {
      console.error("Error inserting product:", error);
      res.status(500).json({ message: "Error inserting product" });
    }
  },
];

exports.productdataController = async (req, res) => {
  const record = await ProductTable.find();
  res.json(record);
};
exports.updateformController = async (req, res) => {
  const ProductId = req.params.Productid;
  const record = await ProductTable.findById(ProductId);
  res.json(record);
};
// exports.updateproductController = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { Pname, Pdesc, Pprice , Stock } = req.body;

//         // Validate that all required fields are provided
//         if (!Pname || !Pdesc || !Pprice || !Stock) {
//             return res.status(400).json({ message: 'Please fill in all required fields.' });
//         }

//         // Find the product by ID and update its details
//         const updatedProduct = await ProductTable.findByIdAndUpdate(
//             id,
//             { ProductName: Pname, ProductDesc: Pdesc, ProductPrice: Pprice , Stock:Stock },
//             { new: true } // Return the updated product
//         );

//         res.json(updatedProduct);
//     } catch (error) {
//         console.error('Error updating product:', error);
//         res.status(500).json({ message: 'Error updating product' });
//     }
// };

exports.updateproductController = [
  upload.single("productImage"), // Middleware to handle single file upload
  async (req, res) => {
    try {
      const id = req.params.id;
      const { Pname, Pdesc, Pprice, Stock } = req.body;

      // Validate that all required fields are provided
      if (!Pname || !Pdesc || !Pprice || !Stock) {
        return res
          .status(400)
          .json({ message: "Please fill in all required fields." });
      }

      // Find the existing product by ID
      const product = await ProductTable.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Handle new image upload
      let updatedFields = {
        ProductName: Pname,
        ProductDesc: Pdesc,
        ProductPrice: Pprice,
        Stock: Stock,
      };

      if (req.file) {
        const newImagePath = req.file.path;

        // Optionally delete the old image file if it exists
        if (product.ProductImage) {
          const oldImagePath = path.join(
            __dirname,
            "../",
            product.ProductImage
          ); // Adjust the path as necessary
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Error deleting old image:", err);
          });
        }

        // Add the new image path to the update
        updatedFields.ProductImage = newImagePath;
      }

      // Update the product with new details
      const updatedProduct = await ProductTable.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true } // Return the updated product
      );

      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Error updating product" });
    }
  },
];

exports.deleteproductController = async (req, res) => {
  const id = req.params.id;
  const record = await ProductTable.findByIdAndDelete(id);
  res.json({ message: "Successfully Product Deleted" });
};
exports.productInstockController = async (req, res) => {
  const record = await ProductTable.find({ Stock: "In-Stock" });
  res.json(record);
};


exports.queryreplyController = async (req, res) => {
  // Extract email details from the request body
  const { mailfrom, useremail, mailsub, mailbody } = req.body;

  // Configure the SMTP transporter using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com", // Default to Gmail's SMTP server if not set
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // Convert string to boolean for secure connection
    auth: {
      user: process.env.SMTP_USER, // SMTP username from environment variables
      pass: process.env.SMTP_PASS, // SMTP password from environment variables
    },
  });

  try {
    // Send the email using the transporter
    const info = await transporter.sendMail({
      from: mailfrom, // Sender's email address from the request body
      to: useremail, // Recipient's email address
      subject: mailsub, // Subject of the email
      text: mailbody, // Plain text body of the email
      html: `<b>${mailbody}</b>`, // HTML body of the email
    });

    // Respond with success message
    res.status(200).send({ message: "Email sent successfully", info });
  } catch (error) {
    console.error(error);
    // Respond with error message
    res.status(500).send({ message: "Error sending email", error });
  }
};

exports.UserlistController = async (req, res) => {
  const userlist = await Reg.find().sort({ regdate: -1 });
  res.json(userlist);
};
exports.userstatusController = async (req, res) => {
  const id = req.params.id;
  const record = await Reg.findById(id);
  let newStatus = null;
  if (record.status === "Active") {
    newStatus = "Suspended";
  } else {
    newStatus = "Active";
  }
  const data = await Reg.findByIdAndUpdate(id, {
    status: newStatus,
  });
  res.json(data);
};
