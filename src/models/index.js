// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Player, HistoryEntry } = initSchema(schema);

export {
  Player,
  HistoryEntry
};