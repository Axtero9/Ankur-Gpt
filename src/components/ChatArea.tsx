import React, { useRef, useEffect, useState } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { Message, Conversation, AppSettings } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { sound } from '../services/sound';

interface ChatAreaProps {
  conversation?: Conversation;
  settings: AppSettings;
  isStreaming: boolean;
  onRegenerate: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  conversation,
  settings,
  isStreaming,
  onRegenerate
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messages = conversation?.messages || [];

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Copy message
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    sound.playClick();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Speech synthesis
  const handleSpeak = (id: string, text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*`_~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    sound.playClick();
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const isLast = index === messages.length - 1;

          return (
            <div
              key={message.id || index}
              className={`group flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* User Message Bubble */}
              {isUser ? (
                <div className="max-w-[80%] rounded-3xl px-5 py-3 bg-[#2f2f2f] text-[#ececec] text-[15px] leading-relaxed">
                  <p className="whitespace-pre-wrap font-sans">
                    {message.content}
                  </p>
                </div>
              ) : (
                /* Assistant Message */
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#b4b4b4] pb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#b4b4b4]" />
                    <span className="font-medium text-[#ececec]">
                      AnkurGPT
                    </span>
                  </div>

                  {/* Message Body */}
                  <div className="text-[15px] leading-relaxed text-[#ececec] font-sans">
                    <MarkdownRenderer content={message.content} />
                    {/* Streaming Cursor */}
                    {isStreaming && isLast && (
                      <span className="inline-block w-2 h-4 bg-white animate-pulse ml-1 translate-y-0.5" />
                    )}
                  </div>

                  {/* Actions */}
                  {!isStreaming && (
                    <div className="flex items-center gap-3 pt-2 text-[#b4b4b4] text-xs opacity-75 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(message.id, message.content)}
                        className="flex items-center gap-1.5 p-1 rounded hover:text-white transition-colors"
                        title="Copy"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleSpeak(message.id, message.content)}
                        className="flex items-center gap-1.5 p-1 rounded hover:text-white transition-colors"
                        title="Read aloud"
                      >
                        {speakingId === message.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-white" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Read aloud</span>
                          </>
                        )}
                      </button>

                      {isLast && (
                        <button
                          onClick={() => {
                            sound.playClick();
                            onRegenerate();
                          }}
                          className="flex items-center gap-1.5 p-1 rounded hover:text-white transition-colors"
                          title="Regenerate"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Regenerate</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
