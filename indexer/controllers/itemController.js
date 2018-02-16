const logger = require('../lib/logger');
const Item = require('../models/itemModel.js');

const itemController = {};

/*
  exampleController( name String )
*/
itemController.addItem = (itemObject) => {
  return Item.findOneAndUpdate(itemObject.id, itemObject, { new: true, upsert: true }).exec()
  .then((item) => {
    console.log(item);
  })
  .catch((err) => {
    console
  });
};

module.exports = itemController;
