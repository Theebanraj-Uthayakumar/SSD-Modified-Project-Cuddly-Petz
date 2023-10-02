import Pet from "../models/pet.model.js";

// @desc    Create new Pet
// @route   POST /api/v1/Pet
// @access  Public
export async function addPet (req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new Pet({
      PetName: req.body.PetName,
      PetOwnerID: req.body.PetOwnerID,
      SelectedType: req.body.SelectedType,
      SelectedBreed: req.body.SelectedBreed,
      Age: req.body.Age,
      Sex: req.body.Sex,
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
export async function getPetById  (req, res) {
  const pet = await Pet.findById(req.params.id);

  if (pet) {
    res.json(pet);
  } else {
    res.status(404);
    throw new Error("Pet not found");
  }
};

// @desc    Update pet
// @route   PUT /api/v1/pet/:id
// @access  Public
export async function updatePet (req, res) {
  try {
    let pet = await Pet.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(pet.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      PetName: req.body.PetName,
      PetOwnerID: req.body.PetOwnerID,
      SelectedType: req.body.SelectedType,
      SelectedBreed: req.body.SelectedBreed,
      Age: req.body.Age,
      Sex: req.body.Sex,
      avatar: req.body.avatar,
      cloudinary_id: req.body.cloudinary_id,
    };
    pet = await Pet.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(pet);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all Pet
// @route   GET /api/v1/pet
// @access  Public
export async function getAllPet (req, res) {

  // const POID = req.query.POID;
  // let pet;
  
  // try { 
  //   // if(type === "DR"){
  //   //   service = await Service.aggregate([
  //   //     { $match : { HID : HID}},
  //   //   ])
  //   // }else {
  //   //   service = await Service.aggregate([
  //   //     { $match : { HID : HID}},
  //   //   ])
  //   // }
  //   pet = await Pet.aggregate([
  //     { $match : { POID : POID }},
  //   ])
  //   res.status(200).json(pet);
  // } catch (err) {
  //   res.json({ message: err });
  // }

  
  const POID = req.query.POID;
  let pet;
  
  try {
      if(POID){
        pet = await Pet.aggregate([
        { $match : {
          PetOwnerID : POID }}
        ])
        res.status(200).json(pet);
      }else{       
        const pet = await Pet.find();
        res.status(200).json(pet); 
      }
  } catch (err) {
    res.json({ message: err });
  }
  // try {
  //   const pet = await Pet.find();
  //   res.status(200).json(pet);
  // } catch (err) {
  //   res.json({ message: err });
  // }
};

// @desc    Delete Pet
// @route   DELETE /api/v1/Pet/:id
// @access  Public
export async function deletePet (req, res) {
  const pet = await Pet.findById(req.params.id);

  if (pet) {
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(pet.cloudinary_id);

    await pet.remove();
    res.json({ message: "Pet removed" });
  } else {
    res.status(404);
    throw new Error("Pet not found");
  }
};
