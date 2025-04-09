import { gql } from '@apollo/client';

// Advance the adventure by sending a player's choice
export const ADVANCE_ADVENTURE = gql`
  mutation AdvanceAdventure($adventureId: ID!, $choiceText: String!) {
    advanceAdventure(adventureId: $adventureId, choiceText: $choiceText) {
      currentNode {
        text
        choices {
          text
        }
      }
      storyLog {
        text
      }
    }
  }
`;

// Create a new user account
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Log in an existing user
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Create a new adventure
export const CREATE_ADVENTURE = gql`
  mutation CreateAdventure($title: String!, $characterName: String!, $characterClass: String!) {
    createAdventure(title: $title, characterName: $characterName, characterClass: $characterClass) {
      _id
      title
    }
  }
`;
