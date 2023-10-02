import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    HID: {
        type: String,
        require: true
    },
    ServiceName: {
        type: String,
        require: true
    }
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

export default mongoose.model.Service_Details || mongoose.model('Service_Details', serviceSchema);