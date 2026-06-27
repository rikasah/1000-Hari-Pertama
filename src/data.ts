import { MilestoneItem, VaccineItem, Product, Story } from './types';

export const STATIC_MILESTONES: MilestoneItem[] = [
  {
    id: 'm_1m_1',
    fase_usia: '1 bulan',
    kategori: 'sosial',
    deskripsi: 'Menatap wajah orang tua saat didekatkan dan merespons suara lembut.',
    konteks_ringan: 'Umumnya tercapai di usia 1-2 bulan (Sumber: IDAI & Kemenkes).'
  },
  {
    id: 'm_1m_2',
    fase_usia: '1 bulan',
    kategori: 'motorik',
    deskripsi: 'Mulai mencoba menggerakkan kedua tangan dan kaki secara aktif dan refleks menggenggam erat.',
    konteks_ringan: 'Umumnya tercapai di usia 1 bulan.'
  },
  {
    id: 'm_3m_1',
    fase_usia: '3 bulan',
    kategori: 'motorik',
    deskripsi: 'Bisa mengangkat kepala tegak hingga 45 derajat ketika ditengkurapkan.',
    konteks_ringan: 'Umumnya tercapai di usia 2-3 bulan (Sumber: Kemenkes RI).'
  },
  {
    id: 'm_3m_2',
    fase_usia: '3 bulan',
    kategori: 'bahasa',
    deskripsi: 'Mulai mengeluarkan suara ooo / aaa (cooing) dan tersenyum ketika diajak berbicara.',
    konteks_ringan: 'Umumnya tercapai di usia 2-3 bulan.'
  },
  {
    id: 'm_3m_3',
    fase_usia: '3 bulan',
    kategori: 'sosial',
    deskripsi: 'Tersenyum secara spontan pada orang-orang di sekitarnya (social smile).',
    konteks_ringan: 'Umumnya tercapai di usia 2-3 bulan.'
  },
  {
    id: 'm_6m_1',
    fase_usia: '6 bulan',
    kategori: 'motorik',
    deskripsi: 'Bisa berguling secara mandiri dari posisi telungkup ke telentang atau sebaliknya.',
    konteks_ringan: 'Umumnya tercapai di usia 5-7 bulan.'
  },
  {
    id: 'm_6m_2',
    fase_usia: '6 bulan',
    kategori: 'bahasa',
    deskripsi: 'Mulai mengoceh satu suku kata tanpa arti yang jelas, seperti "da-da", "ma-ma".',
    konteks_ringan: 'Umumnya tercapai di usia 5-6 bulan.'
  },
  {
    id: 'm_6m_3',
    fase_usia: '6 bulan',
    kategori: 'motorik',
    deskripsi: 'Berusaha meraih mainan atau benda yang ada di jangkauannya dengan satu tangan.',
    konteks_ringan: 'Umumnya tercapai di usia 5-6 bulan.'
  },
  {
    id: 'm_9m_1',
    fase_usia: '9 bulan',
    kategori: 'motorik',
    deskripsi: 'Dapat duduk stabil tanpa disangga oleh bantal atau tangan orang tua.',
    konteks_ringan: 'Umumnya tercapai di usia 7-9 bulan (Sumber: WHO Standard).'
  },
  {
    id: 'm_9m_2',
    fase_usia: '9 bulan',
    kategori: 'sosial',
    deskripsi: 'Menunjukkan rasa takut atau cemas ketika didekati orang yang belum dikenal (stranger anxiety).',
    konteks_ringan: 'Umumnya tercapai di usia 8-10 bulan.'
  },
  {
    id: 'm_9m_3',
    fase_usia: '9 bulan',
    kategori: 'motorik',
    deskripsi: 'Mulai belajar merangkak untuk berpindah tempat atau meraih benda.',
    konteks_ringan: 'Umumnya tercapai di usia 8-10 bulan.'
  },
  {
    id: 'm_12m_1',
    fase_usia: '12 bulan',
    kategori: 'motorik',
    deskripsi: 'Mulai berdiri tegak tanpa bantuan selama beberapa detik atau berjalan berpegangan (cruising).',
    konteks_ringan: 'Umumnya tercapai di usia 11-13 bulan.'
  },
  {
    id: 'm_12m_2',
    fase_usia: '12 bulan',
    kategori: 'bahasa',
    deskripsi: 'Bisa mengucapkan 1 atau 2 kata yang memiliki arti spesifik (misal "mama", "baba", "mimi").',
    konteks_ringan: 'Umumnya tercapai di usia 11-13 bulan.'
  },
  {
    id: 'm_12m_3',
    fase_usia: '12 bulan',
    kategori: 'sosial',
    deskripsi: 'Bisa melambaikan tangan ("bye-bye") dan meniru tindakan sederhana seperti bertepuk tangan.',
    konteks_ringan: 'Umumnya tercapai di usia 10-12 bulan.'
  },
  {
    id: 'm_18m_1',
    fase_usia: '18 bulan',
    kategori: 'motorik',
    deskripsi: 'Berjalan dengan stabil secara mandiri, jarang terjatuh, dan bisa menarik mainan saat berjalan.',
    konteks_ringan: 'Umumnya tercapai di usia 15-18 bulan.'
  },
  {
    id: 'm_18m_2',
    fase_usia: '18 bulan',
    kategori: 'bahasa',
    deskripsi: 'Mampu mengucapkan setidaknya 6-10 kosakata yang dipahami artinya.',
    konteks_ringan: 'Umumnya tercapai di usia 16-18 bulan (Sumber: IDAI).'
  },
  {
    id: 'm_24m_1',
    fase_usia: '24 bulan',
    kategori: 'motorik',
    deskripsi: 'Bisa berlari kecil, menendang bola ke depan, dan naik-turun tangga dengan berpegangan.',
    konteks_ringan: 'Umumnya tercapai di usia 20-24 bulan.'
  },
  {
    id: 'm_24m_2',
    fase_usia: '24 bulan',
    kategori: 'bahasa',
    deskripsi: 'Menggabungkan minimal 2 kata menjadi kalimat sederhana (misal "minta mimi", "mau makan").',
    konteks_ringan: 'Umumnya tercapai di usia 22-24 bulan.'
  },
  {
    id: 'm_24m_3',
    fase_usia: '24 bulan',
    kategori: 'sosial',
    deskripsi: 'Mulai bermain bersama anak lain secara berdampingan (parallel play) dan meniru perilaku orang dewasa.',
    konteks_ringan: 'Umumnya tercapai di usia 24 bulan.'
  }
];

export const STATIC_VACCINES: VaccineItem[] = [
  {
    id: 'v_hb_0',
    nama: 'Hepatitis B (HB-0)',
    deskripsi: 'Mencegah penularan virus Hepatitis B yang dapat merusak hati semenjak lahir.',
    rekomendasi_usia_bulan: 0,
    sumber: 'IDAI 2023 & Kemenkes RI'
  },
  {
    id: 'v_bcg',
    nama: 'BCG',
    deskripsi: 'Mencegah penyakit TBC (Tuberkulosis) paru maupun TBC otak yang berbahaya bagi bayi.',
    rekomendasi_usia_bulan: 1,
    sumber: 'IDAI 2023 & Kemenkes RI'
  },
  {
    id: 'v_polio_1',
    nama: 'Polio Tetes 1 (OPV-1)',
    deskripsi: 'Mencegah penyakit polio yang dapat menyebabkan kelumpuhan layu permanen pada kaki/tangan.',
    rekomendasi_usia_bulan: 1,
    sumber: 'IDAI 2023'
  },
  {
    id: 'v_pentabio_1',
    nama: 'DPT-HB-Hib 1',
    deskripsi: 'Vaksin kombinasi mencegah Difteri, Pertusis (Batuk Rejan), Tetanus, Hepatitis B, dan meningitis/pneumonia akibat Hib.',
    rekomendasi_usia_bulan: 2,
    sumber: 'Kemenkes RI'
  },
  {
    id: 'v_polio_2',
    nama: 'Polio Tetes 2 (OPV-2)',
    deskripsi: 'Dosis kedua pelindung infeksi virus Polio.',
    rekomendasi_usia_bulan: 2,
    sumber: 'Kemenkes RI'
  },
  {
    id: 'v_pcv_1',
    nama: 'PCV 1',
    deskripsi: 'Mencegah infeksi bakteri Pneumokokus yang menyebabkan pneumonia (radang paru) dan meningitis.',
    rekomendasi_usia_bulan: 2,
    sumber: 'Kemenkes RI (Imunisasi Nasional)'
  },
  {
    id: 'v_pentabio_2',
    nama: 'DPT-HB-Hib 2',
    deskripsi: 'Dosis kedua vaksin kombinasi mencegah Difteri, Pertusis, Tetanus, Hepatitis B, dan Hib.',
    rekomendasi_usia_bulan: 3,
    sumber: 'Kemenkes RI'
  },
  {
    id: 'v_polio_3',
    nama: 'Polio Tetes 3 (OPV-3)',
    deskripsi: 'Dosis ketiga pelindung infeksi virus Polio.',
    rekomendasi_usia_bulan: 3,
    sumber: 'Kemenkes RI'
  },
  {
    id: 'v_pentabio_3',
    nama: 'DPT-HB-Hib 3',
    deskripsi: 'Dosis ketiga vaksin kombinasi untuk perlindungan prima jangka panjang.',
    rekomendasi_usia_bulan: 4,
    sumber: 'Kemenkes RI'
  },
  {
    id: 'v_polio_ipv',
    nama: 'Polio Suntik (IPV)',
    deskripsi: 'Vaksin Polio Inaktif suntikan wajib untuk memperkuat kekebalan tipe polio tertentu.',
    rekomendasi_usia_bulan: 4,
    sumber: 'Kemenkes RI'
  },
  {
    id: 'v_mr_1',
    nama: 'MR (Campak-Rubela) 1',
    deskripsi: 'Mencegah penularan virus Campak dan penyakit Sindrom Rubela Kongenital yang merusak organ.',
    rekomendasi_usia_bulan: 9,
    sumber: 'Kemenkes RI'
  },
  {
    id: 'v_pcv_2',
    nama: 'PCV 2',
    deskripsi: 'Dosis kedua perlindungan optimal bakteri Pneumokokus.',
    rekomendasi_usia_bulan: 12,
    sumber: 'Kemenkes RI'
  },
  {
    id: 'v_dpt_lanjutan',
    nama: 'DPT-HB-Hib Lanjutan',
    deskripsi: 'Dosis booster penguat kekebalan balita dari Difteri, Tetanus, Pertusis, Hep B, dan meningitis.',
    rekomendasi_usia_bulan: 18,
    sumber: 'Kemenkes RI'
  },
  {
    id: 'v_mr_lanjutan',
    nama: 'MR Lanjutan',
    deskripsi: 'Booster campak & rubela untuk mempertahankan perlindungan imun tubuh hingga usia sekolah.',
    rekomendasi_usia_bulan: 18,
    sumber: 'Kemenkes RI'
  }
];

export const STATIC_PRODUCTS: Product[] = [
  // Promil
  {
    id: 'p_promil_1',
    nama: 'Folavit 400 mcg - Suplemen Asam Folat Utama',
    kategori: 'promil',
    usia_target: 'Sedang Promil',
    link_affiliate: 'https://shopee.co.id/search?keyword=folavit%20400mcg',
    deskripsi_singkat: 'Suplemen asam folat penting dikonsumsi 2-3 bulan sebelum kehamilan untuk mencegah cacat tabung saraf janin.',
    harga_kisaran: 'Rp 12.000 - Rp 15.000 / strip',
    image_url: '💊',
    alasan_rekomendasi: 'Mengandung asam folat murni dengan dosis optimal untuk calon ibu demi mendukung awal pembelahan sel janin kelak.'
  },
  {
    id: 'p_promil_2',
    nama: 'Andalan LH Ovulation Test Kit - Isi 5 Strip',
    kategori: 'promil',
    usia_target: 'Sedang Promil',
    link_affiliate: 'https://shopee.co.id/search?keyword=andalan%20ovulation%20test',
    deskripsi_singkat: 'Alat deteksi masa subur cepat mendeteksi kenaikan hormon Luteinizing (LH) melalui urine dengan akurasi 99%.',
    harga_kisaran: 'Rp 18.000 - Rp 25.000',
    image_url: '📏',
    alasan_rekomendasi: 'Memudahkan penentuan jendela ovulasi subur tanpa perlu menebak-nebak siklus acak, krusial bagi keberhasilan pembuahan.'
  },
  {
    id: 'p_promil_3',
    nama: 'Termometer Basal Tubuh Digital Elvasense',
    kategori: 'promil',
    usia_target: 'Sedang Promil',
    link_affiliate: 'https://shopee.co.id/search?keyword=termometer%20basal%20tubuh',
    deskripsi_singkat: 'Termometer dengan akurasi tinggi (2 desimal di belakang koma) khusus mendeteksi lonjakan tipis suhu basal saat ovulasi.',
    harga_kisaran: 'Rp 75.000 - Rp 110.000',
    image_url: '🌡️',
    alasan_rekomendasi: 'Sangat disarankan untuk mencatat kurva BBT (Basal Body Temperature) guna konfirmasi alami bahwa ovulasi telah terjadi.'
  },

  // Kehamilan
  {
    id: 'p_hamil_1',
    nama: 'Susu Ibu Hamil Anmum Materna - Cokelat 400g',
    kategori: 'kehamilan',
    usia_target: 'Kehamilan Trimester 1-3',
    link_affiliate: 'https://shopee.co.id/search?keyword=anmum%20materna%20400g',
    deskripsi_singkat: 'Nutrisi makro dan mikro komplit tinggi kalsium, zat besi, asam folat, serta GA & DHA untuk kecerdasan janin sejak kandungan.',
    harga_kisaran: 'Rp 80.000 - Rp 95.000',
    image_url: '🥛',
    alasan_rekomendasi: 'Membantu mencukupi asupan gizi ibu hamil yang sering mual muntah di trimester pertama, rasanya enak dan tidak enek.'
  },
  {
    id: 'p_hamil_2',
    nama: 'Bantal Hamil Menyusui U-Shape Cotton Premium',
    kategori: 'kehamilan',
    usia_target: 'Kehamilan Trimester 2 & 3',
    link_affiliate: 'https://shopee.co.id/search?keyword=bantal%20hamil%20u-shape',
    deskripsi_singkat: 'Bantal khusus dengan penyangga empuk di sisi punggung, perut, dan kepala ibu hamil agar tidur menyamping nyaman tanpa pegal.',
    harga_kisaran: 'Rp 135.000 - Rp 190.000',
    image_url: '🛌',
    alasan_rekomendasi: 'Mengurangi beban tekanan perut di trimester akhir kehamilan, mencegah insomnia, dan menyehatkan sirkulasi darah plasenta.'
  },

  // Bayi 0-6 bulan
  {
    id: 'p_bayi_0_6_1',
    nama: 'Swaddle Bedong Bayi Instan Resleting Katun Bambu',
    kategori: 'bayi-0-6',
    usia_target: 'Bayi Usia 0-6 Bulan',
    link_affiliate: 'https://shopee.co.id/search?keyword=bedong%20bayi%20instan%20bambu',
    deskripsi_singkat: 'Bedong praktis dengan retsleting pelindung dagu, terbuat dari serat bambu organik super halus yang adem dan menyerap keringat.',
    harga_kisaran: 'Rp 45.000 - Rp 65.000',
    image_url: '👶',
    alasan_rekomendasi: 'Menenangkan refleks kaget (moro) pada bayi baru lahir agar dapat tidur nyenyak layaknya pelukan hangat ibu tanpa gerah.'
  },
  {
    id: 'p_bayi_0_6_2',
    nama: 'Minyak Telon Doodle Exclusive 100ml',
    kategori: 'bayi-0-6',
    usia_target: 'Bayi Usia 0-6 Bulan',
    link_affiliate: 'https://shopee.co.id/search?keyword=minyak%20telon%20doodle',
    deskripsi_singkat: 'Minyak telon premium dengan aroma greentea eksklusif, menghangatkan tubuh bayi, meredakan perut kembung, dan mencegah gigitan nyamuk.',
    harga_kisaran: 'Rp 39.000 - Rp 45.000',
    image_url: '🧴',
    alasan_rekomendasi: 'Aromanya modern menyegarkan tidak menyengat di hidung bayi, sangat ampuh menjaga suhu bayi setelah mandi sore.'
  },

  // Bayi 6-12 bulan
  {
    id: 'p_bayi_6_12_1',
    nama: 'Silicon MPASI Feeding Set (Mangkok + Sendok Sensor Suhu)',
    kategori: 'bayi-6-12',
    usia_target: 'Bayi Usia 6-12 Bulan',
    link_affiliate: 'https://shopee.co.id/search?keyword=silicone%20mpasi%20feeding%20set',
    deskripsi_singkat: 'Mangkok silikon BPA-Free anti-tumpah dengan lem hisap (suction) kuat di bawahnya, dilengkapi sendok fleksibel ramah gusi.',
    harga_kisaran: 'Rp 60.000 - Rp 85.000',
    image_url: '🥣',
    alasan_rekomendasi: 'Wajib dipunyai untuk melatih kemandirian bayi makan (self-feeding) tanpa takut piring dilempar atau makanan berserakan.'
  },
  {
    id: 'p_bayi_6_12_2',
    nama: 'Baby Food Chopper & Blender 4-in-1 Serbaguna',
    kategori: 'bayi-6-12',
    usia_target: 'Bayi Usia 6-12 Bulan',
    link_affiliate: 'https://shopee.co.id/search?keyword=baby%20food%20chopper',
    deskripsi_singkat: 'Alat penghalus makanan bayi dengan pisau stainless steel tajam untuk menghaluskan bubur saring (puree) maupun mencincang daging lembut.',
    harga_kisaran: 'Rp 140.000 - Rp 199.000',
    image_url: '⚡',
    alasan_rekomendasi: 'Sangat menghemat waktu mengolah aneka variasi protein dan sayur harian MPASI yang higienis di rumah.'
  },

  // Anak 1-2 tahun
  {
    id: 'p_anak_1_2_1',
    nama: 'Mainan Montessori Balok Kayu Geometri Edukatif',
    kategori: 'anak-1-2',
    usia_target: 'Anak Usia 1-2 Tahun',
    link_affiliate: 'https://shopee.co.id/search?keyword=mainan%20montessori%20balok%20kayu',
    deskripsi_singkat: 'Mainan kayu pinus ramah lingkungan, mengajarkan konsep bentuk geometri dasar, melatih koordinasi mata-tangan dan motorik halus.',
    harga_kisaran: 'Rp 35.000 - Rp 55.000',
    image_url: '🪵',
    alasan_rekomendasi: 'Mendukung tumbuh kembang motorik kognitif fase usia 1 tahun ke atas, bebas racun cat kimia (non-toxic paint).'
  },
  {
    id: 'p_anak_1_2_2',
    nama: 'Buku Seri Balita Pintar (Boardbook Tebal 10 Buku)',
    kategori: 'anak-1-2',
    usia_target: 'Anak Usia 1-2 Tahun',
    link_affiliate: 'https://shopee.co.id/search?keyword=boardbook%20seri%20balita%20pintar',
    deskripsi_singkat: 'Buku bacaan tebal anti-sobek berujung melengkung aman, melatih penguasaan kosakata dasar buah, hewan, warna, dan huruf.',
    harga_kisaran: 'Rp 80.000 - Rp 120.000',
    image_url: '📚',
    alasan_rekomendasi: 'Cocok sebagai stimulasi bahasa sebelum tidur, merangsang otak berbicara dan bonding erat antara orang tua dan si kecil.'
  }
];

export const STATIC_STORIES: Story[] = [
  {
    id: 's_1',
    judul: 'Kancil yang Cerdik dan Buaya Raksasa',
    bahasa: 'ID',
    is_free: true,
    harga_coin: 0,
    deskripsi_singkat: 'Kisah klasik petualangan Kancil pintar menyeberangi sungai penuh buaya lapar.',
    durasi_baca: '3 menit',
    tag_usia: '1-3 tahun',
    cover_color: 'from-emerald-400 to-teal-600',
    konten: [
      'Di sebuah hutan rimba yang sangat lebat dan asri, hiduplah seekor Kancil yang bertubuh kecil namun terkenal sangat cerdas. Semua binatang di hutan senang berteman dengannya karena dia selalu ramah dan suka menolong.',
      'Suatu hari, sang Kancil merasa sangat lapar. Ia berjalan menyisir pinggiran sungai dan melihat buah-buahan ranum yang lezat di seberang sungai. Wah, ada pohon apel, jambu, dan pisang matang bergelantungan! Air liur Kancil pun menetes karena sangat tergoda.',
      'Namun, masalahnya adalah sungai itu sangat lebar dan arusnya cukup deras. Lebih gawat lagi, sungai itu dihuni oleh kawanan buaya raksasa yang terkenal sangat lapar dan menyeramkan. Kancil memutar otaknya yang cerdas mencari cara yang aman untuk menyeberang.',
      'Tiba-tiba, Kancil berteriak keras ke arah sungai, "Hai buaya-buaya keluarlah! Raja Hutan menyuruhku membagikan daging segar untuk kalian semua! Aku ditugaskan menghitung jumlah kalian terlebih dahulu."',
      'Mendengar kata "daging segar", seketika seekor buaya paling besar muncul di permukaan air. "Benarkah kabar gembira itu, Kancil? Bagaimana kau akan menghitung kami?" tanya kepala buaya dengan penuh antusias.',
      '"Mudah sekali!" jawab Kancil sambil tersenyum lebar. "Berbarislah kalian dengan rapi dari tepi sungai sebelah sini hingga ke tepi seberang sana. Aku akan melompat di atas punggung kalian satu persatu sambil menghitung."',
      'Tanpa rasa curiga sedikit pun, buaya raksasa itu memanggil seluruh teman-temannya. Mereka berbaris rapat membentuk jembatan yang kokoh di atas air sungai yang deras.',
      'Kancil segera melompat ke punggung buaya pertama, "Satu!" teriaknya gembira. Ia melompat lagi, "Dua!", lalu melompat ke punggung berikutnya, "Tiga!". Terus berlanjut hingga akhirnya ia mendarat dengan selamat di seberang sungai.',
      'Sambil tertawa kecil, Kancil berbalik arah dan melambaikan tangannya kepada para buaya. "Terima kasih banyak, buaya-buaya yang baik! Berkat kalian, aku bisa menyeberang tanpa basah kuyup. Dan maaf, sebenarnya Raja Hutan tidak mengirimkan daging apa pun hari ini!"',
      'Para buaya terkejut dan marah karena merasa ditipu oleh Kancil yang cerdik. Namun, Kancil sudah melesat masuk ke dalam rimbunan pohon hutan sambil menikmati buah-buahan manis dengan gembira. Dari kisah ini, anak diajarkan untuk bersikap cerdas dalam menyelesaikan masalah sulit.'
    ]
  },
  {
    id: 's_2',
    judul: 'The Brave Little Star / Bintang Kecil yang Berani',
    bahasa: 'EN',
    is_free: true,
    harga_coin: 0,
    deskripsi_singkat: 'The magical journey of Sparky, a little star who was afraid of shining alone in the vast night sky.',
    durasi_baca: '4 menit',
    tag_usia: '0-2 tahun',
    cover_color: 'from-indigo-500 to-purple-700',
    konten: [
      'High up in the silent, deep blue cosmos, there lived a tiny star named Sparky. While all the other older stars loved to twinkle brightly and show off their grand light, Sparky was very shy and kept his light small and warm.',
      '"What if the night sky is too dark and scary?" Sparky thought, wrapping himself in a blanket of soft gray clouds. He was afraid of being noticed, and he was afraid that his tiny light wouldn’t make any difference at all.',
      'One night, a heavy storm rolled in over the earth below. Thick, heavy dark clouds covered the entire horizon, hiding the moon and all the big stars. The people on earth couldn’t see anything, and a little girl named Lily was crying in her bedroom because she was afraid of the complete darkness.',
      'Sparky heard Lily’s soft cry from far away in space. "Oh no, a child is scared. I must do something!" he said, feeling a surge of courage in his warm heart.',
      'He squeezed himself through a small opening in the heavy storm clouds. He concentrated with all his energy and blew: "Fwooo!". Suddenly, his tiny body sparkled with a beautiful, pure silver-gold light, piercing through the dark sky like a small lantern.',
      'Down on earth, Lily looked out her window and saw Sparky shining bravely. "Look, mother! A brave little star is watching over me!" Lily whispered, wiping away her tears. She smiled warmly and slept peacefully under Sparky\'s watchful glow.',
      'Sparky felt incredibly happy and warm inside. He realized that no matter how small you are, your light can bring comfort and courage to someone in need. From that night on, Sparky never hid behind the clouds again, shining happily as the bravest little star in the cosmos.'
    ]
  },
  {
    id: 's_3',
    judul: 'Petualangan Si Rintik Hujan yang Ceria',
    bahasa: 'ID',
    is_free: true,
    harga_coin: 0,
    deskripsi_singkat: 'Perjalanan ajaib rintik hujan bernama Riki dari awan lembut turun menyuburkan kebun bunga.',
    durasi_baca: '3 menit',
    tag_usia: '1-3 tahun',
    cover_color: 'from-blue-400 to-sky-600',
    konten: [
      'Di sebuah awan putih berbulu halus yang melayang santai di langit biru, hiduplah sekumpulan rintik air. Salah satu rintik air yang paling ceria dan bersemangat bernama Riki. Riki selalu bermimpi tentang petualangan turun ke bumi.',
      '"Ayo bersiap, teman-teman! Hari ini bumi sangat kering, kita harus turun memberi kesegaran!" seru Ibu Awan dengan senyuman lembut.',
      'Seketika, awan berubah warna menjadi abu-abu hangat, dan angin sepoi-sepoi mulai bertiup kencang. Riki melompat gembira sambil meluncur bebas di udara, "Wuuush! Ini luar biasa!" teriaknya sambil menari bersama jutaan rintik air lainnya.',
      'Riki meluncur turun melewati barisan pegunungan hijau, menembus kabut pagi yang sejuk, dan akhirnya mendarat lembut di atas kelopak bunga mawar merah yang tampak layu di sebuah kebun halaman rumah.',
      '"Ah, terima kasih, Riki!" bisik sang Mawar Merah sambil merentangkan daunnya dengan gembira. "Aku sangat haus, kesegaranmu membuatku bertenaga kembali untuk mekar indah."',
      'Riki tersenyum bangga. Ia mengalir pelan ke tanah, menyuburkan akar-akar tanaman tomat, merayap masuk ke selokan kecil, dan mengalir menuju sungai bersih tempat anak-anak bermain perahu kertas.',
      'Ketika sore tiba dan matahari kembali bersinar hangat, tubuh Riki perlahan-lahan menguap, terangkat kembali ke langit membentuk awan putih yang baru. Riki sangat bahagia karena petualangannya hari itu berguna bagi kehidupan di bumi. Ia tak sabar menunggu petualangan hujan berikutnya!'
    ]
  },

  // Premium Stories (Locked by default, cost 5 coins)
  {
    id: 's_4',
    judul: 'Semut yang Gigih dan Belalang Pemalas',
    bahasa: 'ID',
    is_free: false,
    harga_coin: 5,
    deskripsi_singkat: 'Belajar arti kerja keras dan persiapan masa depan bersama koloni semut pekerja.',
    durasi_baca: '4 menit',
    tag_usia: '2-4 tahun',
    cover_color: 'from-amber-500 to-amber-700',
    konten: [
      'Pada musim panas yang hangat di sebuah padang rumput hijau, seekor belalang sedang bersantai sambil bernyanyi riang dan memainkan biolanya. Ia merasa hidup ini sangat sempurna tanpa perlu mengkhawatirkan hari esok.',
      'Di dekatnya, terlihat rombongan semut kecil berjalan dengan susah payah memikul biji jagung dan buah kering yang berat menuju sarang bawah tanah mereka. Mereka tampak berkeringat namun tetap bersemangat.',
      '"Hei, Semut! Kenapa kalian bekerja keras dalam hari seindah ini? Ayo bernyanyi bersamaku!" ajak Belalang sambil tertawa mengejek.',
      '"Kami sedang mengumpulkan makanan untuk cadangan di musim dingin nanti, Belalang," jawab semut pemimpin dengan santun. "Kami menyarankanmu juga melakukan hal yang sama sebelum badai salju tiba."',
      '"Ah, musim dingin masih sangat lama! Masih banyak makanan hari ini, jangan merusak kesenanganku," sahut Belalang acuh tak acuh dan kembali memetik biolanya.',
      'Waktu pun berlalu cepat. Angin dingin mulai bertiup kencang menggugurkan dedaunan hijau, digantikan tumpukan salju tebal yang membekukan seluruh padang rumput. Belalang tidak bisa menemukan satu pun daun atau rumput untuk dimakan.',
      'Tubuh Belalang menggigil kedinginan dan kelaparan hebat. Dengan lemas ia berjalan ke rumah Semut. Melalui celah jendela, ia melihat keluarga semut hidup nyaman dalam kehangatan sambil menikmati makanan lezat melimpah.',
      'Belalang mengetuk pintu dengan malu, memohon bantuan makanan. Semut yang berhati mulia akhirnya membuka pintu dan membagikan sup hangat kepadanya. Belalang menyesali kemalasannya dan berjanji akan bekerja keras di musim panas berikutnya.'
    ]
  },
  {
    id: 's_5',
    judul: 'The Rabbit’s Sweet Dream / Mimpi Indah Kelinci Kecil',
    bahasa: 'EN',
    is_free: false,
    harga_coin: 5,
    deskripsi_singkat: 'An interactive bedtime story filled with calming imagery designed to help children sleep.',
    durasi_baca: '3 menit',
    tag_usia: '0-3 tahun',
    cover_color: 'from-pink-400 to-rose-600',
    konten: [
      'The sun had slowly dipped below the soft hills, leaving a warm pink and orange glow in the evening sky. Inside a cozy burrow made of soft grass, a little fluffy white rabbit named Cotton was yawning.',
      'Her mother gently tucked her in with a blanket of fresh green clover leaves. "It is time to rest your long ears and bouncy legs, little Cotton," Mother Rabbit whispered, kissing her forehead.',
      'Cotton closed her big eyes. She imagined herself walking into a magical field where the grass was made of green velvet and the trees grew sweet, giant carrots that tasted like honey candy.',
      'In her dream, the gentle night wind sang a soft lullaby: "Shhh... sleep tight, little bunny, sleep tight." The stars in the sky danced around her like friendly fireflies, keeping her warm and safe.',
      'Her fluffy white tail twitched happily as she dreamed of chasing golden butterflies across the calm rainbow hills. Cotton slept so deeply, knowing she was loved and safe in her home. Good night, little Cotton, sweet dreams!'
    ]
  },
  {
    id: 's_6',
    judul: 'Petualangan Layang-Layang Merah di Atas Awan',
    bahasa: 'ID',
    is_free: false,
    harga_coin: 5,
    deskripsi_singkat: 'Kisah keberanian melayang tinggi mengejar impian bersama Layang-Layang Merah.',
    durasi_baca: '3 menit',
    tag_usia: '1-3 tahun',
    cover_color: 'from-red-400 to-orange-600',
    konten: [
      'Di sudut sebuah toko mainan kayu kecil, terdapat sebuah layang-layang berwarna merah terang dengan ekor kuning panjang yang cantik. Namanya adalah Redi. Redi selalu bermimpi ingin melayang tinggi menyentuh awan di langit luas.',
      'Suatu sore yang cerah bertiup angin sepoi-sepoi, seorang anak laki-laki membelinya dan membawanya ke lapangan rumput luas. Redi merasa jantungnya berdebar kencang saat tali benangnya mulai diulur.',
      '"Ayo terbang tinggi, Redi! Jangan takut pada hembusan angin!" bisik seutas benang katun yang menahannya dengan erat.',
      'Dengan satu hentakan kuat dari larian anak itu, Redi melesat naik ke angkasa. Semakin lama ia semakin tinggi, melampaui puncak pohon kelapa, melewati atap gedung-gedung kota, hingga akhirnya sejajar dengan awan putih yang berjalan lambat.',
      'Dari atas sana, Redi melihat bumi tampak sangat kecil dan indah. Sawah-sawah terlihat seperti karpet hijau yang rapi, dan mobil-mobil tampak seperti mainan semut yang lucu.',
      'Meskipun sempat bergoyang diterpa angin badai mendadak, Redi tetap menyeimbangkan tubuhnya dengan berani dibantu oleh kendali benang anak di bawah. Redi membuktikan bahwa dengan keberanian dan ikatan persahabatan, kita bisa terbang tinggi meraih impian kita.'
    ]
  }
];
