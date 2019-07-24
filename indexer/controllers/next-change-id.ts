/**
 * Internal dependencies
 */
import { database } from '@Lib/database';

const insert = async (nextChangeId: string) => {
  try {
    const NextChangeId = database.getDb().collection('nextChangeId');
    return NextChangeId.insertOne({ currentNextChangeId: nextChangeId });
  } catch (error) {
    throw error;
  }
};

const find = async () => {
  try {
    const NextChangeId = database.getDb().collection('nextChangeId');
    return NextChangeId.findOne({});
  } catch (error) {
    throw error;
  }
};

const update = async (nextChangeId: string) => {
  try {
    const NextChangeId = database.getDb().collection('nextChangeId');
    return NextChangeId.findOneAndReplace({}, { currentNextChangeId: nextChangeId });
  } catch (error) {
    throw error;
  }
};

const nextChangeIdController = {
  insert,
  find,
  update,
};

export { nextChangeIdController };
