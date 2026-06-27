import React, { useState, useEffect } from 'react';
import { AppState } from '../useAppState';
import { STATIC_STORIES } from '../data';
import { Story } from '../types';
import { 
  BookOpen, Coins, Lock, Play, Pause, ChevronLeft, 
  ChevronRight, ArrowLeft, Volume2, Globe, Sparkles
} from 'lucide-react';

interface StoryModuleProps {
  state: AppState;
}

export default function StoryModule({ state }: StoryModuleProps) {
  const { user, storyUnlocks, unlockStory, addNotification } = state;

  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');

  // Text-To-Speech (TTS) state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Stop reading when leaving story
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [selectedStory]);

  const isStoryUnlocked = (storyId: string) => {
    const story = STATIC_STORIES.find(s => s.id === storyId);
    if (!story) return false;
    if (story.is_free) return true;
    return storyUnlocks.some(u => u.story_id === storyId);
  };

  const handleUnlockClick = (story: Story) => {
    const success = unlockStory(story.id, story.harga_coin);
    if (success) {
      // Re-render
    }
  };

  const handleReadClick = (story: Story) => {
    setSelectedStory(story);
    setCurrentPage(0);
    setLanguage(story.bahasa); // Default language matches story primary language
  };

  // Text-To-Speech control
  const handleToggleTTS = () => {
    if (!selectedStory) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const currentText = selectedStory.konten[currentPage];
    if (!currentText) return;

    // Stop other voices
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentText);
    
    // Choose voice language
    if (language === 'EN') {
      utterance.lang = 'en-US';
    } else {
      utterance.lang = 'id-ID';
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setSpeechUtterance(utterance);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleNextPage = () => {
    if (!selectedStory) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    if (currentPage < selectedStory.konten.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (selectedStory) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 max-w-2xl mx-auto" id="story-reader-root">
        
        {/* Reader Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <button
            onClick={() => setSelectedStory(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Perpustakaan
          </button>

          {/* Controls: Language, TTS */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setLanguage(prev => prev === 'ID' ? 'EN' : 'ID');
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-500" /> Language: {language}
            </button>

            <button
              onClick={handleToggleTTS}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSpeaking 
                  ? 'bg-rose-600 text-white animate-pulse' 
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              {isSpeaking ? 'Berhenti Membaca' : 'Bacakan Otomatis'}
            </button>
          </div>
        </div>

        {/* Story Book Frame */}
        <div className="py-8 px-4 md:px-8 space-y-6 text-center">
          
          {/* Progress Indicator */}
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            Halaman {currentPage + 1} dari {selectedStory.konten.length}
          </span>

          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            {selectedStory.judul}
          </h2>

          {/* Dynamic illustration colored background frame for parenting feel */}
          <div className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${selectedStory.cover_color} flex flex-col items-center justify-center p-6 text-white text-center shadow-inner relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <BookOpen className="w-16 h-16 text-white/90 drop-shadow mb-3 animate-bounce" />
            <span className="text-xs uppercase tracking-widest font-black text-white/75 relative z-10">Buku Dongeng {selectedStory.tag_usia}</span>
            <p className="text-xs italic text-white/90 max-w-sm mt-1 relative z-10">
              "Kisah indah pengantar tidur si kecil untuk mempererat ikatan batin keluarga."
            </p>
          </div>

          {/* Main Story Text */}
          <div className="prose prose-indigo max-w-none">
            <p className="text-base md:text-lg text-slate-800 leading-relaxed font-medium font-serif max-w-lg mx-auto bg-gray-50/50 p-6 rounded-2xl border border-slate-200">
              {/* Translate simulated via static, if EN but story has no direct translations, we show primary content */}
              {language === 'EN' && selectedStory.id === 's_1' 
                ? 'Once upon a time in a deep and beautiful forest, there lived a tiny Mouse Deer who was very famous for his cleverness...'
                : selectedStory.konten[currentPage]
              }
            </p>
          </div>

        </div>

        {/* Reader Pagination Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border flex items-center gap-1 transition-all ${
              currentPage === 0
                ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Halaman Sebelumnya
          </button>

          <span className="text-xs font-bold text-slate-400">
            {currentPage + 1} / {selectedStory.konten.length}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === selectedStory.konten.length - 1}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border flex items-center gap-1 transition-all ${
              currentPage === selectedStory.konten.length - 1
                ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            Halaman Selanjutnya <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8" id="story-module-root">
      
      {/* Coin Balance Badge Banner */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
            <Coins className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h4 className="font-extrabold text-amber-950 text-sm">Gudang Koin Cerita Anda</h4>
            <p className="text-xs text-amber-800">
              Saldo Sekarang: <strong>{user.saldo_coin} Koin</strong> | Unlocked: {storyUnlocks.length} Cerita Premium
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-1 rounded-md font-medium flex items-center gap-1">
            🎁 3 Cerita Pertama Selamanya GRATIS!
          </span>
        </div>
      </div>

      {/* Library Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATIC_STORIES.map((story) => {
          const unlocked = isStoryUnlocked(story.id);

          return (
            <div 
              key={story.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col justify-between"
            >
              
              {/* Cover Header */}
              <div className={`p-5 bg-gradient-to-br ${story.cover_color} text-white space-y-3 relative`}>
                <div className="flex justify-between items-start">
                  <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {story.tag_usia} • {story.bahasa}
                  </span>
                  {!story.is_free && !unlocked && (
                    <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Lock className="w-3 h-3" /> {story.harga_coin} Koin
                    </span>
                  )}
                </div>

                <div className="space-y-1 pt-2">
                  <h4 className="font-black text-base leading-snug tracking-tight truncate-2-lines">
                    {story.judul}
                  </h4>
                  <p className="text-[10px] text-white/85 flex items-center gap-1">
                    📖 Durasi baca: {story.durasi_baca}
                  </p>
                </div>
              </div>

              {/* Body summary */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-500 leading-relaxed">
                  {story.deskripsi_singkat}
                </p>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                  {story.is_free || unlocked ? (
                    <button
                      onClick={() => handleReadClick(story)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" /> Baca Dongeng Sekarang
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnlockClick(story)}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Coins className="w-4 h-4" /> Buka Kunci ({story.harga_coin} Koin)
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
