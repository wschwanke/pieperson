const logger = require('../lib/logger');
// Model
const Account = require('../models/accountModel.js');

const accountController = {};

/*
  addAccount( name String )
*/
accountController.addAccount = (accountName, lastCharacter) => {
  return Account.findOneAndUpdate({ account_name: accountName },
    {
      account_name: accountName,
      account_last_character: lastCharacter
    },
    {
      new: true,
      upsert: true
    }
  ).exec()
  .then((account) => {
    return account;
  })
  .catch((err) => {
    logger.error(`accountController.addAccount - findOneAndUpdate: ${err}`);
    return err;
  });
};

accountController.addItemToAccount = (accountName, itemMongoId) => {
  return Account.findOneAndUpdate({ account_name: accountName }, { $push: { account_item_ids: itemMongoId } }, { new: true, upsert: true }).exec()
  .then((item) => {
    return item;
  })
  .catch((err) => {
    logger.error(`accountController.addItemToAccount - findOneAndUpdate: ${err}`);
    return err;
  });
}

module.exports = accountController;
