/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateKatschingTable = /* GraphQL */ `
  subscription OnCreateKatschingTable(
    $filter: ModelSubscriptionKatschingTableFilterInput
  ) {
    onCreateKatschingTable(filter: $filter) {
      id
      Player
      Emoji
      Katschings
      LastKatschingID
      LastKatsching {
        id
        vollstrecker
        wicht
        numKatsching
        is_superKatsching
        dateTime
        historytableID
        katschingtableID
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateKatschingTable = /* GraphQL */ `
  subscription OnUpdateKatschingTable(
    $filter: ModelSubscriptionKatschingTableFilterInput
  ) {
    onUpdateKatschingTable(filter: $filter) {
      id
      Player
      Emoji
      Katschings
      LastKatschingID
      LastKatsching {
        id
        vollstrecker
        wicht
        numKatsching
        is_superKatsching
        dateTime
        historytableID
        katschingtableID
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteKatschingTable = /* GraphQL */ `
  subscription OnDeleteKatschingTable(
    $filter: ModelSubscriptionKatschingTableFilterInput
  ) {
    onDeleteKatschingTable(filter: $filter) {
      id
      Player
      Emoji
      Katschings
      LastKatschingID
      LastKatsching {
        id
        vollstrecker
        wicht
        numKatsching
        is_superKatsching
        dateTime
        historytableID
        katschingtableID
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateHistoryTable = /* GraphQL */ `
  subscription OnCreateHistoryTable(
    $filter: ModelSubscriptionHistoryTableFilterInput
  ) {
    onCreateHistoryTable(filter: $filter) {
      id
      wicht
      Katsching {
        nextToken
        __typename
      }
      vollstrecker
      numKatsching
      isCommented
      comments
      CommentDetails {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateHistoryTable = /* GraphQL */ `
  subscription OnUpdateHistoryTable(
    $filter: ModelSubscriptionHistoryTableFilterInput
  ) {
    onUpdateHistoryTable(filter: $filter) {
      id
      wicht
      Katsching {
        nextToken
        __typename
      }
      vollstrecker
      numKatsching
      isCommented
      comments
      CommentDetails {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteHistoryTable = /* GraphQL */ `
  subscription OnDeleteHistoryTable(
    $filter: ModelSubscriptionHistoryTableFilterInput
  ) {
    onDeleteHistoryTable(filter: $filter) {
      id
      wicht
      Katsching {
        nextToken
        __typename
      }
      vollstrecker
      numKatsching
      isCommented
      comments
      CommentDetails {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateKatschingDetails = /* GraphQL */ `
  subscription OnCreateKatschingDetails(
    $filter: ModelSubscriptionKatschingDetailsFilterInput
    $owner: String
  ) {
    onCreateKatschingDetails(filter: $filter, owner: $owner) {
      id
      vollstrecker
      wicht
      numKatsching
      is_superKatsching
      dateTime
      historytableID
      katschingtableID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateKatschingDetails = /* GraphQL */ `
  subscription OnUpdateKatschingDetails(
    $filter: ModelSubscriptionKatschingDetailsFilterInput
    $owner: String
  ) {
    onUpdateKatschingDetails(filter: $filter, owner: $owner) {
      id
      vollstrecker
      wicht
      numKatsching
      is_superKatsching
      dateTime
      historytableID
      katschingtableID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteKatschingDetails = /* GraphQL */ `
  subscription OnDeleteKatschingDetails(
    $filter: ModelSubscriptionKatschingDetailsFilterInput
    $owner: String
  ) {
    onDeleteKatschingDetails(filter: $filter, owner: $owner) {
      id
      vollstrecker
      wicht
      numKatsching
      is_superKatsching
      dateTime
      historytableID
      katschingtableID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateCommentDetails = /* GraphQL */ `
  subscription OnCreateCommentDetails(
    $filter: ModelSubscriptionCommentDetailsFilterInput
  ) {
    onCreateCommentDetails(filter: $filter) {
      id
      comment
      Player
      dateTime
      katschingtableID
      historytableID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCommentDetails = /* GraphQL */ `
  subscription OnUpdateCommentDetails(
    $filter: ModelSubscriptionCommentDetailsFilterInput
  ) {
    onUpdateCommentDetails(filter: $filter) {
      id
      comment
      Player
      dateTime
      katschingtableID
      historytableID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCommentDetails = /* GraphQL */ `
  subscription OnDeleteCommentDetails(
    $filter: ModelSubscriptionCommentDetailsFilterInput
  ) {
    onDeleteCommentDetails(filter: $filter) {
      id
      comment
      Player
      dateTime
      katschingtableID
      historytableID
      createdAt
      updatedAt
      __typename
    }
  }
`;
