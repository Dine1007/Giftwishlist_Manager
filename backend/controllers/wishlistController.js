const Wishlist = require('../models/Wishlist');

// Create a new wishlist (Owner)
const createWishlist = async (req, res) => {
  try {
    const { name } = req.body;
    const wishlist = await Wishlist.create({ name, owner: req.user.id });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all wishlists for the logged-in owner
const getMyWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(wishlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single wishlist by ID 
// Owner never sees reserved or purchased status
const getWishlistById = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ _id: req.params.id, owner: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    res.json({ wishlist});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update wishlist name (Owner)
const updateWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { name: req.body.name },
      { new: true }
    );
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a wishlist and all its items (Owner)
const deleteWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    res.json({ message: 'Wishlist deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWishlist,
  getMyWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
};
