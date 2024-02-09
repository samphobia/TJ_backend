// middleware/upload.ts
import multer from 'multer';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
      interface Request {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          file: any; // Adjust the type according to your multer setup
      }
  }
}



// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename for uploaded files
  }
});

// Create Multer instance with storage configuration
const upload = multer({ storage: storage });

export default upload;
