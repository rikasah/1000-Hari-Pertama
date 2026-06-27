import React, { useState } from 'react';
import useAppState from './useAppState';
import PromilModule from './components/PromilModule';
import GrowthModule from './components/GrowthModule';
import VaccineModule from './components/VaccineModule';
import MilestoneModule from './components/MilestoneModule';
import ContentModule from './components/ContentModule';
import StoryModule from './components/StoryModule';
import CoinModule from './components/CoinModule';
import ChildManager from './components/ChildManager';

import { 
  Heart, Calendar, Activity, BookOpen, Coins, Bell, User, 
  ChevronRight, Sparkles, Brain, Shield, Plus, ChevronDown, CheckCircle, Info
} from 'lucide-react';

export default function App() {
  const state = useAppState();
  const { 
    user, children, activeChildId, activeChild, getChildAgeText, 
    setActiveChildId, notifications, markNotificationAsRead, 
    clearNotifications, getChildAgeInMonths, updateActiveMode
  } = state;

  // Tabs navigation
  const [activeTab, setActiveTab] = useState<'promil' | 'growth' | 'vaccine' | 'milestones' | 'content' | 'stories' | 'coins' | 'profiles'>('promil');

  // Sidebar / Notification Drawer state
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Active unread notifications count
  const unreadNotifCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between" id="app-container">
      
      {/* GLOBAL BANNER IF LH TEST POSITIVE */}
      {state.isLhTestPositiveToday() && (
        <div className="bg-rose-600 text-white text-xs font-semibold py-2 px-4 text-center animate-pulse flex items-center justify-center gap-1.5 z-50">
          <Sparkles className="w-4.5 h-4.5" />
          <span>Hasil Tes Ovulasi Positif Terdeteksi! Hari ini adalah <strong>masa subur puncak</strong> Anda.</span>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 py-3.5 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-md shadow-indigo-600/10">
              <span className="text-lg">1K</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-sm md:text-base tracking-tight text-slate-900 leading-tight">
                1000 Hari Pertama
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">Platform Tumbuh Kembang & Promil Sehat</p>
            </div>
          </div>

          {/* Quick Profile Switching Dropdown - Header Integrated */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-slate-50 bg-white text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-[10px]">
                  {activeChild ? activeChild.nama.substring(0, 1) : 'P'}
                </div>
                <span className="truncate max-w-[90px] md:max-w-[120px]">
                  {activeChild ? activeChild.nama : 'Pilih Profil'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <span className="block text-[9px] uppercase font-black text-slate-400 px-3 py-1.5">Pilih Anak / Mode Aktif</span>
                  
                  {/* Mode Promil option */}
                  <button
                    onClick={() => {
                      updateActiveMode('promil');
                      setProfileDropdownOpen(false);
                      setActiveTab('promil');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between hover:bg-rose-50 hover:text-rose-700 transition-colors ${
                      user.mode_aktif === 'promil' ? 'bg-rose-50/50 text-rose-700 font-bold' : 'text-slate-600'
                    }`}
                  >
                    <span>🌸 Program Hamil (Promil)</span>
                    {user.mode_aktif === 'promil' && <span className="text-[10px]">✓</span>}
                  </button>

                  {children.length > 0 && <div className="border-t border-slate-100 my-1.5"></div>}

                  {children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => {
                        setActiveChildId(child.id);
                        const isPreg = getChildAgeInMonths(child.tanggal_lahir) === -1;
                        updateActiveMode(isPreg ? 'hamil' : 'anak');
                        setProfileDropdownOpen(false);
                        setActiveTab(isPreg ? 'content' : 'growth');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between hover:bg-indigo-50 hover:text-indigo-700 transition-colors ${
                        activeChildId === child.id ? 'bg-indigo-50/50 text-indigo-700 font-bold' : 'text-slate-600'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span>👶 {child.nama}</span>
                        <span className="block text-[8px] text-slate-400 font-medium">
                          Usia: {getChildAgeText(child.tanggal_lahir)}
                        </span>
                      </div>
                      {activeChildId === child.id && <span className="text-[10px]">✓</span>}
                    </button>
                  ))}

                  <div className="border-t border-slate-100 my-1.5"></div>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setActiveTab('profiles');
                    }}
                    className="w-full text-left px-3 py-1.5 text-[10px] text-indigo-600 hover:text-indigo-800 font-bold text-center"
                  >
                    + Tambah Profil Baru
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-indigo-600 relative cursor-pointer"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                )}
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Notification Popup Menu */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      🔔 Pengingat & Notifikasi ({unreadNotifCount})
                    </h4>
                    {notifications.length > 0 && (
                      <button 
                        onClick={clearNotifications}
                        className="text-[10px] text-slate-400 hover:text-red-500 font-semibold"
                      >
                        Bersihkan
                      </button>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 italic text-center py-4">Kotak masuk notifikasi kosong.</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            n.isRead 
                              ? 'bg-gray-50 border-slate-200 opacity-75' 
                              : 'bg-indigo-50/30 border-indigo-100'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-slate-800 mb-0.5">
                            <span>{n.title}</span>
                            {!n.isRead && <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">{n.body}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Coin balance in header */}
            <button 
              onClick={() => setActiveTab('coins')}
              className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100/50 text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <Coins className="w-4 h-4 text-amber-500 animate-spin" />
              <span>{user.saldo_coin} Koin</span>
            </button>
          </div>

        </div>
      </header>

      {/* HORIZONTAL TAB BAR NAVIGATION */}
      <nav className="bg-white border-b border-slate-200 sticky top-[69px] z-30 px-4 py-1 flex items-center overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max text-xs font-bold">
          
          <button
            onClick={() => setActiveTab('promil')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'promil'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            🌸 Modul Promil
          </button>

          <button
            onClick={() => setActiveTab('growth')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'growth'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            ⚖️ Growth Tracker
          </button>

          <button
            onClick={() => setActiveTab('vaccine')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'vaccine'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            🛡️ Jadwal Imunisasi
          </button>

          <button
            onClick={() => setActiveTab('milestones')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'milestones'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            🧠 Milestones
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            📖 Hub Konten Edukasi
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'stories'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            🧸 Dongeng Anak
          </button>

          <button
            onClick={() => setActiveTab('coins')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'coins'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            🪙 Toko Koin Cerita
          </button>

          <button
            onClick={() => setActiveTab('profiles')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'profiles'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            👥 Profil & Akun
          </button>
        </div>
      </nav>

      {/* MAIN LAYOUT CANVAS */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex-1">
        
        {/* Dynamic view switcher based on activeTab state */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === 'promil' && <PromilModule state={state} />}
          {activeTab === 'growth' && <GrowthModule state={state} />}
          {activeTab === 'vaccine' && <VaccineModule state={state} />}
          {activeTab === 'milestones' && <MilestoneModule state={state} />}
          {activeTab === 'content' && <ContentModule state={state} />}
          {activeTab === 'stories' && <StoryModule state={state} />}
          {activeTab === 'coins' && <CoinModule state={state} />}
          {activeTab === 'profiles' && <ChildManager state={state} />}
        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 md:px-8 mt-12 text-center text-xs text-slate-400 space-y-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-slate-500">1000 Hari Pertama - Platform Tumbuh Kembang Sehat</p>
            <p className="text-[10px]">
              Menyediakan kalkulator masa subur, pemantauan kurva BB/TB WHO, jadwal imunisasi IDAI & Kemenkes RI, dan cerita anak bilingual.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[10px]">
            <span className="bg-slate-50 text-slate-500 px-2 py-1 rounded font-semibold border border-slate-200">Kemenkes RI</span>
            <span className="bg-slate-50 text-slate-500 px-2 py-1 rounded font-semibold border border-slate-200">IDAI 2023</span>
            <span className="bg-slate-50 text-slate-500 px-2 py-1 rounded font-semibold border border-slate-200">WHO Standards</span>
          </div>
        </div>
        
        <p className="text-[10px] leading-relaxed max-w-4xl mx-auto text-slate-400 border-t border-slate-100 pt-3">
          <strong>Pemberitahuan Lisensi Medis:</strong> Seluruh data, grafik, instruksi, dan estimasi waktu imunisasi yang terlampir pada aplikasi 1000 Hari Pertama adalah murni kalkulator simulasi pemantauan mandiri di rumah. Kami <strong>tidak pernah mengklaim diri atau menyimpulkan diagnosis klinis</strong> atas kondisi medis pengguna maupun anak secara mandiri. Segala bentuk diagnosis dan keputusan penting wajib didiskusikan secara tatap muka dengan Dokter Anak (Sp.A) atau Dokter Kandungan (Sp.OG).
        </p>
      </footer>

    </div>
  );
}
