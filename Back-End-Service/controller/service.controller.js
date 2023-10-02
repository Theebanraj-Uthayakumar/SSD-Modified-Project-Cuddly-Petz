import Service from "../models/service.model.js";

// @desc    Create new Service
// @route   POST /api/v1/Service
// @access  Public
export async function addService (req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new Service({
      HID: req.body.HID,
      ServiceName: req.body.ServiceName,
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
export async function getServiceById (req, res) {
  const service = await Service.findById(req.params.id);

  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
};

// @desc    Update service
// @route   PUT /api/v1/service/:id
// @access  Public
export async function updateService (req, res) {
  try {
    let service = await Service.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(service.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      HID: req.body.HID,
      ServiceName: req.body.ServiceName,
      PostedDate: req.body.PostedDate,
      // avatar: result.secure_url,
      // cloudinary_id: result.public_id,
    };
    service = await Service.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(service);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all Service
// @route   GET /api/v1/service
// @access  Public
export async function getAllService (req, res) {
  
  const HID = req.query.HID;
  let service;
  
  try { 
    // if(type === "DR"){
    //   service = await Service.aggregate([
    //     { $match : { HID : HID}},
    //   ])
    // }else {
    //   service = await Service.aggregate([
    //     { $match : { HID : HID}},
    //   ])
    // }
    service = await Service.aggregate([
      { $match : { HID : HID }},
    ])
    res.status(200).json(service);
  } catch (err) {
    res.json({ message: err });
  }
};

// @desc    Delete Service
// @route   DELETE /api/v1/Service/:id
// @access  Public
export async function deleteService (req, res) {
  const service = await Service.findById(req.params.id);

  if (service) {
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(service.cloudinary_id);

    await service.remove();
    res.json({ message: "Service removed" });
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
};
