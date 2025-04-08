import { useMutation } from "@apollo/client";
import { CREATE_ADVENTURE } from "../utils/mutations";

const Home: React.FC = () => {
  const [createAdventure, { error }] = useMutation(CREATE_ADVENTURE);
  const handleClick = async() => {
    await createAdventure()
  }
  return (
    <>
        {/* Add the image at the top */}
        <img 
            src="/assets/headerImage.png" // Ensure this path is correct and the image exists
            alt="Pixel art medieval castle with trees and mountains as background retro style 8-bit game AI generated image" 
            style={{ width: '100%', height: 'auto' }} 
        />
        <h1>FableBound</h1>
        <button onClick={handleClick}>Start your journey!</button>
        <p>
            "A fantasy adventure game. Please login or sign up to start your journey." - Louisa May Alcott, <em>Little Women</em>
        </p>
    </>
);
};

export default Home;
