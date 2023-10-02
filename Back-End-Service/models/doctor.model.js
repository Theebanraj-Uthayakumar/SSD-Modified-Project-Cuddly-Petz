import mongoose from "mongoose";

const doctorsSchema = new mongoose.Schema(
  {
    DFirstName: {
        type: String,
        require: true
    },
    DLastName: {
        type: String,
        require: true
    },
    DAddress: {
        type: String,
        require: true
    },
    DPhoneNumber: {
        type: String,
        require: true
    },
    DEmailAddress: {
        type: String,
        require: true
    },
    DSpecialty: {
        type: String,
        require: true
    },
    DExperience: {
        type: String,
        require: true
    },
    DOB: {
        type: String,
        require: true
    },
    DAbout: {
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

export default mongoose.model.Doctors_Details || mongoose.model('Doctors_Details', doctorsSchema);

// 1.	Doctor ID
// 2.	Doctor First name
// 3.	Doctor Last name
// 4.	Address
// 5.	Phone number
// 6.	Email address
// 7.	Experience
// 8.	Specialty
// 9.	DOB
// 10.	About
