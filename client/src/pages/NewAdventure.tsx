import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ADVENTURE } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

export default function NewAdventure() {
  const currentNode = useParams<{ id: string }>().id || '';
    const [ formState, setFormState ] = useState({
       title: '',
       characterName: '',
       characterClass: 'Warrior',
        currentNode: currentNode,
    })

    const [ createAdventure, { error } ] = useMutation(CREATE_ADVENTURE);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const {data} = await createAdventure({ variables: { ...formState } });
            const newAdventureId = data.createAdventure._id;
            navigate(`/adventure/${newAdventureId}`); 
        } catch (err) {
            console.error('Adventure creation failed', err);
        }
    }

    return (
        <div>
          <h2>Start a New Adventure</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Adventure Title"
              value={formState.title}
              onChange={handleChange}
            />
            <input
              name="characterName"
              placeholder="Character Name"
              value={formState.characterName}
              onChange={handleChange}
            />
            <select name="characterClass" value={formState.characterClass} onChange={handleChange}>
              <option value="Warrior">Warrior</option>
              <option value="Mage">Mage</option>
              <option value="Rogue">Rogue</option>
              <option value="Cleric">Cleric</option>
            </select>
            <button type="submit">Begin Adventure</button>
          </form>
          {error && <p style={{ color: 'red' }}>Something went wrong.</p>}
        </div>
      );
}