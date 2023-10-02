import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ProductID: {
        type: String,
        require: true
    },
    PetShopID: {
        type: String,
        require: true
    },
    ProductName: {
        type: String,
        require: true
    },
    ProductDescription: {
        type: String,
        require: true
    },
    ProductCategory: {
        type: String,
        require: true
    },
    ProductImage: {
        type: String,
        require: true
    },
    Price: {
        type: String,
        require: true
    },
    Manufacturer: {
        type: String,
        require: true
    },
    Stock: {
        type: String,
        require: true
    },
    PostedDate: {
        type: Date,
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

export default mongoose.model.Product_Details || mongoose.model('Product_Details', productSchema);