import React, { useState } from 'react';
import FileTree from './components/FileTree/FileTree';
import Header from './components/Layout/Header';
import Main from './components/Layout/Main';

function App() {
  const [showPreview, setShowPreview] = useState(true);
  
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-72 border-r border-gray-700">
          <FileTree />
        </div>
        
        <div className="flex-1">
          <Main showPreview={showPreview} />
        </div>
      </div>
    </div>
  );
}

export default App;