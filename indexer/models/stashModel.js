const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stashSchema = new Schema({
  stash_id: { type: String, default: null },
  stash_name: String,
  stash_type: String,
  stash_items: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Stash', stashSchema);
