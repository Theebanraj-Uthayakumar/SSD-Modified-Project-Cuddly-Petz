import mongoose from "mongoose";

const petOwnerSchema = new mongoose.Schema(
  {
    OFirstName: {
        type: String,
        require: true
    },
    OLastName: {
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    PhoneNumber: {
        type: String,
        require: true
    },
    EmailAddress: {
        type: String,
        require: true
    },
    Occupation: {
        type: String,
        require: true
    },
    TelephoneNo: {
        type: String,
        require: true
    },
    // MobileNo: {
    //     type: String,
    //     require: true
    // },
    EmergencyContact: {
        type: String,
        require: true
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
)

export default mongoose.model.PetOwner_Details || mongoose.model('PetOwner_Details', petOwnerSchema);