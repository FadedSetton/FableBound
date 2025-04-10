import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ADVENTURE } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { ADVANCE_ADVENTURE } from '../utils/mutations';
import StoryNodeText from '../components/StoryNodeText';

export default function newAdventureId() {
  const [currentStoryNode, setCurrentStoryNode] = useState({
      id: 1,
      text: "placeholder text",
  });

  const [advanceAdventure] = useMutation(ADVANCE_ADVENTURE);

  const handleChoiceClick = async (choiceText: string) => {
      try {
          const { data } = await advanceAdventure({
              variables: { adventureId: '123', choiceText },
          });

          // Update the current story node with the response
          const nextNode = data.advanceAdventure.currentNode;
          setCurrentStoryNode({
              id: nextNode.id,
              text: nextNode.text,
          });
      } catch (err) {
          console.error('Failed to advance adventure:', err);
      }
  };

  return (
      <div>
          <h2>Start Your Adventure</h2>
          {/* Render the StoryNodeText component */}
          <StoryNodeText storyNode={currentStoryNode} />

          {/* Render story choices */}
          <div className="story-options">
              <button onClick={() => handleChoiceClick('Attack')}>Attack</button>
              <button onClick={() => handleChoiceClick('Run')}>Run</button>
              <button onClick={() => handleChoiceClick('Talk')}>Talk</button>
              <button onClick={() => handleChoiceClick('Inspect')}>Inspect</button>
          </div>
      </div>
  );
}


// export default function NewAdventure() {
//     const [ formState, setFormState ] = useState({
//        title: '',
//        characterName: '',
//        characterClass: 'Warrior' 
//     })

    // const [ createAdventure, { error } ] = useMutation(CREATE_ADVENTURE);
    // const navigate = useNavigate();

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFormState({ ...formState, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const {data} = await createAdventure({ variables: { ...formState } });
//             const newAdventureId = data.createAdventure._id;
//             navigate(`/adventure/${newAdventureId}`); 
//         } catch (err) {
//             console.error('Adventure creation failed', err);
//         }
//     }

//     return (
//         <div>
//           <h2>Start a New Adventure</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               name="title"
//               placeholder="Adventure Title"
//               value={formState.title}
//               onChange={handleChange}
//             />
//             <input
//               name="characterName"
//               placeholder="Character Name"
//               value={formState.characterName}
//               onChange={handleChange}
//             />
//             <select name="characterClass" value={formState.characterClass} onChange={handleChange}>
//               <option value="Warrior">Warrior</option>
//               <option value="Mage">Mage</option>
//               <option value="Rogue">Rogue</option>
//               <option value="Cleric">Cleric</option>
//             </select>
//             <button type="submit">Begin Adventure</button>
//           </form>
//           {error && <p style={{ color: 'red' }}>Something went wrong.</p>}
//         </div>
//       );
// }