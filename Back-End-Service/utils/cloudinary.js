import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: 'cloudbucket',
  api_key: '583638378746911',
  api_secret: 'ZnezkYnCUErerhatAXaH1OL3njA',
});

export default cloudinary;