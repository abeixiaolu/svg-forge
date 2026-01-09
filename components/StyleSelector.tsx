import React from 'react';
import { Settings2 } from 'lucide-react';
import { IconStyle } from '../types';
import { ICON_STYLES } from '../constants';

interface StyleSelectorProps {
  currentStyle: IconStyle;
  onStyleChange: (style: IconStyle) => void;
  disabled?: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ currentStyle, onStyleChange, disabled }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative font-mono" ref={dropdownRef}>
      <label className="block text-[9px] text-tech-dim uppercase tracking-widest mb-1 pl-1">Style_Config</label>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-2 py-1 bg-surface border transition-colors min-w-[180px] justify-between ${
            disabled 
             ? 'opacity-50 cursor-not-allowed border-secondary text-tech-dim' 
             : 'border-primary/50 text-primary hover:bg-primary/10 hover:border-primary'
        }`}
        disabled={disabled}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div 
            className="w-5 h-5 shrink-0 text-primary flex items-center justify-center [&>svg]:w-full [&>svg]:h-full" 
            dangerouslySetInnerHTML={{ __html: currentStyle.previewSvg }} 
          />
          <span className="text-xs uppercase tracking-wide truncate max-w-[120px]">{currentStyle.name}</span>
        </div>
        <Settings2 size={12} className={isOpen ? "rotate-90 transition-transform shrink-0" : "transition-transform shrink-0"} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-80 bg-surface border border-primary shadow-[0_0_20px_rgba(245,158,11,0.1)] z-50 animate-in fade-in zoom-in-95 duration-100 flex flex-col max-h-[500px]">
           <div className="absolute -top-1 right-4 w-2 h-2 bg-surface border-t border-l border-primary transform rotate-45 z-10"></div>
           <div className="overflow-y-auto custom-scrollbar flex-1 bg-surface z-0 p-1">
            {ICON_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => {
                  onStyleChange(style);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-3 text-xs flex items-center gap-4 border-b border-secondary/50 hover:bg-white/5 transition-colors group ${
                  currentStyle.id === style.id ? 'bg-primary/10' : ''
                }`}
              >
                {/* Preview Icon - Increased Size */}
                <div className="p-1.5 bg-black/40 border border-secondary rounded-sm shrink-0 group-hover:border-primary/50 transition-colors">
                    <div 
                        className={`w-8 h-8 ${currentStyle.id === style.id ? 'text-primary' : 'text-tech-text group-hover:text-white'} flex items-center justify-center [&>svg]:w-full [&>svg]:h-full`} 
                        dangerouslySetInnerHTML={{ __html: style.previewSvg }} 
                    />
                </div>

                <div className="flex flex-col gap-1 flex-1 min-w-0">
                   <div className="flex justify-between items-center w-full">
                      <span className={`font-bold uppercase tracking-wide truncate text-sm ${currentStyle.id === style.id ? 'text-primary' : 'text-tech-text'}`}>
                        {style.name}
                      </span>
                      {currentStyle.id === style.id && <span className="w-1.5 h-1.5 bg-primary rounded-none animate-pulse shrink-0" />}
                   </div>
                   <span className="text-[10px] text-tech-dim group-hover:text-tech-text/70 transition-colors line-clamp-2 leading-relaxed">
                      {style.description}
                   </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StyleSelector;