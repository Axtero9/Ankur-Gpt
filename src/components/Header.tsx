import React from 'react';
import {
  PanelLeft,
  ChevronDown,
  Trash2,
  Sliders
} from 'lucide-react';
import { AppSettings, Conversation } from '../types';
import { sound } from '../services/sound';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  activeConversation?: Conversation;
  settings: AppSettings;
  onClearChat: () => void;
  onOpenSettings: () => void;
  isStreaming: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  sidebarOpen,
  activeConversation,
  settings,
  onClearChat,
  onOpenSettings,
  isStreaming
}) => {
  return (
    <header className="h-14 px-4 sticky top-0 z-20 flex items-center justify-between bg-[#212121]">
      {/* Left: Sidebar Toggle & Brand */}
      <div className="flex items-center gap-2">
        {!sidebarOpen && (
          <button
            onClick={() => {
              sound.playClick();
              onToggleSidebar();
            }}
            className="p-2 rounded-lg text-[#b4b4b4] hover:text-white hover:bg-[#2f2f2f] transition-colors"
            title="Open sidebar"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => {
            sound.playClick();
            onOpenSettings();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#2f2f2f] transition-colors text-sm font-semibold text-[#ececec] group"
        >
          <span>AnkurGPT</span>
          <ChevronDown className="w-4 h-4 text-[#b4b4b4] group-hover:text-white" />
        </button>
      </div>

      {/* Right: ChatGPT-style Pills */}
      <div className="flex items-center gap-2">
        {/* School ID */}
        <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-[#2f2f2f] text-[#b4b4b4] text-xs font-medium">
          <span>School ID: 1516068</span>
        </div>

        {/* CBSE Badge */}
        <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-[#2f2f2f] text-[#b4b4b4] text-xs font-medium">
          <span>CBSE 2766038</span>
        </div>

        {/* Clear Chat if messages exist */}
        {activeConversation && activeConversation.messages.length > 0 && (
          <button
            onClick={() => {
              sound.playClick();
              onClearChat();
            }}
            className="p-2 rounded-full text-[#b4b4b4] hover:text-white hover:bg-[#2f2f2f] transition-colors"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {/* Settings Pill Button (styled like ChatGPT Log in button) */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenSettings();
          }}
          className="px-3.5 py-1.5 rounded-full bg-white text-black font-medium text-xs hover:bg-[#e0e0e0] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
      </div>
    </header>
  );
};
