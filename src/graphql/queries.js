/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
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
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        emoji
        katschings
        lastKatsching
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncPlayers = /* GraphQL */ `
  query SyncPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPlayers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        emoji
        katschings
        lastKatsching
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getHistoryEntry = /* GraphQL */ `
  query GetHistoryEntry($id: ID!) {
    getHistoryEntry(id: $id) {
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
export const listHistoryEntries = /* GraphQL */ `
  query ListHistoryEntries(
    $filter: ModelHistoryEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHistoryEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncHistoryEntries = /* GraphQL */ `
  query SyncHistoryEntries(
    $filter: ModelHistoryEntryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHistoryEntries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const historyEntriesByPlayerIdAndTime = /* GraphQL */ `
  query HistoryEntriesByPlayerIdAndTime(
    $playerId: ID!
    $time: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelHistoryEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    historyEntriesByPlayerIdAndTime(
      playerId: $playerId
      time: $time
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
