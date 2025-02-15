import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "audio") {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid audio file type"), false);
    }
  } else if (file.fieldname === "thumbnail" || file.fieldname === "banner") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image file type"), false);
    }
  } else {
    cb(new Error("Unexpected field"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {},
});

export default upload;
