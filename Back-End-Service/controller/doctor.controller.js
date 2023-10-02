import Doctors from "../models/doctor.model.js";

// @desc    Create new Doctors
// @route   POST /api/v1/Doctors
// @access  Public
export async function addDoctor (req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new Doctors({
      DFirstName: req.body.DFirstName,
      DLastName: req.body.DLastName,
      DAddress: req.body.DAddress,
      DPhoneNumber: req.body.DPhoneNumber,
      DEmailAddress: req.body.DEmailAddress,
      DSpecialty: req.body.DSpecialty,
      DExperience: req.body.DExperience,
      DOB: req.body.DOB,
      DAbout: req.body.DAbout,
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
export async function getDoctorById (req, res) {
  const doctor = await Doctors.findById(req.params.id);

  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404);
    throw new Error("Doctors not found");
  }
};

// @desc    Update doctor
// @route   PUT /api/v1/doctor/:id
// @access  Public
export async function updateDoctor (req, res) {
  try {
    let doctor = await Doctors.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(doctor.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      DFirstName: req.body.DFirstName,
      DLastName: req.body.DLastName,
      DAddress: req.body.DAddress,
      DPhoneNumber: req.body.DPhoneNumber,
      DEmailAddress: req.body.DEmailAddress,
      DSpecialty: req.body.DSpecialty,
      DExperience: req.body.DExperience,
      DOB: req.body.DOB,
      DAbout: req.body.DAbout,
      // avatar: result.secure_url,
      // cloudinary_id: result.public_id,
    };
    doctor = await Doctors.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(doctor);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all Doctors
// @route   GET /api/v1/doctor
// @access  Public
export async function getAllDoctor (req, res) {
  try {
    const doctor = await Doctors.find();
    res.status(200).json(doctor);
  } catch (err) {
    res.json({ message: err });
  }
};

// @desc    Delete Doctors
// @route   DELETE /api/v1/Doctors/:id
// @access  Public
export async function deleteDoctor (req, res) {
  const doctor = await Doctors.findById(req.params.id);

  if (doctor) {
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(doctor.cloudinary_id);

    await doctor.remove();
    res.json({ message: "Doctors removed" });
  } else {
    res.status(404);
    throw new Error("Doctors not found");
  }
};
