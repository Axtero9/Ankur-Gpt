import React, { useState } from 'react';
import {
  X,
  Key,
  Check,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { AppSettings } from '../types';
import { sound } from '../services/sound';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (newSettings: Partial<AppSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'api' | 'school'>('api');
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [savedBadge, setSavedBadge] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playClick();
    onSave(formData);
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#212121] border border-[#383838] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2f2f2f] flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">
            Settings
          </h2>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-[#b4b4b4] hover:text-white hover:bg-[#2f2f2f] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#2f2f2f] px-6 text-sm">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('api');
            }}
            className={`py-3 px-3 border-b-2 font-medium transition-colors ${
              activeTab === 'api'
                ? 'border-white text-white'
                : 'border-transparent text-[#b4b4b4] hover:text-white'
            }`}
          >
            Gemini AI Model
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('school');
            }}
            className={`py-3 px-3 border-b-2 font-medium transition-colors ${
              activeTab === 'school'
                ? 'border-white text-white'
                : 'border-transparent text-[#b4b4b4] hover:text-white'
            }`}
          >
            School Details
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* TAB: GEMINI API */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-[#b4b4b4] uppercase">
                    Google Gemini API Key
                  </label>
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Configured
                  </span>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-[#8e8e8e] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Enter Gemini API Key"
                    value={formData.apiKey}
                    onChange={e => setFormData({ ...formData, apiKey: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#2f2f2f] border border-[#383838] text-white text-xs focus:outline-none focus:border-[#555]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#b4b4b4] uppercase">
                  Model Selection
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setFormData({ ...formData, selectedModel: 'gemini-flash-latest' })}
                    className={`p-3 rounded-xl border text-left transition-colors ${
                      formData.selectedModel === 'gemini-flash-latest'
                        ? 'bg-[#2f2f2f] border-white text-white'
                        : 'bg-[#1a1a1a] border-[#333] text-[#b4b4b4] hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-white">Gemini 3.8 Flash</div>
                    <div className="text-[11px] text-[#8e8e8e] mt-0.5">High-speed intelligence</div>
                  </button>

                  <button
                    onClick={() => setFormData({ ...formData, selectedModel: 'gemini-3.1-flash-lite' })}
                    className={`p-3 rounded-xl border text-left transition-colors ${
                      formData.selectedModel === 'gemini-3.1-flash-lite'
                        ? 'bg-[#2f2f2f] border-white text-white'
                        : 'bg-[#1a1a1a] border-[#333] text-[#b4b4b4] hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-white">Gemini Lite</div>
                    <div className="text-[11px] text-[#8e8e8e] mt-0.5">Ultra-low latency</div>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#b4b4b4] uppercase">
                  System Instructions
                </label>
                <textarea
                  rows={4}
                  value={formData.systemPrompt}
                  onChange={e => setFormData({ ...formData, systemPrompt: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#2f2f2f] border border-[#383838] text-white text-xs focus:outline-none focus:border-[#555] resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB: SCHOOL DETAILS */}
          {activeTab === 'school' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#2f2f2f] border border-[#383838] space-y-1">
                <div className="font-semibold text-white text-sm">
                  Govt. Co-Ed Sr. Sec. School, CM Shri School
                </div>
                <div className="text-[#b4b4b4]">
                  Industrial Area, Karampura, New Delhi – 110015 (Zone 16, West-A)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-[#2f2f2f] border border-[#383838]">
                  <div className="text-[#8e8e8e]">School ID (DoE)</div>
                  <div className="text-white font-semibold text-sm mt-0.5">1516068</div>
                </div>

                <div className="p-3 rounded-xl bg-[#2f2f2f] border border-[#383838]">
                  <div className="text-[#8e8e8e]">CBSE Affiliation</div>
                  <div className="text-white font-semibold text-sm mt-0.5">2766038 (to 2028)</div>
                </div>

                <div className="p-3 rounded-xl bg-[#2f2f2f] border border-[#383838]">
                  <div className="text-[#8e8e8e]">Education Fees</div>
                  <div className="text-emerald-400 font-semibold text-sm mt-0.5">100% Free</div>
                </div>

                <div className="p-3 rounded-xl bg-[#2f2f2f] border border-[#383838]">
                  <div className="text-[#8e8e8e]">Office Phone</div>
                  <div className="text-white font-semibold text-sm mt-0.5">011-25455229</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2f2f2f] flex items-center justify-between">
          <div className="text-xs text-[#8e8e8e]">
            {savedBadge && (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-full text-xs text-[#b4b4b4] hover:text-white hover:bg-[#2f2f2f] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-[#e0e0e0] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
