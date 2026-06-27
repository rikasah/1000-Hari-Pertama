import React, { useState } from 'react';
import { AppState } from '../useAppState';
import { STATIC_PRODUCTS } from '../data';
import { 
  BookOpen, ShoppingBag, ArrowRight, Award, 
  ExternalLink, HelpCircle, ShieldAlert, Check
} from 'lucide-react';

interface ContentModuleProps {
  state: AppState;
}

interface Article {
  id: string;
  fase: 'kehamilan' | 'bayi-0-6' | 'bayi-6-12' | 'anak-1-2';
  judul: string;
  penulis: string;
  sumber_resmi: string;
  bacaan_durasi: string;
  ringkasan: string;
  poin_penting: string[];
  tips_stimulasi: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'art_1',
    fase: 'kehamilan',
    judul: 'Menjaga Gizi Optimal di Trimester Pertama Kehamilan',
    penulis: 'dr. Sarah Amalia, Sp.OG',
    sumber_resmi: 'IDAI, Kemenkes RI, WHO',
    bacaan_durasi: '4 menit',
    ringkasan: 'Trimester pertama (minggu 1-12) adalah masa krusial pembentukan organ vital janin seperti jantung dan saraf. Di masa ini, Bunda sering mengalami mual (morning sickness), namun pemenuhan mikronutrisi tetap harus diupayakan semaksimal mungkin.',
    poin_penting: [
      'Penuhi asupan Asam Folat 400 mcg setiap hari untuk mencegah cacat tabung saraf janin.',
      'Perbanyak makanan kaya zat besi dari sayuran hijau dan daging merah matang untuk mencegah anemia.',
      'Hindari konsumsi ikan bermerkuri tinggi, kafein berlebih, dan telur atau daging setengah matang.'
    ],
    tips_stimulasi: [
      'Lakukan yoga hamil ringan untuk merelaksasi otot panggul dan melancarkan sirkulasi oksigen ke plasenta.',
      'Putar musik lembut atau senandungkan doa malam hari untuk menenangkan pikiran Bunda & menstimulasi kepekaan suara janin.'
    ]
  },
  {
    id: 'art_2',
    fase: 'bayi-0-6',
    judul: 'Keajaiban Kolostrum & ASI Eksklusif 0-6 Bulan',
    penulis: 'dr. Amira Siregar, Sp.A, IBCLC',
    sumber_resmi: 'IDAI, Kemenkes RI, WHO',
    bacaan_durasi: '3 menit',
    ringkasan: 'ASI adalah makanan terbaik tanpa tandingan bagi bayi di 6 bulan pertama kehidupannya. Kolostrum, cairan kekuningan yang keluar di awal menyusui, kaya akan antibodi raksasa yang melapisi dinding pencernaan bayi baru lahir bagaikan imunisasi pertama alami.',
    poin_penting: [
      'Berikan ASI eksklusif tanpa air putih atau susu formula tambahan sebelum usia 6 bulan, kecuali atas instruksi medis.',
      'Berikan ASI secara on-demand (sesuai kebutuhan bayi), umumnya setiap 2-3 jam sekali.',
      'Posisikan bayi menyusu dengan tepat (pelekat mulut bayi menutup area melingkar gelap areola payudara Bunda).'
    ],
    tips_stimulasi: [
      'Lakukan tummy time (tengkurap) selama 2-3 menit sesudah bangun tidur di alas yang kokoh untuk melatih otot leher si kecil.',
      'Kontak mata intensif (eye-contact) dan berikan pijatan usapan halus saat proses menyusui untuk menguatkan hormon cinta (oksitosin).'
    ]
  },
  {
    id: 'art_3',
    fase: 'bayi-6-12',
    judul: 'Langkah Pertama MPASI Sehat & Menyenangkan',
    penulis: 'dr. Rehan Syah, Sp.A (K)',
    sumber_resmi: 'IDAI, WHO',
    bacaan_durasi: '5 menit',
    ringkasan: 'Memasuki usia 6 bulan, kebutuhan energi bayi terus meningkat dan tidak lagi cukup terpenuhi hanya dengan ASI. Inilah saatnya memulai Makanan Pendamping ASI (MPASI) yang adekuat, padat nutrisi, bersih, dan diberikan dengan penuh kesabaran.',
    poin_penting: [
      'MPASI pertama wajib mencakup gizi seimbang: karbohidrat, lemak, serta protein hewani sebagai zat pertumbuhan otak.',
      'Atur tekstur secara bertahap: mulai dari bubur saring lumat (puree) umur 6 bulan, naik tekstur cincang halus umur 9 bulan, hingga makanan keluarga umur 1 tahun.',
      'Hindari pemberian garam, gula, atau penyedap rasa berlebih demi membiasakan bayi menyukai cita rasa asli bahan pangan.'
    ],
    tips_stimulasi: [
      'Ajarkan bayi makan mandiri (finger food) menggunakan peralatan makan silikon yang aman untuk koordinasi motorik mata & tangan.',
      'Buat suasana makan gembira bebas distraksi gawai (gadget) atau televisi untuk mengasah interaksi komunikasi responsif.'
    ]
  },
  {
    id: 'art_4',
    fase: 'anak-1-2',
    judul: 'Menstimulasi Kognitif & Bahasa di Usia Emas 1-2 Tahun',
    penulis: 'Vina Larasati, M.Psi (Psikolog Anak)',
    sumber_resmi: 'Kemenkes RI, IDAI',
    bacaan_durasi: '4 menit',
    ringkasan: 'Usia 12 hingga 24 bulan adalah ledakan perkembangan kosakata dan pemahaman lingkungan (golden age). Anak menyerap setiap kalimat dan perilaku orang tua di sekitarnya bagaikan spons air. Stimulasi interaktif tanpa tekanan sangat krusial.',
    poin_penting: [
      'Ajak anak mengobrol tentang segala benda di sekitarnya dengan pengucapan yang benar (jangan meniru cadel anak).',
      'Batasi screen-time gawai maksimal 1 jam/hari demi meminimalkan risiko keterlambatan bicara (speech-delay).',
      'Berikan permainan edukatif terstruktur seperti susun balok kayu geometri, puzzle sederhana, dan permainan mencocokkan bentuk.'
    ],
    tips_stimulasi: [
      'Bacakan dongeng interaktif sebelum tidur (boardbook bilingual) dan biarkan anak membalik halaman kertas sendiri untuk melatih motorik halus.',
      'Bernyanyi bersama lagu anak-anak bertema anggota tubuh atau nama hewan untuk melatih perulangan ritme verbal kognitif.'
    ]
  }
];

export default function ContentModule({ state }: ContentModuleProps) {
  const { user } = state;

  const [activeTab, setActiveTab] = useState<'education' | 'catalog'>('education');
  const [selectedPhase, setSelectedPhase] = useState<'kehamilan' | 'bayi-0-6' | 'bayi-6-12' | 'anak-1-2'>('kehamilan');

  // Filter products by phase (using category match)
  const getProductCategoryKey = (phase: string) => {
    switch (phase) {
      case 'kehamilan': return 'kehamilan';
      case 'bayi-0-6': return 'bayi-0-6';
      case 'bayi-6-12': return 'bayi-6-12';
      case 'anak-1-2': return 'anak-1-2';
      default: return 'bayi-0-6';
    }
  };

  const currentPhaseProducts = STATIC_PRODUCTS.filter(p => p.kategori === getProductCategoryKey(selectedPhase) || p.kategori === 'promil');
  const activeArticle = ARTICLES.find(a => a.fase === selectedPhase);

  return (
    <div className="space-y-8" id="content-module-root">
      
      {/* Module Navigation Subheader */}
      <div className="flex border-b border-slate-200 pb-1.5 gap-4">
        <button
          onClick={() => setActiveTab('education')}
          className={`pb-2.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'education'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          📖 Hub Konten Edukasi 1000 HP
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-2.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'catalog'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          🛍️ Katalog Rekomendasi Produk per Usia
        </button>
      </div>

      {activeTab === 'education' ? (
        <div className="space-y-6">
          {/* Phase Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'kehamilan', label: '🤰 Kehamilan (Trimester 1-3)' },
              { key: 'bayi-0-6', label: '👶 Usia 0-6 Bulan' },
              { key: 'bayi-6-12', label: '🥣 Usia 6-12 Bulan' },
              { key: 'anak-1-2', label: '🪵 Usia 1-2 Tahun' }
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedPhase(p.key as any)}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  selectedPhase === p.key
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Article & Sidebar Product Integration */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {activeArticle && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                  <div className="space-y-2 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Dipublikasikan oleh: <strong>{activeArticle.penulis}</strong></span>
                      <span>•</span>
                      <span>Durasi baca: {activeArticle.bacaan_durasi}</span>
                    </div>
                    <h3 className="font-extrabold text-xl md:text-2xl text-slate-950 tracking-tight leading-tight">
                      {activeArticle.judul}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-medium bg-gray-50/50 p-4 rounded-xl border border-slate-200">
                    {activeArticle.ringkasan}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      <Award className="w-5 h-5 text-indigo-500" />
                      Pedoman & Poin Penting Kesehatan
                    </h4>
                    <ul className="space-y-2.5 pl-4 text-xs text-gray-600 list-decimal leading-relaxed">
                      {activeArticle.poin_penting.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Stimulation tips */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      💡 Saran Stimulasi Interaktif Orang Tua
                    </h4>
                    <ul className="space-y-2.5 pl-4 text-xs text-slate-600 list-disc leading-relaxed">
                      {activeArticle.tips_stimulasi.map((tp, i) => (
                        <li key={i}>{tp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Medical Claim reference citation - MVP Wajib */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100/50 text-[10px] text-indigo-800 gap-3">
                    <p className="leading-normal">
                      Klaim kesehatan tumbuh kembang, nutrisi, dan imunisasi di atas disarikan resmi merujuk pada standar klinis nasional/global: <strong>{activeArticle.sumber_resmi}</strong>.
                    </p>
                    <span className="shrink-0 bg-indigo-100 text-indigo-800 px-2 py-0.5 font-bold rounded">
                      Rujukan Resmi
                    </span>
                  </div>

                  {/* Disclaimer Medis Wajib */}
                  <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-800 flex gap-2.5 items-start">
                    <ShieldAlert className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                    <p className="leading-snug">
                      <strong>Disclaimer Penting:</strong> Artikel edukasi ini disusun murni sebagai rujukan literatur pendukung perkembangan, <strong>bukan pengganti konsultasi medis tatap muka dokter</strong>. Selalu konsultasikan segala kondisi kesehatan, keluhan sakit, atau resep vitamin si kecil langsung kepada Dokter Spesialis Anak (Sp.A) atau Dokter Kandungan (Sp.OG).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right column: Contextual Affiliate Products Integration */}
            <div className="space-y-6">
              <div className="bg-indigo-50/40 rounded-2xl border border-indigo-100/40 p-6 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-indigo-950 flex items-center gap-1.5">
                    <ShoppingBag className="w-4.5 h-4.5 text-indigo-600" />
                    Rekomendasi Produk Fase Ini
                  </h4>
                  <p className="text-[10px] text-indigo-700">
                    Produk terpercaya penunjang kebutuhan tumbuh kembang & nutrisi
                  </p>
                </div>

                <div className="space-y-3.5">
                  {currentPhaseProducts.map((p) => (
                    <div 
                      key={p.id}
                      className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all"
                    >
                      <div className="flex gap-2.5 items-start">
                        <span className="text-2xl p-2 bg-indigo-50 rounded-lg shrink-0">{p.image_url}</span>
                        <div className="space-y-0.5">
                          <h5 className="font-bold text-gray-900 text-xs leading-snug">{p.nama}</h5>
                          <p className="text-[10px] font-mono font-bold text-emerald-600">{p.harga_kisaran}</p>
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-500 leading-normal bg-gray-50 p-2 rounded-lg">
                        <strong>Alasan Rekomendasi:</strong> {p.alasan_rekomendasi}
                      </p>

                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        {/* Affiliate Mandatory Disclosure */}
                        <span className="text-gray-400 italic font-medium flex items-center gap-0.5">
                          🛡️ Tautan Afiliasi Resmi
                        </span>
                        
                        <a 
                          href={p.link_affiliate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg flex items-center gap-1 transition-all"
                        >
                          Beli di Shopee <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Standalone Catalog Tab */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-500" />
                Katalog Produk Pilihan "1000 Hari Pertama"
              </h3>
              <p className="text-xs text-slate-500">
                Kompilasi lengkap seluruh produk pelengkap gizi, alat pelacak masa subur, dan perlengkapan edukasi anak
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STATIC_PRODUCTS.map((p) => (
                <div 
                  key={p.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 space-y-3.5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                        {p.usia_target}
                      </span>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <span className="text-3xl p-2 bg-indigo-50/50 rounded-xl shrink-0">{p.image_url}</span>
                      <div className="space-y-0.5">
                        <h5 className="font-extrabold text-gray-900 text-xs leading-snug">{p.nama}</h5>
                        <p className="text-[10px] font-mono font-bold text-emerald-600">{p.harga_kisaran}</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {p.deskripsi_singkat}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-gray-50">
                    <div className="text-[10px] bg-indigo-50/50 text-indigo-950 p-2.5 rounded-lg border border-indigo-100/30">
                      <strong>Kenapa Bagus?</strong> {p.alasan_rekomendasi}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className="text-gray-400 italic font-medium flex items-center gap-0.5">
                        🛡️ Tautan Afiliasi Resmi
                      </span>
                      
                      <a 
                        href={p.link_affiliate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg flex items-center gap-1 transition-all text-xs"
                      >
                        Beli di Toko <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
