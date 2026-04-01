const mongoose = require('mongoose');
const crypto = require('crypto');

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 
}, { timestamps: true });



module.exports = mongoose.model('Wishlist', wishlistSchema);
