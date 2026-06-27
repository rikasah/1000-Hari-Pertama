import React, { useState } from 'react';
import { AppState } from '../useAppState';
import { 
  CheckCircle, Shield, Calendar, Award, Info, Trash2, ChevronRight, Check
} from 'lucide-react';
import { STATIC_VACCINES } from '../data';

interface VaccineModuleProps {
  state: AppState;
}

export default function VaccineModule({ state }: VaccineModuleProps) {
  const { 
    activeChild, activeChildVaccines, updateVaccineStatus, getChildAgeInMonths 
  } = state;

  const [selectedVaccineId, setSelectedVaccineId] = useState<string>('');
  const [actualDate, setActualDate] = useState(new Date().toISOString().split('T')[0]);
  const [actualNote, setActualNote] = useState('');

  if (!activeChild) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-4" id="vaccine-module-root">
        <Shield className="w-12 h-12 text-indigo-500 mx-auto" />
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
        <Shield className="w-12 h-12 text-indigo-400 mx-auto" />
        <h3 className="font-bold text-slate-900 text-lg">Mode Pemantauan Kehamilan</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Jadwal Imunisasi Nasional Kemenkes RI akan otomatis dibuat begitu si kecil Kaelan Rayyan lahir ke dunia (HPL: {activeChild.tanggal_lahir}).
        </p>
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-800 text-left max-w-lg mx-auto leading-relaxed">
          <strong className="block mb-1">📋 Persiapan Imunisasi Sejak Hamil:</strong>
          Ketahui pentingnya imunisasi dasar lengkap sejak awal. Bayi baru lahir (0 bulan) wajib langsung menerima suntikan pencegahan Hepatitis B (HB-0) dalam waktu kurang dari 24 jam setelah bersalin.
        </div>
      </div>
    );
  }

  // Group vaccines by status
  const pendingVaccines = activeChildVaccines.filter(v => v.status === 'belum');
  const completedVaccines = activeChildVaccines.filter(v => v.status === 'sudah');

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVaccineId) return;
    updateVaccineStatus(selectedVaccineId, 'sudah', actualDate, actualNote);
    // Reset form states
    setSelectedVaccineId('');
    setActualNote('');
  };

  return (
    <div className="space-y-8" id="vaccine-module-root">
      
      {/* Overview Card */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 text-center md:text-left">
          <span className="bg-indigo-800 text-indigo-200 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Imunisasi Nasional
          </span>
          <h3 className="font-bold text-xl md:text-2xl">Jadwal Imunisasi {activeChild.nama}</h3>
          <p className="text-xs text-indigo-200 leading-relaxed max-w-md">
            Membantu memantau ketepatan waktu pemberian vaksin imunisasi dasar wajib rekomendasi IDAI & Kemenkes RI demi masa depan sehat.
          </p>
        </div>
        
        {/* Progress Circle / Badge */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[140px]">
          <span className="block text-2xl font-black">{completedVaccines.length} / {activeChildVaccines.length}</span>
          <span className="text-[10px] text-indigo-100 font-medium">Vaksin Selesai Diberikan</span>
          <div className="w-full bg-indigo-950 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-400 h-full transition-all duration-500"
              style={{ width: `${(completedVaccines.length / activeChildVaccines.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main schedule tracker - Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming Vaccines Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              Imunisasi Mendatang & Belum Selesai
            </h4>

            {pendingVaccines.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-2">
                <span className="text-3xl">🛡️</span>
                <p className="text-xs font-bold text-emerald-600">Luar Biasa! Imunisasi Si Kecil Telah Lengkap Hingga Usia 2 Tahun.</p>
                <p className="text-[10px] text-slate-400">Pastikan untuk rutin mengonsultasikan asupan imunisasi booster lanjutan di atas usia 2 tahun.</p>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[400px] overflow-y-auto pr-1">
                {pendingVaccines.map((v) => {
                  const refDetail = STATIC_VACCINES.find(sv => sv.id === v.vaccine_id);
                  return (
                    <div 
                      key={v.id} 
                      className="p-4 rounded-xl border border-slate-200 hover:border-indigo-100 bg-gray-50/50 hover:bg-white transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md">
                            Rekomendasi: {refDetail?.rekomendasi_usia_bulan === 0 ? 'Lahir' : `${refDetail?.rekomendasi_usia_bulan} Bulan`}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            Estimasi: {v.tanggal_estimasi}
                          </span>
                        </div>
                        <h5 className="font-bold text-gray-900 text-sm">{v.nama_vaksin}</h5>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {refDetail?.deskripsi}
                        </p>
                        <p className="text-[10px] text-gray-400 italic">
                          Sumber rujukan: {refDetail?.sumber}
                        </p>
                      </div>

                      <div className="shrink-0 flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedVaccineId(v.vaccine_id);
                            // Scroll or focus input form
                            const formElement = document.getElementById('log-vaccine-form');
                            if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" /> Tandai Selesai
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Completed History Vaccines Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Riwayat Imunisasi yang Sudah Diberikan
            </h4>

            {completedVaccines.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6 bg-gray-50 rounded-xl border border-dashed border-slate-200">
                Belum ada vaksin yang ditandai sebagai Selesai.
              </p>
            ) : (
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                {completedVaccines.map((v) => {
                  const refDetail = STATIC_VACCINES.find(sv => sv.id === v.vaccine_id);
                  return (
                    <div 
                      key={v.id} 
                      className="p-4 rounded-xl border border-emerald-50 bg-emerald-50/20 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                            Diberikan Tanggal: {v.tanggal_aktual}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          {v.nama_vaksin} 
                          <span className="text-emerald-600 text-[10px]">✓ Terverifikasi</span>
                        </h5>
                        {v.catatan && (
                          <p className="text-xs text-gray-600 bg-white/75 p-2 rounded-lg border border-emerald-100/50">
                            <strong>Catatan:</strong> {v.catatan}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0">
                        <button
                          onClick={() => updateVaccineStatus(v.vaccine_id, 'belum')}
                          className="text-xs font-semibold text-slate-500 hover:text-red-500 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 transition-all"
                        >
                          Batalkan Selesai
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Side Panel form to update - Right 1 Column */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 self-start" id="log-vaccine-form">
          <div className="space-y-1">
            <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              Catat Tanggal Vaksin
            </h4>
            <p className="text-xs text-slate-500">
              Ubah status vaksin secara manual setelah si kecil disuntik di RS/Puskesmas
            </p>
          </div>

          <form onSubmit={handleCompleteSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Pilih Jenis Vaksin</label>
              <select
                value={selectedVaccineId}
                onChange={(e) => setSelectedVaccineId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-gray-50"
                required
              >
                <option value="">-- Pilih Imunisasi --</option>
                {pendingVaccines.map(v => (
                  <option key={v.id} value={v.vaccine_id}>
                    {v.nama_vaksin} (Est: {v.tanggal_estimasi})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Tanggal Aktual Vaksin</label>
              <input 
                type="date"
                value={actualDate}
                onChange={(e) => setActualDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-gray-50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Catatan Tambahan</label>
              <textarea 
                placeholder="misal: Dokter dr. Hidayat, Sp.A, efek demam ringan, diberi Sanmol drop"
                value={actualNote}
                onChange={(e) => setActualNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-gray-50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!selectedVaccineId}
              className={`w-full py-2.5 font-semibold text-xs rounded-xl transition-all shadow-sm ${
                selectedVaccineId 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Simpan ke Riwayat Imunisasi
            </button>
          </form>

          {/* Reference Disclaimer - Section 10 */}
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100 text-[10px] text-amber-800 flex gap-2.5 items-start">
            <Info className="w-4.5 h-4.5 text-amber-600 shrink-0" />
            <p className="leading-relaxed">
              <strong>Pemberitahuan Medis:</strong> Informasi jadwal dan nama imunisasi dasar ini dikompilasi merujuk langsung pada rekomendasi resmi <strong>Ikatan Dokter Anak Indonesia (IDAI) Tahun 2023</strong> serta program imunisasi wajib Kementerian Kesehatan Republik Indonesia. Konsultasikanlah setiap tindakan imunisasi si kecil secara detail dengan dokter anak Anda untuk menyesuaikan kondisi tubuh si kecil.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
