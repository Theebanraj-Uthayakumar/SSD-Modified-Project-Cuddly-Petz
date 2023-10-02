import mongoose from "mongoose";

const petshopSchema = new mongoose.Schema(
  {
    ShopID: {
        type: String,
        require: true
    },
    ShopName: {
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    GoogleLocation: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Telephone: {
        type: String,
        require: true
    },
    Mobile: {
      type: String,
      require: false
    },
    OpenTime: {
      type: String,
      require: false
    },
    CloseTime: {
      type: String,
      require: false
    },
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

export default mongoose.model.PetShop_Details || mongoose.model('PetShop_Details', petshopSchema);