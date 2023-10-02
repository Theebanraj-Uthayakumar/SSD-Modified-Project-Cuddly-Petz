import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    PetOwnerID: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "PetOwner_Details",
    },
    PetShopID: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "PetShop_Details",
    },
    PickupMethod: {
        type: String,
        require: true
    },
    OrderDate: {
        type: String,
        require: true
    },
    OrderTime: {
        type: String,
        require: true
    },
    TotalAmount: {
        type: String,
        require: true
    },
    PaymentMethod: {
        type: String,
        require: true
    },
    OrderStatus: {
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

export default mongoose.model.Order_Details || mongoose.model('Order_Details', orderSchema);