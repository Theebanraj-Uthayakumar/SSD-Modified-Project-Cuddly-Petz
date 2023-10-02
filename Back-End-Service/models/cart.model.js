import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    PetOwnerID: {
        type: String,
        require: true
    },
    ProductID: {
        type: String,
        require: true
    },
    Qty: {
        type: String,
        require: true
    },
    Amount: {
        type: String,
        require: true
    },
    Date: {
        type: String,
        require: true
    },
    Time: {
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

export default mongoose.model.Cart_Details || mongoose.model('Cart_Details', cartSchema);