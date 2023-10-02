import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    HID: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "PetHospital_Details",
    },
    DID: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Doctors_Details",
    },
    POID: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "PetOwner_Details",
    },
    PID: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Pet_Details",
    },
    TypeReason: {
      type: String,
      require: true,
    },
    Date: {
      type: String,
      require: true,
    },
    Time: {
      type: String,
      require: true,
    },
    Fee: {
      type: String,
      require: true,
    },
    RoomNo: {
      type: String,
      require: true,
    },
    Status: {
      type: String,
      require: true,
    },
    Note: {
      type: String,
      require: true,
    },
    File: {
      type: String,
      require: true,
    },
    // avatar: {
    //   type: String,
    //   require: false
    // },
    // cloudinary_id: {
    //   type: String,
    //   require: false
    // },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model.Appointment_Details || mongoose.model('Appointment_Details', appointmentSchema);