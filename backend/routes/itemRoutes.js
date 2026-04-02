const express = require('express');
const router = express.Router();
const { addItem, updateItem,
} = require('../controllers/itemController');

const { protect } = require('../middleware/authMiddleware');

router.post('/:wishlistId/items', protect, addItem);
router.put('/:wishlistId/items/:itemId', protect, updateItem);

module.exports = router;
