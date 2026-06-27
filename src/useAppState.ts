import { useState, useEffect } from 'react';
import { 
  User, Child, GrowthRecord, MilestoneChecklist, 
  VaccineSchedule, MenstrualCycle, LHTestRecord, 
  StoryUnlock, CoinTransaction 
} from './types';
import { STATIC_MILESTONES, STATIC_VACCINES } from './data';

const STORAGE_KEYS = {
  USER: '1000hp_user',
  CHILDREN: '1000hp_children',
  ACTIVE_CHILD_ID: '1000hp_active_child_id',
  GROWTH_RECORDS: '1000hp_growth_records',
  MILESTONE_CHECKLISTS: '1000hp_milestone_checklists',
  VACCINE_SCHEDULES: '1000hp_vaccine_schedules',
  MENSTRUAL_CYCLES: '1000hp_menstrual_cycles',
  LH_TEST_RECORDS: '1000hp_lh_test_records',
  STORY_UNLOCKS: '1000hp_story_unlocks',
  COIN_TRANSACTIONS: '1000hp_coin_transactions',
  NOTIFICATIONS: '1000hp_notifications'
};

export interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
}

export function useAppState() {
  // --- 1. INITIALIZE STATES ---
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) return JSON.parse(saved);
    return {
      id: 'u_1',
      email: 'user@1000hari.id',
      nama: 'Bunda Rika',
      saldo_coin: 10, // Pre-seeded with 10 coins so they can unlock at least 2 stories!
      mode_aktif: 'promil', // Default start mode
      created_at: new Date().toISOString()
    };
  });

  const [children, setChildren] = useState<Child[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHILDREN);
    if (saved) return JSON.parse(saved);
    // Pre-seed 1 child profile so the app is populated beautifully
    return [
      {
        id: 'c_default',
        user_id: 'u_1',
        nama: 'Kaelan Rayyan',
        tanggal_lahir: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString().split('T')[0], // 6 months old
        jenis_kelamin: 'L'
      }
    ];
  });

  const [activeChildId, setActiveChildId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_CHILD_ID);
    if (saved) return saved;
    return 'c_default';
  });

  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GROWTH_RECORDS);
    if (saved) return JSON.parse(saved);
    // Pre-seed some growth records for the 6 months old default child c_default
    const birthDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6);
    return [
      {
        id: 'gr_1',
        child_id: 'c_default',
        tanggal: new Date(birthDate.getTime()).toISOString().split('T')[0],
        berat: 3.2,
        tinggi: 49,
        lingkar_kepala: 33
      },
      {
        id: 'gr_2',
        child_id: 'c_default',
        tanggal: new Date(birthDate.getTime() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0], // 1 mo
        berat: 4.1,
        tinggi: 53.2,
        lingkar_kepala: 35.5
      },
      {
        id: 'gr_3',
        child_id: 'c_default',
        tanggal: new Date(birthDate.getTime() + 1000 * 60 * 60 * 24 * 30 * 2).toISOString().split('T')[0], // 2 mo
        berat: 5.3,
        tinggi: 57.1,
        lingkar_kepala: 37.8
      },
      {
        id: 'gr_4',
        child_id: 'c_default',
        tanggal: new Date(birthDate.getTime() + 1000 * 60 * 60 * 24 * 30 * 4).toISOString().split('T')[0], // 4 mo
        berat: 6.8,
        tinggi: 62.5,
        lingkar_kepala: 40.5
      },
      {
        id: 'gr_5',
        child_id: 'c_default',
        tanggal: new Date(birthDate.getTime() + 1000 * 60 * 60 * 24 * 30 * 6).toISOString().split('T')[0], // 6 mo
        berat: 7.9,
        tinggi: 66.8,
        lingkar_kepala: 42.5
      }
    ];
  });

  const [milestoneChecklists, setMilestoneChecklists] = useState<MilestoneChecklist[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MILESTONE_CHECKLISTS);
    if (saved) return JSON.parse(saved);
    // Pre-seed some accomplished milestone checklists for the 6-month-old child
    return [
      { id: 'mc_1', child_id: 'c_default', milestone_id: 'm_1m_1', status: 'sudah', tanggal_update: new Date().toISOString() },
      { id: 'mc_2', child_id: 'c_default', milestone_id: 'm_1m_2', status: 'sudah', tanggal_update: new Date().toISOString() },
      { id: 'mc_3', child_id: 'c_default', milestone_id: 'm_3m_1', status: 'sudah', tanggal_update: new Date().toISOString() },
      { id: 'mc_4', child_id: 'c_default', milestone_id: 'm_3m_2', status: 'sudah', tanggal_update: new Date().toISOString() },
      { id: 'mc_5', child_id: 'c_default', milestone_id: 'm_3m_3', status: 'sudah', tanggal_update: new Date().toISOString() },
      { id: 'mc_6', child_id: 'c_default', milestone_id: 'm_6m_1', status: 'belum', tanggal_update: new Date().toISOString() },
      { id: 'mc_7', child_id: 'c_default', milestone_id: 'm_6m_2', status: 'belum', tanggal_update: new Date().toISOString() }
    ];
  });

  const [vaccineSchedules, setVaccineSchedules] = useState<VaccineSchedule[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VACCINE_SCHEDULES);
    if (saved) return JSON.parse(saved);
    // Automatically generate vaccine schedule for c_default
    const birthDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6);
    return STATIC_VACCINES.map((v, idx) => {
      const estimatedTime = new Date(birthDate.getTime() + 1000 * 60 * 60 * 24 * 30 * v.rekomendasi_usia_bulan);
      const isPast = v.rekomendasi_usia_bulan <= 3; // 0, 1, 2, 3 months already completed
      return {
        id: `vs_def_${idx}`,
        child_id: 'c_default',
        vaccine_id: v.id,
        nama_vaksin: v.nama,
        tanggal_estimasi: estimatedTime.toISOString().split('T')[0],
        status: isPast ? 'sudah' : 'belum',
        tanggal_aktual: isPast ? estimatedTime.toISOString().split('T')[0] : undefined,
        catatan: isPast ? 'Diberikan tepat waktu di Posyandu / RS' : undefined
      };
    });
  });

  const [menstrualCycles, setMenstrualCycles] = useState<MenstrualCycle[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MENSTRUAL_CYCLES);
    if (saved) return JSON.parse(saved);
    // Pre-seed some menstrual cycles for planning mode
    const today = new Date();
    const cycle1Start = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 26); // 26 days ago
    const cycle2Start = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 54); // 54 days ago
    
    return [
      {
        id: 'cy_1',
        user_id: 'u_1',
        tanggal_mulai_haid: cycle2Start.toISOString().split('T')[0],
        panjang_siklus: 28,
        durasi_haid: 5,
        prediksi_masa_subur_mulai: new Date(cycle2Start.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        prediksi_masa_subur_selesai: new Date(cycle2Start.getTime() + 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        id: 'cy_2',
        user_id: 'u_1',
        tanggal_mulai_haid: cycle1Start.toISOString().split('T')[0],
        panjang_siklus: 28,
        durasi_haid: 5,
        prediksi_masa_subur_mulai: new Date(cycle1Start.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        prediksi_masa_subur_selesai: new Date(cycle1Start.getTime() + 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    ];
  });

  const [lhTestRecords, setLhTestRecords] = useState<LHTestRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LH_TEST_RECORDS);
    if (saved) return JSON.parse(saved);
    // Seed some LH Test Records
    const today = new Date();
    const cycle1Start = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 26);
    return [
      {
        id: 'lh_1',
        user_id: 'u_1',
        tanggal: new Date(cycle1Start.getTime() + 11 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        jam: '09:00',
        hasil: 'negatif',
        ketebalan_garis: 'samar',
        catatan: 'Garis test samar sekali'
      },
      {
        id: 'lh_2',
        user_id: 'u_1',
        tanggal: new Date(cycle1Start.getTime() + 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        jam: '10:15',
        hasil: 'positif',
        ketebalan_garis: 'sangat_pekat',
        catatan: 'Garis test sangat tebal & pekat dibanding kontrol!'
      }
    ];
  });

  const [storyUnlocks, setStoryUnlocks] = useState<StoryUnlock[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STORY_UNLOCKS);
    if (saved) return JSON.parse(saved);
    return []; // No premium stories unlocked initially
  });

  const [coinTransactions, setCoinTransactions] = useState<CoinTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COIN_TRANSACTIONS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'tx_init',
        user_id: 'u_1',
        jumlah_coin: 10,
        nominal_rupiah: 15000,
        status: 'success',
        tanggal: new Date().toISOString(),
        metode_pembayaran: 'QRIS Gopay'
      }
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'n_1',
        type: 'success',
        title: 'Selamat datang Bunda Rika!',
        body: 'Mari lengkapi 1000 hari pertama si kecil dengan memantau perkembangan tubuh, jadwal vaksinasi, dan nutrisi harian.',
        timestamp: new Date().toISOString(),
        isRead: false
      },
      {
        id: 'n_2',
        type: 'reminder',
        title: 'Jadwal Vaksinasi Mendatang',
        body: 'Si kecil Kaelan Rayyan mendekati usia 9 bulan. Vaksinasi MR (Campak-Rubela) 1 dijadwalkan selanjutnya.',
        timestamp: new Date().toISOString(),
        isRead: false
      }
    ];
  });

  // --- 2. SYNC TO LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(children));
  }, [children]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CHILD_ID, activeChildId);
  }, [activeChildId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GROWTH_RECORDS, JSON.stringify(growthRecords));
  }, [growthRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MILESTONE_CHECKLISTS, JSON.stringify(milestoneChecklists));
  }, [milestoneChecklists]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VACCINE_SCHEDULES, JSON.stringify(vaccineSchedules));
  }, [vaccineSchedules]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MENSTRUAL_CYCLES, JSON.stringify(menstrualCycles));
  }, [menstrualCycles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LH_TEST_RECORDS, JSON.stringify(lhTestRecords));
  }, [lhTestRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORY_UNLOCKS, JSON.stringify(storyUnlocks));
  }, [storyUnlocks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COIN_TRANSACTIONS, JSON.stringify(coinTransactions));
  }, [coinTransactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // --- 3. MUTATION ACTIONS ---

  // User details
  const updateProfile = (nama: string, email: string) => {
    setUser(prev => ({ ...prev, nama, email }));
    addNotification('success', 'Profil Diperbarui', `Informasi profil Bunda telah berhasil diubah.`);
  };

  const updateActiveMode = (mode: 'promil' | 'hamil' | 'anak') => {
    setUser(prev => ({ ...prev, mode_aktif: mode }));
    addNotification('info', 'Fase Berubah', `Mode aktif beralih ke: ${mode === 'promil' ? 'Program Hamil (Promil)' : mode === 'hamil' ? 'Fase Kehamilan' : 'Tumbuh Kembang Anak'}`);
  };

  // Add notification
  const addNotification = (type: NotificationItem['type'], title: string, body: string) => {
    const newNotif: NotificationItem = {
      id: `n_${Date.now()}`,
      type,
      title,
      body,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Child management
  const addChild = (nama: string, tanggal_lahir: string, jenis_kelamin: 'L' | 'P') => {
    const newChild: Child = {
      id: `c_${Date.now()}`,
      user_id: user.id,
      nama,
      tanggal_lahir,
      jenis_kelamin
    };
    
    setChildren(prev => [...prev, newChild]);
    setActiveChildId(newChild.id);
    
    // Generate empty vaccine schedule based on birthdate
    const childBirthDate = new Date(tanggal_lahir);
    const generatedVaccines: VaccineSchedule[] = STATIC_VACCINES.map((v, idx) => {
      const estimatedTime = new Date(childBirthDate.getTime() + 1000 * 60 * 60 * 24 * 30 * v.rekomendasi_usia_bulan);
      return {
        id: `vs_${newChild.id}_${idx}`,
        child_id: newChild.id,
        vaccine_id: v.id,
        nama_vaksin: v.nama,
        tanggal_estimasi: estimatedTime.toISOString().split('T')[0],
        status: 'belum'
      };
    });
    setVaccineSchedules(prev => [...prev, ...generatedVaccines]);

    // Pre-initialize empty milestone checklist for that child
    const newMilestones: MilestoneChecklist[] = STATIC_MILESTONES.map((m, idx) => ({
      id: `mc_${newChild.id}_${idx}`,
      child_id: newChild.id,
      milestone_id: m.id,
      status: 'belum',
      tanggal_update: new Date().toISOString()
    }));
    setMilestoneChecklists(prev => [...prev, ...newMilestones]);

    // Switch mode to 'anak'
    setUser(prev => ({ ...prev, mode_aktif: 'anak' }));
    
    addNotification(
      'success', 
      'Profil Anak Ditambahkan', 
      `Profil ${nama} berhasil dibuat. Jadwal vaksin & checklist tumbuh kembang siap dipantau!`
    );

    return newChild.id;
  };

  const removeChild = (childId: string) => {
    setChildren(prev => prev.filter(c => c.id !== childId));
    setGrowthRecords(prev => prev.filter(gr => gr.child_id !== childId));
    setVaccineSchedules(prev => prev.filter(v => v.child_id !== childId));
    setMilestoneChecklists(prev => prev.filter(m => m.child_id !== childId));
    
    if (activeChildId === childId) {
      const remaining = children.filter(c => c.id !== childId);
      if (remaining.length > 0) {
        setActiveChildId(remaining[0].id);
      } else {
        setActiveChildId('');
        setUser(prev => ({ ...prev, mode_aktif: 'promil' })); // Revert to promil if no children left
      }
    }
    addNotification('warning', 'Profil Anak Dihapus', `Data perkembangan & imunisasi profil telah dihapus.`);
  };

  // Growth Records
  const addGrowthRecord = (tanggal: string, berat: number, tinggi: number, lingkar_kepala: number) => {
    if (!activeChildId) return;
    const newRecord: GrowthRecord = {
      id: `gr_${Date.now()}`,
      child_id: activeChildId,
      tanggal,
      berat,
      tinggi,
      lingkar_kepala
    };
    setGrowthRecords(prev => {
      // Avoid duplicate records for exact same date (override)
      const filtered = prev.filter(r => !(r.child_id === activeChildId && r.tanggal === tanggal));
      return [...filtered, newRecord].sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime());
    });
    addNotification(
      'success', 
      'Data Tumbuh Kembang Disimpan', 
      `Catatan BB: ${berat}kg, TB: ${tinggi}cm, LK: ${lingkar_kepala}cm berhasil diperbarui pada ${tanggal}.`
    );
  };

  const removeGrowthRecord = (recordId: string) => {
    setGrowthRecords(prev => prev.filter(r => r.id !== recordId));
    addNotification('info', 'Catatan Pertumbuhan Dihapus', 'Satu entri riwayat tumbuh kembang berhasil dihapus.');
  };

  // Milestone checklists
  const toggleMilestone = (milestoneId: string, currentStatus: 'sudah' | 'belum') => {
    if (!activeChildId) return;
    const nextStatus = currentStatus === 'sudah' ? 'belum' : 'sudah';
    
    setMilestoneChecklists(prev => {
      const exists = prev.some(m => m.child_id === activeChildId && m.milestone_id === milestoneId);
      if (exists) {
        return prev.map(m => (m.child_id === activeChildId && m.milestone_id === milestoneId) 
          ? { ...m, status: nextStatus, tanggal_update: new Date().toISOString() } 
          : m
        );
      } else {
        return [
          ...prev, 
          {
            id: `mc_${Date.now()}`,
            child_id: activeChildId,
            milestone_id: milestoneId,
            status: nextStatus,
            tanggal_update: new Date().toISOString()
          }
        ];
      }
    });

    if (nextStatus === 'sudah') {
      const milestoneText = STATIC_MILESTONES.find(m => m.id === milestoneId)?.deskripsi || 'Milestone';
      addNotification('success', 'Milestone Tercapai!', `Hebat! Si kecil berhasil mencapai: "${milestoneText.substring(0, 45)}..."`);
    }
  };

  // Vaccine schedules
  const updateVaccineStatus = (vaccineId: string, status: 'sudah' | 'belum', tanggal_aktual?: string, catatan?: string) => {
    if (!activeChildId) return;
    setVaccineSchedules(prev => {
      return prev.map(vs => (vs.child_id === activeChildId && vs.vaccine_id === vaccineId)
        ? { 
            ...vs, 
            status, 
            tanggal_aktual: status === 'sudah' ? (tanggal_aktual || new Date().toISOString().split('T')[0]) : undefined,
            catatan: status === 'sudah' ? (catatan || 'Ditandai selesai') : undefined
          }
        : vs
      );
    });

    const vaccineName = STATIC_VACCINES.find(v => v.id === vaccineId)?.nama || 'Imunisasi';
    if (status === 'sudah') {
      addNotification('success', 'Vaksin Berhasil Dicatat', `Jadwal imunisasi ${vaccineName} telah berhasil dicentang sebagai Selesai.`);
    } else {
      addNotification('info', 'Vaksin Dibatalkan', `Status imunisasi ${vaccineName} dikembalikan ke Belum Selesai.`);
    }
  };

  // --- FAMILY PLANNING (PROMIL) ---

  // Add a menstrual cycle entry
  const addMenstrualCycle = (tanggal_mulai_haid: string, panjang_siklus: number = 28, durasi_haid: number = 5) => {
    // Calculate fertile window range based on Kemenkes/WHO
    // Fertile window typically starts 14 days before next period minus 2 days (i.e. day 12 of a 28 day cycle)
    // and ends 14 days before next period plus 2 days (i.e. day 16 of a 28 day cycle).
    // Let's calculate next period start
    const start = new Date(tanggal_mulai_haid);
    const nextPeriod = new Date(start.getTime() + panjang_siklus * 24 * 60 * 60 * 1000);
    
    const fertileStart = new Date(nextPeriod.getTime() - 16 * 24 * 60 * 60 * 1000);
    const fertileEnd = new Date(nextPeriod.getTime() - 12 * 24 * 60 * 60 * 1000);

    const newCycle: MenstrualCycle = {
      id: `cy_${Date.now()}`,
      user_id: user.id,
      tanggal_mulai_haid,
      panjang_siklus,
      durasi_haid,
      prediksi_masa_subur_mulai: fertileStart.toISOString().split('T')[0],
      prediksi_masa_subur_selesai: fertileEnd.toISOString().split('T')[0]
    };

    setMenstrualCycles(prev => {
      // Deduplicate on date
      const filtered = prev.filter(c => c.tanggal_mulai_haid !== tanggal_mulai_haid);
      return [...filtered, newCycle].sort((a, b) => new Date(a.tanggal_mulai_haid).getTime() - new Date(b.tanggal_mulai_haid).getTime());
    });

    addNotification(
      'success', 
      'Siklus Haid Dicatat', 
      `Tanggal mulai haid ${tanggal_mulai_haid} tersimpan. Perkiraan masa subur Anda berikutnya: ${fertileStart.toISOString().split('T')[0]} s/d ${fertileEnd.toISOString().split('T')[0]}.`
    );
  };

  const removeMenstrualCycle = (cycleId: string) => {
    setMenstrualCycles(prev => prev.filter(c => c.id !== cycleId));
    addNotification('info', 'Siklus Haid Dihapus', 'Satu entri riwayat menstruasi berhasil dihapus.');
  };

  // Add LH Test Record
  const addLhTestRecord = (tanggal: string, jam: string, hasil: 'negatif' | 'positif', ketebalan_garis: LHTestRecord['ketebalan_garis'], catatan?: string) => {
    const newRecord: LHTestRecord = {
      id: `lh_${Date.now()}`,
      user_id: user.id,
      tanggal,
      jam,
      hasil,
      ketebalan_garis,
      catatan
    };

    setLhTestRecords(prev => {
      const filtered = prev.filter(r => !(r.tanggal === tanggal && r.jam === jam));
      return [...filtered, newRecord].sort((a, b) => `${a.tanggal}T${a.jam}`.localeCompare(`${b.tanggal}T${b.jam}`));
    });

    if (hasil === 'positif') {
      addNotification(
        'warning', 
        'LH Test POSITIF - Waktu Optimal!', 
        'Selamat! Hasil tes LH Anda menunjukkan lonjakan hormon. Waktu terbaik berhubungan adalah 24-48 jam ke depan demi keberhasilan hamil.'
      );
    } else {
      addNotification(
        'info', 
        'Hasil Tes LH Dicatat', 
        `Hasil tes pada ${tanggal} pukul ${jam} tercatat negatif. Terus pantau berkala mendekati masa subur.`
      );
    }
  };

  const removeLhTestRecord = (recordId: string) => {
    setLhTestRecords(prev => prev.filter(r => r.id !== recordId));
  };

  // Simulated pregnancy trigger: Transition automatically from Promil to Kehamilan mode
  const transitionToPregnancy = (estDueDate?: string) => {
    setUser(prev => ({
      ...prev,
      mode_aktif: 'hamil'
    }));
    
    addNotification(
      'success',
      'SELAMAT ATAS KEHAMILAN ANDA! 🎉',
      'Kami sangat terharu mendengarnya! Aplikasi otomatis beralih ke Mode Kehamilan. Anda dapat memantau tips trimester dan menambahkan nama janin.'
    );

    // Seed a child in pregnancy stage
    const dueDate = estDueDate || new Date(Date.now() + 1000 * 60 * 60 * 24 * 280).toISOString().split('T')[0]; // ~9 months from now
    const pregnantProfile: Child = {
      id: `c_pregnancy_${Date.now()}`,
      user_id: user.id,
      nama: 'Calon Bayi Utun',
      tanggal_lahir: dueDate, // Stored as due date initially
      jenis_kelamin: 'L' // Default
    };

    setChildren(prev => [...prev, pregnantProfile]);
    setActiveChildId(pregnantProfile.id);
  };

  // --- COIN SYSTEM & PREMIUM STORY UNLOCK ---

  // Simulate buying coins
  const buyCoins = (jumlah: number, rupiah: number, metode: string) => {
    const newTx: CoinTransaction = {
      id: `tx_${Date.now()}`,
      user_id: user.id,
      jumlah_coin: jumlah,
      nominal_rupiah: rupiah,
      status: 'success',
      tanggal: new Date().toISOString(),
      metode_pembayaran: metode
    };

    setCoinTransactions(prev => [newTx, ...prev]);
    setUser(prev => ({
      ...prev,
      saldo_coin: prev.saldo_coin + jumlah
    }));

    addNotification(
      'success',
      'Pembelian Koin Berhasil!',
      `Top-up sebesar Rp ${rupiah.toLocaleString('id-ID')} (${jumlah} Koin) sukses via ${metode}. Saldo sekarang: ${user.saldo_coin + jumlah} Koin.`
    );
  };

  // Unlock Story
  const unlockStory = (storyId: string, costCoins: number): boolean => {
    if (user.saldo_coin < costCoins) {
      addNotification(
        'warning',
        'Koin Tidak Cukup',
        `Dibutuhkan ${costCoins} koin untuk membuka cerita ini. Silakan top-up saldo koin terlebih dahulu.`
      );
      return false;
    }

    // Deduct coins
    setUser(prev => ({
      ...prev,
      saldo_coin: prev.saldo_coin - costCoins
    }));

    // Add unlock record
    const newUnlock: StoryUnlock = {
      id: `unl_${Date.now()}`,
      user_id: user.id,
      story_id: storyId,
      tanggal_unlock: new Date().toISOString()
    };
    setStoryUnlocks(prev => [...prev, newUnlock]);

    addNotification(
      'success',
      'Cerita Dibuka! 📖',
      `Berhasil menukar ${costCoins} koin untuk membuka cerita premium. Selamat membaca bersama si kecil!`
    );

    return true;
  };

  // Helper selectors
  const activeChild = children.find(c => c.id === activeChildId);
  const activeChildGrowthRecords = growthRecords.filter(r => r.child_id === activeChildId);
  const activeChildMilestones = milestoneChecklists.filter(m => m.child_id === activeChildId);
  const activeChildVaccines = vaccineSchedules.filter(v => v.child_id === activeChildId);

  // Helper to determine active child's age in months
  const getChildAgeInMonths = (birthDateStr?: string): number => {
    if (!birthDateStr) return 0;
    const birth = new Date(birthDateStr);
    const now = new Date();
    
    // Check if birthdate is in the future (pregnancy estimated due date)
    if (birth > now) {
      return -1; // Special code for "in pregnancy"
    }

    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.4375));
    return diffMonths;
  };

  const getChildAgeText = (birthDateStr?: string): string => {
    if (!birthDateStr) return '';
    const ageMonths = getChildAgeInMonths(birthDateStr);
    if (ageMonths === -1) {
      const birth = new Date(birthDateStr);
      const now = new Date();
      const diffTime = birth.getTime() - now.getTime();
      const weeksLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
      return `Hamil (${weeksLeft} Minggu Menuju HPL)`;
    }
    if (ageMonths < 1) {
      const birth = new Date(birthDateStr);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      return `${diffDays} Hari`;
    }
    const years = Math.floor(ageMonths / 12);
    const months = ageMonths % 12;
    if (years > 0) {
      return `${years} Tahun ${months} Bulan`;
    }
    return `${months} Bulan`;
  };

  // LH Test Record Status & Reminders generator
  const isLhTestPositiveToday = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    return lhTestRecords.some(r => r.tanggal === todayStr && r.hasil === 'positif');
  };

  return {
    user,
    children,
    activeChildId,
    activeChild,
    activeChildGrowthRecords,
    activeChildMilestones,
    activeChildVaccines,
    growthRecords,
    milestoneChecklists,
    vaccineSchedules,
    menstrualCycles,
    lhTestRecords,
    storyUnlocks,
    coinTransactions,
    notifications,
    
    // Actions
    updateProfile,
    updateActiveMode,
    addNotification,
    markNotificationAsRead,
    clearNotifications,
    addChild,
    removeChild,
    setActiveChildId,
    addGrowthRecord,
    removeGrowthRecord,
    toggleMilestone,
    updateVaccineStatus,
    
    // Promil actions
    addMenstrualCycle,
    removeMenstrualCycle,
    addLhTestRecord,
    removeLhTestRecord,
    transitionToPregnancy,
    isLhTestPositiveToday,
    
    // Coin & Story actions
    buyCoins,
    unlockStory,
    
    // Utility helpers
    getChildAgeInMonths,
    getChildAgeText
  };
}
export type AppState = ReturnType<typeof useAppState>;
export default useAppState;
