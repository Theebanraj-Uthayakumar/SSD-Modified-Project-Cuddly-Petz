import Blog from '../models/blog.model.js'

// @desc    Create new Blog
// @route   POST /api/v1/Blog
// @access  Public
export async function addBlog (req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new Blog({
      Title: req.body.Title,
      Description: req.body.Description,
      ImageUrl: req.body.ImageUrl,
      PostedDate: req.body.PostedDate,
      PostedTime: req.body.PostedTime,
      PostedBy: req.body.PostedBy,
      BlogType: req.body.BlogType,
      // avatar: result?.secure_url,
      // cloudinary_id: result?.public_id,
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// @desc    Get docotrs by ID
// @route   GET /api/v1/docotrs/:id
// @access  Public
export async function getBlogById (req, res) {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
};

// @desc    Update blog
// @route   PUT /api/v1/blog/:id
// @access  Public
export async function updateBlog (req, res) {
  try {
    let blog = await Blog.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(blog.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      Title: req.body.Title,
      Description: req.body.Description,
      ImageUrl: req.body.ImageUrl,
      PostedDate: req.body.PostedDate,
      PostedTime: req.body.PostedTime,
      PostedBy: req.body.PostedBy,
      BlogType: req.body.BlogType,
      // avatar: result.secure_url,
      // cloudinary_id: result.public_id,
    };
    blog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all Blog
// @route   GET /api/v1/blog
// @access  Public
export async function getAllBlog (req, res) {
  
  const  type = req.query.BlogType;
  let blog;
  
  try { 
    if(type === "Blog"){
      blog = await Blog.aggregate([
        { $match : { BlogType : "Blog"}},
      ])
    }else {
      blog = await Blog.aggregate([
        { $match : { BlogType : "Article"}},
      ])
    }
    res.status(200).json(blog);
  } catch (err) {
    res.json({ message: err });
  }
};

// @desc    Delete Blog
// @route   DELETE /api/v1/Blog/:id
// @access  Public
export async function deleteBlog (req, res) {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(blog.cloudinary_id);

    await blog.remove();
    res.json({ message: "Blog removed" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
};