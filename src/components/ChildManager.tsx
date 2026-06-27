import React, { useState } from 'react';
import { AppState } from '../useAppState';
import { 
  User, Plus, Calendar, Trash2, Shield, 
  Baby, CheckCircle, Award, Heart, Activity
} from 'lucide-react';

interface ChildManagerProps {
  state: AppState;
}

export default function ChildManager({ state }: ChildManagerProps) {
  const { 
    children, activeChildId, setActiveChildId, addChild, 
    removeChild, getChildAgeText, getChildAgeInMonths, user,
    updateProfile
  } = state;

  // New child form states
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date().toISOString().split('T')[0]);
  const [gender, setGender] = useState<'L' | 'P'>('L');

  // New user profile form states
  const [parentName, setParentName] = useState(user.nama);
  const [parentEmail, setParentEmail] = useState(user.email);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addChild(name, birthdate, gender);
    // Reset fields
    setName('');
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(parentName, parentEmail);
  };

  return (
    <div className="space-y-8" id="child-manager-root">
      
      {/* Grid: Profiles List & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Profiles list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Baby className="w-5 h-5 text-indigo-500" />
              Daftar Profil Anak & Janin Kandungan
            </h3>

            {children.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-2">
                <span className="text-3xl">🧸</span>
                <p className="text-xs text-gray-500 font-bold">Belum Ada Profil Anak Terdaftar.</p>
                <p className="text-[10px] text-gray-400">Silakan isi formulir di samping kanan untuk mendaftarkan nama si kecil atau masa kehamilan Bunda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {children.map((child) => {
                  const isActive = child.id === activeChildId;
                  const ageMonths = getChildAgeInMonths(child.tanggal_lahir);
                  const isPregnant = ageMonths === -1;

                  return (
                    <div 
                      key={child.id}
                      onClick={() => setActiveChildId(child.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-4 ${
                        isActive 
                          ? 'bg-indigo-50/40 border-indigo-400 ring-2 ring-indigo-100/50' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/20'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 text-[9px] font-black rounded-md ${
                            isPregnant 
                              ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                              : child.jenis_kelamin === 'L' 
                                ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                : 'bg-pink-50 text-pink-600 border border-pink-100'
                          }`}>
                            {isPregnant ? '🤰 KEHAMILAN' : child.jenis_kelamin === 'L' ? '👦 LAKI-LAKI' : '👧 PEREMPUAN'}
                          </span>
                          
                          {isActive && (
                            <span className="text-[9px] font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md uppercase">
                              Aktif Terpilih
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-base text-slate-900 truncate pt-1">
                          {child.nama}
                        </h4>
                        
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {isPregnant ? 'Prediksi HPL:' : 'Tanggal Lahir:'} {child.tanggal_lahir}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                        <span className="text-slate-400">Usia Sekarang:</span>
                        <strong className="text-slate-700">{getChildAgeText(child.tanggal_lahir)}</strong>
                      </div>

                      {/* Delete profile option */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Apakah Bunda yakin ingin menghapus data perkembangan ${child.nama}? Tindakan ini permanen.`)) {
                            removeChild(child.id);
                          }
                        }}
                        className="absolute bottom-4 right-4 text-gray-300 hover:text-red-500 p-1 rounded-lg transition-colors"
                        title="Hapus Profil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Parent details form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              Informasi Akun Bunda / Ayah (Orang Tua)
            </h3>

            <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Nama Lengkap</label>
                  <input 
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-slate-50"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Email Utama</label>
                  <input 
                    type="email"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-slate-50"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Simpan Perubahan Akun
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Add Child Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 self-start">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
              <Plus className="w-5 h-5 text-indigo-500" />
              Tambah Anak / Janin
            </h3>
            <p className="text-xs text-slate-500">
              Buat profil baru untuk melacak imunisasi & milestones personal
            </p>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Nama Panggilan</label>
              <input 
                type="text"
                placeholder="misal: Kaelan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-slate-50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Tanggal Lahir / HPL</label>
              <input 
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-slate-50"
                required
              />
              <p className="text-[10px] text-slate-400">Pilihlah tanggal di masa mendatang jika masih dalam fase kehamilan.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Jenis Kelamin</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('L')}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    gender === 'L' 
                      ? 'bg-blue-50 border-blue-200 text-blue-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  👦 Laki-Laki
                </button>
                <button
                  type="button"
                  onClick={() => setGender('P')}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    gender === 'P' 
                      ? 'bg-pink-50 border-pink-200 text-pink-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  👧 Perempuan
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
            >
              Daftarkan & Generate Jadwal
            </button>
          </form>

          {/* Informational Panel - Section 10 */}
          <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100/30 text-[10px] text-indigo-800 space-y-1">
            <strong className="block">ℹ️ Kebijakan Privasi Data Anak:</strong>
            <p className="leading-relaxed">
              Data tanggal lahir dan kurva pertumbuhan anak adalah data yang sensitif. Kami berkomitmen penuh menjaga privasi Bunda. Seluruh data disimpan terenkripsi di penyimpanan lokal peramban (browser) Anda dan tidak akan diperjualbelikan kepada pihak ketiga mana pun.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
