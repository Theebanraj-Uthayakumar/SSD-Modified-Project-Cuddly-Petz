import User from "../models/user.model.js";

// @desc    Create new User
// @route   POST /api/v1/User
// @access  Public
export async function addUser(req, res) {
  try {
    let category = new User({
      OFirstName: req.body.OFirstName,
      OLastName: req.body.OLastName,
      Address: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
      // EmailAddress: req.body.EmailAddress,
      Occupation: req.body.Occupation,
      TelephoneNo: req.body.TelephoneNo,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      UserTypeID: req.body.UserTypeID,
      UserType: req.body.UserType,
      date: req.body.date,
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
export async function getUserById(req, res) {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
}

// @desc    Update User
// @route   PUT /api/v1/User/:id
// @access  Public
export async function updateUser(req, res) {
  try {
    let user = await User.findById(req.params.id);
    const data = {
      OFirstName: req.body.OFirstName,
      OLastName: req.body.OLastName,
      Address: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
      // EmailAddress: req.body.EmailAddress,
      Occupation: req.body.Occupation,
      TelephoneNo: req.body.TelephoneNo,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      UserTypeID: req.body.UserTypeID,
      UserType: req.body.UserType,
      date: req.body.date,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}

// @desc    Get all User
// @route   GET /api/v1/User
// @access  Public
export async function getAllUser(req, res) {
  const  UserTypeID = req.query.UserID;
  let user;
  
  try { 
    if(UserTypeID){
      user = await User.aggregate([
        { $match : { UserTypeID : UserTypeID }},
      ])
    }else {
      user = await User.find();
    }
    res.status(200).json(user);
  } catch (err) {
    res.json({ message: err });
  }
}

// @desc    Delete User
// @route   DELETE /api/v1/User/:id
// @access  Public
export async function deleteUser(req, res) {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "Comment Deleted" });
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
}
