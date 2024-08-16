/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
      id
      name
      emoji
      katschings
      lastKatsching
      history {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
      id
      name
      emoji
      katschings
      lastKatsching
      history {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
      id
      name
      emoji
      katschings
      lastKatsching
      history {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createHistoryEntry = /* GraphQL */ `
  mutation CreateHistoryEntry(
    $input: CreateHistoryEntryInput!
    $condition: ModelHistoryEntryConditionInput
  ) {
    createHistoryEntry(input: $input, condition: $condition) {
      id
      playerId
      time
      event
      comments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateHistoryEntry = /* GraphQL */ `
  mutation UpdateHistoryEntry(
    $input: UpdateHistoryEntryInput!
    $condition: ModelHistoryEntryConditionInput
  ) {
    updateHistoryEntry(input: $input, condition: $condition) {
      id
      playerId
      time
      event
      comments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteHistoryEntry = /* GraphQL */ `
  mutation DeleteHistoryEntry(
    $input: DeleteHistoryEntryInput!
    $condition: ModelHistoryEntryConditionInput
  ) {
    deleteHistoryEntry(input: $input, condition: $condition) {
      id
      playerId
      time
      event
      comments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
