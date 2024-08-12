/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createKatschingTable = /* GraphQL */ `
  mutation CreateKatschingTable(
    $input: CreateKatschingTableInput!
    $condition: ModelKatschingTableConditionInput
  ) {
    createKatschingTable(input: $input, condition: $condition) {
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
export const updateKatschingTable = /* GraphQL */ `
  mutation UpdateKatschingTable(
    $input: UpdateKatschingTableInput!
    $condition: ModelKatschingTableConditionInput
  ) {
    updateKatschingTable(input: $input, condition: $condition) {
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
export const deleteKatschingTable = /* GraphQL */ `
  mutation DeleteKatschingTable(
    $input: DeleteKatschingTableInput!
    $condition: ModelKatschingTableConditionInput
  ) {
    deleteKatschingTable(input: $input, condition: $condition) {
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
export const createHistoryTable = /* GraphQL */ `
  mutation CreateHistoryTable(
    $input: CreateHistoryTableInput!
    $condition: ModelHistoryTableConditionInput
  ) {
    createHistoryTable(input: $input, condition: $condition) {
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
export const updateHistoryTable = /* GraphQL */ `
  mutation UpdateHistoryTable(
    $input: UpdateHistoryTableInput!
    $condition: ModelHistoryTableConditionInput
  ) {
    updateHistoryTable(input: $input, condition: $condition) {
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
export const deleteHistoryTable = /* GraphQL */ `
  mutation DeleteHistoryTable(
    $input: DeleteHistoryTableInput!
    $condition: ModelHistoryTableConditionInput
  ) {
    deleteHistoryTable(input: $input, condition: $condition) {
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
export const createKatschingDetails = /* GraphQL */ `
  mutation CreateKatschingDetails(
    $input: CreateKatschingDetailsInput!
    $condition: ModelKatschingDetailsConditionInput
  ) {
    createKatschingDetails(input: $input, condition: $condition) {
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
export const updateKatschingDetails = /* GraphQL */ `
  mutation UpdateKatschingDetails(
    $input: UpdateKatschingDetailsInput!
    $condition: ModelKatschingDetailsConditionInput
  ) {
    updateKatschingDetails(input: $input, condition: $condition) {
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
export const deleteKatschingDetails = /* GraphQL */ `
  mutation DeleteKatschingDetails(
    $input: DeleteKatschingDetailsInput!
    $condition: ModelKatschingDetailsConditionInput
  ) {
    deleteKatschingDetails(input: $input, condition: $condition) {
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
export const createCommentDetails = /* GraphQL */ `
  mutation CreateCommentDetails(
    $input: CreateCommentDetailsInput!
    $condition: ModelCommentDetailsConditionInput
  ) {
    createCommentDetails(input: $input, condition: $condition) {
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
export const updateCommentDetails = /* GraphQL */ `
  mutation UpdateCommentDetails(
    $input: UpdateCommentDetailsInput!
    $condition: ModelCommentDetailsConditionInput
  ) {
    updateCommentDetails(input: $input, condition: $condition) {
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
export const deleteCommentDetails = /* GraphQL */ `
  mutation DeleteCommentDetails(
    $input: DeleteCommentDetailsInput!
    $condition: ModelCommentDetailsConditionInput
  ) {
    deleteCommentDetails(input: $input, condition: $condition) {
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
