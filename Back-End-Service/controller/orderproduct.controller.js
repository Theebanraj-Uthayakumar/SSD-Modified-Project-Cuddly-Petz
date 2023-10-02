import OrderProduct from "../models/orderproduct.model.js";

// @desc    Create new OrderProduct
// @route   POST /api/v1/OrderProduct
// @access  Public
export async function addOrderProduct (req, res) {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req?.file?.path);

    let category = new OrderProduct({
      OrderID: req.body.OrderID,
      ProductID: req.body.ProductID,
      Qty: req.body.Qty,
      Amount: req.body.Amount,
      Date: req.body.Date,
      Time: req.body.Time,

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
export async function getOrderProductById (req, res) {
  const orderproduct = await OrderProduct.findById(req.params.id);

  if (orderproduct) {
    res.json(orderproduct);
  } else {
    res.status(404);
    throw new Error("OrderProduct not found");
  }
};

// @desc    Update OrderProduct
// @route   PUT /api/v1/OrderProduct/:id
// @access  Public
export async function updateOrderProduct (req, res) {
  try {
    let orderproduct = await OrderProduct.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(OrderProduct.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      OrderID: req.body.OrderID,
      ProductID: req.body.ProductID,
      Qty: req.body.Qty,
      Amount: req.body.Amount,
      Date: req.body.Date,
      Time: req.body.Time,

      // avatar: result.secure_url,
      // cloudinary_id: result.public_id,
    };
    orderproduct = await OrderProduct.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(orderproduct);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all OrderProduct
// @route   GET /api/v1/OrderProduct
// @access  Public
export async function getAllOrderProduct (req, res) {
  // try {
  //   const orderproduct = await OrderProduct.find();
  //   res.status(200).json(orderproduct);
  // } catch (err) {
  //   res.json({ message: err });
  // }
  const POID = req.query.POID;
  const PSID = req.query.PSID;
  let orderproduct;

  try {
    if (POID) {
      orderproduct = await OrderProduct.find({ OrderProduct_Details : {PetOwnerID : ObjectId(POID) }}).populate('OrderID').populate('ProductID');
      res.status(200).json(orderproduct);
    } else if (PSID) {
      //orderproduct = await OrderProduct.find({ Product_Details : { PetShopID : ObjectId(PSID)}}).populate('OrderID').populate('ProductID');
      orderproduct = await OrderProduct.find().populate('OrderID').populate('ProductID');
      res.status(200).json(orderproduct);
    }else {
      orderproduct = await OrderProduct.find().populate('OrderID').populate('ProductID');
      res.status(200).json(orderproduct);
    }
  } catch (err) {
    res.json({ message: err });
  }

};

// @desc    Delete OrderProduct
// @route   DELETE /api/v1/OrderProduct/:id
// @access  Public
export async function deleteOrderProduct (req, res) {
  const orderproduct = await OrderProduct.findById(req.params.id);

  if (orderproduct) {
    await orderproduct.remove();
    res.json({ message: "OrderProduct Deleted" });
  } else {
    res.status(404);
    throw new Error("OrderProduct not found");
  }
};

export async function getOrdersListForPetShop (req, res) {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "petowner_details",
          localField: "order_details.PetOwnerID",
          foreignField: "petowner_details._id",
          as: "petowner_details",
        },
        $lookup: {
          from: "product_details",
          localField: "OrderID",
          foreignField: "product_details._id",
          as: "product_details",
        },
        $lookup: {
          from: "order_details",
          localField: "OrderID",
          foreignField: "order_details._id",
          as: "order_details",
        },
      },
    ];

    const result = await OrderProduct.aggregate(pipeline);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  } finally {
    await client.close();
  }
};