import React from 'react';
import { useFileSystemStore } from '../../store/fileSystemStore';

interface StatusBarProps {
  wordCount: number;
  characterCount: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ wordCount, characterCount }) => {
  const { selectedFile } = useFileSystemStore();
  
  return (
    <div className="h-6 bg-gray-800 border-t border-gray-700 px-4 flex items-center justify-between text-xs text-gray-400">
      <div>
        {selectedFile ? (
          <span>{selectedFile.name}</span>
        ) : (
          <span>No file selected</span>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <span>{wordCount} words</span>
        <span>{characterCount} characters</span>
      </div>
    </div>
  );
};

export default StatusBar;