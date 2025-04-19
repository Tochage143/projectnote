import { useState, useEffect } from 'react';

export const useWordCount = (text: string) => {
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  
  useEffect(() => {
    if (!text) {
      setWordCount(0);
      setCharacterCount(0);
      return;
    }
    
    // Count words (any sequence of non-whitespace characters)
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    setWordCount(words.length);
    
    // Count all characters
    setCharacterCount(text.length);
  }, [text]);
  
  return { wordCount, characterCount };
};