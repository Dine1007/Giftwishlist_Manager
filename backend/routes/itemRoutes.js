const express = require('express');
const router = express.Router();
const { addItem} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:wishlistId/items', protect, addItem);

module.exports = router;
