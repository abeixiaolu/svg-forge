import React, { useState, useEffect, useCallback } from 'react';
import { Message, HistoryItem, IconStyle, Conversation } from './types';
import * as GeminiService from './services/geminiService';
import ChatInterface from './components/ChatInterface';
import PreviewArea from './components/PreviewArea';
import HistorySidebar from './components/HistorySidebar';
import StyleSelector from './components/StyleSelector';
import { ICON_STYLES } from './constants';
import { PanelLeft, PanelLeftClose, Terminal, Cpu, Activity } from 'lucide-react';
// @ts-ignore
import SplitPane from 'react-split-pane';

// Polyfill for simple ID generation
const generateId = () => crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

const STORAGE_KEY = 'svg_gen_conversations';
const DEFAULT_TITLE = "UNTITLED_SESSION";

const App: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const [currentStyle, setCurrentStyle] = useState<IconStyle>(ICON_STYLES[0]);
  const [previewSvgOverride, setPreviewSvgOverride] = useState<string | null>(null);

  // Resize State
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

  // Computed state for current view
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const messages = activeConversation?.messages || [];
  
  // Current SVG is either the override (clicked from gallery) OR the last generated SVG in this chat
  const currentSVG = previewSvgOverride || (activeConversation?.svgs && activeConversation.svgs.length > 0 
    ? activeConversation.svgs[0].svgCode 
    : null);

  // Load History
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Conversation[] = JSON.parse(saved);
        setConversations(parsed);
        if (parsed.length > 0) {
          // Select most recent
          const mostRecent = parsed.sort((a,b) => b.lastModified - a.lastModified)[0];
          setActiveConversationId(mostRecent.id);
          // Restore Gemini Context
          GeminiService.restoreChat(mostRecent.messages);
        } else {
          createNewChat();
        }
      } catch (e) {
        console.error("Failed to parse conversations", e);
        createNewChat();
      }
    } else {
      createNewChat();
    }
  }, []);

  // Save History
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  // Handle Window Resize for Responsive Layout Switch
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createNewChat = useCallback(() => {
    const newId = generateId();
    const newConv: Conversation = {
      id: newId,
      title: DEFAULT_TITLE,
      messages: [],
      svgs: [],
      lastModified: Date.now()
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newId);
    setPreviewSvgOverride(null);
    GeminiService.initChat(); // Start fresh Gemini session
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  }, []);

  const handleSelectConversation = async (id: string) => {
    if (id === activeConversationId) return;
    
    const targetConv = conversations.find(c => c.id === id);
    if (!targetConv) return;

    setActiveConversationId(id);
    setPreviewSvgOverride(null);
    
    // Restore Gemini session for this conversation
    GeminiService.restoreChat(targetConv.messages);
    
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleSendMessage = async (text: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    // Update conversation state with user message
    setConversations(prev => prev.map(c => {
      if (c.id === activeConversationId) {
        // Generate a title if it's the first real user message
        const newTitle = (c.messages.length === 0 || c.title === DEFAULT_TITLE) 
          ? (text.length > 20 ? text.substring(0, 20) + '...' : text).toUpperCase()
          : c.title;
        
        return {
          ...c,
          title: newTitle,
          messages: [...c.messages, newMessage],
          lastModified: Date.now()
        };
      }
      return c;
    }));

    setIsLoading(true);
    setPreviewSvgOverride(null); // Reset manual preview on new generation

    try {
      const promptWithStyle = `${text}
      
[STYLE INSTRUCTION]
Target Style: ${currentStyle.name}
Details: ${currentStyle.description}
Ensure the SVG adheres strictly to this style description.`;

      const responseText = await GeminiService.sendMessageToGemini(promptWithStyle);
      
      const aiMessage: Message = {
        id: generateId(),
        role: 'model',
        content: responseText.replace(/<svg[\s\S]*?<\/svg>/i, '[SVG_GENERATED_SUCCESSFULLY]'),
        timestamp: Date.now(),
      };

      const extractedSvg = GeminiService.extractSvg(responseText);
      
      setConversations(prev => prev.map(c => {
        if (c.id === activeConversationId) {
          const updatedSvgs = extractedSvg 
            ? [{ id: generateId(), prompt: text, svgCode: extractedSvg, timestamp: Date.now() }, ...c.svgs]
            : c.svgs;

          return {
            ...c,
            messages: [...c.messages, aiMessage],
            svgs: updatedSvgs,
            lastModified: Date.now()
          };
        }
        return c;
      }));

    } catch (error: any) {
       console.error("Generation error:", error);
       
       let errorContent = "ERR: SYSTEM_FAILURE. PLEASE_RETRY.";
       const errString = error?.message || error?.toString() || "";
       
       if (errString.includes("429") || errString.includes("RESOURCE_EXHAUSTED") || errString.includes("quota")) {
         errorContent = "ERR: RATE_LIMIT_EXCEEDED. [QUOTA_FULL]. PLEASE_WAIT.";
       }
       
       const errorMessage: Message = {
          id: generateId(),
          role: 'model',
          content: errorContent,
          timestamp: Date.now()
       };
       setConversations(prev => prev.map(c => c.id === activeConversationId ? {...c, messages: [...c.messages, errorMessage]} : c));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (filtered.length === 0) {
        setTimeout(createNewChat, 0); 
        return [];
      }
      if (activeConversationId === id) {
        setActiveConversationId(filtered[0].id);
        GeminiService.restoreChat(filtered[0].messages);
      }
      return filtered;
    });
  };

  const handleClearAllConversations = () => {
    if (confirm("WARNING: PURGING ALL DATA LOGS. CONFIRM?")) {
      setConversations([]);
      createNewChat();
    }
  };

  const handleGallerySelect = (svgCode: string) => {
    setPreviewSvgOverride(svgCode);
    GeminiService.updateContextWithSvg(svgCode); 
  };

  return (
    <div className="flex h-screen bg-background text-tech-text font-sans overflow-hidden bg-tech-grid">
      
      {/* Sidebar (Conversations) */}
      <HistorySidebar 
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={createNewChat}
        onDeleteConversation={handleDeleteConversation}
        onClearAll={handleClearAllConversations}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-background/50 backdrop-blur-sm relative z-10">
        
        {/* Header */}
        <header className="h-14 border-b border-secondary flex items-center px-2 md:px-6 justify-between shrink-0 bg-surface/90">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              className="text-tech-text hover:text-primary transition-colors p-1"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
            </button>
            <div className="flex items-center gap-2 md:gap-3 select-none">
              <div className="w-8 h-8 bg-primary/20 border border-primary text-primary flex items-center justify-center shrink-0">
                <Terminal size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className="text-sm md:text-lg font-bold tracking-widest text-white leading-none truncate">SVG_FORGE</h1>
                <span className="text-[10px] text-primary tracking-[0.2em] font-mono opacity-80 hidden md:block">BUILD v2.0.45</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6 pl-2">
             <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-tech-dim border-r border-secondary pr-6 h-8">
                <div className="flex items-center gap-2">
                  <Activity size={12} className={isLoading ? "text-primary animate-pulse" : "text-tech-dim"} />
                  <span>{isLoading ? "PROCESSING..." : "SYSTEM READY"}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Cpu size={12} />
                   <span>MEM: OPTIMAL</span>
                </div>
             </div>

             <StyleSelector 
               currentStyle={currentStyle} 
               onStyleChange={(s) => setCurrentStyle(s)}
               disabled={isLoading} 
             />
          </div>
        </header>

        {/* Workspace */}
        <main id="workspace-main" className="flex-1 relative overflow-hidden flex flex-col">
          <SplitPane
            key={isDesktop ? "desktop-split" : "mobile-split"}
            split={isDesktop ? "vertical" : "horizontal"}
            minSize={isDesktop ? 280 : 100}
            maxSize={isDesktop ? -300 : -100}
            defaultSize={isDesktop ? 400 : "40%"}
            primary="first"
            style={{ position: 'relative', height: '100%', width: '100%' }}
            pane1Style={{ overflow: 'hidden' }}
            pane2Style={{ overflow: 'hidden' }}
            allowResize={true}
          >
            {/* Left Panel: Chat */}
            {/* Added pr-3 (12px) padding right to move scrollbar away from the resizer overlap area */}
            <div className="flex flex-col h-full w-full border-secondary bg-surface/30 pr-3 min-w-0 min-h-0">
               <div className="h-8 border-b border-secondary bg-surface/50 flex items-center px-4 justify-between shrink-0">
                  <span className="text-[10px] font-mono text-tech-dim uppercase tracking-wider">Communication_Link</span>
                  <span className="w-2 h-2 rounded-full bg-primary opacity-50"></span>
               </div>
               <div className="flex-1 min-h-0 overflow-hidden">
                 <ChatInterface 
                   messages={messages} 
                   onSendMessage={handleSendMessage} 
                   isLoading={isLoading}
                 />
               </div>
            </div>

            {/* Right Panel: Preview & Gallery */}
            <div className="flex flex-col h-full w-full bg-dot-grid relative min-w-0 min-h-0">
               <div className="h-8 border-b border-secondary bg-surface/50 flex items-center px-4 justify-between absolute top-0 left-0 right-0 z-20 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-tech-dim uppercase tracking-wider truncate mr-2">Viewport // {activeConversation?.title || "IDLE"}</span>
                  <div className="flex gap-1 shrink-0">
                     <span className="w-1 h-1 bg-tech-dim"></span>
                     <span className="w-1 h-1 bg-tech-dim"></span>
                     <span className="w-1 h-1 bg-tech-dim"></span>
                  </div>
               </div>
               
               <div className="flex-1 pt-8 overflow-hidden h-full flex flex-col min-h-0">
                  <PreviewArea 
                    svgCode={currentSVG} 
                    isLoading={isLoading}
                    historyItems={activeConversation?.svgs || []}
                    onSelectHistoryItem={handleGallerySelect}
                  />
               </div>
            </div>
          </SplitPane>
        </main>
      </div>
    </div>
  );
};

export default App;