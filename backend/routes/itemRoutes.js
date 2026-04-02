const express = require('express');
const router = express.Router();
const { addItem, updateItem, deleteItem
} = require('../controllers/itemController');

const { protect } = require('../middleware/authMiddleware');

router.post('/:wishlistId/items', protect, addItem);
router.put('/:wishlistId/items/:itemId', protect, updateItem);
router.delete('/:wishlistId/items/:itemId', protect, deleteItem);

module.exports = router;
