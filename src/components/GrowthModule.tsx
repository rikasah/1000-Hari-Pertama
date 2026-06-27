import React, { useState } from 'react';
import { AppState } from '../useAppState';
import { 
  Plus, Calendar, Trash2, LineChart, ShieldAlert, Check, TrendingUp, Info
} from 'lucide-react';

interface GrowthModuleProps {
  state: AppState;
}

export default function GrowthModule({ state }: GrowthModuleProps) {
  const { 
    activeChild, activeChildGrowthRecords, addGrowthRecord, 
    removeGrowthRecord, getChildAgeInMonths, getChildAgeText 
  } = state;

  // Tabs for the chart: Weight, Height, or Head Circumference
  const [activeTab, setActiveTab] = useState<'weight' | 'height' | 'head'>('weight');

  // Log Form states
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [weight, setWeight] = useState(7.5);
  const [height, setHeight] = useState(65);
  const [headCirc, setHeadCirc] = useState(41);

  if (!activeChild) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
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
        <LineChart className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="font-bold text-slate-900 text-lg">Mode Pemantauan Kehamilan</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Selamat atas masa kehamilan Anda! Saat ini janin masih berada di dalam kandungan. 
          Modul Growth Tracker akan otomatis aktif mengukur Berat Badan & Tinggi Badan setelah si kecil lahir ke dunia (HPL: {activeChild.tanggal_lahir}).
        </p>
        <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 text-xs text-rose-800 text-left max-w-lg mx-auto leading-relaxed">
          <strong className="block mb-1">💡 Tips Kehamilan:</strong>
          Tingkatkan asupan asam folat, zat besi, dan kalsium. Anda bisa membaca tips perkembangan trimester janin yang komplit di tab <strong>Hub Konten</strong> di atas!
        </div>
      </div>
    );
  }

  // WHO reference curves definition (from 0 to 24 months)
  // [Month, 3rd percentile, 50th (Median), 97th percentile]
  const WHO_WEIGHT_BOYS = [
    [0, 2.4, 3.3, 4.4],
    [1, 3.2, 4.5, 5.8],
    [2, 4.0, 5.6, 7.1],
    [3, 4.6, 6.4, 8.0],
    [4, 5.1, 7.0, 8.7],
    [5, 5.5, 7.5, 9.3],
    [6, 5.9, 7.9, 9.8],
    [8, 6.4, 8.6, 10.7],
    [10, 6.9, 9.2, 11.4],
    [12, 7.3, 9.6, 12.0],
    [15, 7.8, 10.3, 12.8],
    [18, 8.2, 10.9, 13.7],
    [21, 8.7, 11.5, 14.5],
    [24, 9.2, 12.2, 15.3]
  ];

  const WHO_HEIGHT_BOYS = [
    [0, 46.1, 49.9, 53.7],
    [1, 50.8, 54.7, 58.6],
    [2, 54.4, 58.4, 62.4],
    [3, 57.3, 61.4, 65.5],
    [4, 59.7, 63.9, 68.0],
    [5, 61.7, 65.9, 70.1],
    [6, 63.3, 67.6, 71.9],
    [8, 66.2, 70.6, 75.0],
    [10, 68.7, 73.3, 77.9],
    [12, 71.0, 75.7, 80.5],
    [15, 74.1, 79.1, 84.1],
    [18, 76.9, 82.3, 87.7],
    [21, 79.4, 85.1, 90.9],
    [24, 81.7, 87.8, 93.9]
  ];

  const WHO_HC_BOYS = [
    [0, 32.1, 34.5, 36.9],
    [1, 35.1, 37.3, 39.5],
    [2, 36.9, 39.1, 41.3],
    [3, 38.3, 40.5, 42.7],
    [4, 39.4, 41.6, 43.8],
    [5, 40.3, 42.6, 44.8],
    [6, 41.0, 43.3, 45.6],
    [8, 42.1, 44.5, 46.9],
    [10, 43.0, 45.4, 47.8],
    [12, 43.8, 46.1, 48.4],
    [15, 44.8, 47.1, 49.4],
    [18, 45.5, 47.9, 50.3],
    [21, 46.1, 48.6, 51.1],
    [24, 46.6, 49.1, 51.6]
  ];

  // Pick dataset based on selected tab
  const getReferenceData = () => {
    if (activeTab === 'weight') return WHO_WEIGHT_BOYS;
    if (activeTab === 'height') return WHO_HEIGHT_BOYS;
    return WHO_HC_BOYS;
  };

  const currentReference = getReferenceData();
  const maxMonth = 24;
  
  // Calculate max Y value for scaling
  const maxRefY = Math.max(...currentReference.map(d => d[3]));
  const yAxisMax = Math.ceil(maxRefY + (activeTab === 'weight' ? 2 : 5));
  const yAxisMin = activeTab === 'weight' ? 1 : activeTab === 'height' ? 40 : 28;

  // Process user's records to get Age in Months and value
  const childBirthDate = new Date(activeChild.tanggal_lahir);
  const formattedUserRecords = activeChildGrowthRecords.map(rec => {
    const recDate = new Date(rec.tanggal);
    const diffTime = recDate.getTime() - childBirthDate.getTime();
    // Accurate float age in months
    const ageMonths = Math.max(0, diffTime / (1000 * 60 * 60 * 24 * 30.4375));
    
    let val = rec.berat;
    if (activeTab === 'height') val = rec.tinggi;
    if (activeTab === 'head') val = rec.lingkar_kepala;

    return {
      id: rec.id,
      age: ageMonths,
      value: val,
      date: rec.tanggal,
      raw: rec
    };
  }).filter(r => r.age <= 24); // Focus 0-24m

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGrowthRecord(logDate, weight, height, headCirc);
  };

  // Convert SVG coordinates
  const getSvgCoords = (month: number, value: number, width: number, height: number) => {
    const paddingLeft = 50;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 40;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    const x = paddingLeft + (month / maxMonth) * chartWidth;
    const yValPercent = (value - yAxisMin) / (yAxisMax - yAxisMin);
    const y = paddingTop + chartHeight - yValPercent * chartHeight;

    return { x, y };
  };

  // SVG Chart dimensions
  const svgWidth = 600;
  const svgHeight = 350;

  // Generate path coordinates for standard lines
  const getLinePath = (index: number) => {
    const coords = currentReference.map(ref => getSvgCoords(ref[0], ref[index], svgWidth, svgHeight));
    return coords.reduce((acc, curr, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '');
  };

  const line3rd = getLinePath(1);
  const line50th = getLinePath(2);
  const line97th = getLinePath(3);

  // Generate path coordinates for User child line
  const userLinePath = formattedUserRecords.length > 0
    ? formattedUserRecords.map(rec => getSvgCoords(rec.age, rec.value, svgWidth, svgHeight))
        .reduce((acc, curr, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '')
    : '';

  return (
    <div className="space-y-8" id="growth-module-root">
      {/* Title & Child Active Bar */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            {activeChild.nama.substring(0, 1)}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Sedang Memantau: {activeChild.nama}</h4>
            <p className="text-xs text-indigo-700">
              Jenis Kelamin: {activeChild.jenis_kelamin === 'L' ? 'Laki-Laki' : 'Perempuan'} | Usia: {getChildAgeText(activeChild.tanggal_lahir)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-indigo-100/50 text-xs font-semibold text-gray-700">
          <TrendingUp className="w-4 h-4 text-emerald-500 animate-bounce" />
          Rujukan Standar WHO & IDAI 2023
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: SVG Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-indigo-500" />
                Kurva Tumbuh Kembang WHO
              </h3>
              <p className="text-xs text-slate-500">
                Membandingkan pertumbuhan si kecil dengan median persentil WHO (0-24 Bulan)
              </p>
            </div>

            {/* Parameter toggle buttons */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab('weight')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'weight' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ⚖️ Berat (kg)
              </button>
              <button
                onClick={() => setActiveTab('height')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'height' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📏 Tinggi (cm)
              </button>
              <button
                onClick={() => setActiveTab('head')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'head' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🧠 Kepala (cm)
              </button>
            </div>
          </div>

          {/* SVG Canvas Chart */}
          <div className="relative overflow-x-auto">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
              {/* Grid Background */}
              <rect x="50" y="20" width="530" height="290" fill="#fcfcfd" />

              {/* Y-Axis Horizontal Gridlines */}
              {Array.from({ length: 5 }).map((_, i) => {
                const step = yAxisMin + (i * (yAxisMax - yAxisMin)) / 4;
                const coords = getSvgCoords(0, step, svgWidth, svgHeight);
                return (
                  <g key={`y-grid-${i}`}>
                    <line 
                      x1="50" 
                      y1={coords.y} 
                      x2="580" 
                      y2={coords.y} 
                      stroke="#f1f5f9" 
                      strokeWidth="1" 
                    />
                    <text 
                      x="40" 
                      y={coords.y + 4} 
                      textAnchor="end" 
                      className="fill-gray-400 font-mono text-[10px]"
                    >
                      {step.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* X-Axis Monthly Gridlines */}
              {[0, 2, 4, 6, 8, 10, 12, 15, 18, 21, 24].map((month) => {
                const coords = getSvgCoords(month, yAxisMin, svgWidth, svgHeight);
                return (
                  <g key={`x-grid-${month}`}>
                    <line 
                      x1={coords.x} 
                      y1="20" 
                      x2={coords.x} 
                      y2="310" 
                      stroke="#f1f5f9" 
                      strokeWidth="1" 
                    />
                    <text 
                      x={coords.x} 
                      y="325" 
                      textAnchor="middle" 
                      className="fill-gray-500 font-semibold text-[10px]"
                    >
                      {month} bln
                    </text>
                  </g>
                );
              })}

              {/* WHO Standard Reference Bands (Fill between 3rd and 97th percentiles) */}
              <path
                d={`${getLinePath(1)} L ${getSvgCoords(24, currentReference[currentReference.length-1][3], svgWidth, svgHeight).x} ${getSvgCoords(24, currentReference[currentReference.length-1][3], svgWidth, svgHeight).y} ${currentReference.slice().reverse().map(ref => {
                  const c = getSvgCoords(ref[0], ref[3], svgWidth, svgHeight);
                  return `L ${c.x} ${c.y}`;
                }).join(' ')} Z`}
                fill="#f0fdf4"
                opacity="0.6"
              />

              {/* WHO Percentile Reference Curves */}
              {/* 3rd Percentile (Lower Limit) */}
              <path d={line3rd} fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3,3" />
              
              {/* 50th Percentile (Ideal Median) */}
              <path d={line50th} fill="none" stroke="#22c55e" strokeWidth="1.8" />
              
              {/* 97th Percentile (Upper Limit) */}
              <path d={line97th} fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3,3" />

              {/* Actual User Child Curve */}
              {userLinePath && (
                <path d={userLinePath} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
              )}

              {/* Dots on User Child Graph */}
              {formattedUserRecords.map((rec, i) => {
                const coords = getSvgCoords(rec.age, rec.value, svgWidth, svgHeight);
                return (
                  <g key={`point-${rec.id}`}>
                    <circle 
                      cx={coords.x} 
                      cy={coords.y} 
                      r="5" 
                      className="fill-indigo-600 stroke-white" 
                      strokeWidth="2" 
                    />
                    <circle 
                      cx={coords.x} 
                      cy={coords.y} 
                      r="10" 
                      className="fill-indigo-600/10 cursor-pointer hover:fill-indigo-600/20" 
                    />
                    {/* Tooltip text inside SVG (simulated overlay) */}
                    <text
                      x={coords.x}
                      y={coords.y - 12}
                      textAnchor="middle"
                      className="fill-indigo-950 font-bold font-mono text-[9px] bg-white"
                    >
                      {rec.value.toFixed(1)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Curve Labels explanations */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs text-center">
            <div className="flex items-center justify-center gap-1.5 p-2 bg-red-50 text-red-700 rounded-xl">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-red-500"></span>
              <span className="font-semibold">Batas Bawah (WHO 3rd)</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <span className="w-3.5 h-1 bg-emerald-500 rounded"></span>
              <span className="font-semibold">Median Ideal (WHO 50th)</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 bg-blue-50 text-blue-700 rounded-xl">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-blue-500"></span>
              <span className="font-semibold">Batas Atas (WHO 97th)</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 bg-indigo-50 text-indigo-700 rounded-xl">
              <span className="w-3.5 h-1.5 bg-indigo-600 rounded-full"></span>
              <span className="font-semibold">Pertumbuhan {activeChild.nama}</span>
            </div>
          </div>
        </div>

        {/* Right column: Log Form & History Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-500" />
              Catat Ukuran Baru
            </h3>
            <p className="text-xs text-slate-500">
              Input data BB, TB, dan Lingkar Kepala berkala
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Tanggal Pengukuran</label>
              <input 
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-gray-50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-gray-700">Berat Badan (BB)</label>
                <span className="font-bold text-indigo-600 font-mono">{weight} kg</span>
              </div>
              <input 
                type="range"
                min="1.5"
                max="18"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-gray-700">Tinggi / Panjang Badan (TB)</label>
                <span className="font-bold text-indigo-600 font-mono">{height} cm</span>
              </div>
              <input 
                type="range"
                min="40"
                max="110"
                step="0.5"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-gray-700">Lingkar Kepala (LK)</label>
                <span className="font-bold text-indigo-600 font-mono">{headCirc} cm</span>
              </div>
              <input 
                type="range"
                min="30"
                max="55"
                step="0.5"
                value={headCirc}
                onChange={(e) => setHeadCirc(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
            >
              Simpan Data Tumbuh Kembang
            </button>
          </form>

          {/* History table list */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800">Riwayat Ukuran</h4>
            {activeChildGrowthRecords.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Belum ada data ukuran tercatat.</p>
            ) : (
              <div className="max-h-[150px] overflow-y-auto space-y-2 pr-1">
                {activeChildGrowthRecords.slice().reverse().map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-slate-200 text-[11px]">
                    <div>
                      <p className="font-bold text-gray-800">{rec.tanggal}</p>
                      <p className="text-[10px] text-gray-500">
                        BB: {rec.berat} kg | TB: {rec.tinggi} cm | LK: {rec.lingkar_kepala} cm
                      </p>
                    </div>
                    <button 
                      onClick={() => removeGrowthRecord(rec.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Advisory Note */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 text-xs text-amber-800 flex gap-3 items-start">
        <Info className="w-5 h-5 text-amber-600 shrink-0" />
        <div className="space-y-1 leading-relaxed">
          <strong className="block">💡 Informasi Sangat Penting:</strong>
          <p>
            Hasil kurva di atas adalah visualisasi perbandingan berdasarkan database baku standar <strong>WHO Child Growth Standards (Persentil)</strong>. Fluktuasi kurva adalah hal yang wajar. Jika pertumbuhan si kecil terlihat mendatar secara konstan (flatline), menurun tajam melintasi batas bawah merah, atau di luar ambang batas, <strong>mohon tidak mendiagnosis mandiri</strong>. Cukup arahkan konsultasi langsung ke Dokter Spesialis Anak (Sp.A) demi pemeriksaan klinis yang menyeluruh.
          </p>
        </div>
      </div>
    </div>
  );
}
