const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  url: { type: String, default: '' },
  wishlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist', required: true },
  
}, { timestamps: true });

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
