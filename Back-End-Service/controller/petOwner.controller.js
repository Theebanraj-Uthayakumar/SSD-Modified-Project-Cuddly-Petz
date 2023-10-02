import PetOwner from "../models/petOwner.model.js";

// @desc    Create new PetOwner
// @route   POST /api/v1/PetOwner
// @access  Public
export async function addPetOwner (req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new PetOwner({
      OFirstName: req.body.OFirstName,
      OLastName: req.body.OLastName,
      Address: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
      EmailAddress: req.body.EmailAddress,
      Occupation: req.body.Occupation,
      TelephoneNo: req.body.TelephoneNo,
      // MobileNo: req.body.MobileNo,
      EmergencyContact: req.body.EmergencyContact,
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
export async function getPetOwnerById (req, res) {
  const petowner = await PetOwner.findById(req.params.id);

  if (petowner) {
    res.json(petowner);
  } else {
    res.status(404);
    throw new Error("PetOwner not found");
  }
};

// @desc    Update petowner
// @route   PUT /api/v1/petowner/:id
// @access  Public
export async function updatePetOwner (req, res) {
  try {
    let petowner = await PetOwner.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(petowner.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      OFirstName: req.body.OFirstName,
      OLastName: req.body.OLastName,
      Address: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
      EmailAddress: req.body.EmailAddress,
      Occupation: req.body.Occupation,
      TelephoneNo: req.body.TelephoneNo,
      // MobileNo: req.body.MobileNo,
      EmergencyContact: req.body.EmergencyContact,
      // avatar: result.secure_url,
      // cloudinary_id: result.public_id,
    };
    petowner = await PetOwner.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(petowner);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all PetOwner
// @route   GET /api/v1/petowner
// @access  Public
export async function getAllPetOwner (req, res) {
  try {
    const petowner = await PetOwner.find();
    res.status(200).json(petowner);
  } catch (err) {
    res.json({ message: err });
  }
};

// @desc    Delete PetOwner
// @route   DELETE /api/v1/PetOwner/:id
// @access  Public
export async function deletePetOwner (req, res) {
  const petowner = await PetOwner.findById(req.params.id);

  if (petowner) {
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(petowner.cloudinary_id);

    await petowner.remove();
    res.json({ message: "PetOwner removed" });
  } else {
    res.status(404);
    throw new Error("PetOwner not found");
  }
};