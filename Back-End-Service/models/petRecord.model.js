import mongoose from "mongoose";

const petRecordSchema = new mongoose.Schema(
  {
    PetName: {
      type: String,
      require: true,
    },
    PetOwnerID: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "PetOwner_Details",
    },
    RecordType: {
      type: String,
      require: true,
    },
    Note: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    cloudinary_id: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model.Pet_Record ||
  mongoose.model("Pet_Record", petRecordSchema);
