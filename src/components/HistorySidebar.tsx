import React from 'react';
import { Conversation } from '../types';
import { Trash2, Plus, FileCode, X } from 'lucide-react';

interface HistorySidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

// Custom Tech-themed Data/Storage Icon - Sharp Corners
const DataLogsIcon = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path 
      d="M3 3H21V21H3V3Z" 
      className="stroke-primary" 
      strokeWidth="1.5" 
      strokeLinecap="square"
    />
    <line x1="7" y1="9" x2="17" y2="9" className="stroke-primary/60" strokeWidth="1.5" />
    <line x1="7" y1="13" x2="17" y2="13" className="stroke-primary/60" strokeWidth="1.5" />
    <rect x="7" y="16" width="2" height="2" className="fill-primary" />
    <line x1="11" y1="17" x2="17" y2="17" className="stroke-primary/60" strokeWidth="1.5" />
  </svg>
);

const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  conversations, 
  activeConversationId,
  onSelectConversation, 
  onNewChat,
  onDeleteConversation, 
  onClearAll,
  isOpen,
  onClose
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div 
        className={`
          /* Mobile Base Styles (Fixed Overlay) */
          fixed inset-y-0 left-0 z-50 h-full h-[100dvh] w-72
          bg-surface border-r border-secondary 
          flex flex-col font-mono text-sm
          transform transition-transform duration-300 ease-in-out
          
          /* Mobile State */
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}

          /* Desktop Override (Relative Flow) */
          md:relative md:h-full md:shadow-none md:translate-x-0 md:transform-none
          md:transition-[width,opacity] md:duration-300
          
          /* Desktop State & Overflow Management */
          ${isOpen 
            ? 'md:w-72 md:opacity-100' 
            : 'md:w-0 md:opacity-0 md:border-r-0 md:overflow-hidden md:pointer-events-none'}
        `}
      >
        {/* Inner Container: Fixed width to prevent content reflow during collapse animation */}
        <div className="w-72 flex flex-col h-full overflow-hidden whitespace-nowrap bg-surface">
          
          {/* Header */}
          <div className="p-3 border-b border-secondary bg-surface-highlight flex items-center justify-between shrink-0 h-14">
            <div className="flex items-center gap-2 text-primary font-bold tracking-wider text-xs">
              <DataLogsIcon />
              DATA_LOGS
            </div>
            <button 
              onClick={onClose} 
              className="md:hidden text-tech-dim hover:text-primary transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-3 border-b border-secondary shrink-0">
            <button 
              onClick={() => {
                onNewChat();
                if (window.innerWidth < 768) onClose();
              }}
              className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/40 text-primary py-2 transition-all hover:border-primary group uppercase tracking-widest text-xs font-bold"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform" /> 
              Initialize_Session
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {conversations.length === 0 ? (
              <div className="text-center text-tech-dim mt-10 opacity-50">
                <p className="text-xs">-- NO DATA FOUND --</p>
              </div>
            ) : (
              conversations.sort((a,b) => b.lastModified - a.lastModified).map((conv) => (
                <div 
                  key={conv.id} 
                  className={`group relative p-3 cursor-pointer border-l-2 transition-all ${
                    activeConversationId === conv.id 
                      ? 'bg-primary/5 border-primary text-white' 
                      : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/20 text-tech-dim hover:text-white'
                  }`}
                  onClick={() => onSelectConversation(conv.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="overflow-hidden min-w-0 w-full">
                      <p className="truncate font-bold text-xs uppercase tracking-wide mb-1 pr-4">
                        {conv.title || 'UNTITLED'}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] opacity-70">
                        <span>{new Date(conv.lastModified).toLocaleDateString(undefined, {month:'numeric', day:'numeric', hour:'2-digit', minute:'2-digit'})}</span>
                        <span>//</span>
                        <span className="flex items-center gap-1">
                          <FileCode size={8} /> {conv.svgs.length}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conv.id);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-tech-dim opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity p-1"
                    title="PURGE"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {conversations.length > 0 && (
            <div className="p-3 border-t border-secondary bg-surface-highlight shrink-0">
              <button 
                onClick={onClearAll}
                className="w-full text-xs text-red-900/70 hover:text-red-500 hover:bg-red-500/10 py-2 border border-transparent hover:border-red-500/30 transition-colors uppercase tracking-widest"
              >
                [ PURGE_ALL_DATA ]
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;