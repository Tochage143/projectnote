import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  MoreVertical
} from 'lucide-react';
import { useFileSystemStore } from '../../store/fileSystemStore';

const Header: React.FC = () => {
  const { selectedFile } = useFileSystemStore();
  
  return (
    <div className="h-10 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center">
        <button className="p-1 rounded hover:bg-gray-700 text-gray-400">
          <ChevronLeft size={18} />
        </button>
        <button className="p-1 rounded hover:bg-gray-700 text-gray-400">
          <ChevronRight size={18} />
        </button>
      </div>
      
      <div className="flex-1 text-center text-sm text-gray-300">
        {selectedFile ? (
          <>
            <span>{selectedFile.name}</span>
            {selectedFile.parentId && (
              <span className="text-gray-500"> / Daily Journal</span>
            )}
          </>
        ) : (
          <span>Markdown Editor</span>
        )}
      </div>
      
      <div className="flex items-center">
        <button className="p-1 rounded hover:bg-gray-700 text-gray-400">
          <BookOpen size={18} />
        </button>
        <button className="p-1 rounded hover:bg-gray-700 text-gray-400">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default Header;