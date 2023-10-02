import mongoose from "mongoose";

const category = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      require: true,
    },
    CategoryDescription: {
      type: String,
      require: true,
    },
    FormType: {
      type: String,
      require: true,
    },
    // avatar: {
    //   type: String,
    //   require: true
    // },
    // cloudinary_id: {
    //   type: String,
    //   require: true
    // },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model.Category || mongoose.model("Category", category);
