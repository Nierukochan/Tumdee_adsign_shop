const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    db(null, 'public/images')
  },filename: (req, file, cb) => {
    db(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage
})

module.exports = upload