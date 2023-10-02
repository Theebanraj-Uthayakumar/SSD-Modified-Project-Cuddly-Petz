import Comments from "../models/comments.model.js";

// @desc    Create new Ambulance
// @route   POST /api/v1/Ambulance
// @access  Public
export async function addComments (req, res) {
  try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req?.file?.path);

      let category = new Comments({
        BlogID: req.body.BlogID,
        CommentID: req.body.CommentID,
        Comment: req.body.Comment,
        CommentedBy: req.body.CommentedBy,
        CommentedTime: req.body.CommentedTime,
        CommentedDate: req.body.CommentedDate,
        UserType: req.body.UserType,
        CreateDate: req.body.CreateDate,
        CreateTime: req.body.CreateTime,
        
        // avatar: result?.secure_url,
        // cloudinary_id: result?.public_id,
      });

      const savedCategory = await category.save();
      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
}

// @desc    Get docotrs by ID
// @route   GET /api/v1/docotrs/:id
// @access  Public
export async function getCommentsById (req, res) {
  const comments = await Comments.findById(req.params.id);

  if (comments) {
    res.json(comments)
  } else {
    res.status(404)
    throw new Error('Comment not found')
  }
}

// @desc    Update ambulance
// @route   PUT /api/v1/ambulance/:id
// @access  Public
export async function updateComments (req, res) {
  try {
    let comments = await  Comments.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(ambulance.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
        BlogID: req.body.BlogID,
        CommentID: req.body.CommentID,
        Comment: req.body.Comment,
        CommentedBy: req.body.CommentedBy,
        CommentedTime: req.body.CommentedTime,
        CommentedDate: req.body.CommentedDate,
        UserType: req.body.UserType,
        CreateDate: req.body.CreateDate,
        CreateTime: req.body.CreateTime,
        
        // avatar: result.secure_url,
        // cloudinary_id: result.public_id,
    };
    comments = await  Comments.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(comments);
  } catch (err) {
    console.log(err);
  }
}

// @desc    Get all Ambulance
// @route   GET /api/v1/ambulance
// @access  Public
export async function getAllComments (req, res) {
  
  const BlogID = req.query.BlogID;
  let comments;
  
  try { 
    // if(type === "DR"){
    //   service = await Service.aggregate([
    //     { $match : { HID : HID}},
    //   ])
    // }else {
    //   service = await Service.aggregate([
    //     { $match : { HID : HID}},
    //   ])
    // }
    if(BlogID){
      comments = await  Comments.aggregate([
        { $match : { BlogID : BlogID }},
      ])
    }else{
      comments = await  Comments.find();
    }
    res.status(200).json(comments);
  } catch (err) {
    res.json({ message: err });
  }
}

// @desc    Delete Ambulance
// @route   DELETE /api/v1/Ambulance/:id
// @access  Public
export async function deleteComments (req, res) {
    const comments = await  Comments.findById(req.params.id)
  
    if (comments) {
      await comments.remove()
      res.json({ message: 'Comment Deleted' })
    } else {
      res.status(404)
      throw new Error('Comment not found')
    }
}

export default {
    addComments,
    getCommentsById,
    updateComments,
    getAllComments,
    deleteComments
}
