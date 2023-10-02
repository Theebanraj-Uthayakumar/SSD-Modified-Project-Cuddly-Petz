import Product from "../models/product.model.js";

// @desc    Create new Product
// @route   POST /api/v1/Product
// @access  Public
export async function addProduct (req, res) {
  try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req?.file?.path);

      let category = new Product({
        ProductID: req.body.ProductID,
        PetShopID: req.body.PetShopID,
        ProductName: req.body.ProductName,
        ProductDescription: req.body.ProductDescription,
        ProductCategory: req.body.ProductCategory,
        ProductImage: req.body.ProductImage,
        Price: req.body.Price,
        Manufacturer: req.body.Manufacturer,
        Stock: req.body.Stock,
        PostedDate: req.body.PostedDate,
        
        // avatar: result?.secure_url,
        // cloudinary_id: result?.public_id,
      });

      const savedCategory = await category.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
};

// @desc    Get docotrs by ID
// @route   GET /api/v1/docotrs/:id
// @access  Public
export async function getProductById (req, res) {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
};

// @desc    Update Product
// @route   PUT /api/v1/Product/:id
// @access  Public
export async function updateProduct (req, res) {
  try {
    let product = await Product.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(Product.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
        ProductID: req.body.ProductID,
        PetShopID: req.body.PetShopID,
        ProductName: req.body.ProductName,
        ProductDescription: req.body.ProductDescription,
        ProductCategory: req.body.ProductCategory,
        ProductImage: req.body.ProductImage,
        Price: req.body.Price,
        Manufacturer: req.body.Manufacturer,
        Stock: req.body.Stock,
        PostedDate: req.body.PostedDate,
        
        // avatar: result.secure_url,
        // cloudinary_id: result.public_id,
    };
    product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all Product
// @route   GET /api/v1/Product
// @access  Public
export async function getAllProduct (req, res) {
  const PSID = req.query.PSID;
  let product;
    try {
        if(PSID){
          product = await Product.find({ PetShopID : PSID});
        }else{
          product = await Product.find();
        }
        res.status(200).json(product)
    } catch (err) {
        res.json({ message: err });
    }
};

// @desc    Delete Product
// @route   DELETE /api/v1/Product/:id
// @access  Public
export async function deleteProduct (req, res) {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      await product.remove()
      res.json({ message: 'Product Deleted' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
};