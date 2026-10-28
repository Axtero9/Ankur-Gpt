import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUp,
  Square,
  Mic,
  Plus,
  Camera,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { PROMPT_TEMPLATES } from '../data/templates';
import { sound } from '../services/sound';

interface ChatInputProps {
  onSendMessage: (content: string, image?: string) => void;
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 160)}px`;
    }
  }, [input]);

  // Process selected image file
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, JPEG, WebP).');
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      alert('Image file size should be less than 12MB.');
      return;
    }

    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      sound.playClick();
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Clipboard Paste (supports pasting screenshots directly via Ctrl+V / Cmd+V)
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            processImageFile(file);
            e.preventDefault();
            break;
          }
        }
      }
    }
  };

  // Drag & drop image support
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    }
  };

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
    if (!input.trim() && !selectedImage) return;

    sound.playSend();
    onSendMessage(input.trim(), selectedImage || undefined);
    setInput('');
    setSelectedImage(null);
    setImageName('');
    setShowSlashMenu(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      alert('Voice dictation is not supported in this browser. Please use Chrome or Edge.');
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

  const canSubmit = input.trim().length > 0 || selectedImage !== null;

  return (
    <div
      className="relative w-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden File Input for Question Photo */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Drag & Drop Visual Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-50 rounded-3xl bg-blue-600/20 border-2 border-dashed border-blue-400 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 text-sm font-medium text-white bg-[#212121] px-4 py-2 rounded-full shadow-lg">
            <ImageIcon className="w-4 h-4 text-blue-400" />
            <span>Drop question photo here</span>
          </div>
        </div>
      )}

      {/* Selected Image Preview Pill */}
      {selectedImage && (
        <div className="mb-2 p-2 rounded-2xl bg-[#252525] border border-[#383838] flex items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#444] shrink-0 bg-black/40">
              <img
                src={selectedImage}
                alt="Question preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-medium">
                  Photo Attached
                </span>
                <p className="text-xs font-medium text-white truncate max-w-[200px] sm:max-w-xs">
                  {imageName || 'Question.jpg'}
                </p>
              </div>
              <p className="text-[11px] text-[#8e8e8e] truncate mt-0.5">
                VidyaGPT will analyze this question image and provide the step-by-step solution
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSelectedImage(null);
              setImageName('');
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="p-1.5 rounded-full hover:bg-[#383838] text-[#b4b4b4] hover:text-white transition-colors shrink-0"
            title="Remove attached photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Prompts Popup */}
      {showSlashMenu && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-2xl bg-[#2a2a2a] border border-[#383838] shadow-2xl z-40 max-h-60 overflow-y-auto">
          <div className="px-3 py-1.5 text-xs text-[#b4b4b4] border-b border-[#383838] mb-1 flex items-center justify-between">
            <span>Quick Prompts & Actions</span>
            <span className="text-xs text-[#8e8e8e]">VidyaGPT 1516068</span>
          </div>

          {/* Quick Photo Upload Action */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowSlashMenu(false);
              fileInputRef.current?.click();
            }}
            className="w-full text-left p-2.5 rounded-xl hover:bg-[#333333] text-[#ececec] transition-colors flex items-center justify-between group mb-1 border-b border-[#333]"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center gap-1">
                <Camera className="w-3 h-3" />
                Upload Photo
              </span>
              <div>
                <div className="text-xs font-medium text-white">Upload Question Photo</div>
                <div className="text-[11px] text-[#b4b4b4]">Select photo of math problem, textbook, or diagram</div>
              </div>
            </div>
            <ArrowUp className="w-3.5 h-3.5 text-[#8e8e8e] group-hover:text-white rotate-45 transition-transform" />
          </button>

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

      {/* Exact ChatGPT Capsule Input */}
      <div className="relative flex items-center rounded-full bg-[#2f2f2f] border border-[#383838] focus-within:border-[#555] transition-all px-3 py-1.5 min-h-[52px]">
        {/* Left "+" Button (Quick Prompts) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setShowSlashMenu(!showSlashMenu);
          }}
          className="w-8 h-8 rounded-full text-[#b4b4b4] hover:text-white hover:bg-[#383838] flex items-center justify-center transition-colors shrink-0"
          title="Quick Prompts & Templates"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Photo Upload Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            fileInputRef.current?.click();
          }}
          className="w-8 h-8 rounded-full text-[#b4b4b4] hover:text-white hover:bg-[#383838] flex items-center justify-center transition-colors shrink-0 mr-1"
          title="Attach Question Photo (Textbook / Handwritten problem)"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Text Input with Paste listener */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={
            selectedImage
              ? "Add question details or press send to solve this photo..."
              : "Ask VidyaGPT anything or upload a question photo..."
          }
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
              disabled={!canSubmit}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                canSubmit
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-[#676767] text-[#2f2f2f] cursor-not-allowed'
              }`}
              title="Send question"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
