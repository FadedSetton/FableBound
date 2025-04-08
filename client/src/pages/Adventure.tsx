// src/components/Adventure.tsx
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

interface StoryNode {
  _id: string;
  text: string;
  choices: Array<{
    text: string;
  }>;
}

interface AdventureData {
  getAdventure: {
    _id: string;
    title: string;
    characterName: string;
    characterClass: string;
    currentNode: StoryNode;
    storyLog: Array<{
      _id: string;
      text: string;
    }>;
  };
}

interface AdventureVars {
  id: string;
}

interface AdvanceAdventureData {
  advanceAdventure: {
    _id: string;
    currentNode: StoryNode;
    storyLog: Array<{
      _id: string;
      text: string;
    }>;
  };
}

interface AdvanceAdventureVars {
  adventureId: string;
  choiceText: string;
}

const GET_ADVENTURE_QUERY = gql`
  query GetAdventure($id: ID!) {
    getAdventure(id: $id) {
      _id
      title
      characterName
      characterClass
      currentNode {
        _id
        text
        choices {
          text
        }
      }
      storyLog {
        _id
        text
      }
    }
  }
`;

const ADVANCE_ADVENTURE_MUTATION = gql`
  mutation AdvanceAdventure($adventureId: ID!, $choiceText: String!) {
    advanceAdventure(adventureId: $adventureId, choiceText: $choiceText) {
      _id
      currentNode {
        _id
        text
        choices {
          text
        }
      }
      storyLog {
        _id
        text
      }
    }
  }
`;

const Adventure: React.FC = () => {
  // Replace this with a dynamic ID or selection logic in your app
  const adventureId = "YOUR_ADVENTURE_ID";
  const { loading, error, data, refetch } = useQuery<AdventureData, AdventureVars>(
    GET_ADVENTURE_QUERY,
    {
      variables: { id: adventureId },
      fetchPolicy: 'network-only',
    }
  );
  const [advanceAdventure] = useMutation<AdvanceAdventureData, AdvanceAdventureVars>(
    ADVANCE_ADVENTURE_MUTATION
  );

  const handleChoice = async (choiceText: string) => {
    try {
      await advanceAdventure({ variables: { adventureId, choiceText } });
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading adventure...</p>;
  if (error || !data) return <p>Error loading adventure!</p>;

  const adventure = data.getAdventure;
  const { currentNode } = adventure;

  return (
    <div>
      <h2>{adventure.title}</h2>
      <div style={{ border: '1px solid #182029', padding: '1rem', marginBottom: '1rem' }}>
        <h3>Story</h3>
        <p>{currentNode.text}</p>
      </div>
      <div>
        {currentNode.choices.map((choice, index) => (
          <button key={index} onClick={() => handleChoice(choice.text)}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Adventure;
