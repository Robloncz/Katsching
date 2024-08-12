/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getKatschingTable = /* GraphQL */ `
  query GetKatschingTable($id: ID!) {
    getKatschingTable(id: $id) {
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
export const listKatschingTables = /* GraphQL */ `
  query ListKatschingTables(
    $filter: ModelKatschingTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKatschingTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Player
        Emoji
        Katschings
        LastKatschingID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getHistoryTable = /* GraphQL */ `
  query GetHistoryTable($id: ID!) {
    getHistoryTable(id: $id) {
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
export const listHistoryTables = /* GraphQL */ `
  query ListHistoryTables(
    $filter: ModelHistoryTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHistoryTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        wicht
        vollstrecker
        numKatsching
        isCommented
        comments
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getKatschingDetails = /* GraphQL */ `
  query GetKatschingDetails($id: ID!) {
    getKatschingDetails(id: $id) {
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
export const listKatschingDetails = /* GraphQL */ `
  query ListKatschingDetails(
    $filter: ModelKatschingDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKatschingDetails(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const katschingDetailsByHistorytableID = /* GraphQL */ `
  query KatschingDetailsByHistorytableID(
    $historytableID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelKatschingDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    katschingDetailsByHistorytableID(
      historytableID: $historytableID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const katschingDetailsByKatschingtableID = /* GraphQL */ `
  query KatschingDetailsByKatschingtableID(
    $katschingtableID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelKatschingDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    katschingDetailsByKatschingtableID(
      katschingtableID: $katschingtableID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCommentDetails = /* GraphQL */ `
  query GetCommentDetails($id: ID!) {
    getCommentDetails(id: $id) {
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
export const listCommentDetails = /* GraphQL */ `
  query ListCommentDetails(
    $filter: ModelCommentDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const commentDetailsByKatschingtableID = /* GraphQL */ `
  query CommentDetailsByKatschingtableID(
    $katschingtableID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentDetailsByKatschingtableID(
      katschingtableID: $katschingtableID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const commentDetailsByHistorytableID = /* GraphQL */ `
  query CommentDetailsByHistorytableID(
    $historytableID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentDetailsByHistorytableID(
      historytableID: $historytableID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
