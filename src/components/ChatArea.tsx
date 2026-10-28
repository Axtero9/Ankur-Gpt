import React, { useRef, useEffect, useState } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ZoomIn,
  X
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
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);

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
                <div className="max-w-[85%] sm:max-w-[75%] rounded-3xl px-5 py-3 bg-[#2f2f2f] text-[#ececec] text-[15px] leading-relaxed">
                  {message.image && (
                    <div className="mb-2.5">
                      <div
                        onClick={() => setSelectedImageModal(message.image || null)}
                        className="relative group/img cursor-pointer inline-block overflow-hidden rounded-2xl border border-[#444] bg-black/40 hover:border-blue-500/60 transition-all max-w-full"
                        title="Click to view full photo"
                      >
                        <img
                          src={message.image}
                          alt="Question attachment"
                          className="max-h-72 w-auto object-contain rounded-2xl transition-transform duration-200 group-hover/img:scale-[1.01]"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-xs font-medium text-white bg-black/75 px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm border border-white/20">
                            <ZoomIn className="w-3.5 h-3.5" />
                            Expand photo
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {message.content && (
                    <p className="whitespace-pre-wrap font-sans">
                      {message.content}
                    </p>
                  )}
                </div>
              ) : (
                /* Assistant Message */
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#b4b4b4] pb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#b4b4b4]" />
                    <span className="font-medium text-[#ececec]">
                      VidyaGPT
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

      {/* Full-Screen Image Lightbox Modal */}
      {selectedImageModal && (
        <div
          onClick={() => setSelectedImageModal(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
          >
            <button
              onClick={() => setSelectedImageModal(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-[#2f2f2f] text-white hover:bg-[#404040] transition-colors border border-[#444]"
              title="Close image"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImageModal}
              alt="Enlarged question"
              className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl border border-[#444]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
