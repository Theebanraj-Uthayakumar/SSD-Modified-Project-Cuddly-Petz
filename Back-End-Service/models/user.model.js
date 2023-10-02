import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    OFirstName: {
      type: String,
      require: true,
    },
    OLastName: {
      type: String,
      require: true,
    },
    Address: {
      type: String,
      require: true,
    },
    PhoneNumber: {
      type: String,
      require: true,
    },
    // EmailAddress: {
    //   type: String,
    //   require: true,
    // },
    Occupation: {
      type: String,
      require: true,
    },
    TelephoneNo: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      required: [true, "Please provide unique Username"],
      unique: [true, "Username Exist"],
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: [true, "Please provide a unique email"],
      unique: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    UserTypeID: {
      type: String,
      require: true,
    },
    UserType: {
      type: String,
      enum: ["PetOwner", "PetShop", "PetHospital", "Admin"],
      // default: "Pet Owner",
    },
    date: {
      type: String,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model.Users ||
  mongoose.model("User_Details", userSchema);
