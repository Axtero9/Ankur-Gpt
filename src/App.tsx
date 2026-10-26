import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatArea } from './components/ChatArea';
import { ChatInput } from './components/ChatInput';
import { CommandPalette } from './components/CommandPalette';
import { SettingsModal } from './components/SettingsModal';
import { Conversation, Message, AppSettings } from './types';
import { storage } from './services/storage';
import { generateAIResponse, generateChatTitle } from './services/ai';
import { sound } from './services/sound';

export const App: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(() => storage.getConversations());
  const [activeId, setActiveId] = useState<string>(() => storage.getActiveId());
  const [settings, setSettings] = useState<AppSettings>(() => storage.getSettings());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync sound manager enabled state with settings
  useEffect(() => {
    sound.enabled = settings.soundEnabled;
  }, [settings.soundEnabled]);

  // Sync conversations to localStorage
  useEffect(() => {
    storage.saveConversations(conversations);
  }, [conversations]);

  // Sync activeId to localStorage
  useEffect(() => {
    storage.saveActiveId(activeId);
  }, [activeId]);

  // Sync settings to localStorage
  useEffect(() => {
    storage.saveSettings(settings);
  }, [settings]);

  // Global Keyboard Shortcuts (⌘K, ⌘N, ⌘\)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;
      if (isCmd && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      } else if (isCmd && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        handleNewChat();
      } else if (isCmd && e.key === '\\') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [conversations]);

  const activeConversation =
    conversations.find(c => c.id === activeId) || conversations[0];

  const hasMessages = activeConversation && activeConversation.messages.length > 0;

  // Update Settings Partial
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Create New Chat (Completely clean and empty)
  const handleNewChat = () => {
    sound.playClick();
    const newChat: Conversation = {
      id: `chat-${Date.now()}`,
      title: 'New chat',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [], // ZERO MOCK MESSAGES
      model: settings.selectedModel
    };
    setConversations(prev => [newChat, ...prev]);
    setActiveId(newChat.id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Select Chat
  const handleSelectChat = (id: string) => {
    setActiveId(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Delete Chat
  const handleDeleteChat = (id: string) => {
    const remaining = conversations.filter(c => c.id !== id);
    if (remaining.length === 0) {
      const fallback: Conversation = {
        id: `chat-${Date.now()}`,
        title: 'New chat',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: [],
        model: settings.selectedModel
      };
      setConversations([fallback]);
      setActiveId(fallback.id);
    } else {
      setConversations(remaining);
      if (activeId === id) {
        setActiveId(remaining[0].id);
      }
    }
  };

  // Rename Chat
  const handleRenameChat = (id: string, newTitle: string) => {
    setConversations(prev =>
      prev.map(c => (c.id === id ? { ...c, title: newTitle } : c))
    );
  };

  // Pin/Unpin Chat
  const handleTogglePin = (id: string) => {
    setConversations(prev =>
      prev.map(c => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
  };

  // Clear Chat
  const handleClearChat = () => {
    if (!activeConversation) return;
    setConversations(prev =>
      prev.map(c => (c.id === activeId ? { ...c, messages: [] } : c))
    );
  };

  // Stop Generation
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  // Send Message Flow
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
      modelUsed: settings.selectedModel
    };

    const assistantMsgId = `asst-${Date.now() + 1}`;
    const initialAssistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now() + 1,
      modelUsed: settings.selectedModel,
      isStreaming: true
    };

    const isFirstMessage = (activeConversation?.messages.length || 0) === 0;
    const newTitle = isFirstMessage ? generateChatTitle(content) : activeConversation.title;

    const updatedMessages = [...(activeConversation?.messages || []), userMsg];

    setConversations(prev =>
      prev.map(c =>
        c.id === activeId
          ? {
              ...c,
              title: newTitle,
              updatedAt: Date.now(),
              messages: [...updatedMessages, initialAssistantMsg]
            }
          : c
      )
    );

    setIsStreaming(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await generateAIResponse({
        messages: updatedMessages,
        settings,
        signal: controller.signal,
        onChunk: chunk => {
          setConversations(prev =>
            prev.map(c => {
              if (c.id !== activeId) return c;
              return {
                ...c,
                messages: c.messages.map(m =>
                  m.id === assistantMsgId ? { ...m, content: chunk } : m
                )
              };
            })
          );
        }
      });

      sound.playComplete();
    } catch (err: unknown) {
      if ((err as Error)?.name !== 'AbortError') {
        const errorMsg = (err instanceof Error) ? err.message : String(err);
        setConversations(prev =>
          prev.map(c => {
            if (c.id !== activeId) return c;
            return {
              ...c,
              messages: c.messages.map(m =>
                m.id === assistantMsgId
                  ? { ...m, content: `> **Notice:** ${errorMsg}` }
                  : m
              )
            };
          })
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
      setConversations(prev =>
        prev.map(c => {
          if (c.id !== activeId) return c;
          return {
            ...c,
            messages: c.messages.map(m =>
              m.id === assistantMsgId ? { ...m, isStreaming: false } : m
            )
          };
        })
      );
    }
  };

  // Regenerate Last Assistant Message
  const handleRegenerate = async () => {
    if (!activeConversation || isStreaming) return;
    const msgs = activeConversation.messages;
    if (msgs.length === 0) return;

    const lastIsAssistant = msgs[msgs.length - 1].role === 'assistant';
    const trimmed = lastIsAssistant ? msgs.slice(0, -1) : msgs;
    const lastUserMsg = trimmed[trimmed.length - 1];

    if (!lastUserMsg) return;

    const assistantMsgId = `asst-${Date.now()}`;
    const initialAssistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      modelUsed: settings.selectedModel,
      isStreaming: true
    };

    setConversations(prev =>
      prev.map(c =>
        c.id === activeId
          ? {
              ...c,
              updatedAt: Date.now(),
              messages: [...trimmed, initialAssistantMsg]
            }
          : c
      )
    );

    setIsStreaming(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await generateAIResponse({
        messages: trimmed,
        settings,
        signal: controller.signal,
        onChunk: chunk => {
          setConversations(prev =>
            prev.map(c => {
              if (c.id !== activeId) return c;
              return {
                ...c,
                messages: c.messages.map(m =>
                  m.id === assistantMsgId ? { ...m, content: chunk } : m
                )
              };
            })
          );
        }
      });
      sound.playComplete();
    } catch {
      // Aborted or error handled
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#212121] text-[#ececec] overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(prev => !prev)}
        conversations={conversations}
        activeId={activeId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
        onTogglePin={handleTogglePin}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenSettings={() => setSettingsOpen(true)}
        onSelectPrompt={prompt => handleSendMessage(prompt)}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 flex flex-col min-w-0 h-full relative transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-[260px]' : 'pl-0'
        }`}
      >
        {/* Header Bar */}
        <Header
          onToggleSidebar={() => setSidebarOpen(prev => !prev)}
          sidebarOpen={sidebarOpen}
          activeConversation={activeConversation}
          settings={settings}
          onClearChat={handleClearChat}
          onOpenSettings={() => setSettingsOpen(true)}
          isStreaming={isStreaming}
        />

        {/* Viewport: Empty State (Inspired by Screenshot) vs Conversation History */}
        {!hasMessages ? (
          <div className="flex-1 flex flex-col justify-center items-center px-4 max-w-2xl mx-auto w-full animate-in fade-in duration-200">
            {/* "Where should we begin?" (Exact text from screenshot) */}
            <h1 className="text-3xl font-medium tracking-tight text-[#ececec] mb-7 text-center">
              Where should we begin?
            </h1>

            {/* Centered ChatGPT Capsule Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              onStopGeneration={handleStopGeneration}
              isStreaming={isStreaming}
            />

            {/* Suggestion Pills (matching screenshot) */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-xl">
              <button
                onClick={() => {
                  sound.playClick();
                  handleSendMessage('What can you do? Explain all your features, information, and how you can assist students and parents.');
                }}
                className="px-4 py-2 rounded-full bg-[#212121] hover:bg-[#2f2f2f] text-[#b4b4b4] hover:text-[#ececec] text-sm border border-[#383838] transition-all"
              >
                What can you do?
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  handleSendMessage('Explain the centralized admission process for Class 6, 9, and 11 on edudel.nic.in for 2026-27.');
                }}
                className="px-4 py-2 rounded-full bg-[#212121] hover:bg-[#2f2f2f] text-[#b4b4b4] hover:text-[#ececec] text-sm border border-[#383838] transition-all"
              >
                Admissions 2026-27
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  handleSendMessage('What streams and subjects are offered in Class 11 (Science, Commerce, Humanities)?');
                }}
                className="px-4 py-2 rounded-full bg-[#212121] hover:bg-[#2f2f2f] text-[#b4b4b4] hover:text-[#ececec] text-sm border border-[#383838] transition-all"
              >
                Class 11 Streams
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  handleSendMessage('What is the school fee policy and admission charge for CM Shri School Karampura?');
                }}
                className="px-4 py-2 rounded-full bg-[#212121] hover:bg-[#2f2f2f] text-[#b4b4b4] hover:text-[#ececec] text-sm border border-[#383838] transition-all"
              >
                100% Free Education
              </button>
            </div>
          </div>
        ) : (
          /* Active Conversation History */
          <div className="flex-1 flex flex-col min-h-0">
            <ChatArea
              conversation={activeConversation}
              settings={settings}
              isStreaming={isStreaming}
              onRegenerate={handleRegenerate}
            />

            {/* Bottom Docked Input */}
            <div className="px-4 md:px-8 max-w-3xl mx-auto w-full pb-2">
              <ChatInput
                onSendMessage={handleSendMessage}
                onStopGeneration={handleStopGeneration}
                isStreaming={isStreaming}
              />
            </div>
          </div>
        )}

        {/* Bottom Disclaimer (matching screenshot) */}
        <div className="py-2.5 text-center text-xs text-[#8e8e8e] font-sans px-4">
          AnkurGPT is powered by Google Gemini. CM Shri School Karampura (ID: 1516068). Free Education under Delhi Govt.
        </div>
      </main>

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        conversations={conversations}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSave={handleUpdateSettings}
      />
    </div>
  );
};
