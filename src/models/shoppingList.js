const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }]
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);
module.exports = ShoppingList;
