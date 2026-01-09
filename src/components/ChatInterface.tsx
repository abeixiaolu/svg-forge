import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { ChevronRight, CornerDownLeft, Sparkles } from "lucide-react";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden font-mono text-sm relative">
      {/* Messages Area */}
      <div
        className={`flex-1 p-4 space-y-6 scrollbar-thin ${
          messages.length === 0 ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-tech-dim opacity-40">
            <div className="border border-tech-dim p-4 mb-4 rounded-sm">
              <Sparkles size={24} />
            </div>
            <p className="tracking-widest text-xs">TERMINAL READY</p>
            <p className="text-[10px] mt-2">AWAITING INPUT COMMANDS...</p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <span
              className={`text-[10px] uppercase tracking-wider mb-1 px-1 ${
                msg.role === "user" ? "text-primary" : "text-tech-dim"
              }`}
            >
              {msg.role === "user" ? "USER_CMD" : "SYS_RESP"} //{" "}
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
            <div
              className={`max-w-[90%] p-3 border ${
                msg.role === "user"
                  ? "bg-primary/5 border-primary text-white corner-border corner-border-hover"
                  : "bg-secondary/30 border-secondary text-tech-text"
              }`}
            >
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed font-sans">
                {msg.content}
              </pre>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start gap-1 animate-pulse">
            <span className="text-[10px] text-primary uppercase tracking-wider mb-1 px-1">
              SYS_PROC
            </span>
            <div className="bg-secondary/30 border border-secondary p-3 text-primary text-xs">
              {">"} PROCESSING REQUEST...
              <span className="inline-block w-2 h-4 bg-primary ml-1 animate-blink align-middle"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-surface border-t border-secondary z-20">
        <form
          onSubmit={handleSubmit}
          className="relative flex gap-2 items-center"
        >
          <span className="text-primary animate-pulse text-lg">›</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER COMMAND..."
            className="flex-1 bg-transparent text-white border-b border-secondary focus:border-primary outline-none py-2 text-sm font-mono placeholder-tech-dim/50 transition-colors"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 text-primary hover:text-white disabled:opacity-30 disabled:hover:text-primary transition-colors"
          >
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
