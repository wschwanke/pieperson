/**
 * Internal dependencies
 */
import { database } from '@Lib/database';

const insert = async (nextChangeId: string) => {
  const NextChangeId = database.getDb().collection('nextChangeId');
  return NextChangeId.insertOne({ currentNextChangeId: nextChangeId });
};

const find = async () => {
  const NextChangeId = database.getDb().collection('nextChangeId');
  return NextChangeId.findOne({});
};

const update = async (nextChangeId: string) => {
  const NextChangeId = database.getDb().collection('nextChangeId');
  return NextChangeId.findOneAndReplace({}, { nextChangeId });
};

const nextChangeIdController = {
  insert,
  find,
  update,
};

export { nextChangeIdController };
