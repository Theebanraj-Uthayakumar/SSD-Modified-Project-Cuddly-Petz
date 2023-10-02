import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export default async function admin (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

/** auth middleware */
export async function Auth(req, res, next){
  try {
      
      // access authorize header to validate request
      const token = req.headers.authorization.split(" ")[1];

      // retrive the user details fo the logged in user
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = decodedToken;

      next()

  } catch (error) {
      res.status(401).json({ error : "Authentication Failed!"})
  }
}


export function localVariables(req, res, next){
  req.app.locals = {
      OTP : null,
      resetSession : false
  }
  next()
}


export { protect }
