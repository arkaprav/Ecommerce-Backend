const express = require("express");
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, getProductImage } = require("../controllers/productControllers");
const validateAdmin = require("../middlewares/validateAdmin");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: './products',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.jpeg`);
  },
});

const upload = multer({ storage });

router.use(validateAdmin);
router.use(upload.single("product_image"));
router.route('/').post(createProduct);
router.route('/all').get(getAllProducts);
router.route('/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);
router.route('/product_image/:id').get(getProductImage);

module.exports = router;