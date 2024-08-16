/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
    onCreatePlayer(filter: $filter) {
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
    onUpdatePlayer(filter: $filter) {
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer($filter: ModelSubscriptionPlayerFilterInput) {
    onDeletePlayer(filter: $filter) {
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
export const onCreateHistoryEntry = /* GraphQL */ `
  subscription OnCreateHistoryEntry(
    $filter: ModelSubscriptionHistoryEntryFilterInput
  ) {
    onCreateHistoryEntry(filter: $filter) {
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
export const onUpdateHistoryEntry = /* GraphQL */ `
  subscription OnUpdateHistoryEntry(
    $filter: ModelSubscriptionHistoryEntryFilterInput
  ) {
    onUpdateHistoryEntry(filter: $filter) {
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
export const onDeleteHistoryEntry = /* GraphQL */ `
  subscription OnDeleteHistoryEntry(
    $filter: ModelSubscriptionHistoryEntryFilterInput
  ) {
    onDeleteHistoryEntry(filter: $filter) {
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
