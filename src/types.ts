export interface User {
  id: string;
  email: string;
  nama: string;
  saldo_coin: number;
  mode_aktif: 'promil' | 'hamil' | 'anak';
  created_at: string;
}

export interface Child {
  id: string;
  user_id: string;
  nama: string;
  tanggal_lahir: string;
  jenis_kelamin: 'L' | 'P'; // Laki-laki or Perempuan
}

export interface GrowthRecord {
  id: string;
  child_id: string;
  tanggal: string;
  berat: number; // in kg
  tinggi: number; // in cm
  lingkar_kepala: number; // in cm
}

export interface MilestoneItem {
  id: string;
  fase_usia: string; // e.g. "0-3 bulan", "3-6 bulan", etc.
  kategori: 'motorik' | 'bahasa' | 'sosial';
  deskripsi: string;
  konteks_ringan: string; // "Umumnya tercapai di usia X-Y bulan"
}

export interface MilestoneChecklist {
  id: string;
  child_id: string;
  milestone_id: string;
  status: 'sudah' | 'belum';
  tanggal_update: string;
}

export interface VaccineItem {
  id: string;
  nama: string;
  deskripsi: string;
  rekomendasi_usia_bulan: number; // in months
  sumber: string; // e.g., "IDAI 2023 / Kemenkes"
}

export interface VaccineSchedule {
  id: string;
  child_id: string;
  vaccine_id: string;
  nama_vaksin: string;
  tanggal_estimasi: string;
  tanggal_aktual?: string;
  status: 'sudah' | 'belum';
  catatan?: string;
}

export interface Product {
  id: string;
  nama: string;
  kategori: 'promil' | 'kehamilan' | 'bayi-0-6' | 'bayi-6-12' | 'anak-1-2';
  usia_target: string;
  link_affiliate: string;
  deskripsi_singkat: string;
  harga_kisaran: string;
  image_url: string;
  alasan_rekomendasi: string;
}

export interface Story {
  id: string;
  judul: string;
  bahasa: 'ID' | 'EN';
  is_free: boolean;
  harga_coin: number;
  deskripsi_singkat: string;
  durasi_baca: string; // e.g., "3 menit"
  tag_usia: string; // e.g., "1-3 tahun"
  konten: string[]; // array of paragraphs or pages
  cover_color: string; // Hex color or Tailwind class for cover styling
}

export interface CoinTransaction {
  id: string;
  user_id: string;
  jumlah_coin: number;
  nominal_rupiah: number;
  status: 'success' | 'pending';
  tanggal: string;
  metode_pembayaran: string;
}

export interface StoryUnlock {
  id: string;
  user_id: string;
  story_id: string;
  tanggal_unlock: string;
}

export interface MenstrualCycle {
  id: string;
  user_id: string;
  tanggal_mulai_haid: string; // YYYY-MM-DD
  panjang_siklus: number; // default e.g. 28 days
  durasi_haid: number; // default e.g. 5 days
  prediksi_masa_subur_mulai: string; // YYYY-MM-DD
  prediksi_masa_subur_selesai: string; // YYYY-MM-DD
}

export interface LHTestRecord {
  id: string;
  user_id: string;
  tanggal: string; // YYYY-MM-DD
  jam: string; // HH:MM
  hasil: 'negatif' | 'positif';
  ketebalan_garis: 'samar' | 'pekat' | 'sangat_pekat'; // helper for visual reading
  catatan?: string;
}
