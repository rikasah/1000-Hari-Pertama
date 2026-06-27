import React, { useState } from 'react';
import { AppState } from '../useAppState';
import { 
  Award, Activity, Brain, MessageSquare, Heart, Info, Check, ShieldAlert
} from 'lucide-react';
import { STATIC_MILESTONES } from '../data';

interface MilestoneModuleProps {
  state: AppState;
}

export default function MilestoneModule({ state }: MilestoneModuleProps) {
  const { 
    activeChild, activeChildMilestones, toggleMilestone, getChildAgeInMonths 
  } = state;

  // Selected age category filter
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('6-12 bulan');

  const ageGroups = [
    { key: '1 bulan', label: '0-3 Bulan' },
    { key: '3 bulan', label: '3-6 Bulan' },
    { key: '6 bulan', label: '6-9 Bulan' },
    { key: '9 bulan', label: '9-12 Bulan' },
    { key: '12 bulan', label: '12-18 Bulan' },
    { key: '18 bulan', label: '18-24 Bulan' },
    { key: '24 bulan', label: '2 Tahun +' }
  ];

  if (!activeChild) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-4" id="milestone-module-root">
        <Brain className="w-12 h-12 text-indigo-500 mx-auto" />
        <h3 className="font-bold text-slate-900 text-lg">Belum Ada Profil Anak Aktif</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Silakan tambah profil anak Anda terlebih dahulu di menu Profil atau beralih ke Mode Program Hamil.
        </p>
      </div>
    );
  }

  const isPregnant = getChildAgeInMonths(activeChild.tanggal_lahir) === -1;

  if (isPregnant) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
        <Brain className="w-12 h-12 text-pink-400 mx-auto" />
        <h3 className="font-bold text-slate-900 text-lg">Mode Pemantauan Kehamilan</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Checklist stimulasi & milestones (perkembangan sensorik, motorik, sosial) akan otomatis aktif setelah kelahiran si kecil (HPL: {activeChild.tanggal_lahir}).
        </p>
        <div className="p-4 bg-pink-50 rounded-xl border border-pink-100 text-xs text-pink-800 text-left max-w-lg mx-auto leading-relaxed">
          <strong className="block mb-1">💡 Tips Stimulasi Sejak Kandungan:</strong>
          Janin mulai dapat mendengarkan detak jantung & suara Bunda sejak usia kandungan 18 minggu. Sering mengajak bicara, membacakan dongeng, atau memutar musik klasik/instrumen tenang sangat baik untuk merangsang sel saraf kognitif janin sejak di kandungan!
        </div>
      </div>
    );
  }

  // Filter milestones based on selected age group (matches `STATIC_MILESTONES.fase_usia` like "1 bulan", "3 bulan", etc.)
  // Let's filter milestones:
  // - "0-3 Bulan": matches "1 bulan" or "3 bulan"
  // - "3-6 Bulan": matches "3 bulan" or "6 bulan"
  // - "6-9 Bulan": matches "6 bulan" or "9 bulan"
  // - "9-12 Bulan": matches "9 bulan" or "12 bulan"
  // - "12-18 Bulan": matches "12 bulan" or "18 bulan"
  // - "18-24 Bulan": matches "18 bulan" or "24 bulan"
  // - "24 bulan": matches "24 bulan"
  const getFilteredMilestoneItems = () => {
    switch (selectedAgeGroup) {
      case '0-3 Bulan':
        return STATIC_MILESTONES.filter(m => m.fase_usia === '1 bulan' || m.fase_usia === '3 bulan');
      case '3-6 Bulan':
        return STATIC_MILESTONES.filter(m => m.fase_usia === '3 bulan' || m.fase_usia === '6 bulan');
      case '6-9 Bulan':
        return STATIC_MILESTONES.filter(m => m.fase_usia === '6 bulan' || m.fase_usia === '9 bulan');
      case '9-12 Bulan':
        return STATIC_MILESTONES.filter(m => m.fase_usia === '9 bulan' || m.fase_usia === '12 bulan');
      case '12-18 Bulan':
        return STATIC_MILESTONES.filter(m => m.fase_usia === '12 bulan' || m.fase_usia === '18 bulan');
      case '18-24 Bulan':
        return STATIC_MILESTONES.filter(m => m.fase_usia === '18 bulan' || m.fase_usia === '24 bulan');
      case '2 Tahun +':
        return STATIC_MILESTONES.filter(m => m.fase_usia === '24 / 2 tahun' || m.fase_usia === '24 bulan');
      default:
        return STATIC_MILESTONES;
    }
  };

  const filteredItems = getFilteredMilestoneItems();

  const getCategoryIcon = (category: 'motorik' | 'bahasa' | 'sosial') => {
    switch (category) {
      case 'motorik':
        return <Activity className="w-4 h-4 text-emerald-500" />;
      case 'bahasa':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'sosial':
        return <Heart className="w-4 h-4 text-rose-500" />;
    }
  };

  const getCategoryColor = (category: 'motorik' | 'bahasa' | 'sosial') => {
    switch (category) {
      case 'motorik':
        return 'bg-emerald-50 border-emerald-100 text-emerald-700';
      case 'bahasa':
        return 'bg-blue-50 border-blue-100 text-blue-700';
      case 'sosial':
        return 'bg-rose-50 border-rose-100 text-rose-700';
    }
  };

  return (
    <div className="space-y-8" id="milestone-module-root">
      
      {/* Tab Filter buttons */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
        {['0-3 Bulan', '3-6 Bulan', '6-9 Bulan', '9-12 Bulan', '12-18 Bulan', '18-24 Bulan', '2 Tahun +'].map((group) => (
          <button
            key={group}
            onClick={() => setSelectedAgeGroup(group)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              selectedAgeGroup === group
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Milestone checklist - Left 2 Columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-500" />
                Daftar Milestones Fase {selectedAgeGroup}
              </h4>
              <span className="text-[10px] text-gray-400 font-medium">Berdasarkan Standar Kemenkes & WHO</span>
            </div>

            {filteredItems.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-8 text-center bg-gray-50 rounded-xl">
                Tidak ada data milestones khusus untuk filter kelompok usia ini dalam MVP saat ini.
              </p>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item) => {
                  // Check current status in child's profile state
                  const checkState = activeChildMilestones.find(m => m.milestone_id === item.id);
                  const isAchieved = checkState?.status === 'sudah';

                  return (
                    <div 
                      key={item.id}
                      onClick={() => toggleMilestone(item.id, isAchieved ? 'sudah' : 'belum')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isAchieved 
                          ? 'bg-indigo-50/40 border-indigo-100' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/40'
                      }`}
                    >
                      {/* Checkbox circle indicator */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isAchieved 
                          ? 'bg-indigo-600 border-indigo-600 text-white' 
                          : 'border-gray-300 bg-white'
                      }`}>
                        {isAchieved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 border text-[9px] font-bold rounded-md flex items-center gap-1 uppercase tracking-wider ${getCategoryColor(item.kategori)}`}>
                            {getCategoryIcon(item.kategori)}
                            {item.kategori}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {item.konteks_ringan}
                          </span>
                        </div>
                        <h5 className={`font-bold text-sm leading-relaxed transition-all ${isAchieved ? 'text-indigo-950 line-through opacity-75' : 'text-slate-900'}`}>
                          {item.deskripsi}
                        </h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Informational Panel & WHO reference - Right 1 Column */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 self-start">
          <div className="space-y-2">
            <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              Mengapa Melacak Milestones?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tiap anak berkembang dengan tempo yang unik. Milestone ini membantu Bunda melihat tanda-tanda kecakapan umum di rentang usianya dan cara menstimulasinya secara alami.
            </p>
          </div>

          <div className="space-y-3.5 pt-4 border-t border-slate-100 text-xs">
            <h5 className="font-bold text-slate-800">💡 Cara Stimulasi Terbaik:</h5>
            <ul className="space-y-2.5 text-slate-600 list-disc pl-4 leading-relaxed">
              <li><strong>Motorik:</strong> Beri ruang aman di lantai untuk latihan berguling, merangkak, dan merambat. Minimalkan penggunaan baby walker.</li>
              <li><strong>Bahasa:</strong> Bacakan buku cerita bilingual kami setiap malam sebelum tidur, sebutkan nama-nama benda dengan kata yang benar (tidak cadel).</li>
              <li><strong>Sosial:</strong> Bermain cilukba, ajak bersosialisasi dengan anggota keluarga lain, dan hargai perasaannya saat cemas.</li>
            </ul>
          </div>

          {/* Reference Disclaimer - Section 10 */}
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100 text-[10px] text-amber-800 flex gap-2.5 items-start">
            <Info className="w-4.5 h-4.5 text-amber-600 shrink-0" />
            <div className="space-y-1">
              <strong className="block">Disclaimer Penting:</strong>
              <p className="leading-relaxed">
                Checklist ini dirancang murni untuk memantau kemajuan keterampilan secara umum, <strong>bukan merupakan kesimpulan diagnosis klinis</strong> atas keterlambatan tumbuh kembang atau autisme. Jika si kecil tampak belum menguasai indikator penting pada rentang usianya, tetap tenang dan konsultasikan secara langsung ke Dokter Anak (Sp.A) Anda untuk mendapatkan pengarahan medis profesional.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
