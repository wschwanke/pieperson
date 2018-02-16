const logger = require('../lib/logger');
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
    logger.info(`Updated Account: ${account}`);
    return account;
  })
  .catch((err) => {
    logger.debug(`Account Model - addAccount: ${err}`);
    return err;
  });
};

accountController.addStashToAccount = (accountName, stashMongoId) => {
  return Account.findOneAndUpdate({ accountName }, { $push: { stashes: stashMongoId } }, { new: true, upsert: true }).exec()
  .then((account) => {
    console.log(account)
    return account;
  })
  .catch((err) => {
    logger.error(`Account Model - addStashToAccount: ${err}`);
  });
}

module.exports = accountController;
