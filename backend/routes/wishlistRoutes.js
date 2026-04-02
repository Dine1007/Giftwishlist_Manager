const express = require('express');
const router = express.Router();
const {
  createWishlist,
  getMyWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
  getSharedWishlist,

} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, createWishlist);
router.get('/', protect, getMyWishlists);
router.get('/:id', protect, getWishlistById);
router.put('/:id', protect, updateWishlist);
router.delete('/:id', protect, deleteWishlist);
router.get('/shared/:shareLink', getSharedWishlist); // No auth required for shared view

module.exports = router;
