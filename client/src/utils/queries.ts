import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
    }
  }
`;

// Get a single adventure by its ID
export const QUERY_ADVENTURE = gql`
  query GetAdventure($id: ID!) {
    getAdventure(id: $id) {
      _id
      title
      characterName
      characterClass
      createdAt
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

// Get all adventures for the currently logged-in user
export const QUERY_MY_ADVENTURES = gql`
  query MyAdventures {
    myAdventures {
      _id
      title
      characterName
      characterClass
      createdAt
    }
  }
`;

// Get a single story node by its ID (optional but useful)
export const QUERY_STORY_NODE = gql`
  query GetStoryNode($id: ID!) {
    getStoryNode(id: $id) {
      _id
      text
      choices {
        text
        nextNode
      }
      isAI
      createdAt
    }
  }
`;
