const express = require('express');
const router = express.Router();
const { addItem, updateItem, deleteItem, reserveItem,
} = require('../controllers/itemController');

const { protect } = require('../middleware/authMiddleware');

router.post('/:wishlistId/items', protect, addItem);
router.put('/:wishlistId/items/:itemId', protect, updateItem);
router.delete('/:wishlistId/items/:itemId', protect, deleteItem);
router.put('/items/:itemId/reserve', protect, reserveItem);


module.exports = router;
