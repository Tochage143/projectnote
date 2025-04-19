import React, { useEffect, useState } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useFileSystemStore } from '../../store/fileSystemStore';

interface EditorProps {
  wordCountCallback: (count: number) => void;
  charCountCallback: (count: number) => void;
}

const Editor: React.FC<EditorProps> = ({ wordCountCallback, charCountCallback }) => {
  const { selectedFile, updateFileContent } = useFileSystemStore();
  const [content, setContent] = useState<string>('');
  
  useEffect(() => {
    if (selectedFile) {
      setContent(selectedFile.content || '');
    } else {
      setContent('');
    }
  }, [selectedFile]);
  
  useEffect(() => {
    if (content) {
      // Count words (any sequence of non-whitespace characters)
      const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
      // Count all characters
      const charCount = content.length;
      
      wordCountCallback(wordCount);
      charCountCallback(charCount);
    } else {
      wordCountCallback(0);
      charCountCallback(0);
    }
  }, [content, wordCountCallback, charCountCallback]);
  
  const handleEditorChange = (value: string | undefined) => {
    const newContent = value || '';
    setContent(newContent);
    if (selectedFile) {
      updateFileContent(selectedFile.id, newContent);
    }
  };
  
  if (!selectedFile) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900 text-gray-400">
        <p>Select a file to edit</p>
      </div>
    );
  }
  
  return (
    <div className="h-full">
      <MonacoEditor
        height="100%"
        defaultLanguage="markdown"
        value={content}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontFamily: 'monospace',
          fontSize: 14,
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
};

export default Editor;