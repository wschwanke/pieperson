const logger = require('../lib/logger');
// Model
const Item = require('../models/itemModel.js');

const itemController = {};

/*
  exampleController( name String )
*/
itemController.addItem = (itemObject) => {
  return Item.findOneAndUpdate({ id: itemObject.id }, itemObject, { new: true, upsert: true }).exec()
  .then((item) => {
    return item;
  })
  .catch((err) => {
    logger.error(`itemController.addItem - findOneAndUpdate: ${err}`);
    return err
  });
};

module.exports = itemController;
