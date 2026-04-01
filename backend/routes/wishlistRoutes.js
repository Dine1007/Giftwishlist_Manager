const express = require('express');
const router = express.Router();
const {
  createWishlist,
  getMyWishlists,

} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, createWishlist);
router.get('/', protect, getMyWishlists);

module.exports = router;
