import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useFileSystemStore } from '../../store/fileSystemStore';

const Preview: React.FC = () => {
  const { selectedFile } = useFileSystemStore();
  
  if (!selectedFile) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900 text-gray-400">
        <p>Select a file to preview</p>
      </div>
    );
  }
  
  return (
    <div className="h-full overflow-auto bg-gray-900 text-gray-200 p-4">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {selectedFile.content || ''}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Preview;