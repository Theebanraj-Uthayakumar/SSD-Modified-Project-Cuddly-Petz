import Appointment from "../models/appointment.model.js";
import PetOwner from "../models/petOwner.model.js";
import PetHospital from "../models/petHospital.model.js";
import Pet from "../models/pet.model.js";
import Doctor from "../models/doctor.model.js";

// @desc    Create new Appointment
// @route   POST /api/v1/Appointment
// @access  Public
export async function addAppointment(req, res) {
  try {
    const {
      HID,
      DID,
      POID,
      PID,
      TypeReason,
      Date,
      Time,
      Fee,
      RoomNo,
      Status,
      Note,
      File,
    } = req.body;

    // validate input data
    if (
      !HID ||
      !DID ||
      !POID ||
      !PID ||
      !TypeReason ||
      !Date ||
      !Time ||
      !Fee ||
      !RoomNo ||
      !Status
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const PetOwnerDetails = await PetOwner.findOne({_id:POID});
    const PetDetails = await Pet.findOne({_id:PID});
    const PetHospitalDetails = await PetHospital.findOne({_id:HID});
    const DoctorDetails = await Doctor.findOne({_id:DID});

    // sanitize input data
    const appointment = new Appointment({
      HID: PetHospitalDetails._id,
      DID: DoctorDetails._id,
      POID: PetOwnerDetails._id,
      PID: PetDetails._id,
      TypeReason: TypeReason.trim(),
      Date: Date.trim(),
      Time: Time.trim(),
      Fee: Fee.trim(),
      RoomNo: RoomNo.trim(),
      Status: Status.trim(),
      Note: Note ? Note.trim() : "",
      File: File ? File.trim() : "",
    });

    // save to database    
    const savedAppointment = await appointment.save();

    // send response
    res.status(201).json(savedAppointment);
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// @desc    Get docotrs by ID
// @route   GET /api/v1/docotrs/:id
// @access  Public
export async function getAppointmentById(req, res, next) {
  try {
    const appointmentId = req.params.id;

    // validate input data
    if (!appointmentId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // sanitize input data
    const sanitizedAppointmentId = appointmentId.trim();

    // retrieve appointment from database
    const appointment = await Appointment.findById(sanitizedAppointmentId);

    if (appointment) {
      // send appointment data
      res.json(appointment);
    } else {
      // appointment not found
      const error = new Error("Appointment not found");
      res.status(404);
      next(error);
    }
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// @desc    Update appointment
// @route   PUT /api/v1/appointment/:id
// @access  Public
export async function updateAppointment(req, res) {
  try {
    const appointmentId = req.params.id;

    // validate input data
    if (!appointmentId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // sanitize input data
    const data = {
      HID: req.body.HID,
      DID: req.body.DID,
      POID: req.body.POID,
      PID: req.body.PID,
      TypeReason: req.body.TypeReason,
      Date: req.body.Date,
      Time: req.body.Time,
      Fee: req.body.Fee,
      RoomNo: req.body.RoomNo,
      Status: req.body.Status,
      Note: req.body.Note,
      File: req.body.File,
    };

    // update appointment in database
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedAppointment) {
      // send updated appointment data
      res.json(updatedAppointment);
    } else {
      // appointment not found
      return res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// @desc    Get all Appointment
// @route   GET /api/v1/appointment
// @access  Public
export async function getAllAppointment(req, res) {
  try {
    const appointment = await Appointment.find().populate('HID').populate('DID').populate('POID').populate('PID');
  //res.status(200).json(movie);
    res.status(200).json(appointment);
  } catch (err) {
    res.json({ message: err });
  }
}

export async function getAllAppointment_V2(req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // get the page number from the query parameter
    const limit = parseInt(req.query.limit) || 10; // get the page size from the query parameter
    const skip = (page - 1) * limit; // calculate the number of documents to skip

    // retrieve appointments from database
    const appointments = await Appointment.find()
      .skip(skip)
      .limit(limit)
      .sort({ Date: "desc" })
      .exec();

    const totalDocuments = await Appointment.countDocuments(); // count the total number of documents in the collection

    // send response
    res.status(200).json({
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page,
      appointments,
    });
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// @desc    Delete Appointment
// @route   DELETE /api/v1/Appointment/:id
// @access  Public
export async function deleteAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      await appointment.remove();
      res.json({ message: "Appointment removed" });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAppoinmentWithDetails(req, res) {
  const POID = req.query.POID;
  const HID = req.query.HID;
  let appointment;

  try {
    appointment = await Appointment.aggregate([{ $match: { POID: { "_id" :"645353ca1e060cb6962b77e5"} } }]);
    res.status(200).json(appointment);
  } catch (err) {
    res.json({ message: err });
  }

  // try {

  //   const pipeline = [
  //     {
  //       $lookup: {
  //         from: "petowner_details",
  //         localField: "POID",
  //         foreignField: "_id",
  //         as: "petowner_details"
  //       },
  //       $lookup: {
  //         from: "doctor_details",
  //         localField: "DID",
  //         foreignField: "_id",
  //         as: "doctor_details"
  //       },
  //       $lookup: {
  //         from: "pet_details",
  //         localField: "PID",
  //         foreignField: "_id",
  //         as: "pet_details"
  //       },
  //       $lookup: {
  //         from: "pethospital_details",
  //         localField: "HID",
  //         foreignField: "_id",
  //         as: "pethospital_details"
  //       }
  //     }
  //   ];

  //   const result = await Appointment.aggregate(pipeline);
  //   res.json(result);

  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Internal server error');
  // } finally {
  //   await client.close();
  // }
}

export async function getAllAppoinmentDetails(req, res) {
  const POID = req.query.POID;
  const HID = req.query.HID;
  let appointment;

  try {
    if (POID) {
      appointment = await Appointment.find({ POID : POID }).populate('HID').populate('DID').populate('POID').populate('PID');
      res.status(200).json(appointment);
    } else if (HID) {
      appointment = await Appointment.find({ HID : HID }).populate('HID').populate('DID').populate('POID').populate('PID');
      res.status(200).json(appointment);
    }else {
      const appointment = await Appointment.find().populate('HID').populate('DID').populate('POID').populate('PID');
      res.status(200).json(appointment);
    }
  } catch (err) {
    res.json({ message: err });
  }
}
