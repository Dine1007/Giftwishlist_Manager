const WishlistItem = require('../models/WishlistItem');
const Wishlist = require('../models/Wishlist');

// Add item to a wishlist (Owner only)
const addItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.wishlistId, owner: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    const { name, price, priority, url } = req.body;
    const item = await WishlistItem.create({
      name,
      price,
      priority,
      url,
      wishlist: wishlist._id,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit an item (Owner only)
const updateItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.wishlistId, owner: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    const item = await WishlistItem.findOneAndUpdate(
      { _id: req.params.itemId, wishlist: wishlist._id },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  addItem,
  updateItem,
  
};
