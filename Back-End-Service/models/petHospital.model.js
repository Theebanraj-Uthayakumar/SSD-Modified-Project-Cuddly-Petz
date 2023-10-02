import mongoose from "mongoose";

const petHospitalShema = new mongoose.Schema(
  {
    HName: {
      type: String,
      require: true,
    },
    HAddress: {
      type: String,
      require: true,
    },
    HPhoneNumber: {
      type: String,
      require: true,
    },
    HEmailAddress: {
      type: String,
      require: true,
    },
    HWebsite: {
      type: String,
      require: true,
    },
    HOpenTime: {
      type: String,
      require: true,
    },
    // HCloseTime: {
    //   type: String,
    //   require: true,
    // },
    HGoogleLocation: {
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

export default mongoose.model.PetHospital_Details || mongoose.model('PetHospital_Details', petHospitalShema);