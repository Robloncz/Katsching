const { util } = require('@aws-appsync/utils');

/**
 * Adds Katschings to a player and creates a history entry
 * @param {import('@aws-appsync/utils').Context} ctx
 */
export function request(ctx) {
  const { playerId, katschings, comment } = ctx.args;
  const currentTime = util.time.nowISO8601();

  return {
    operation: 'TransactWriteItems',
    transactItems: [
      {
        operation: 'UpdateItem',
        key: util.dynamodb.toMapValues({ id: playerId }),
        update: {
          expression: 'ADD katschings :katschings SET lastKatsching = :currentTime',
          expressionValues: util.dynamodb.toMapValues({
            ':katschings': katschings,
            ':currentTime': currentTime,
          }),
        },
        table: 'Player',
      },
      {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({ id: util.autoId() }),
        attributeValues: util.dynamodb.toMapValues({
          playerId,
          time: currentTime,
          event: `${katschings} ${katschings === 1 ? 'Katsching' : 'Katschings'} added`,
          comments: comment || null,
        }),
        table: 'HistoryEntry',
      },
    ],
  };
}

/**
 * Returns the updated player
 * @param {import('@aws-appsync/utils').Context} ctx
 */
export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result.data.Player[0];
}