import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    PetName: {
        type: String,
        require: true
    },
    PetOwnerID: {
      type: String,
      require: true
    },
    SelectedType: {
        type: String,
        require: true
    },
    SelectedBreed: {
        type: String,
        require: true
    },
    Age: {
        type: String,
        require: true
    },
    Sex: {
        type: String,
        require: true
    },
    avatar: {
      type: String,
      require: true
    },
    cloudinary_id: {
      type: String,
      require: true
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

export default mongoose.model.Pet_Details || mongoose.model('Pet_Details', petSchema);
