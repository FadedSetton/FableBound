import React from 'react';


// Define TypeScript interfaces for the component props and storyNode structure

interface StoryNode {
  id: number;
  title?: string;
  text: string;
}

interface StoryNodeTextProps {
  storyNode?: StoryNode;
}

const StoryNodeText: React.FC<StoryNodeTextProps> = ({ storyNode }) => {
  // CSS styles
  const styles = `
    .reveal {
      color: #0000;
      --g: no-repeat linear-gradient(#00DFFC 0 0) 0 0;
      background: var(--g), var(--g);
      background-size: 0 100%;
      -webkit-background-clip: padding-box,text;
              background-clip: padding-box,text;
      -webkit-box-decoration-break: clone;
              box-decoration-break: clone;
      animation: 
        t 1.2s  .5s both,
        b 1.2s 1.3s both;
    }
    @keyframes t{
      to {background-size:150% 100%}
    }
    @keyframes b {
      to {background-position:-200% 0,0 0}
    }
  `;

  // Handle the case where no storyNode is provided
  if (!storyNode) {
    return <div className="p-4 text-gray-500">No story content available</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md bg-[#005F6B] text-[#00DFFC]">
      <style>{styles}</style>
      
      {/* Main text content */}
      <div className="font-sans font-bold">
        <p className="text-2xl my-2 max-w-lg mx-auto reveal">
          {storyNode.text}
        </p>
      </div>
    </div>
  );
};

export default StoryNodeText;