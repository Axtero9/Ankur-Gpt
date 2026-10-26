import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUp,
  Square,
  Mic,
  Plus
} from 'lucide-react';
import { PROMPT_TEMPLATES } from '../data/templates';
import { sound } from '../services/sound';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onStopGeneration: () => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStopGeneration,
  isStreaming,
  disabled
}) => {
  const [input, setInput] = useState('');
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 160)}px`;
    }
  }, [input]);

  // Handle input change & slash trigger
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);

    if (val.startsWith('/')) {
      setShowSlashMenu(true);
      setSlashFilter(val.slice(1).toLowerCase());
    } else {
      setShowSlashMenu(false);
    }
  };

  // Submit message
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isStreaming) return;
    if (!input.trim()) return;

    sound.playSend();
    onSendMessage(input.trim());
    setInput('');
    setShowSlashMenu(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  // Handle keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      setShowSlashMenu(false);
    }
  };

  // Select Slash Command
  const handleSelectTemplate = (promptPrefix: string) => {
    sound.playClick();
    setInput(promptPrefix);
    setShowSlashMenu(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Voice Dictation
  const toggleRecording = () => {
    sound.playClick();
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      setIsRecording(false);
    }
  };

  const filteredTemplates = PROMPT_TEMPLATES.filter(
    t =>
      t.command.toLowerCase().includes(slashFilter) ||
      t.title.toLowerCase().includes(slashFilter) ||
      t.description.toLowerCase().includes(slashFilter)
  );

  return (
    <div className="relative w-full">
      {/* Quick Prompts Popup */}
      {showSlashMenu && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-2xl bg-[#2a2a2a] border border-[#383838] shadow-2xl z-40 max-h-60 overflow-y-auto">
          <div className="px-3 py-1.5 text-xs text-[#b4b4b4] border-b border-[#383838] mb-1 flex items-center justify-between">
            <span>Quick Prompts</span>
            <span className="text-xs text-[#8e8e8e]">CM Shri 1516068</span>
          </div>
          {filteredTemplates.length > 0 ? (
            <div className="space-y-0.5">
              {filteredTemplates.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTemplate(t.prompt)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[#333333] text-[#ececec] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded bg-[#212121] border border-[#383838] text-blue-400">
                      {t.command}
                    </span>
                    <div>
                      <div className="text-xs font-medium text-white">{t.title}</div>
                      <div className="text-[11px] text-[#b4b4b4]">{t.description}</div>
                    </div>
                  </div>
                  <ArrowUp className="w-3.5 h-3.5 text-[#8e8e8e] group-hover:text-white rotate-45 transition-transform" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-3 text-xs text-[#b4b4b4] text-center">
              No matching prompts
            </div>
          )}
        </div>
      )}

      {/* Exact ChatGPT Capsule Input (Matching Screenshot) */}
      <div className="relative flex items-center rounded-full bg-[#2f2f2f] border border-[#383838] focus-within:border-[#555] transition-all px-3 py-1.5 min-h-[52px]">
        {/* Left "+" Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setShowSlashMenu(!showSlashMenu);
          }}
          className="w-8 h-8 rounded-full text-[#b4b4b4] hover:text-white hover:bg-[#383838] flex items-center justify-center transition-colors shrink-0"
          title="Attach or Quick Prompts"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask AnkurGPT anything..."
          rows={1}
          disabled={disabled}
          className="flex-1 px-3 py-2 bg-transparent text-[15px] text-[#ececec] placeholder-[#8e8e8e] focus:outline-none resize-none leading-normal font-sans max-h-40"
        />

        {/* Right Controls: Mic + Blue Circle Send Button */}
        <div className="flex items-center gap-1.5 shrink-0 pr-1">
          {/* Voice Input */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse'
                : 'text-[#b4b4b4] hover:text-white hover:bg-[#383838]'
            }`}
            title={isRecording ? 'Listening... click to stop' : 'Voice input'}
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Send / Stop Button */}
          {isStreaming ? (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onStopGeneration();
              }}
              className="w-8 h-8 rounded-full bg-white text-black hover:bg-[#e0e0e0] flex items-center justify-center transition-colors"
              title="Stop generation"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={!input.trim()}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                input.trim()
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-[#676767] text-[#2f2f2f] cursor-not-allowed'
              }`}
              title="Send"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
