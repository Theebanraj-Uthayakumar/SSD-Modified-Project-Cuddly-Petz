import PetRecord from "../models/petRecord.model.js";

// @desc    Create new PetRecord
// @route   POST /api/v1/PetRecord
// @access  Public
export async function addPetRecord (req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new PetRecord({
      PetName: req.body.PetName,
      PetOwnerID: req.body.PetOwnerID,
      RecordType: req.body.RecordType,
      Note: req.body.Note,
      avatar: req.body.avatar,
      cloudinary_id: req.body.cloudinary_id,
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
export async function getPetRecordById (req, res) {
  const petrecord = await PetRecord.findById(req.params.id);

  if (petrecord) {
    res.json(petrecord);
  } else {
    res.status(404);
    throw new Error("PetRecord not found");
  }
};

// @desc    Update petrecord
// @route   PUT /api/v1/petrecord/:id
// @access  Public
export async function updatePetRecord (req, res) {
  try {
    let petrecord = await PetRecord.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(petrecord.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      PetName: req.body.PetName,
      PetOwnerID: req.body.PetOwnerID,
      RecordType: req.body.RecordType,
      Note: req.body.Note,
      avatar: req.body.avatar,
      cloudinary_id: req.body.cloudinary_id,
    };
    petrecord = await PetRecord.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(petrecord);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all PetRecord
// @route   GET /api/v1/petrecord
// @access  Public
export async function getAllPetRecord (req, res) {
  // try {
  //   const petrecord = await PetRecord.find();
  //   res.status(200).json(petrecord);
  // } catch (err) {
  //   res.json({ message: err });
  // }
    
  const POID = req.query.POID;
  let petrecord;
  
  try {
      if(POID){
        petrecord = await PetRecord.find({ PetOwnerID : POID }).populate('PetOwnerID')
        res.status(200).json(petrecord);
      }else{       
        const petrecord = await PetRecord.find().populate('PetOwnerID');
        res.status(200).json(petrecord); 
      }
  } catch (err) {
    res.json({ message: err });
  }

};

// @desc    Delete PetRecord
// @route   DELETE /api/v1/PetRecord/:id
// @access  Public
export async function deletePetRecord (req, res) {
  const petrecord = await PetRecord.findById(req.params.id);

  if (petrecord) {
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(petrecord.cloudinary_id);

    await petrecord.remove();
    res.json({ message: "PetRecord removed" });
  } else {
    res.status(404);
    throw new Error("PetRecord not found");
  }
};