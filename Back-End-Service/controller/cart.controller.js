import CartProduct from "../models/cart.model.js";

// @desc    Create new CartProduct
// @route   POST /api/v1/CartProduct
// @access  Public
export async function addCartProduct (req, res) {
  try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req?.file?.path);

      let category = new CartProduct({
        PetOwnerID: req.body.PetOwnerID,
        ProductID: req.body.ProductID,
        Qty: req.body.Qty,
        Amount: req.body.Amount,
        Date: req.body.Date,
        Time: req.body.Time,
        
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
export async function getCartProductById (req, res) {
  const cartproduct = await CartProduct.findById(req.params.id);

  if (cartproduct) {
    res.json(cartproduct)
  } else {
    res.status(404)
    throw new Error('CartProduct not found')
  }
};

// @desc    Update CartProduct
// @route   PUT /api/v1/CartProduct/:id
// @access  Public
export async function updateCartProduct (req, res) {
  try {
    let cartproduct = await CartProduct.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(CartProduct.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
        PetOwnerID: req.body.PetOwnerID,
        ProductID: req.body.ProductID,
        Qty: req.body.Qty,
        Amount: req.body.Amount,
        Date: req.body.Date,
        Time: req.body.Time,
        
        // avatar: result.secure_url,
        // cloudinary_id: result.public_id,
    };
    cartproduct = await CartProduct.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(cartproduct);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all CartProduct
// @route   GET /api/v1/CartProduct
// @access  Public
export async function getAllCartProduct (req, res) {
        
  const PetOwnerID = req.query.PetOwnerID;
  let cartproduct;

    try {
        cartproduct = await CartProduct.aggregate([
          { $match : { PetOwnerID : PetOwnerID }},
        ])
        res.status(200).json(cartproduct);
    } catch (err) {
        res.json({ message: err });
    }
};

// @desc    Delete CartProduct
// @route   DELETE /api/v1/CartProduct/:id
// @access  Public
export async function deleteCartProduct (req, res) {
    const cartproduct = await CartProduct.findById(req.params.id)
  
    if (cartproduct) {
      await cartproduct.remove()
      res.json({ message: 'CartProduct Deleted' })
    } else {
      res.status(404)
      throw new Error('CartProduct not found')
    }
};