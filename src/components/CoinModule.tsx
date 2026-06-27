import React, { useState } from 'react';
import { AppState } from '../useAppState';
import { 
  Coins, Check, CreditCard, ShieldCheck, ArrowRight, QrCode, 
  Clock, History, CheckCircle2, AlertCircle
} from 'lucide-react';

interface CoinModuleProps {
  state: AppState;
}

interface Package {
  coins: number;
  rupiah: number;
  label: string;
  badge?: string;
}

const PACKAGES: Package[] = [
  { coins: 5, rupiah: 7500, label: 'Paket Pemula - Sangat Hemat' },
  { coins: 10, rupiah: 15000, label: 'Paket Cerdas - Rekomendasi Utama', badge: 'Populer' },
  { coins: 20, rupiah: 28000, label: 'Paket Hemat Keluarga' },
  { coins: 50, rupiah: 65000, label: 'Paket Kunci Semua Dongeng', badge: 'Terbaik' }
];

export default function CoinModule({ state }: CoinModuleProps) {
  const { user, coinTransactions, buyCoins } = state;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('QRIS (Gopay/OVO/Dana)');

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPkg(pkg);
    setStep(2);
  };

  const handleSimulatePayment = () => {
    if (!selectedPkg) return;
    buyCoins(selectedPkg.coins, selectedPkg.rupiah, paymentMethod);
    setStep(3);
  };

  const handleReset = () => {
    setSelectedPkg(null);
    setStep(1);
  };

  return (
    <div className="space-y-8" id="coin-module-root">
      
      {/* Overview Balance Card */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Dompet Digital Koin
          </span>
          <h3 className="font-extrabold text-2xl md:text-3xl flex items-center gap-2">
            <Coins className="w-8 h-8 text-amber-200 animate-spin" />
            {user.saldo_coin} Koin Dongeng
          </h3>
          <p className="text-xs text-amber-50 leading-relaxed max-w-sm">
            Gunakan koin untuk membuka koleksi cerita anak premium terbaru. 3 cerita pertama selalu gratis!
          </p>
        </div>

        <div className="bg-white rounded-xl p-3.5 text-gray-900 border border-amber-400 text-xs shadow-inner min-w-[150px] text-center">
          <span className="block text-gray-400 text-[10px] uppercase font-bold">1 Cerita Premium =</span>
          <span className="block text-lg font-extrabold text-amber-600">5 Koin saja</span>
          <span className="text-[10px] text-gray-400 block font-medium">Setara Rp 7.500 saja</span>
        </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Package Selection - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                🏷️ Pilih Paket Top-Up Koin Rendah Hambatan (Low-Friction)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PACKAGES.map((pkg, i) => (
                  <div 
                    key={i}
                    onClick={() => handleSelectPackage(pkg)}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-amber-300 bg-gray-50/50 hover:bg-amber-50/10 cursor-pointer transition-all duration-200 relative flex flex-col justify-between space-y-4 shadow-sm"
                  >
                    {pkg.badge && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                        {pkg.badge}
                      </span>
                    )}

                    <div className="space-y-1">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">{pkg.label}</span>
                      <h4 className="font-black text-xl text-slate-900 flex items-center gap-1.5">
                        <Coins className="w-5.5 h-5.5 text-amber-500" />
                        {pkg.coins} Koin
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-500">Nominal:</span>
                      <strong className="text-emerald-600 text-sm">Rp {pkg.rupiah.toLocaleString('id-ID')}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Instruction & Safe Gateway */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 self-start">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              Sistem Pembayaran Instan
            </h4>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Dukungan pembayaran multi-metode yang otomatis terverifikasi secara waktu-nyata (real-time) melalui QRIS standar nasional Indonesia.
            </p>

            <div className="space-y-3.5 text-xs text-slate-600">
              <h5 className="font-bold text-slate-800">🚀 Metode Terintegrasi:</h5>
              <div className="grid grid-cols-3 gap-2">
                {['GoPay', 'OVO', 'Dana'].map(p => (
                  <span key={p} className="p-1.5 bg-gray-50 border border-slate-200 rounded-lg text-center font-bold font-mono text-[10px]">{p}</span>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100/30 text-[10px] text-indigo-800 leading-relaxed">
              <strong>Simulasi Transaksi:</strong> Modul transaksi ini sepenuhnya aman karena menggunakan simulasi Sandbox di lingkungan preview. Bunda tidak akan dikenai tagihan uang riil untuk mencoba.
            </div>
          </div>
        </div>
      )}

      {step === 2 && selectedPkg && (
        /* Step 2: Simulated QRIS Scan Screen */
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-lg space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Gerbang Pembayaran QRIS Midtrans/Xendit
            </span>
            <h3 className="font-extrabold text-base text-slate-900">Scan QRIS Untuk Bayar</h3>
            <p className="text-xs text-slate-500">Paket: {selectedPkg.coins} Koin | Rp {selectedPkg.rupiah.toLocaleString('id-ID')}</p>
          </div>

          {/* Simulated QR Box - Looks premium and authentic */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-slate-200 inline-block mx-auto relative space-y-3 shadow-inner">
            <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 border-b border-slate-200/60 pb-1 px-1">
              <span>QRIS NASIONAL</span>
              <span>ID: 1000HP_MID_001</span>
            </div>
            
            {/* Draw Simulated Gorgeous Custom QR with CSS lines */}
            <div className="w-44 h-44 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/10 to-transparent"></div>
              {/* Complex inner grid to look like real QR */}
              <div className="grid grid-cols-4 gap-1.5 w-full h-full opacity-80">
                {Array.from({ length: 16 }).map((_, i) => {
                  const colors = [
                    'bg-slate-900', 'bg-slate-900', 'bg-transparent', 'bg-slate-900',
                    'bg-transparent', 'bg-slate-900', 'bg-slate-900', 'bg-transparent',
                    'bg-slate-900', 'bg-transparent', 'bg-slate-900', 'bg-slate-900',
                    'bg-slate-900', 'bg-slate-900', 'bg-transparent', 'bg-slate-900'
                  ];
                  return (
                    <div 
                      key={i} 
                      className={`${colors[i]} rounded-xs ${
                        i === 0 || i === 3 || i === 12 ? 'border-2 border-slate-900 bg-white scale-110 shadow-sm' : ''
                      }`}
                    >
                      {(i === 0 || i === 3 || i === 12) && <div className="w-2/3 h-2/3 bg-slate-900 m-auto mt-[15%] rounded-xs"></div>}
                    </div>
                  );
                })}
              </div>
              
              {/* Center Logo mock */}
              <div className="absolute w-10 h-10 bg-white rounded-lg border border-amber-300 shadow flex items-center justify-center">
                <Coins className="w-5 h-5 text-amber-500 animate-bounce" />
              </div>
            </div>

            <div className="text-[10px] font-bold text-gray-500 flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Masa berlaku: 14 menit 52 detik
            </div>
          </div>

          <div className="space-y-3.5 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Buka aplikasi e-wallet Anda (Gopay, OVO, ShopeePay, Dana, LinkAja) lalu klik menu <strong>Scan / Bayar</strong> untuk membaca kode QR di atas.
            </p>

            <div className="flex gap-2.5">
              <button
                onClick={handleReset}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Batalkan
              </button>
              <button
                onClick={handleSimulatePayment}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm"
              >
                Simulasi Bayar Berhasil ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && selectedPkg && (
        /* Step 3: Success state animation and confirmation receipt */
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-emerald-100 p-8 shadow-lg text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-xl text-gray-900">Pembayaran Sukses Terverifikasi!</h3>
            <p className="text-xs text-gray-500">Saldo Koin Anda telah bertambah secara aman</p>
          </div>

          {/* Receipt detail block */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-left space-y-2.5 font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">ID Transaksi:</span>
              <span className="text-gray-800 font-bold">1000HP-TX-{Date.now().toString().substring(6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Item:</span>
              <span className="text-indigo-600 font-bold">+{selectedPkg.coins} Koin Dongeng</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Rupiah:</span>
              <span className="text-emerald-600 font-bold">Rp {selectedPkg.rupiah.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Metode:</span>
              <span className="text-gray-800">{paymentMethod}</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            Selesai & Kembali ke Paket
          </button>
        </div>
      )}

      {/* Transactions History Ledger List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <History className="w-5 h-5 text-indigo-500" />
          Riwayat Transaksi Top-Up Koin
        </h4>

        {coinTransactions.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-6">Belum ada riwayat transaksi top-up.</p>
        ) : (
          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            {coinTransactions.map((tx) => (
              <div key={tx.id} className="p-3 bg-gray-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">+{tx.jumlah_coin} Koin</span>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md uppercase font-bold">SUCCESS</span>
                  </div>
                  <p className="text-[10px] text-gray-400">{new Date(tx.tanggal).toLocaleString('id-ID')}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-800">Rp {tx.nominal_rupiah.toLocaleString('id-ID')}</p>
                  <p className="text-[10px] text-gray-400">{tx.metode_pembayaran}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
