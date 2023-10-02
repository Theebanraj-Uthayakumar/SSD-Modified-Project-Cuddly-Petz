import Order from "../models/order.model.js";

// @desc    Create new Order
// @route   POST /api/v1/Order
// @access  Public
export async function addOrder (req, res) {
  try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req?.file?.path);

      let category = new Order({
        PetOwnerID: req.body.PetOwnerID,
        PetShopID: req.body.PetShopID,
        PickupMethod: req.body.PickupMethod,
        OrderDate: req.body.OrderDate,
        OrderTime: req.body.OrderTime,
        TotalAmount: req.body.TotalAmount,
        PaymentMethod: req.body.PaymentMethod,
        OrderStatus: req.body.OrderStatus,
        
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
export async function getOrderById (req, res) {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
};

// @desc    Update Order
// @route   PUT /api/v1/Order/:id
// @access  Public
export async function updateOrder (req, res) {
  try {
    let order = await Order.findById(req.params.id);
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(Order.cloudinary_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
    //   result = await cloudinary.uploader.upload(req.file.path);
    // }
    const data = {
      PetOwnerID: req.body.PetOwnerID,
      PetShopID: req.body.PetShopID,
      PickupMethod: req.body.PickupMethod,
      OrderDate: req.body.OrderDate,
      OrderTime: req.body.OrderTime,
      TotalAmount: req.body.TotalAmount,
      PaymentMethod: req.body.PaymentMethod,
      OrderStatus: req.body.OrderStatus,
        
        // avatar: result.secure_url,
        // cloudinary_id: result.public_id,
    };
    order = await Order.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};

// @desc    Get all Order
// @route   GET /api/v1/Order
// @access  Public
export async function getAllOrder (req, res) {
  const POID = req.query.POID;
  let orders;
  
  try {
      if(POID){
        // orders = await Order.aggregate([
        // { $match : {
        //   PetOwnerID : POID }}
        // ]).populate('PetOwnerID');
        orders = await Order.find({PetOwnerID : POID}).populate('PetOwnerID');
        res.status(200).json(orders);
      }else{       
        const orders = await Order.find();
        res.status(200).json(orders); 
      }
  } catch (err) {
    res.json({ message: err });
  }
};

// @desc    Delete Order
// @route   DELETE /api/v1/Order/:id
// @access  Public
export async function deleteOrder (req, res) {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      await order.remove()
      res.json({ message: 'Order Deleted' })
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
};