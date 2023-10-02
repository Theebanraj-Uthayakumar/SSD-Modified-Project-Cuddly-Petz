import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    BlogID: {
        type: String,
        require: true
    },
    CommentID: {
        type: String,
        require: true
    },
    Comment: {
        type: String,
        require: true
    },
    CommentedBy: {
        type: String,
        require: true
    },
    CommentedTime: {
        type: String,
        require: true
    },
    CommentedDate: {
        type: String,
        require: true
    },
    UserType: {//Hospital/Doctor/Pet Shop/Pet Owner
      type: String,
      require: false
    },
    CreateDate: {
      type: String,
      require: false
    },
    CreateTime: {
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

export default mongoose.model.Users || mongoose.model('Comments_Details', commentsSchema);