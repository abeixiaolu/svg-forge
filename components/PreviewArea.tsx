import React, { useState } from 'react';
import { Download, Copy, Code, Eye, Monitor, Layers } from 'lucide-react';
import { HistoryItem } from '../types';

interface PreviewAreaProps {
  svgCode: string | null;
  isLoading: boolean;
  historyItems: HistoryItem[]; 
  onSelectHistoryItem: (svg: string) => void;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ svgCode, isLoading, historyItems, onSelectHistoryItem }) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (svgCode) {
      await navigator.clipboard.writeText(svgCode);
      setCopied(true);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (svgCode) {
      const blob = new Blob([svgCode], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `forge_export_${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      
      {/* Toolbar / HUD */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
         <div className="bg-surface/90 border border-secondary p-1 flex flex-col gap-1 backdrop-blur-sm">
            <button
              onClick={() => setShowCode(!showCode)}
              className={`p-2 border transition-all ${showCode ? 'border-primary text-primary bg-primary/10' : 'border-transparent text-tech-dim hover:text-white hover:border-white/20'}`}
              title="TOGGLE SOURCE"
              disabled={!svgCode}
            >
              {showCode ? <Eye size={16} /> : <Code size={16} />}
            </button>
            <button
              onClick={handleCopy}
              className={`p-2 border border-transparent transition-all ${copied ? 'text-green-500' : 'text-tech-dim hover:text-white hover:border-white/20'}`}
              title="COPY TO CLIPBOARD"
              disabled={!svgCode}
            >
              <Copy size={16} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 border border-transparent text-tech-dim hover:text-white hover:border-white/20 transition-all"
              title="EXPORT .SVG"
              disabled={!svgCode}
            >
              <Download size={16} />
            </button>
         </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
        {/* Decorative Grid Overlay for Measurement feeling */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ 
               backgroundImage: `
                 linear-gradient(to right, #333 1px, transparent 1px),
                 linear-gradient(to bottom, #333 1px, transparent 1px)
               `,
               backgroundSize: '100px 100px'
             }}>
        </div>
        <div className="absolute left-0 bottom-0 p-2 text-[10px] font-mono text-tech-dim opacity-50">
           COORD: 0,0,0
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center gap-4 z-10">
             <div className="relative w-24 h-24 border border-primary/30 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
                <div className="w-16 h-1 bg-primary animate-scan absolute top-0"></div>
                <Monitor size={32} className="text-primary opacity-50" />
             </div>
             <p className="text-primary font-mono text-xs tracking-widest animate-pulse">RENDERING_GEOMETRY...</p>
          </div>
        ) : svgCode ? (
          showCode ? (
            <div className="w-full h-full max-w-3xl overflow-auto bg-black/80 p-6 border border-secondary font-mono text-xs text-green-500 shadow-2xl z-10">
              <pre className="whitespace-pre-wrap break-all">
                {svgCode}
              </pre>
            </div>
          ) : (
            <div className="relative group z-10 w-full h-full flex items-center justify-center">
                {/* Frame around the icon */}
                <div className="absolute inset-0 max-w-[400px] max-h-[400px] m-auto border border-dashed border-tech-dim opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[220px] text-[9px] text-tech-dim opacity-0 group-hover:opacity-100 transition-opacity">OBJ_01</div>
                
                <div 
                  className="w-full h-full max-w-[400px] max-h-[400px] transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: svgCode }}
                />
            </div>
          )
        ) : (
          <div className="text-center text-tech-dim z-10 opacity-30">
            <Layers size={64} className="mx-auto mb-4 stroke-1" />
            <p className="text-lg font-light tracking-widest uppercase">No Active Asset</p>
            <p className="text-xs font-mono mt-2">INITIATE GENERATION SEQUENCE</p>
          </div>
        )}
      </div>

      {/* Gallery / Component Tray */}
      {historyItems.length > 0 && (
        <div className="h-24 bg-surface border-t border-secondary flex flex-col z-20">
            <div className="px-3 py-1 flex justify-between items-center border-b border-secondary/50 bg-black/20">
               <span className="text-[10px] text-tech-dim uppercase tracking-wider font-mono">Component_Tray</span>
               <span className="text-[10px] text-tech-dim font-mono">{historyItems.length} ITEMS</span>
            </div>
            <div className="flex-1 flex items-center gap-0 overflow-x-auto scrollbar-thin">
                {historyItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelectHistoryItem(item.svgCode)}
                        className={`shrink-0 h-full w-20 border-r border-secondary/50 p-2 transition-all relative group ${
                            svgCode === item.svgCode ? 'bg-primary/10' : 'hover:bg-white/5'
                        }`}
                        title={item.prompt}
                    >
                        {svgCode === item.svgCode && (
                           <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary"></div>
                        )}
                        <div 
                            className="w-full h-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity p-2 [&>svg]:w-full [&>svg]:h-full"
                            dangerouslySetInnerHTML={{ __html: item.svgCode }}
                        />
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default PreviewArea;