import React from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Code, 
  Link, 
  Image, 
  Quote,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';
import { useFileSystemStore } from '../../store/fileSystemStore';

const Toolbar: React.FC = () => {
  const { selectedFile, updateFileContent } = useFileSystemStore();
  
  const insertMarkdown = (markdown: string) => {
    if (!selectedFile) return;
    
    const content = selectedFile.content || '';
    updateFileContent(selectedFile.id, content + markdown);
  };
  
  const handleHeading = (level: number) => {
    const headings = {
      1: '# ',
      2: '## ',
      3: '### '
    };
    insertMarkdown(`\n${headings[level as keyof typeof headings]}Heading\n`);
  };
  
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-1 flex items-center space-x-1">
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => handleHeading(1)}
        title="Heading 1"
        disabled={!selectedFile}
      >
        <Heading1 size={16} />
      </button>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => handleHeading(2)}
        title="Heading 2"
        disabled={!selectedFile}
      >
        <Heading2 size={16} />
      </button>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => handleHeading(3)}
        title="Heading 3"
        disabled={!selectedFile}
      >
        <Heading3 size={16} />
      </button>
      
      <div className="h-4 w-px bg-gray-600 mx-1"></div>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => insertMarkdown('**Bold text**')}
        title="Bold"
        disabled={!selectedFile}
      >
        <Bold size={16} />
      </button>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => insertMarkdown('*Italic text*')}
        title="Italic"
        disabled={!selectedFile}
      >
        <Italic size={16} />
      </button>
      
      <div className="h-4 w-px bg-gray-600 mx-1"></div>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => insertMarkdown('\n- List item\n- List item\n- List item\n')}
        title="Bulleted List"
        disabled={!selectedFile}
      >
        <List size={16} />
      </button>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => insertMarkdown('\n1. List item\n2. List item\n3. List item\n')}
        title="Numbered List"
        disabled={!selectedFile}
      >
        <ListOrdered size={16} />
      </button>
      
      <div className="h-4 w-px bg-gray-600 mx-1"></div>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => insertMarkdown('\n```\ncode block\n```\n')}
        title="Code Block"
        disabled={!selectedFile}
      >
        <Code size={16} />
      </button>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => insertMarkdown('\n> Blockquote\n')}
        title="Blockquote"
        disabled={!selectedFile}
      >
        <Quote size={16} />
      </button>
      
      <div className="h-4 w-px bg-gray-600 mx-1"></div>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => insertMarkdown('[Link text](https://example.com)')}
        title="Link"
        disabled={!selectedFile}
      >
        <Link size={16} />
      </button>
      
      <button 
        className="p-1.5 rounded hover:bg-gray-700 text-gray-300"
        onClick={() => insertMarkdown('![Image alt text](https://example.com/image.jpg)')}
        title="Image"
        disabled={!selectedFile}
      >
        <Image size={16} />
      </button>
    </div>
  );
};

export default Toolbar;