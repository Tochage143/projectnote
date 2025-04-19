import React, { useState, useEffect, useRef } from 'react';
import { 
  File, 
  Folder, 
  Edit2, 
  Trash2, 
  Copy, 
  PenSquare 
} from 'lucide-react';
import { useFileSystemStore } from '../../store/fileSystemStore';

const ContextMenu: React.FC = () => {
  const { 
    contextMenu, 
    closeContextMenu,
    renameItem,
    deleteItem,
    createNewFile,
    createNewFolder
  } = useFileSystemStore();
  
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const renameInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [isRenaming]);
  
  const handleRenameClick = () => {
    if (!contextMenu.fileItem) return;
    setNewName(contextMenu.fileItem.name);
    setIsRenaming(true);
  };
  
  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contextMenu.fileItem || !newName.trim()) return;
    
    renameItem(contextMenu.fileItem.id, newName);
    setIsRenaming(false);
    closeContextMenu();
  };
  
  const handleDeleteClick = () => {
    if (!contextMenu.fileItem) return;
    deleteItem(contextMenu.fileItem.id);
    closeContextMenu();
  };
  
  const handleNewFile = () => {
    if (!contextMenu.fileItem) return;
    const parentId = contextMenu.fileItem.type === 'folder' 
      ? contextMenu.fileItem.id 
      : contextMenu.fileItem.parentId;
    
    createNewFile(parentId);
    closeContextMenu();
  };
  
  const handleNewFolder = () => {
    if (!contextMenu.fileItem) return;
    const parentId = contextMenu.fileItem.type === 'folder' 
      ? contextMenu.fileItem.id 
      : contextMenu.fileItem.parentId;
    
    createNewFolder(parentId);
    closeContextMenu();
  };
  
  if (!contextMenu.isOpen || !contextMenu.fileItem) return null;
  
  const isFolder = contextMenu.fileItem.type === 'folder';
  
  const menuStyle = {
    top: `${contextMenu.y}px`,
    left: `${contextMenu.x}px`,
  };
  
  return (
    <div 
      className="fixed z-50 bg-gray-800 border border-gray-700 rounded shadow-lg py-1 min-w-48"
      style={menuStyle}
    >
      {isRenaming ? (
        <form onSubmit={handleRenameSubmit} className="px-2 py-1">
          <input
            ref={renameInputRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white"
            onBlur={() => {
              setIsRenaming(false);
              closeContextMenu();
            }}
          />
        </form>
      ) : (
        <>
          <div className="text-gray-400 text-xs font-medium px-3 py-1 border-b border-gray-700">
            {contextMenu.fileItem.name}
          </div>
          
          <button 
            className="flex items-center w-full px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700"
            onClick={handleRenameClick}
          >
            <Edit2 size={14} className="mr-2" />
            Rename
          </button>
          
          <button 
            className="flex items-center w-full px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700"
            onClick={handleDeleteClick}
          >
            <Trash2 size={14} className="mr-2" />
            Delete
          </button>
          
          <div className="border-t border-gray-700 my-1"></div>
          
          <button 
            className="flex items-center w-full px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700"
            onClick={handleNewFile}
          >
            <File size={14} className="mr-2" />
            New File {isFolder ? 'Here' : ''}
          </button>
          
          <button 
            className="flex items-center w-full px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700"
            onClick={handleNewFolder}
          >
            <Folder size={14} className="mr-2" />
            New Folder {isFolder ? 'Here' : ''}
          </button>
          
          <div className="border-t border-gray-700 my-1"></div>
          
          <button 
            className="flex items-center w-full px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700"
          >
            <Copy size={14} className="mr-2" />
            Copy
          </button>
          
          <button 
            className="flex items-center w-full px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700"
          >
            <PenSquare size={14} className="mr-2" />
            Edit in New Window
          </button>
        </>
      )}
    </div>
  );
};

export default ContextMenu;