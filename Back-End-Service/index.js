import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';
import bodyParser from 'body-parser';
import { notFound, errorHandler } from "./middlewares/error.Middleware.js";
import connectDB from "./config/db.js";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import https from 'https';
import fs from 'fs';

//Import Routes
import usermanagement from "./routes/user.routes.js";
import commentsmanagement from "./routes/comments.routes.js";
import petshopmanagement from "./routes/petshop.routes.js";
import productmanagement from "./routes/product.routes.js";
import ordermanagement from "./routes/order.routes.js";
import orderproductmanagement from "./routes/orderproduct.routes.js";
import cartproductmanagement from "./routes/cart.routes.js";
import servicemanagement from "./routes/service.routes.js";
import petownermanagement from "./routes/petowners.routes.js";
import petmanagement from "./routes/pet.routes.js";
import pethospitalmanagement from "./routes/pethospital.routes.js";
import doctormanagement from "./routes/doctor.routes.js";
import appointmentmanagement from "./routes/appointment.routes.js";
import blogmanagement from "./routes/blog.routes.js";
import petrecordmanagement from "./routes/petRecord.routes.js";
import categorymanagement from "./routes/category.routes.js";
// import authRoute from "./controller/auth.controller.js";
import authenticationRoutes from "./routes/authentication.routes.js";

const app = express();

import http from "http"; // Import the http module

const server = http.createServer(app); // Create the server

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

app.use('/api/', apiLimiter);

app.use(helmet());

dotenv.config();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000/',
};

app.use(cors());

// Load your SSL/TLS certificate and private key
// const privateKey = fs.readFileSync('./cert/key.pem', 'utf8');
// const certificate = fs.readFileSync('./cert/cert.pem', 'utf8');
// const ca = fs.readFileSync('./cert/csr.pem', 'utf8');

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

// Create an HTTPS server
// const httpsServer = https.createServer(credentials, app);

connectDB();

//Route Middlewares
app.use("/api/v1/user", usermanagement);
app.use("/api/v1/comments", commentsmanagement);
app.use("/api/v1/petshop", petshopmanagement);
app.use("/api/v1/product", productmanagement);
app.use("/api/v1/order", ordermanagement);
app.use("/api/v1/orderproduct", orderproductmanagement);
// app.use("/api/v1/doctor", Usermanagement);
app.use("/api/v1/service", servicemanagement);
app.use("/api/v1/petowners", petownermanagement);
app.use("/api/v1/pet", petmanagement);
app.use("/api/v1/pethospital", pethospitalmanagement);
app.use("/api/v1/doctor", doctormanagement);
app.use("/api/v1/appointment", appointmentmanagement);
app.use("/api/v1/blog", blogmanagement);
// app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cart", cartproductmanagement);
app.use("/api/v1/pet-record", petrecordmanagement);
app.use("/api/v1/category", categorymanagement);
app.use('/api/v1', authenticationRoutes);

app.get('/health-check', (req, res) => {
  res.send('OK!');
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
