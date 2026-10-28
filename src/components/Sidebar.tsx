import React, { useState } from 'react';
import {
  SquarePen,
  PanelLeftClose,
  Image as ImageIcon,
  Blocks,
  HelpCircle,
  Compass,
  Settings,
  MessageSquare,
  Trash2,
  Edit2,
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Conversation, AppSettings } from '../types';
import { sound } from '../services/sound';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  conversations: Conversation[];
  activeId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  onRenameChat: (id: string, newTitle: string) => void;
  onTogglePin: (id: string) => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenSettings: () => void;
  onSelectPrompt?: (prompt: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  conversations,
  activeId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onRenameChat,
  onOpenSettings,
  onSelectPrompt
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const startEditing = (c: Conversation) => {
    setEditingId(c.id);
    setEditingTitle(c.title);
    sound.playClick();
  };

  const saveEditing = (id: string) => {
    if (editingTitle.trim()) {
      onRenameChat(id, editingTitle.trim());
    }
    setEditingId(null);
    sound.playClick();
  };

  // Only display real conversations with messages
  const activeChats = conversations.filter(c => c.messages.length > 0);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Sidebar Panel matching Screenshot layout */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-[260px] flex flex-col bg-[#171717] text-[#ececec] border-r border-[#262626] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header: "ChatGPT ▾" and Collapse Button */}
        <div className="h-14 px-3 flex items-center justify-between">
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#212121] transition-colors text-sm font-semibold text-[#ececec]"
          >
            <span>VidyaGPT</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#b4b4b4]" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onToggle();
            }}
            className="p-1.5 rounded-lg text-[#b4b4b4] hover:text-white hover:bg-[#212121] transition-colors"
            title="Close sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Action Items List (as seen in screenshot) */}
        <div className="px-2 py-1 space-y-0.5 text-[13px] font-sans">
          {/* New chat */}
          <button
            onClick={() => {
              sound.playClick();
              onNewChat();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[#ececec] hover:bg-[#212121] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <SquarePen className="w-4 h-4 text-[#b4b4b4] group-hover:text-white" />
              <span>New chat</span>
            </div>
          </button>

          {/* Images */}
          <button
            onClick={() => {
              sound.playClick();
              if (onSelectPrompt) {
                onSelectPrompt('Give a detailed overview of the campus facilities, 32 classrooms, AI Smart Classrooms, 3 science labs, and sports playground at CM Shri School Karampura.');
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#212121] transition-colors group"
          >
            <ImageIcon className="w-4 h-4 text-[#b4b4b4] group-hover:text-white" />
            <span>Images</span>
          </button>

          {/* Plugins */}
          <button
            onClick={() => {
              sound.playClick();
              if (onSelectPrompt) {
                onSelectPrompt('Explain the complete admission process for Class 6, 9, and 11 for the 2026-27 session at CM Shri School Karampura.');
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#212121] transition-colors group"
          >
            <Blocks className="w-4 h-4 text-[#b4b4b4] group-hover:text-white" />
            <span>Plugins</span>
          </button>

          {/* See plans and pricing */}
          <button
            onClick={() => {
              sound.playClick();
              if (onSelectPrompt) {
                onSelectPrompt('What are the fees and streams offered in Class 11 (Science, Commerce, and Humanities)?');
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#212121] transition-colors group"
          >
            <Sparkles className="w-4 h-4 text-[#b4b4b4] group-hover:text-white" />
            <span>See plans and pricing</span>
          </button>

          {/* Help */}
          <button
            onClick={() => {
              sound.playClick();
              if (onSelectPrompt) {
                onSelectPrompt('Provide official contact numbers, email, campus address, Principal details, and Google Maps location for CM Shri School Karampura.');
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#212121] transition-colors group"
          >
            <HelpCircle className="w-4 h-4 text-[#b4b4b4] group-hover:text-white" />
            <span>Help</span>
          </button>

          {/* Deep research */}
          <a
            href="https://www.edudel.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#212121] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-[#b4b4b4] group-hover:text-white" />
              <span>Deep research</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[#777]" />
          </a>

          {/* Settings */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#212121] transition-colors group"
          >
            <Settings className="w-4 h-4 text-[#b4b4b4] group-hover:text-white" />
            <span>Settings</span>
          </button>
        </div>

        {/* Previous Inquiries / Chats */}
        <div className="flex-1 overflow-y-auto px-2 py-2 mt-2 space-y-0.5">
          {activeChats.length > 0 && (
            <div className="px-3 py-1.5 text-[11px] font-medium text-[#8e8e8e] uppercase tracking-wider">
              Previous Inquiries
            </div>
          )}

          {activeChats.map(c => {
            const isActive = c.id === activeId;
            return (
              <div
                key={c.id}
                onClick={() => {
                  if (editingId !== c.id) {
                    sound.playClick();
                    onSelectChat(c.id);
                  }
                }}
                className={`group relative flex items-center justify-between px-3 py-2 rounded-lg text-[13px] cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#212121] text-white font-medium'
                    : 'text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#212121]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#b4b4b4] shrink-0" />
                  {editingId === c.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      autoFocus
                      onChange={e => setEditingTitle(e.target.value)}
                      onBlur={() => saveEditing(c.id)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') saveEditing(c.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="w-full bg-[#121212] px-1 py-0.5 rounded text-xs text-white border border-[#424242] focus:outline-none"
                    />
                  ) : (
                    <span className="truncate">{c.title}</span>
                  )}
                </div>

                <div
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    onClick={() => startEditing(c)}
                    className="p-1 text-[#b4b4b4] hover:text-white"
                    title="Rename"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onDeleteChat(c.id);
                    }}
                    className="p-1 text-[#b4b4b4] hover:text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Card (matching screenshot's "Get responses tailored to you" card) */}
        <div className="p-3">
          <div className="p-3 rounded-xl bg-[#212121] border border-[#262626] space-y-2 text-xs">
            <div className="font-semibold text-white">
              Get responses tailored to you
            </div>
            <p className="text-[11px] text-[#b4b4b4] leading-relaxed">
              CM Shri School Karampura. School ID: 1516068. Free Education under Delhi Govt.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                onOpenSettings();
              }}
              className="w-full py-1.5 px-3 rounded-full bg-white text-black font-medium text-xs hover:bg-[#e0e0e0] transition-colors"
            >
              Log in
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
