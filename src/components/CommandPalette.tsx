import React, { useState, useEffect } from 'react';
import {
  Search,
  MessageSquare,
  Plus,
  Sliders,
  Cpu
} from 'lucide-react';
import { Conversation, AppSettings } from '../types';
import { AVAILABLE_MODELS } from '../services/storage';
import { sound } from '../services/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenSettings: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  conversations,
  onSelectChat,
  onNewChat,
  settings,
  onUpdateSettings,
  onOpenSettings
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-[#212121] border border-[#383838] shadow-2xl overflow-hidden animate-in fade-in duration-150">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2f2f2f]">
          <Search className="w-4 h-4 text-[#8e8e8e]" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands or chats..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-[#ececec] placeholder-[#8e8e8e] focus:outline-none"
          />
          <kbd className="text-[10px] font-mono text-[#8e8e8e] bg-[#2f2f2f] px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-3 text-xs">
          <div className="space-y-0.5">
            <button
              onClick={() => {
                sound.playClick();
                onNewChat();
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2f2f2f] text-[#ececec] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4 text-[#b4b4b4]" />
                <span>New chat</span>
              </div>
              <kbd className="text-[10px] text-[#8e8e8e]">⌘N</kbd>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenSettings();
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2f2f2f] text-[#ececec] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-[#b4b4b4]" />
                <span>Settings</span>
              </div>
            </button>
          </div>

          {/* Models */}
          <div className="space-y-0.5 border-t border-[#2f2f2f] pt-2">
            <div className="px-3 py-1 text-[11px] font-medium text-[#8e8e8e] uppercase">
              Models
            </div>
            {AVAILABLE_MODELS.map(m => (
              <button
                key={m.id}
                onClick={() => {
                  sound.playClick();
                  onUpdateSettings({ selectedModel: m.id });
                  onClose();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                  settings.selectedModel === m.id
                    ? 'bg-[#2f2f2f] text-white font-medium'
                    : 'hover:bg-[#2a2a2a] text-[#b4b4b4]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{m.name}</span>
                </div>
                <span className="text-[10px] text-[#8e8e8e]">{m.code}</span>
              </button>
            ))}
          </div>

          {/* Conversations */}
          {filteredConversations.length > 0 && (
            <div className="space-y-0.5 border-t border-[#2f2f2f] pt-2">
              <div className="px-3 py-1 text-[11px] font-medium text-[#8e8e8e] uppercase">
                Chats
              </div>
              {filteredConversations.slice(0, 5).map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectChat(c.id);
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2f2f2f] text-[#b4b4b4] hover:text-[#ececec] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{c.title}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
