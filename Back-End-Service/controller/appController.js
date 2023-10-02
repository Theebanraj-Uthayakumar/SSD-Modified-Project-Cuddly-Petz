import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from 'nodemailer';
import CryptoJS from "crypto-js";

const CryptoJSKey = "O8sD0AemgRU52rM0oc7U7LsFAh6Pndn8km7fTGbOFfsgymNjS0"

/** middleware for verify user */
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

/** POST: http://localhost:4000/api/v1/register 
 * @param : {
  "name" : "Theeban",
  "password" : "admin123",
  "email": "theeban+11@gmail.com",
  "UserTypeID": "19063324",
  "UserType": "Admin"
}
*/
export async function register(req, res) {
  try {
    const { name, password, UserTypeID, email, UserType } = req.body;

    const userNameVar = CryptoJS.AES.decrypt(name, CryptoJSKey).toString(CryptoJS.enc.Utf8);
    const passwordVar = CryptoJS.AES.decrypt(password, CryptoJSKey).toString(CryptoJS.enc.Utf8);
    const emailVar = CryptoJS.AES.decrypt(email, CryptoJSKey).toString(CryptoJS.enc.Utf8);

    // check the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ userNameVar }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username" });

        resolve();
      });
    });

    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ emailVar }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique Email" });

        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (passwordVar) {
          bcrypt
            .hash(passwordVar, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                userNameVar,
                password: hashedPassword,
                UserTypeID,
                emailVar,
                UserType,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/** POST: http://localhost:4000/api/v1/login 
 * @param: {
    "name" : "Theeban",
    "password" : "admin123"
}
*/
export async function login(req, res) {
  const { name, password } = req.body;
  const userNameVar = CryptoJS.AES.decrypt(name, CryptoJSKey).toString(CryptoJS.enc.Utf8);
  const passwordVar = CryptoJS.AES.decrypt(password, CryptoJSKey).toString(CryptoJS.enc.Utf8);

  try {
    // Find the user by the decrypted username
    UserModel.findOne({ name: userNameVar })
      .then((user) => {

        if (!user) {
          return res.status(404).send({ error: "Username not Found" });
        }

        // Compare the decrypted password with the hashed password in the database
        bcrypt.compare(passwordVar, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send({ error: "Password does not Match" });
            }

            // Create and send a JWT token upon successful login
            const token = jwt.sign(
              {
                userId: user._id,
                name: user.name,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successful...!",
              name: user.name,
              UserTypeID: user.UserTypeID,
              UserType: user.UserType,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password comparison error" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
}

/** GET: http://localhost:4000/api/user/example123 */
export async function getUser(req, res) {
  const { name } = req.params;

  try {
    if (!name) return res.status(501).send({ error: "Invalid Username" });

    UserModel.findOne({ name }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user)
        return res.status(501).send({ error: "Couldn't Find the User" });

      /** remove password from user */
      // mongoose return unnecessary data with object so convert it into json
      const { password, ...rest } = Object.assign({}, user.toJSON());

      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
}

/** PUT: http://localhost:4000/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
  try {
    // const id = req.query.id;
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      // update the data
      UserModel.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;

        return res.status(201).send({ msg: "Record Updated...!" });
      });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** GET: http://localhost:4000/api/v1/generateOTP?email=example@gmail.com */
export async function generateOTP(req, res) {
  const { email } = req.query;
  const user = UserModel.findOne({ email });

  if (user) {
    const OTP = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Set expiration time of OTP to 5 minutes from now
    const now = new Date();
    const expirationTime = new Date(now.getTime() + 10 * 60 * 1000);

    // Save OTP and expiration time to local variables
    req.app.locals.OTP = OTP;
    req.app.locals.OTPExpiration = expirationTime;

    // Send OTP to entered email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Your OTP for login",
      text: `Your OTP is: ${OTP}. This OTP you can use only once and the OTP validation period is only five minute`,
    };

    console.log(mailOptions.text);

    res.status(201).send({ success: "OTP sent to your email", OTP: mailOptions.text });

    // ! Have to uncomment the below code
    
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //     res.status(500).send({ error: "Failed to send OTP" });
    //   } else {
    //     console.log("Email sent: " + info.response);
    //     res.status(201).send({ success: "OTP sent to your email" });
    //   }
    // });
  } else {
    res.status(404).send({ error: "User not found" });
  }
}

/** GET: http://localhost:4000/api/v1/verifyOTP?code=129215 */
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Verify Successsfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:4000/api/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}

// update the password when we have valid session
/** PUT: http://localhost:4000/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    // if (!req.app.locals.resetSession)
    //   return res.status(440).send({ error: "Session expired!" });

    const { name, password } = req.body;

    try {
      UserModel.findOne({ name })
        .then((user) => {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              UserModel.updateOne(
                { name: user.name },
                { password: hashedPassword },
                function (err, data) {
                  if (err) throw err;
                  // req.app.locals.resetSession = false; // reset session
                  return res.status(201).send({ msg: "Record Updated...!" });
                }
              );
            })
            .catch((e) => {
              return res.status(500).send({
                error: "Username not Found",
              });
            });
        })
        .catch((error) => {
          return res.status(404).send({ error: "Username not Found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}
