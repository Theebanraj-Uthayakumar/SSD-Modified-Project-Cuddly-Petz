import PetShop from '../models/petshop.model.js';

// @desc    Create new PetShop
// @route   POST /api/v1/PetShop
// @access  Public
export async function addPetShop(req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new PetShop({
      ShopID: req.body.ShopID,
      ShopName: req.body.ShopName,
      Address: req.body.Address,
      GoogleLocation: req.body.GoogleLocation,
      Email: req.body.Email,
      Telephone: req.body.Telephone,
      Mobile: req.body.Mobile,
      OpenTime: req.body.OpenTime,
      CloseTime: req.body.CloseTime,

      // avatar: result?.secure_url,
      // cloudinary_id: result?.public_id,
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

// @desc    Get docotrs by ID
// @route   GET /api/v1/docotrs/:id
// @access  Public
export async function getPetShopById(req, res) {
  const petshop = await PetShop.findById(req.params.id);

  if (petshop) {
    res.json(petshop);
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
}

// @desc    Update PetShop
// @route   PUT /api/v1/PetShop/:id
// @access  Public
export async function updatePetShop(req, res) {
  try {
    let petshop = await PetShop.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(PetShop.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      ShopID: req.body.ShopID,
      ShopName: req.body.ShopName,
      Address: req.body.Address,
      GoogleLocation: req.body.GoogleLocation,
      Email: req.body.Email,
      Telephone: req.body.Telephone,
      Mobile: req.body.Mobile,
      OpenTime: req.body.OpenTime,
      CloseTime: req.body.CloseTime,

      // avatar: result.secure_url,
      // cloudinary_id: result.public_id,
    };
    petshop = await PetShop.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(petshop);
  } catch (err) {
    console.log(err);
  }
}

// @desc    Get all PetShop
// @route   GET /api/v1/PetShop
// @access  Public
export async function getAllPetShop(req, res) {
  try {
    const petshop = await PetShop.find();
    res.status(200).json(petshop);
  } catch (err) {
    res.json({ message: err });
  }
}

// @desc    Delete PetShop
// @route   DELETE /api/v1/PetShop/:id
// @access  Public
export async function deletePetShop(req, res) {
  const petshop = await PetShop.findById(req.params.id);

  if (petshop) {
    await petshop.remove();
    res.json({ message: "Comment Deleted" });
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
}
