import Category from "../models/category.model.js";

// @desc    Create new Category
// @route   POST /api/v1/Category
// @access  Public
export async function addCategory(req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new Category({
      CategoryName: req.body.CategoryName,
      CategoryDescription: req.body.CategoryDescription,
      FormType: req.body.FormType,
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
export async function getCategoryById(req, res) {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
}

// @desc    Update category
// @route   PUT /api/v1/category/:id
// @access  Public
export async function updateCategory(req, res) {
  try {
    let category = await Category.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(category.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      CategoryName: req.body.CategoryName,
      CategoryDescription: req.body.CategoryDescription,
      FormType: req.body.FormType,
      avatar: req.body.avatar,
      cloudinary_id: req.body.cloudinary_id,
    };
    category = await Category.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(category);
  } catch (err) {
    console.log(err);
  }
}

// @desc    Get all Category
// @route   GET /api/v1/category
// @access  Public
export async function getAllCategory(req, res) {
  const type = req.query.FormType;
  let category;

  try {
    if (type === "DR") {
      category = await Category.aggregate([{ $match: { FormType: "DR" } }]);
    } else if (type === "PS") {
      category = await Category.aggregate([{ $match: { FormType: "PS" } }]);
    }else {
      category = await Category.find();
    }
    res.status(200).json(category);
  } catch (err) {
    res.json({ message: err });
  }
}

// @desc    Delete Category
// @route   DELETE /api/v1/Category/:id
// @access  Public
export async function deleteCategory(req, res) {
  const category = await Category.findById(req.params.id);

  if (category) {
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(category.cloudinary_id);

    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
}
