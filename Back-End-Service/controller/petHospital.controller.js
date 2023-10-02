import PetHospital from "../models/petHospital.model.js";

// @desc    Create new PetHospital
// @route   POST /api/v1/PetHospital
// @access  Public
export async function addPetHospital (req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new PetHospital({
      HName: req.body.HName,
      HAddress: req.body.HAddress,
      HPhoneNumber: req.body.HPhoneNumber,
      HEmailAddress: req.body.HEmailAddress,
      HWebsite: req.body.HWebsite,
      HOpenTime: req.body.HOpenTime,
      // HCloseTime: req.body.HCloseTime,
      HGoogleLocation: req.body.HGoogleLocation,
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
export async function getPetHospitalById (req, res) {
  const pethospital = await PetHospital.findById(req.params.id);

  if (pethospital) {
    res.json(pethospital);
  } else {
    res.status(404);
    throw new Error("PetHospital not found");
  }
};

// @desc    Update pethospital
// @route   PUT /api/v1/pethospital/:id
// @access  Public
export async function updatetPetHospital (req, res) {
  try {
    let pethospital = await PetHospital.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(pethospital.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      HName: req.body.HName,
      HAddress: req.body.HAddress,
      HPhoneNumber: req.body.HPhoneNumber,
      HEmailAddress: req.body.HEmailAddress,
      HWebsite: req.body.HWebsite,
      HOpenTime: req.body.HOpenTime,
      // HCloseTime: req.body.HCloseTime,
      HGoogleLocation: req.body.HGoogleLocation,
      // avatar: result.secure_url,
      // cloudinary_id: result.public_id,
    };
    pethospital = await PetHospital.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(pethospital);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all PetHospital
// @route   GET /api/v1/pethospital
// @access  Public
export async function getAllPetHospital (req, res) {
  try {
    const pethospital = await PetHospital.find();
    res.status(200).json(pethospital);
  } catch (err) {
    res.json({ message: err });
  }
};

// @desc    Delete PetHospital
// @route   DELETE /api/v1/PetHospital/:id
// @access  Public
export async function deletePetHospital (req, res) {
  const pethospital = await PetHospital.findById(req.params.id);

  if (pethospital) {
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(pethospital.cloudinary_id);

    await pethospital.remove();
    res.json({ message: "PetHospital removed" });
  } else {
    res.status(404);
    throw new Error("PetHospital not found");
  }
};