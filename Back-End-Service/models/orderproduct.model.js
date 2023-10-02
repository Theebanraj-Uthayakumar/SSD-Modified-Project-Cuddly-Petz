import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema(
  {
    OrderID: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Order_Details",
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Product_Details",
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
        type: Date,
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

export default mongoose.model.OrderProduct_Details || mongoose.model('OrderProduct_Details', orderProductSchema);