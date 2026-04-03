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

// Delete an item (Owner only)
const deleteItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.wishlistId, owner: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    const item = await WishlistItem.findOneAndDelete({ _id: req.params.itemId, wishlist: wishlist._id });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reserve an item (Guest only - must be logged in)
const reserveItem = async (req, res) => {
  try {
    const item = await WishlistItem.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Owner cannot reserve their own items
    const wishlist = await Wishlist.findById(item.wishlist);
    if (wishlist.owner.toString() === req.user.id) {
      return res.status(403).json({ message: 'Owners cannot reserve their own items' });
    }

    if (item.status !== 'available') {
      return res.status(400).json({ message: 'Item is not available for reservation' });
    }

    item.status = 'reserved';
    item.reservedBy = req.user.id;
    await item.save();

    const populated = await WishlistItem.findById(item._id)
      .populate('reservedBy', 'name')
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addItem,
  updateItem,
  deleteItem,
  reserveItem,
};
