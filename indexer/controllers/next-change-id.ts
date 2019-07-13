// import { logger } from '../lib/logger';
import { database } from '@Lib/database';
import { PathOfExile } from '@Types';

const find = async () => {
  const NextChangeId = database.getDb().collection('nextChangeId');
  return NextChangeId.findOne({});
};

const update = async (nextChangeId: string) => {
  const NextChangeId = database.getDb().collection('nextChangeId');
  return NextChangeId.findOneAndReplace({}, { nextChangeId });
};

const nextChangeIdController = {
  find,
  update,
};

export { nextChangeIdController };
