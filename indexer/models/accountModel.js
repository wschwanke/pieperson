const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  account_name: {
    type: String,
    index: true,
    unique: true
  },
  account_last_character: String,
  account_item_ids: [Schema.Types.ObjectId],
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Account', accountSchema);
