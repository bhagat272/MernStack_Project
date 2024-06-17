const ProductTable = require("../models/Product");
const nodemailer = require("nodemailer");
const Reg = require("../models/reg");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Add your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET  // Add your Cloudinary API secret
});

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Cloudinary folder name
    format: async (req, file) => 'png', // Format you want to use (e.g., 'png', 'jpeg')
    public_id: (req, file) => Date.now() + '-' + file.originalname // Unique file name
  },
});

const upload = multer({ storage: storage });

// Insert new product with image upload
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

// Get all products
exports.productdataController = async (req, res) => {
  const record = await ProductTable.find();
  res.json(record);
};

// Get product by ID for update form
exports.updateformController = async (req, res) => {
  const ProductId = req.params.Productid;
  const record = await ProductTable.findById(ProductId);
  res.json(record);
};

// Update product with optional image upload
exports.updateproductController = [
  upload.single("productImage"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { Pname, Pdesc, Pprice, Stock } = req.body;

      // Validate that all required fields are provided
      if (!Pname || !Pdesc || !Pprice || !Stock) {
        return res.status(400).json({ message: "Please fill in all required fields." });
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

// Delete product
exports.deleteproductController = async (req, res) => {
  const id = req.params.id;
  const record = await ProductTable.findByIdAndDelete(id);
  res.json({ message: "Successfully Product Deleted" });
};

// Get products in stock
exports.productInstockController = async (req, res) => {
  const record = await ProductTable.find({ Stock: "In-Stock" });
  res.json(record);
};

// Handle query reply email
exports.queryreplyController = async (req, res) => {
  const { mailfrom, useremail, mailsub, mailbody } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: mailfrom,
      to: useremail,
      subject: mailsub,
      text: mailbody,
      html: `<b>${mailbody}</b>`,
    });

    res.status(200).send({ message: "Email sent successfully", info });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error sending email", error });
  }
};

// List all users
exports.UserlistController = async (req, res) => {
  const userlist = await Reg.find().sort({ regdate: -1 });
  res.json(userlist);
};

// Update user status
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
