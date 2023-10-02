import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    Title: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    ImageUrl: {
        type: String,
        require: true
    },
    PostedDate: {
        type: String,
        require: true
    },
    PostedTime: {
        type: String,
        require: true
    },
    PostedBy: {
        type: String,
        require: true
    },
    BlogType: {
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

export default mongoose.model.Blog_Details || mongoose.model('Blog_Details', blogSchema);

// 1.	Blog ID
// 2.	Title
// 3.	Description
// 4.	Posted Date
// 5.	Posted Time
// 6.	Posted By
// 7.	User Type – Hospital/Doctor/Pet Shop/Pet Owner