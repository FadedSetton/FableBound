import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Adventure {
    _id: ID!
    title: String!
    userId: ID!
    currentNode: StoryNode
    storyLog: [StoryNode]
    createdAt: String
  }

  type StoryNode {
    _id: ID!
    text: String!
    choices: [Choice!]!
    isAI: Boolean!
    createdAt: String
  }

  type Choice {
    text: String!
    nextNode: ID
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    me: User
    getAdventure(id: ID!): Adventure
    myAdventures: [Adventure]
    getStoryNode(id: ID!): StoryNode
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth

    createAdventure(title: String!): Adventure
    advanceAdventure(adventureId: ID!, choiceText: String!): Adventure

    addStoryNode(text: String!, choices: [ChoiceInput!]!): StoryNode
  }

  input ChoiceInput {
    text: String!
    nextNode: ID
  }
`;

export default typeDefs;