// src/components/Adventure.tsx
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

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
  // Replace this with your dynamic ID or selection logic
  const adventureId = useParams<{ id: string }>().id || '';
  const { loading, error, data, refetch } = useQuery<AdventureData, AdventureVars>(
    GET_ADVENTURE_QUERY,
    {
      variables: { id: adventureId },
      fetchPolicy: 'network-only'
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
  if (error) return <p>Error loading adventure!</p>;

  const adventure = data.getAdventure;
  let { currentNode, storyLog } = adventure;
  const introStory = {
    _id: "0",
    choices: [
      { text: "Venture into the Darkwood Forest" },
      { text: "Stay in Grendale and gather supplies" },
      { text: "Consult the village elder for guidance" },
    ],
    text: 'Intro\n\nIn the shadowed realm of Eldoria, where the skies often weep with the sorrow of forgotten gods, the small village of Grendale hums with the promise of adventure. Nestled at the edge of the foreboding Darkwood Forest, the villagers speak in hushed tones about the recent disappearances of several of their own. Ancient tales, once mere bedtime stories to frighten children, now stir in the hearts of the bravest souls. The legends tell of the Heartstone, a mystical gem said to wield the power to bind or free the ancient spirits of the land, buried deep within the labyrinthine heart of Darkwood.\n\nAs night falls, a mysterious figure draped in a hooded cloak approaches you at the local tavern. With a voice as soft as falling leaves, the stranger offers a tattered map, marked with the path through Darkwood to where the Heartstone lies hidden. "The journey is perilous, and many have faltered in their quests," the figure whispers, eyes glinting with a mix of fear and excitement. "But should you retrieve the Heartstone, glory and the gratitude of Eldoria shall be yours. Will you venture into the shadows to uncover the truths long buried, or will you remain here, content to wonder and never know?"',
  };
  if (!currentNode) {
    currentNode = introStory;
  }
  // Display intro story text (displayed if no progress has been made yet) - AJG

  return (
    <section>
      <h2>{adventure.title}</h2>

      {/* Conditionally display the intro story if the adventure has just begun */}
      {storyLog.length !== 0 ? (
        <>
          {introStory.text}
          <div>
            {introStory.choices.map((choice, index) => (
              <button key={index} onClick={() => handleChoice(choice.text)}>
                {choice.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="story-text">
            <h3>Story</h3>
            <p>{currentNode.text}</p>
          </div>

      {/* <div>
        {currentNode.choices.map((choice, index) => (
          <button key={index} onClick={() => handleChoice(choice.text)}>
            {choice.text}
          </button>
        ))}
      </div> */}
    </section>
  );
};

export default Adventure;
