import React, { useState } from 'react';
import Editor from '../Editor/Editor';
import Preview from '../Editor/Preview';
import Toolbar from '../Editor/Toolbar';
import StatusBar from '../Editor/StatusBar';

interface MainProps {
  showPreview: boolean;
}

const Main: React.FC<MainProps> = ({ showPreview }) => {
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  
  return (
    <div className="flex flex-col h-full">
      <Toolbar />
      <div className="flex-1 flex">
        {showPreview ? (
          <>
            <div className="w-1/2 h-full">
              <Editor 
                wordCountCallback={setWordCount}
                charCountCallback={setCharacterCount}
              />
            </div>
            <div className="w-1/2 h-full border-l border-gray-700">
              <Preview />
            </div>
          </>
        ) : (
          <div className="w-full h-full">
            <Editor 
              wordCountCallback={setWordCount}
              charCountCallback={setCharacterCount}
            />
          </div>
        )}
      </div>
      <StatusBar wordCount={wordCount} characterCount={characterCount} />
    </div>
  );
};

export default Main;