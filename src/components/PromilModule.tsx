import React, { useState } from 'react';
import { AppState } from '../useAppState';
import { 
  Heart, Calendar, Activity, Info, Plus, 
  Trash2, Sparkles, Check, AlertCircle, Eye, BellOff, Bell
} from 'lucide-react';

interface PromilModuleProps {
  state: AppState;
}

export default function PromilModule({ state }: PromilModuleProps) {
  const { 
    user, menstrualCycles, lhTestRecords, addMenstrualCycle, 
    removeMenstrualCycle, addLhTestRecord, removeLhTestRecord, 
    transitionToPregnancy, addNotification 
  } = state;

  // Form states
  const [periodDate, setPeriodDate] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  
  const [lhDate, setLhDate] = useState(new Date().toISOString().split('T')[0]);
  const [lhTime, setLhTime] = useState('10:00');
  const [lhResult, setLhResult] = useState<'positif' | 'negatif'>('negatif');
  const [lhThickness, setLhThickness] = useState<'samar' | 'pekat' | 'sangat_pekat'>('samar');
  const [lhNote, setLhNote] = useState('');

  const [muteReminders, setMuteReminders] = useState(false);
  const [dueDateInput, setDueDateInput] = useState('');

  // Calendar navigation states
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-indexed

  // Months name
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Calendar logic
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // Sunday=0

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Helper to categorize calendar days
  const getDayStatus = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const checkDate = new Date(dateStr);

    let status: 'normal' | 'period' | 'fertile' | 'predicted' = 'normal';

    // Check against cycles
    for (const cycle of menstrualCycles) {
      const start = new Date(cycle.tanggal_mulai_haid);
      
      // Period duration (actual)
      const endPeriod = new Date(start.getTime() + (cycle.durasi_haid - 1) * 24 * 60 * 60 * 1000);
      
      // Fertile window range (predicted)
      const fertileStart = new Date(cycle.prediksi_masa_subur_mulai);
      const fertileEnd = new Date(cycle.prediksi_masa_subur_selesai);

      // Next predicted period starts in cycle.panjang_siklus days
      const predStart = new Date(start.getTime() + cycle.panjang_siklus * 24 * 60 * 60 * 1000);
      const predEnd = new Date(predStart.getTime() + (cycle.durasi_haid - 1) * 24 * 60 * 60 * 1000);

      if (checkDate >= start && checkDate <= endPeriod) {
        return 'period';
      }
      if (checkDate >= fertileStart && checkDate <= fertileEnd) {
        status = 'fertile'; // can be overridden by actual period if overlapping, but period takes priority
      }
      if (checkDate >= predStart && checkDate <= predEnd) {
        return 'predicted';
      }
    }

    return status;
  };

  // Form handlers
  const handleAddCycle = (e: React.FormEvent) => {
    e.preventDefault();
    addMenstrualCycle(periodDate, cycleLength, periodLength);
  };

  const handleAddLhTest = (e: React.FormEvent) => {
    e.preventDefault();
    addLhTestRecord(lhDate, lhTime, lhResult, lhThickness, lhNote);
    // Reset form notes
    setLhNote('');
  };

  // Check if there is an active positive LH test logged within last 48 hours
  const getOptimalTimingStatus = () => {
    const positiveTests = lhTestRecords.filter(r => r.hasil === 'positif');
    if (positiveTests.length === 0) return null;
    
    // Get latest positive
    const latest = positiveTests[positiveTests.length - 1];
    const testTime = new Date(`${latest.tanggal}T${latest.jam}`);
    const now = new Date();
    const diffHours = (now.getTime() - testTime.getTime()) / (1000 * 60 * 60);

    if (diffHours >= 0 && diffHours <= 48) {
      return {
        active: true,
        hoursAgo: Math.round(diffHours),
        date: latest.tanggal,
        time: latest.jam
      };
    }
    return null;
  };

  const optimalTiming = getOptimalTimingStatus();

  return (
    <div className="space-y-8" id="promil-module-root">
      {/* Alert Banner / Intimacy Advisor */}
      <div className={`p-5 rounded-2xl border transition-all ${
        optimalTiming && !muteReminders
          ? 'bg-rose-50 border-rose-100 text-rose-950' 
          : 'bg-emerald-50 border-emerald-100 text-emerald-950'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${
            optimalTiming && !muteReminders ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
          }`}>
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-base">
              {optimalTiming && !muteReminders 
                ? '⭐ Peluang Kehamilan Sangat Tinggi! (Jendela Optimal)' 
                : '💖 Pendekatan Hubungan Suami-Istri Alami'}
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">
              {optimalTiming && !muteReminders
                ? `Berdasarkan tes LH positif Anda pada tanggal ${optimalTiming.date} pukul ${optimalTiming.time} (~${optimalTiming.hoursAgo} jam yang lalu), tubuh sedang bersiap untuk ovulasi. Hubungan intim dalam waktu 24-48 jam ke depan (setiap 1-3 hari) sangat disarankan.`
                : 'Di luar masa subur, cobalah untuk tetap berhubungan intim secara santai 2-3 kali dalam seminggu. Ini akan menjaga kualitas sperma pasangan tetap optimal dan menekan tingkat stres program hamil.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button 
                onClick={() => setMuteReminders(!muteReminders)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/80 hover:bg-white text-slate-600 border border-slate-200 shadow-sm"
              >
                {muteReminders ? (
                  <>
                    <Bell className="w-3.5 h-3.5" /> Aktifkan Pengingat
                  </>
                ) : (
                  <>
                    <BellOff className="w-3.5 h-3.5" /> Bisukan Pengingat (Kurangi Tekanan)
                  </>
                )}
              </button>
              
              <button
                onClick={() => {
                  const est = new Date();
                  est.setDate(est.getDate() + 280); // Default due date 40 weeks later
                  setDueDateInput(est.toISOString().split('T')[0]);
                  const modal = document.getElementById('pregnancy-modal');
                  if (modal) modal.classList.remove('hidden');
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
              >
                🎉 Saya Sudah Positif Hamil!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Calendar and Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                Kalender Masa Subur & Haid
              </h3>
              <p className="text-xs text-slate-500">
                Pilih tanggal mulai haid untuk memprediksi siklus & kesuburan berikutnya
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-slate-200">
              <button 
                onClick={handlePrevMonth}
                className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
              >
                &larr;
              </button>
              <span className="text-xs font-semibold text-slate-800 px-2 min-w-[100px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button 
                onClick={handleNextMonth}
                className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition-colors"
              >
                &rarr;
              </button>
            </div>
          </div>

          {/* Interactive Calendar Grid */}
          <div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d, i) => (
                <span key={i} className="text-xs font-semibold text-slate-400 py-1">{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {/* Padding empty boxes for previous month overflow */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-gray-50/30 rounded-lg"></div>
              ))}

              {/* Month days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const status = getDayStatus(day);
                
                let dayBg = 'bg-gray-50 text-slate-700 hover:bg-gray-100';
                let indicator = null;

                if (status === 'period') {
                  dayBg = 'bg-rose-500 text-white font-bold ring-2 ring-rose-300';
                  indicator = <span className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full"></span>;
                } else if (status === 'predicted') {
                  dayBg = 'bg-rose-100 text-rose-700 border border-rose-300 font-medium border-dashed';
                  indicator = <span className="absolute bottom-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>;
                } else if (status === 'fertile') {
                  dayBg = 'bg-emerald-500 text-white font-bold ring-2 ring-emerald-300';
                  indicator = <span className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full"></span>;
                }

                return (
                  <div 
                    key={`day-${day}`}
                    className={`aspect-square relative flex flex-col items-center justify-center rounded-xl text-xs cursor-pointer transition-all ${dayBg}`}
                  >
                    <span>{day}</span>
                    {indicator}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calendar Legend */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-rose-500 rounded-lg"></span>
              <span className="text-slate-600 font-medium">Haid Hari Ini</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-rose-100 border border-rose-300 border-dashed rounded-lg"></span>
              <span className="text-slate-600 font-medium">Prediksi Haid</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-emerald-500 rounded-lg"></span>
              <span className="text-slate-600 font-medium">Masa Subur Tinggi (Ovulasi)</span>
            </div>
          </div>
        </div>

        {/* Right column: Log Period Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              Catat Haid Pertama
            </h3>
            <p className="text-xs text-slate-500">
              Input tanggal haid pertama Anda di siklus paling baru
            </p>
          </div>

          <form onSubmit={handleAddCycle} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Tanggal Mulai</label>
              <input 
                type="date"
                value={periodDate}
                onChange={(e) => setPeriodDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-gray-50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Siklus (Hari)</label>
                <input 
                  type="number"
                  min="21"
                  max="45"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-gray-50"
                  required
                />
                <p className="text-[10px] text-slate-400">Rata-rata: 28 hari</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Lama Haid (Hari)</label>
                <input 
                  type="number"
                  min="3"
                  max="14"
                  value={periodLength}
                  onChange={(e) => setPeriodLength(parseInt(e.target.value) || 5)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-gray-50"
                  required
                />
                <p className="text-[10px] text-slate-400">Umumnya: 5-7 hari</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
            >
              Simpan & Update Prediksi Kesuburan
            </button>
          </form>

          {/* Menstrual cycles history log */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800">Riwayat Siklus</h4>
            {menstrualCycles.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Belum ada riwayat haid yang disimpan.</p>
            ) : (
              <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1">
                {menstrualCycles.map((cycle) => (
                  <div key={cycle.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{cycle.tanggal_mulai_haid}</p>
                      <p className="text-[10px] text-slate-400">
                        Panjang: {cycle.panjang_siklus} hari | Haid: {cycle.durasi_haid} hari
                      </p>
                    </div>
                    <button 
                      onClick={() => removeMenstrualCycle(cycle.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LH Test Tracker Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* LH Log Form & Interpret Guide */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              LH Test Tracker (Tes Ovulasi)
            </h3>
            <p className="text-xs text-slate-500">
              Input hasil tes ovulasi strip (LH test) harian Anda
            </p>
          </div>

          <form onSubmit={handleAddLhTest} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Tanggal Tes</label>
                <input 
                  type="date"
                  value={lhDate}
                  onChange={(e) => setLhDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-gray-50"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Jam Tes</label>
                <input 
                  type="time"
                  value={lhTime}
                  onChange={(e) => setLhTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-gray-50"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Hasil Tes</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLhResult('negatif')}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    lhResult === 'negatif' 
                      ? 'bg-red-50 border-red-200 text-red-700' 
                      : 'bg-gray-50 border-slate-200 text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  🔴 1 Garis (Negatif)
                </button>
                <button
                  type="button"
                  onClick={() => setLhResult('positif')}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    lhResult === 'positif' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 ring-2 ring-emerald-100' 
                      : 'bg-gray-50 border-slate-200 text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  🟢 2 Garis (Positif)
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Kepadatan Garis Tes (T)</label>
              <div className="grid grid-cols-3 gap-2">
                {['samar', 'pekat', 'sangat_pekat'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setLhThickness(t as any)}
                    className={`py-1.5 text-[10px] capitalize font-semibold rounded-lg border transition-all ${
                      lhThickness === t 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                        : 'bg-gray-50 border-slate-200 text-slate-500 hover:bg-gray-100'
                    }`}
                  >
                    {t.replace('_', ' ')}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">Bandingkan dengan Garis Kontrol (C)</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Catatan Tambahan</label>
              <input 
                type="text"
                placeholder="misal: Lendir serviks licin / kram perut"
                value={lhNote}
                onChange={(e) => setLhNote(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all"
            >
              Catat LH Test
            </button>
          </form>
        </div>

        {/* Visual Interpretation & History Graph */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
          
          {/* Guide illustration */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Panduan Membaca Strip Tes LH (Tes Ovulasi)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-red-700">
                  <span>Negatif (Fase Aman)</span>
                  <span>1 Garis</span>
                </div>
                {/* Simulated Strip */}
                <div className="h-6 w-full bg-white rounded border border-slate-200 flex items-center justify-around px-2 text-[9px] font-mono">
                  <span className="text-gray-300">|</span>
                  <span className="text-red-500 font-bold border-r border-red-300 pr-1 text-[8px]">C (Kontrol)</span>
                  <span className="text-gray-200 text-[8px]">T (Test)</span>
                  <span className="text-gray-300">|</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-snug">
                  Hanya garis C yang muncul, atau garis T tampak sangat samar/pudar dibandingkan C. Belum ada lonjakan hormon subur.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700">
                  <span>Positif (Subur!)</span>
                  <span>2 Garis Pekat</span>
                </div>
                {/* Simulated Strip */}
                <div className="h-6 w-full bg-white rounded border border-slate-200 flex items-center justify-around px-2 text-[9px] font-mono">
                  <span className="text-gray-300">|</span>
                  <span className="text-red-500 font-bold">C</span>
                  <span className="text-red-500 font-bold">T</span>
                  <span className="text-gray-300">|</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-snug">
                  Garis T sama gelap atau bahkan lebih gelap daripada garis C. Ovulasi diperkirakan akan terjadi dalam 24-48 jam.
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-700">
                  <span>Invalid (Ulangi)</span>
                  <span>Tidak Valid</span>
                </div>
                {/* Simulated Strip */}
                <div className="h-6 w-full bg-white rounded border border-slate-200 flex items-center justify-around px-2 text-[9px] font-mono">
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-200">C</span>
                  <span className="text-red-500 font-bold">T</span>
                  <span className="text-gray-300">|</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-snug">
                  Garis kontrol C tidak muncul. Kerusakan pada strip atau sampel urine tidak tepat. Silakan coba lagi dengan strip baru.
                </p>
              </div>

            </div>
          </div>

          {/* LH history graph list */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800">Riwayat Pengukuran LH</h4>
            {lhTestRecords.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Belum ada catatan hasil tes LH.</p>
            ) : (
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {lhTestRecords.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${r.hasil === 'positif' ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`}></span>
                      <div>
                        <p className="font-bold text-slate-800">
                          {r.tanggal} - Pukul {r.jam}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Hasil: <strong className={r.hasil === 'positif' ? 'text-emerald-600' : 'text-slate-500'}>{r.hasil.toUpperCase()}</strong> ({r.ketebalan_garis.replace('_', ' ')})
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {r.catatan && (
                        <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md truncate max-w-[150px]">
                          {r.catatan}
                        </span>
                      )}
                      <button 
                        onClick={() => removeLhTestRecord(r.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Educational Tips - Section 5.0.d */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 space-y-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-indigo-600" />
          Nutrisi & Gaya Hidup Promil Sehat
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800">🥗 Pilihan Nutrisi Utama</h5>
            <p>Konsumsi <strong>Asam Folat 400 mcg</strong> harian, Zat Besi, dan sayuran hijau. Hindari konsumsi ikan dengan kandungan merkuri tinggi (seperti hiu atau makerel besar) demi meminimalkan paparan toksin reproduksi.</p>
          </div>
          <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800">🏃 Gaya Hidup & Berat Badan</h5>
            <p>Pertahankan indeks massa tubuh (BMI) yang ideal. Kelola tingkat kecemasan, batasi konsumsi kafein (maksimal 1 cangkir kopi/hari), dan hindari alkohol maupun asap rokok untuk menjaga fungsi sel telur & sperma.</p>
          </div>
          <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800">🩺 Kapan Konsultasi Dokter?</h5>
            <p>Evaluasi medis disarankan setelah aktif mencoba <strong>1 tahun tanpa hasil</strong> bagi wanita di bawah 35 tahun, atau dipercepat menjadi <strong>6 bulan</strong> jika usia wanita di atas 35 tahun.</p>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex gap-2.5 items-start">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="leading-snug">
            <strong>Disclaimer Medis:</strong> Modul ini dirancang murni sebagai alat bantu edukasi pemantauan mandiri perkiraan ovulasi. Ini <strong>bukan</strong> merupakan alat kontrasepsi (untuk mencegah kehamilan) maupun alat diagnosis klinis kemandulan (infertilitas / PCOS). Jika siklus haid Anda tidak teratur secara ekstrem, silakan berkonsultasi langsung ke Dokter Spesialis Obstetri dan Ginekologi (Sp.OG).
          </p>
        </div>
      </div>

      {/* PREGNANCY ONBOARDING DIALOG / MODAL (HIDDEN BY DEFAULT) */}
      <div id="pregnancy-modal" className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center space-y-2">
            <span className="text-4xl">🎉</span>
            <h3 className="font-bold text-lg text-slate-900">Selamat atas Kehamilannya, Bunda!</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kami ikut berbahagia! Mari kita beralih ke Mode Kehamilan untuk melacak tumbuh kembang janin secara lengkap. Masukkan perkiraan HPL (Hari Perkiraan Lahir) Bunda di bawah ini:
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Perkiraan Tanggal Lahir (HPL)</label>
            <input 
              type="date"
              value={dueDateInput}
              onChange={(e) => setDueDateInput(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-gray-50"
            />
            <p className="text-[10px] text-slate-400">Umumnya dihitung 280 hari (40 minggu) sejak hari pertama haid terakhir.</p>
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              onClick={() => {
                const modal = document.getElementById('pregnancy-modal');
                if (modal) modal.classList.add('hidden');
              }}
              className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl"
            >
              Batal
            </button>
            <button
              onClick={() => {
                transitionToPregnancy(dueDateInput);
                const modal = document.getElementById('pregnancy-modal');
                if (modal) modal.classList.add('hidden');
              }}
              className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-sm"
            >
              Ya, Aktifkan Mode Kehamilan!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
