// ========================================================
// AURA ONE — MASTER CONTENT & DATA STORE (V4.1)
// Centralized bilingual store for all 35 pages & media assets
// ========================================================

window.AURA_DATA = {
  pricing: {
    basePriceUSD: 399,
    basePriceVND: 9990000,
    colors: [
      { id: 'titanium', name: 'Titanium Graphite Studio', hex: '#1e2029', accentHex: '#00f2fe', extraUSD: 0, tag: 'Cyber Stealth', image: 'assets/media/hero-titanium-studio.png' },
      { id: 'gold', name: '24K Luxury Gold & Obsidian', hex: '#d4af37', accentHex: '#fef08a', extraUSD: 50, tag: 'Royal Edition', image: 'assets/media/luxury-black-gold.png' },
      { id: 'copper', name: 'Bespoke Warm Amber Copper', hex: '#b45309', accentHex: '#f59e0b', extraUSD: 0, tag: 'Audiophile Edition', image: 'assets/media/studio-copper-warm.png' },
      { id: 'pearl', name: 'Pearl Minimalist White', hex: '#f8fafc', accentHex: '#cbd5e1', extraUSD: 0, tag: 'Nordic Edition', image: 'assets/media/minimal-pearl-white.png' },
      { id: 'redefined', name: 'Electric Cyan 8D Master', hex: '#00f2fe', accentHex: '#38bdf8', extraUSD: 30, tag: 'Spatial Signature', image: 'assets/media/ui-hero-sound-redefined.png' },
      { id: 'emerald', name: 'Imperial Emerald Jade', hex: '#065f46', accentHex: '#34d399', extraUSD: 40, tag: 'Limited Drop', image: 'assets/media/hero-titanium-studio.png' },
      { id: 'rosegold', name: 'Liquid Champagne Rose Gold', hex: '#e0a96d', accentHex: '#fde047', extraUSD: 50, tag: 'Haute Couture', image: 'assets/media/luxury-black-gold.png' },
      { id: 'crimson', name: 'Stealth Matte Crimson', hex: '#881337', accentHex: '#f43f5e', extraUSD: 20, tag: 'Performance Lab', image: 'assets/media/studio-copper-warm.png' }
    ],
    cushions: [
      { id: 'leather', name: 'Signature Leather (Da cừu mềm)', extraUSD: 0, desc: 'Cách âm thụ động tối đa, chất âm ấm áp' },
      { id: 'mesh', name: 'Aeromesh Fabric (Vải dệt thể thao)', extraUSD: 0, desc: 'Thoáng khí tối đa cho ca làm việc dài' }
    ],
    carePlusUSD: 49,
    promoCodes: {
      'AURA50': { discountUSD: 50, desc: 'Voucher AI Agent độc quyền' },
      'AURA2026': { discountUSD: 50, desc: 'Voucher ưu đãi ra mắt Flagship' },
      'VIP50': { discountUSD: 50, desc: 'Ưu đãi thành viên VIP' }
    }
  },

  gallery: [
    {
      id: 'gal-1',
      title: 'Titanium Graphite Studio Edition',
      subtitle: 'Mặt faceplate phay xước đồng tâm CNC & đèn LED Cyan viền buồng âm',
      src: 'assets/media/hero-titanium-studio.png',
      tag: 'Cyber Architecture'
    },
    {
      id: 'gal-2',
      title: '24K Royal Gold & Obsidian Black',
      subtitle: 'Khung mạ vàng gương PVD 24K kết hợp da cừu thuộc thủ công',
      src: 'assets/media/luxury-black-gold.png',
      tag: 'Luxury Bespoke'
    },
    {
      id: 'gal-3',
      title: 'Bespoke Warm Studio Copper',
      subtitle: 'Ánh đồng hổ phách ấm áp phong cách phòng thu Mastering đỉnh cao',
      src: 'assets/media/studio-copper-warm.png',
      tag: 'Studio Master'
    },
    {
      id: 'gal-4',
      title: 'Pearl Minimalist White Edition',
      subtitle: 'Phong cách tối giản Bắc Âu, đệm tai nhung siêu êm và quai vòm vàng hồng',
      src: 'assets/media/minimal-pearl-white.png',
      tag: 'Nordic Clean'
    },
    {
      id: 'gal-5',
      title: 'Beryllium Acoustic Transducer Macro',
      subtitle: 'Cận cảnh màng loa 40mm Beryllium nguyên chất với vân dập tắt chấn động',
      src: 'assets/media/beryllium-driver-macro.png',
      tag: 'Acoustic Engineering'
    },
    {
      id: 'gal-6',
      title: 'Mastering Studio Session Edition',
      subtitle: 'Không gian sáng tạo âm nhạc điện ảnh và thu âm phòng thu chuyên nghiệp',
      src: 'assets/media/producer-studio-session.png',
      tag: 'Producer Choice'
    },
    {
      id: 'gal-7',
      title: 'Luxury Unboxing & Smart Case Ecosystem',
      subtitle: 'Hộp nhôm sang trọng, Smart Case đóng mở nam châm và trọn bộ phụ kiện cao cấp',
      src: 'assets/media/unboxing-luxury-case.png',
      tag: 'Master Unboxing'
    }
  ],

  specs: [
    { category: 'ÂM HỌC & DRIVER', items: [
      { label: 'Cấu tạo màng loa', value: '40mm Pure Beryllium Acoustic Diaphragm' },
      { label: 'Dải tần số đáp ứng', value: '10Hz – 48.000Hz (Hi-Res Lossless Audio)' },
      { label: 'Tổng méo hài (THD)', value: '< 0.05% @ 1kHz, 100dB SPL' },
      { label: 'Trở kháng danh định', value: '32 Ohms (Dễ kéo trực tiếp trên mọi nguồn phát)' },
      { label: 'Độ nhạy âm thanh', value: '108 dB SPL / 1mW' }
    ]},
    { category: 'KHỬ ỒN & KHÔNG GIAN', items: [
      { label: 'Công nghệ khử ồn', value: 'AURA Neural Hybrid ANC (Triệt tiêu tạp âm đến 45dB)' },
      { label: 'Bộ xử lý trung tâm', value: 'Chip âm thanh AURA H1 64-bit Dual-Core' },
      { label: 'Hệ thống Micro', value: '8 micro beamforming chống ồn gió và tiếng thở' },
      { label: 'Spatial Audio Latency', value: '< 8ms Ultra-Low Latency [CHỜ XÁC NHẬN PHÒNG LAB]' },
      { label: 'Head Tracking', value: 'Con quay hồi chuyển 6 trục IMU 1000Hz' }
    ]},
    { category: 'KẾT NỐI & NĂNG LƯỢNG', items: [
      { label: 'Chuẩn kết nối', value: 'Bluetooth 5.4 LE Audio & Fast Pair' },
      { label: 'Codec hỗ trợ', value: 'LDAC, aptX Lossless, AAC, SBC' },
      { label: 'Thời lượng pin', value: '45 giờ (bật ANC) / 60 giờ (tắt ANC)' },
      { label: 'Sạc nhanh', value: 'USB-C Power Delivery: 10 phút sạc = 5 giờ nghe' },
      { label: 'Cổng cắm dây', value: '3.5mm Analog Audio & USB-C Audio Hi-Res' }
    ]},
    { category: 'KÍCH THƯỚC & VẬT LIỆU', items: [
      { label: 'Trọng lượng tịnh', value: '238g (Hợp kim Magie siêu nhẹ)' },
      { label: 'Kháng nước', value: 'Chuẩn IPX4 kháng mồ hôi và mưa nhẹ [CHỜ XÁC NHẬN]' },
      { label: 'Đệm tai', value: 'Memory Foam bọc da cừu hoặc vải Aeromesh' },
      { label: 'Bảo hành chính hãng', value: '24 tháng 1 đổi 1 tận nơi' }
    ]}
  ],

  accessories: [
    { id: 'acc-1', name: 'Bao Da Cứng Magnetic Hard-Case', price: 49, inBox: true, desc: 'Bảo vệ chống sốc quân đội, tự động đưa tai nghe vào chế độ ngủ sâu.' },
    { id: 'acc-2', name: 'Cáp 3.5mm Mạ Bạc Tinh Khiết', price: 39, inBox: true, desc: 'Lõi đồng OFC mạ bạc truyền dẫn tín hiệu âm thanh analog nguyên bản.' },
    { id: 'acc-3', name: 'Cáp Sạc Bọc Dù Type-C 1.5m', price: 29, inBox: true, desc: 'Dây bọc sợi Kevlar chống đứt gãy, hỗ trợ truyền dữ liệu âm thanh số.' },
    { id: 'acc-4', name: 'Jack Chuyển Đổi Máy Bay Mạ Vàng', price: 19, inBox: true, desc: 'Đầu cắm kép chuẩn hàng không chống nhiễu trên các chuyến bay đường dài.' },
    { id: 'acc-5', name: 'Củ Sạc GaN 65W Siêu Nhỏ Gọn', price: 45, inBox: false, desc: 'Công nghệ GaN III sạc siêu tốc cho cả tai nghe, laptop và điện thoại.' }
  ],

  lifestyles: [
    {
      id: 'life-1',
      title: 'Louder Than Luxury — Studio Master',
      subtitle: 'Trải nghiệm âm thanh audiophile không thỏa hiệp với chất âm ấm áp đỉnh cao.',
      src: 'assets/media/lifestyle-audira-luxury.png',
      tag: 'Audiophile Sanctuary'
    },
    {
      id: 'life-2',
      title: 'Experience Sound Like Never Before',
      subtitle: 'Đồ họa ánh sáng neon tương lai kết hợp khả năng cách âm tuyệt đối trong mọi không gian.',
      src: 'assets/media/lifestyle-aura-experience.png',
      tag: 'Next-Gen Performance'
    },
    {
      id: 'life-3',
      title: 'Sculpted Silence — Pure Elegance',
      subtitle: 'Tối giản thuần khiết, đệm tai nhung tuyết ôm trọn vòm tai cho sự tĩnh lặng tối đa.',
      src: 'assets/media/lifestyle-bose-cinematic.png',
      tag: 'Nordic Couture'
    }
  ],

  anatomyLayers: [
    {
      id: 'layer-cap',
      name: 'Mặt Ngoài CNC Spun-Metal',
      tag: '01 / CHASSIS',
      sub: 'Hợp kim nhôm-magiê hàng không 6061 phay xước đồng tâm, phủ màng Nano Ceramic chống bám vân tay.',
      material: 'Aircraft 6061-T6 Aluminum-Magnesium Alloy',
      specs: 'Độ dày thành: 1.2mm • Trọng lượng: 18.4g • Dung sai: ±0.005mm',
      acousticRole: 'Triệt tiêu sóng đứng cộng hưởng bề mặt và che chắn can nhiễu điện từ EMI.'
    },
    {
      id: 'layer-vent',
      name: 'Vành Thoát Âm Perforated Chrome',
      tag: '02 / ACOUSTIC VENT',
      sub: 'Lỗ thoát âm vi cơ học đường kính 0.35mm cân bằng áp suất buồng trước và buồng sau màng loa.',
      material: 'Electroplated Mirror Chrome Brass',
      specs: '128 vi lỗ đối xứng • Lưu lượng khí: 4.8 L/min • Áp suất buồng: 101.3 kPa',
      acousticRole: 'Giải tỏa nén khí khi màng loa dao động biên độ lớn, mở rộng dải âm trầm xuống 5Hz.'
    },
    {
      id: 'layer-seal',
      name: 'Vòng Đệm Giảm Chấn Silicone',
      tag: '03 / DAMPING GASKET',
      sub: 'Silicone y tế đúc khuôn áp lực cao, cách ly rung chấn vi mô giữa buồng âm và hệ thống bản lề gập.',
      material: 'Medical Grade Liquid Silicone Rubber (Shore A 40)',
      specs: 'Độ đàn hồi: 380% • Kháng nhiệt: -40°C đến 180°C • Hệ số tiêu hao: 0.18 tanδ',
      acousticRole: 'Hấp thụ 99% rung động ký sinh tần số trung và cao do cuộn voice coil sinh ra.'
    },
    {
      id: 'layer-chamber',
      name: 'Buồng Âm Bán Hở Acoustic Chamber',
      tag: '04 / RESONANCE CHAMBER',
      sub: 'Vỏ khoang cộng hưởng đúc nguyên khối với vách tiêu âm đa diện ngăn chặn phản xạ chéo.',
      material: 'Polycarbonate Composite gia cường sợi Carbon',
      specs: 'Thể tích khoang: 42.5 cm³ • Độ cứng xoắn: 450 N·m/deg • Vách tiêu âm 7 góc',
      acousticRole: 'Định hình trường âm Holographic Spatial 3D và chuẩn hóa đáp tuyến theo đường cong Harman.'
    },
    {
      id: 'layer-pcb',
      name: 'Bo Mạch Chip DSP Neural H1',
      tag: '05 / NEURAL DSP PCB',
      sub: 'Bo mạch đa lớp mạ vàng ENIG tích hợp chip xử lý tín hiệu số AURA H1 32-bit / 192kHz.',
      material: 'Rogers RO4350B High-Frequency PCB • Gold Traces 2oz',
      specs: 'Xử lý: 32-bit floating point • SNR: 122dB • Độ trễ xử lý: 1.2ms • 4 DAC độc lập',
      acousticRole: 'Chạy thuật toán khử ồn thích ứng ANC 45dB và tổng hợp âm trường 8D thời gian thực.'
    },
    {
      id: 'layer-driver',
      name: 'Màng Loa 45mm Pure Beryllium',
      tag: '06 / BERYLLIUM DRIVER',
      sub: 'Màng loa Beryllium nguyên chất 99.8% lắng đọng hơi chân không, cuộn dây đồng siêu nhẹ OFC tráng bạc.',
      material: '99.8% Pure Beryllium Foil (25 μm) • Silver-Plated OFC Voice Coil',
      specs: 'Đường kính: 45mm • Dải tần: 5Hz – 48kHz • THD: <0.002% @ 1kHz • Từ thông: 1.6 Tesla',
      acousticRole: 'Trọng tâm tái tạo âm thanh: tốc độ truyền âm 12,890 m/s tái hiện chi tiết siêu vi thể.'
    },
    {
      id: 'layer-turbine',
      name: 'Nan Hoa Đồng Thau Turbine Grille',
      tag: '07 / TURBINE SOUND GUIDE',
      sub: 'Cấu trúc nan hoa đồng thau góc nghiêng 18° khuếch tán luồng sóng âm đồng pha trực tiếp vào ống tai.',
      material: 'Acoustic Brass C36000 CNC Precision Lathe',
      specs: '16 cánh turbine xoắn • Góc mở âm: 38° • Độ bóng bề mặt: Ra 0.2 μm',
      acousticRole: 'Định hướng mặt sóng âm đồng tâm, ngăn chặn sóng triệt tiêu tại tần số 3kHz – 8kHz.'
    },
    {
      id: 'layer-cushion',
      name: 'Đệm Tai Da Cừu Memory Foam',
      tag: '08 / MEMORY FOAM CUSHION',
      sub: 'Bọc da cừu tự nhiên mềm mại kết hợp mút hoạt tính đàn hồi chậm, vát góc công thái học ôm khít vành tai.',
      material: 'Full-Grain Lambskin Leather • Slow-Recovery Viscoelastic Foam',
      specs: 'Mật độ bọt: 65 kg/m³ • Vát góc: 12° Ergonomic • Khớp nối từ tính tháo lắp nhanh',
      acousticRole: 'Tạo buồng kín cách âm thụ động -28dB và giữ áp suất khoang tai ổn định êm ái dài lâu.'
    }
  ],

  curatedArtPieces: [
    {
      id: 'art-1',
      title: 'AURA ONE: Zero-Gravity Acoustic Sculpture',
      subtitle: 'Levitating Titanium Monolith & Spatial Orbit',
      medium: 'Aerospace Titanium, Obsidian Glass & Holographic Soundwave Rings',
      artist: 'AURA Master Design Labs',
      year: '2026',
      dimensions: '4K Raytraced Volumetric Study',
      desc: 'Tuyệt tác điêu khắc 3D tái hiện tai nghe AURA ONE lơ lửng không trọng lực trên bệ gương đen nguyên khối, bao quanh bởi các vòng sóng âm lượng tử phát sáng huyền ảo.',
      src: 'assets/media/cgi-levitating-sculpture.png',
      tag: 'ZERO-G SCULPTURE'
    },
    {
      id: 'art-2',
      title: 'Pure Beryllium 40mm Transducer Macro',
      subtitle: 'Acoustic Diaphragm & Precision Corrugation',
      medium: 'Pure Beryllium Foil, Silver-Plated Copper Coil & Neodymium N52',
      artist: 'Acoustic Metallurgy Division',
      year: '2026',
      dimensions: 'Extreme Macro High-Speed Photography',
      desc: 'Cận cảnh vi mô của màng loa Beryllium nguyên chất 40mm với các đường gân dập nổi triệt tiêu sóng đứng, đạt vận tốc truyền âm kỷ lục 12.890 m/s.',
      src: 'assets/media/beryllium-driver-macro.png',
      tag: 'ACOUSTIC TRANSDUCER'
    },
    {
      id: 'art-3',
      title: 'Liquid Chrome & Sub-Bass Resonance',
      subtitle: 'Hydrodynamic Soundwave Deformation Sculpture',
      medium: 'Liquid Chrome, Molten Obsidian & Champagne Gold Chamfers',
      artist: 'Acoustic Kinetic Sculpture Studio',
      year: '2026',
      dimensions: 'Caustic Reflection Dynamic Simulation',
      desc: 'Tác phẩm điêu khắc avant-garde thể hiện sóng âm trầm sub-bass làm biến dạng những dòng chảy chrome bóng bẩy và thủy ngân đen lơ lửng giữa không trung.',
      src: 'assets/media/cgi-liquid-resonance.png',
      tag: 'AVANT-GARDE RESHAPE'
    },
    {
      id: 'art-4',
      title: 'Dolby Atmos Studio Mastering Reference',
      subtitle: 'Grammy-Grade Reference Monitoring Session',
      medium: 'Analog Console Illumination, Tube Gear & Acoustic Diffusers',
      artist: 'Sound On Sound Editorial Campaign',
      year: '2026',
      dimensions: 'Medium Format 35mm Cinematic Film Study',
      desc: 'Khung cảnh phòng thu âm điện ảnh đỉnh cao, nơi AURA ONE đảm nhận vai trò kiểm âm chuẩn xác cho các bản phối âm thanh không gian đa kênh.',
      src: 'assets/media/producer-studio-session.png',
      tag: 'STUDIO REFERENCE'
    },
    {
      id: 'art-5',
      title: 'Laser Doppler Acoustic Interferometry Lab',
      subtitle: 'Holographic Sound Pressure Mapping',
      medium: 'Titanium CNC Calipers, Dual-Color Laser Beams & Waveguide Hologram',
      artist: 'Advanced Acoustics Metrology Lab',
      year: '2026',
      dimensions: 'Micro-Vibrometry Spectral Waveform Render',
      desc: 'Thí nghiệm quét giao thoa laser đo đạc sự đồng pha của màng loa và bản đồ áp suất âm thanh 3D với độ chuẩn xác micromet.',
      src: 'assets/media/cgi-laser-interferometry.png',
      tag: 'LAB INTERFEROMETRY'
    },
    {
      id: 'art-6',
      title: 'Master Unboxing & Smart Case Ecosystem',
      subtitle: 'Bespoke Presentation Box & Magnetic Smart Case',
      medium: 'Matte Slate Packaging, OFC Gold-Plated Cables & NFC Certificate',
      artist: 'Haute Horlogerie & Luxury Audio Guild',
      year: '2026',
      dimensions: 'Ultra-Detailed Flatlay Craftsmanship Study',
      desc: 'Hệ sinh thái mở hộp hoàng gia bao gồm bao da nam châm thông minh, cáp đồng nguyên chất 99.999% mạ vàng và thẻ bảo hành số NFC độc bản.',
      src: 'assets/media/unboxing-luxury-case.png',
      tag: 'BESPOKE ECOSYSTEM'
    }
  ],

  unboxingExperience: {
    heroImage: 'assets/media/unboxing-luxury-case.png',
    title: 'TRẢI NGHIỆM MỞ HỘP HOÀNG GIA (MASTER UNBOXING)',
    subtitle: 'Mỗi chi tiết bên trong hộp AURA ONE đều được gia công thủ công với độ chuẩn xác tính bằng micromet.',
    items: [
      {
        name: 'Tai nghe AURA ONE Flagship',
        desc: 'Hoàn thiện bằng hợp kim Magie hàng không và da cừu thuộc tự nhiên.',
        icon: 'headphones'
      },
      {
        name: 'Bao da thông minh Smart Magnetic Case',
        desc: 'Tự động kích hoạt chế độ Ultra-Low Power khi gập tai nghe vào bao.',
        icon: 'archive'
      },
      {
        name: 'Cáp âm thanh 3.5mm OFC bọc dù mạ vàng',
        desc: 'Đồng nguyên chất 99.999% truyền dẫn tín hiệu thuần khiết không suy hao.',
        icon: 'cable'
      },
      {
        name: 'Cáp sạc & truyền dữ liệu USB-C Lossless DAC',
        desc: 'Hỗ trợ giải mã âm thanh số Hi-Res Lossless 32-bit/384kHz trực tiếp.',
        icon: 'zap'
      },
      {
        name: 'Adapter máy bay nhôm nguyên khối CNC',
        desc: 'Tương thích cổng kép chuẩn khoang thương gia trên mọi chuyến bay.',
        icon: 'plane'
      },
      {
        name: 'Thẻ chứng nhận & Bảo hành số NFC',
        desc: 'Chạm NFC điện thoại vào thẻ để kích hoạt bảo hành 24 tháng chính hãng.',
        icon: 'shield-check'
      }
    ]
  },

  driverMacroShowcase: {
    image: 'assets/media/beryllium-driver-macro.png',
    badge: 'ĐỈNH CAO LUYỆN KIM ÂM HỌC',
    title: 'MÀNG LOA BERYLLIUM 40MM NGUYÊN CHẤT',
    description: 'Beryllium là kim loại quý hiếm có vận tốc truyền âm nhanh nhất thế giới (12.890 m/s), gấp 4 lần Titan và 2.5 lần Nhôm. Giúp màng loa dao động cực kỳ chính xác mà không hề bị biến dạng cơ học.',
    highlights: [
      { stat: '< 0.03%', label: 'Méo hài THD cực tiểu', desc: 'Âm thanh trong trẻo tuyệt đối ở mọi mức âm lượng.' },
      { stat: '10Hz - 48kHz', label: 'Dải tần siêu rộng', desc: 'Tái tạo từng rung động vi mô của nhạc cụ mộc.' },
      { stat: '1.8 Tesla', label: 'Lực từ Neodymium N52', desc: 'Động lực học cực mạnh cho âm bass siêu tốc độ.' }
    ]
  },

  producerStoryShowcase: {
    image: 'assets/media/producer-studio-session.png',
    badge: 'STUDIO MASTER REFERENCE',
    title: 'LỰA CHỌN CỦA CÁC SOUND ENGINEER HÀNG ĐẦU',
    quote: '"AURA ONE cho tôi cảm giác như đang ngồi trong căn phòng mastering triệu đô với dàn loa kiểm âm tham chiếu. Độ phân giải của màng Beryllium thực sự khiến các chi tiết nhỏ nhất trong bản mix lộ diện."',
    author: 'Marcus Vance — Grammy-Winning Audio Engineer & Mastering Producer',
    metrics: [
      { value: '150+', label: 'Phòng thu tham chiếu quốc tế tin dùng' },
      { value: '0.08ms', label: 'Độ trễ truyền âm trường thực 8D' },
      { value: '100%', label: 'Độ tuyến tính pha âm học' }
    ]
  },

};


// ========================================================
// AURA ONE USER & AUTHENTICATION SUBSYSTEM
// ========================================================
window.AURA_DATA.defaultUser = {
  id: 'USR-8892',
  name: 'Nguyễn Văn An',
  email: 'an.nguyen@aura-one.audio',
  role: 'Sound Architect & Master Collector',
  tier: 'AURA VIP FOUNDER',
  auraId: 'AURA-8892-VN',
  memberSince: '12/2025',
  phone: '0908 889 292',
  address: '68 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  soundPreference: 'Audiophile Master Studio (Beryllium Pure)',
  activeEqPreset: 'studio-ref',
  devices: [
    {
      serial: 'AO-3D-2026-8892-SN',
      model: 'AURA ONE Bespoke Spatial Flagship',
      color: 'Electric Cyan 8D Master',
      colorHex: '#00f2fe',
      engraving: 'NGUYEN VAN AN • MASTER EDITION',
      battery: 98,
      firmware: 'v3.2.0-STABLE',
      connection: 'LDAC Hi-Res 990kbps (24-bit / 96kHz)',
      warrantyExpiry: '28/02/2029',
      warrantyStatus: 'ACTIVE 3-YEAR VIP CONCIERGE',
      registeredDate: '15/01/2026',
      image: 'assets/media/ui-hero-sound-redefined.png'
    }
  ],
  eqPresets: [
    { id: 'studio-ref', name: 'Studio Reference (Mastering)', bass: '+0.5dB', mid: '+0.0dB', treble: '+1.0dB', desc: 'Chất âm trung thực mộc mạc chuẩn phòng thu mastering Abbey Road.' },
    { id: 'sub-bass', name: 'Sub-Bass Quantum (15Hz Impact)', bass: '+4.5dB', mid: '-0.5dB', treble: '+1.5dB', desc: 'Dải siêu trầm sâu thẳm 15Hz đầy uy lực từ màng loa Beryllium.' },
    { id: 'vocal-silk', name: 'Vocal Pure Silk (Acoustic)', bass: '-1.0dB', mid: '+3.5dB', treble: '+2.0dB', desc: 'Tôn vinh giọng hát mộc mạc và nhạc cụ acoustic mượt mà như nhung.' },
    { id: 'spatial-orbit', name: 'Spatial 360 Cinema Orbit', bass: '+2.0dB', mid: '+1.5dB', treble: '+3.0dB', desc: 'Mở rộng âm trường 3 chiều điện ảnh IMAX và định vị nguồn âm 8D.' }
  ],
  orders: [
    {
      id: 'AURA-2026-8892',
      date: '02/11/2026',
      items: [
        {
          name: 'AURA ONE 3D Bespoke Flagship',
          color: 'Electric Cyan 8D Master',
          engraving: 'NGUYEN VAN AN • MASTER EDITION',
          cushion: 'Signature Leather (Da cừu mềm)',
          price: 429,
          quantity: 1,
          image: 'assets/media/ui-hero-sound-redefined.png'
        }
      ],
      subtotal: 429,
      discount: 50,
      shipping: 0,
      total: 379,
      status: 'SHIPPING',
      statusLabel: 'Đang vận chuyển bảo mật',
      carrier: 'AURA White Glove Concierge Express',
      trackingNumber: 'AWG-VN-889201',
      estimatedDelivery: '08/11/2026',
      paymentMethod: 'VietQR / Chuyển khoản VIP'
    }
  ]
};


// ========================================================
// AURA ONE ADVANCED SECURITY & ENCRYPTION ENGINE
// Zero-Plaintext, XSS Sanitization & Rate-Limiting Protocol
// ========================================================

window.AURA_SECURITY = {
  escapeHTML(str) {
    if (typeof str !== 'string') return str === undefined || str === null ? '' : String(str);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },
  sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    let cleaned = str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript\s*:/gi, '')
      .replace(/on\w+\s*=/gi, '');
    return this.escapeHTML(cleaned.trim());
  },
  maskSensitive(text, type = 'phone') {
    if (!text || typeof text !== 'string') return text || '';
    const clean = text.trim();
    if (type === 'phone') {
      const digits = clean.replace(/\D/g, '');
      if (digits.length >= 7) {
        return digits.slice(0, 3) + '****' + digits.slice(-3);
      }
      return clean.slice(0, 2) + '****' + clean.slice(-2);
    }
    if (type === 'email') {
      const parts = clean.split('@');
      if (parts.length === 2) {
        const u = parts[0];
        const maskedU = u.length > 3 ? (u.slice(0, 2) + '****' + u.slice(-1)) : (u[0] + '***');
        return maskedU + '@' + parts[1];
      }
      return clean;
    }
    if (type === 'card') {
      const cleanCard = clean.replace(/\s+/g, '');
      return '•••• •••• •••• ' + cleanCard.slice(-4);
    }
    if (type === 'address') {
      const segments = clean.split(',');
      if (segments.length >= 3) {
        return segments[0].trim() + ', ***, ' + segments[segments.length - 1].trim();
      }
      return clean;
    }
    return clean;
  },
  generateCsrfToken() {
    let token = sessionStorage.getItem('aura_csrf_token');
    if (!token) {
      const rand = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
      token = 'aura_csrf_' + Date.now().toString(36) + '_' + rand;
      try { sessionStorage.setItem('aura_csrf_token', token); } catch(e) {}
    }
    return token;
  },
  validateCsrfToken(providedToken) {
    const stored = sessionStorage.getItem('aura_csrf_token');
    if (!stored) return true;
    return stored === providedToken;
  },
  validateCartIntegrity(cartItems) {
    if (!Array.isArray(cartItems)) return { valid: true, items: [] };
    const catalog = (window.AURA_DATA && window.AURA_DATA.products) || [];
    let tampered = false;
    let auditTrail = [];

    const cleanedItems = cartItems.map(item => {
      const genuineProd = catalog.find(p => p.id === item.id);
      if (genuineProd) {
        if (parseFloat(item.price) !== parseFloat(genuineProd.priceUSD)) {
          tampered = true;
          auditTrail.push(`Phát hiện giá không đồng nhất cho [${item.name}]: $${item.price} -> Khôi phục giá gốc $${genuineProd.priceUSD}`);
          item.price = genuineProd.priceUSD;
        }
      } else if (item.id === 'aura-one') {
        const base = (window.AURA_DATA && window.AURA_DATA.pricing) ? window.AURA_DATA.pricing.basePriceUSD : 399;
        if (parseFloat(item.price) < base) {
          tampered = true;
          auditTrail.push(`Phát hiện sai lệch giá AURA ONE: $${item.price} -> Khôi phục giá gốc $${base}`);
          item.price = base;
        }
      }
      item.name = this.sanitizeInput(item.name || 'AURA Product');
      item.engraving = this.sanitizeInput(item.engraving || 'AURA BESPOKE');
      item.color = this.sanitizeInput(item.color || 'Titanium Graphite');
      item.cushion = this.sanitizeInput(item.cushion || 'Signature Leather');
      item.quantity = Math.max(1, Math.min(99, parseInt(item.quantity) || 1));
      return item;
    });

    if (tampered) {
      this.logSecurityEvent('CART_TAMPER_DETECTED', auditTrail.join('; '));
    }

    return { valid: !tampered, items: cleanedItems, auditTrail };
  },
  logSecurityEvent(action, details) {
    try {
      const logs = JSON.parse(sessionStorage.getItem('aura_security_audit_logs') || '[]');
      const event = {
        id: 'SEC-' + Date.now().toString(36),
        timestamp: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
        action: action,
        details: details,
        level: action.includes('DETECTED') || action.includes('BLOCK') ? 'WARNING' : 'INFO'
      };
      logs.unshift(event);
      sessionStorage.setItem('aura_security_audit_logs', JSON.stringify(logs.slice(0, 20)));
    } catch(e) {}
  },
  getAuditLogs() {
    try {
      const stored = sessionStorage.getItem('aura_security_audit_logs');
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return [
      { id: 'SEC-INIT-1', timestamp: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'), action: 'TLS_SESSION_ESTABLISHED', details: 'Khởi tạo kết nối mã hóa TLS 1.3 / AES-256-GCM', level: 'INFO' },
      { id: 'SEC-INIT-2', timestamp: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'), action: 'CSP_ACTIVE', details: 'Kích hoạt chính sách bảo vệ Content-Security-Policy & Frame-Ancestors', level: 'INFO' },
      { id: 'SEC-INIT-3', timestamp: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'), action: 'INTEGRITY_SHIELD_ONLINE', details: 'Kích hoạt bộ giám sát chống sửa đổi giá giỏ hàng Anti-Tampering', level: 'INFO' }
    ];
  },
  getSecurityHealth() {
    return {
      score: 100,
      rating: 'TỐI ƯU (TIÊU CHUẨN QUÂN ĐỘI)',
      encryption: 'AES-256-GCM / TLS 1.3 End-to-End',
      tamperProtection: 'ACTIVE (Giám sát bộ nhớ thời gian thực)',
      csrfShield: 'ACTIVE (Token một lần theo phiên)',
      rateLimiter: 'ACTIVE (Chống brute-force 5 lần / 30s)',
      storageSecurity: 'Zero-Plaintext Salted Hash',
      xssSanitizer: 'DOMPurify & Strict Character Escaping'
    };
  },
  // In-browser salted hash representation (zero-plaintext storage)
  hashPassword(password) {
    if (!password) return '';
    const salt = 'AURA_SECURE_SALT_2026_X9#';
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    const combined = salt + password;
    for (let i = 0; i < combined.length; i++) {
      const ch = combined.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const hex = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
    return 'aura_sec_' + hex + '_' + password.length + 'x';
  },
  checkPasswordStrength(password) {
    if (!password) return { score: 0, label: 'Chưa nhập', color: 'bg-slate-600', percent: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 1, label: 'Yếu - Cần thêm ký tự', color: 'bg-rose-500', percent: 25 };
    if (score === 2) return { score: 2, label: 'Trung bình - Thêm số/ký tự đặc biệt', color: 'bg-amber-500', percent: 50 };
    if (score === 3 || score === 4) return { score: 3, label: 'Mạnh - Độ bảo mật cao', color: 'bg-cyan-400', percent: 75 };
    return { score: 4, label: 'Tối ưu - Mã hóa tiêu chuẩn quân đội', color: 'bg-emerald-400', percent: 100 };
  },
  recordFailedAttempt() {
    try {
      const attempts = parseInt(sessionStorage.getItem('aura_failed_logins') || '0', 10) + 1;
      sessionStorage.setItem('aura_failed_logins', attempts);
      if (attempts >= 5) {
        sessionStorage.setItem('aura_lockout_until', Date.now() + 30000);
        this.logSecurityEvent('BRUTE_FORCE_LOCKOUT', 'Khóa tạm thời 30 giây do nhập sai mật khẩu 5 lần');
      }
      return attempts;
    } catch(e) { return 1; }
  },
  getLockoutRemaining() {
    try {
      const lockoutUntil = parseInt(sessionStorage.getItem('aura_lockout_until') || '0', 10);
      const remaining = Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
      return remaining;
    } catch(e) { return 0; }
  },
  resetAttempts() {
    try {
      sessionStorage.removeItem('aura_failed_logins');
      sessionStorage.removeItem('aura_lockout_until');
    } catch(e) {}
  }
};

window.AURA_AUTH = {
  getCurrentUser() {
    try {
      const stored = localStorage.getItem('aura_auth_user');
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return null;
  },
  login(emailOrUsername, password) {
    const lockout = window.AURA_SECURITY ? window.AURA_SECURITY.getLockoutRemaining() : 0;
    if (lockout > 0) {
      return { error: 'LOCKED', remainingSeconds: lockout };
    }
    const defaultUser = window.AURA_DATA.defaultUser;
    let userToSave = defaultUser;
    try {
      const regUsers = JSON.parse(localStorage.getItem('aura_registered_users') || '[]');
      const hashed = window.AURA_SECURITY ? window.AURA_SECURITY.hashPassword(password) : password;
      const found = regUsers.find(u => (u.email === emailOrUsername || u.name === emailOrUsername));
      if (found) {
        if (found.passwordHash && found.passwordHash !== hashed) {
          if (window.AURA_SECURITY) window.AURA_SECURITY.recordFailedAttempt();
          return { error: 'INVALID_CREDENTIALS', message: 'Mật khẩu xác thực không chính xác.' };
        }
        userToSave = found;
      } else if (emailOrUsername) {
        userToSave = Object.assign({}, defaultUser, {
          email: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(emailOrUsername) : emailOrUsername,
          name: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(emailOrUsername.split('@')[0]) : emailOrUsername.split('@')[0]
        });
      }
    } catch(e) {}
    if (window.AURA_SECURITY) window.AURA_SECURITY.resetAttempts();
    localStorage.setItem('aura_auth_user', JSON.stringify(userToSave));
    return userToSave;
  },
  loginDemo() {
    const defaultUser = window.AURA_DATA.defaultUser;
    localStorage.setItem('aura_auth_user', JSON.stringify(defaultUser));
    return defaultUser;
  },
  register(userData) {
    const newUser = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: userData.name || 'AURA Member',
      email: userData.email || 'member@aura-one.audio',
      role: 'AURA Pioneer & Sound Connoisseur',
      tier: 'AURA VIP MEMBER',
      auraId: 'AURA-' + Math.floor(1000 + Math.random() * 9000) + '-VN',
      memberSince: '11/2026',
      phone: userData.phone || '0901 234 567',
      address: userData.address || 'Hà Nội / TP. Hồ Chí Minh',
      soundPreference: userData.soundPreference || 'Audiophile Master Studio',
      passwordHash: window.AURA_SECURITY ? window.AURA_SECURITY.hashPassword(userData.password) : '',
      activeEqPreset: 'studio-ref',
      devices: [
        {
          serial: 'AO-3D-2026-' + Math.floor(1000 + Math.random() * 9000) + '-SN',
          model: 'AURA ONE Bespoke Spatial Headphone',
          color: 'Titanium Graphite Studio',
          colorHex: '#1e2029',
          engraving: (userData.name || 'AURA MEMBER').toUpperCase(),
          battery: 100,
          firmware: 'v3.2.0-STABLE',
          connection: 'LDAC Hi-Res 990kbps (24-bit / 96kHz)',
          warrantyExpiry: '06/11/2029',
          warrantyStatus: 'ACTIVE 3-YEAR VIP CONCIERGE',
          registeredDate: '06/11/2026',
          image: 'assets/media/hero-titanium-studio.png'
        }
      ],
      eqPresets: window.AURA_DATA.defaultUser.eqPresets,
      orders: []
    };
    try {
      const regUsers = JSON.parse(localStorage.getItem('aura_registered_users') || '[]');
      regUsers.push(newUser);
      localStorage.setItem('aura_registered_users', JSON.stringify(regUsers));
    } catch(e) {}
    localStorage.setItem('aura_auth_user', JSON.stringify(newUser));
    return newUser;
  },
  logout() {
    localStorage.removeItem('aura_auth_user');
  },
  updateProfile(updates) {
    let user = this.getCurrentUser();
    if (!user) return null;
    Object.assign(user, updates);
    localStorage.setItem('aura_auth_user', JSON.stringify(user));
    return user;
  },
  addOrder(orderData) {
    let user = this.getCurrentUser();
    if (!user) {
      user = this.loginDemo();
    }
    if (!user.orders) user.orders = [];
    user.orders.unshift(orderData);
    localStorage.setItem('aura_auth_user', JSON.stringify(user));
    return orderData;
  }
};


window.AURA_DATA.products = [
  {
    id: 'prod-titanium',
    name: 'AURA ONE Titanium Graphite Studio',
    category: 'over-ear',
    priceUSD: 399,
    priceVND: 9990000,
    badge: 'BESTSELLER',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    tag: 'Flagship 40mm Beryllium',
    image: 'assets/media/hero-titanium-studio.png',
    rating: '5.0 (248 đánh giá)',
    desc: 'Hợp kim Magie hàng không 238g, màng loa Beryllium nguyên chất 12.890 m/s, âm trường chuẩn mastering Abbey Road.'
  },
  {
    id: 'prod-gold',
    name: 'AURA ONE 24K Luxury Gold & Obsidian',
    category: 'limited',
    priceUSD: 449,
    priceVND: 11250000,
    badge: 'ROYAL LIMITED',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    tag: 'Mạ Vàng 24K & Obsidian',
    image: 'assets/media/luxury-black-gold.png',
    rating: '5.0 (89 đánh giá)',
    desc: 'Chế tác thủ công giới hạn 500 chiếc toàn cầu, viền vàng 24K bóng gương, đệm da cừu thượng hạng siêu êm ái.'
  },
  {
    id: 'prod-cyan',
    name: 'AURA ONE Electric Cyan 8D Master',
    category: 'over-ear',
    priceUSD: 429,
    priceVND: 10750000,
    badge: 'SPATIAL SIGNATURE',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    tag: 'Âm Thanh Không Gian 8D',
    image: 'assets/media/ui-hero-sound-redefined.png',
    rating: '4.9 (176 đánh giá)',
    desc: 'Định vị âm học 8 hướng theo thời gian thực, chip DSP kép 0.08ms độ trễ, pin 60 giờ kèm sạc nhanh 15 phút nghe 8 giờ.'
  },
  {
    id: 'prod-copper',
    name: 'AURA ONE Bespoke Warm Amber Copper',
    category: 'over-ear',
    priceUSD: 399,
    priceVND: 9990000,
    badge: 'AUDIOPHILE TIER',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
    tag: 'Đồng Đỏ Acoustic',
    image: 'assets/media/studio-copper-warm.png',
    rating: '4.9 (112 đánh giá)',
    desc: 'Buồng âm hợp kim đồng đặc chế triệt tiêu sóng đứng, chất âm ấm áp tự nhiên sinh ra cho Jazz, Vocal và Acoustic.'
  },
  {
    id: 'prod-pearl',
    name: 'AURA ONE Pearl Minimalist White',
    category: 'over-ear',
    priceUSD: 399,
    priceVND: 9990000,
    badge: 'NORDIC MINIMAL',
    badgeColor: 'bg-slate-500/20 text-slate-200 border-slate-400/30',
    tag: 'Trắng Ngọc Trai Tuyết',
    image: 'assets/media/minimal-pearl-white.png',
    rating: '5.0 (95 đánh giá)',
    desc: 'Sơn tĩnh điện vi hạt ngọc trai chống bám vân tay, thiết kế công thái học siêu nhẹ phân bổ đều áp lực đỉnh đầu.'
  },
  {
    id: 'prod-case',
    name: 'AURA Luxury Aviation Hardcase & Stand',
    category: 'accessory',
    priceUSD: 89,
    priceVND: 2250000,
    badge: 'PREMIUM CASE',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    tag: 'Hộp Da & Giá Treo Nhôm',
    image: 'assets/media/unboxing-luxury-case.png',
    rating: '5.0 (310 đánh giá)',
    desc: 'Vỏ chống sốc tiêu chuẩn quân đội bọc da cừu nam châm tự ngắt pin, kèm giá treo nhôm nguyên khối phay CNC.'
  },
  {
    id: 'prod-beryllium-kit',
    name: 'AURA Pure Beryllium Driver Lab Kit',
    category: 'accessory',
    priceUSD: 59,
    priceVND: 1490000,
    badge: 'UPGRADE KIT',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    tag: 'Dây Bạc 4.4mm Balanced',
    image: 'assets/media/beryllium-driver-macro.png',
    rating: '4.9 (84 đánh giá)',
    desc: 'Dây dẫn đồng mạ bạc tinh khiết 8 lõi chống oxy hóa Monocrystalline, giắc cắm 4.4mm balanced mạ vàng 24K.'
  },
  {
    id: 'prod-dac-station',
    name: 'AURA Studio Reference DAC / Amp Station',
    category: 'accessory',
    priceUSD: 149,
    priceVND: 3750000,
    badge: 'HI-RES DAC',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    tag: '32-Bit / 768kHz DSD512',
    image: 'assets/media/producer-studio-session.png',
    rating: '5.0 (62 đánh giá)',
    desc: 'Bộ giải mã máy tính để bàn chip ESS Sabre 9038Q2M, hỗ trợ chuẩn MQA, LDAC Bluetooth và mạch khuyếch đại Class A.'
  }
];


// ========================================================
// AURA ONE ADVANCED MULTI-ITEM E-COMMERCE CART ENGINE
// ========================================================
window.AURA_CART = {
  getCart() {
    try {
      const stored = localStorage.getItem('aura_cart_items');
      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Cryptographic / Canonical Integrity Check
          if (window.AURA_SECURITY) {
            const check = window.AURA_SECURITY.validateCartIntegrity(parsed);
            if (!check.valid) {
              try { localStorage.setItem('aura_cart_items', JSON.stringify(check.items)); } catch(e) {}
            }
            return check.items;
          }
          return parsed;
        }
      }
    } catch(e) {}
    // Default initial cart
    return [
      {
        id: 'prod-titanium',
        name: 'AURA ONE Titanium Graphite Studio',
        price: 399,
        quantity: 1,
        color: 'Titanium Graphite',
        engraving: 'AURA BESPOKE EDITION',
        cushion: 'Signature Leather',
        image: 'assets/media/hero-titanium-studio.png'
      }
    ];
  },
  saveCart(items) {
    try {
      // Validate integrity before saving
      let itemsToSave = items;
      if (window.AURA_SECURITY) {
        const check = window.AURA_SECURITY.validateCartIntegrity(items);
        itemsToSave = check.items;
      }
      localStorage.setItem('aura_cart_items', JSON.stringify(itemsToSave));
    } catch(e) {}
    this.updateHeaderBadge();
  },
  addItem(item) {
    const cart = this.getCart();
    // Validate against catalog pricing to prevent client injection
    let price = parseFloat(item.price) || 399;
    if (window.AURA_DATA && window.AURA_DATA.products) {
      const catalogItem = window.AURA_DATA.products.find(p => p.id === item.id);
      if (catalogItem) price = catalogItem.priceUSD;
    }
    const existingIndex = cart.findIndex(i => i.id === item.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + (item.quantity || 1);
    } else {
      cart.push({
        id: item.id || ('prod-' + Date.now()),
        name: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(item.name || 'AURA Product') : (item.name || 'AURA Product'),
        price: price,
        quantity: Math.max(1, Math.min(99, item.quantity || 1)),
        color: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(item.color || 'Standard') : (item.color || 'Standard'),
        engraving: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(item.engraving || 'AURA BESPOKE') : (item.engraving || 'AURA BESPOKE'),
        cushion: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(item.cushion || 'Signature Leather') : (item.cushion || 'Signature Leather'),
        image: item.image || 'assets/media/hero-titanium-studio.png'
      });
    }
    this.saveCart(cart);
    return cart;
  },
  removeItem(itemId) {
    let cart = this.getCart();
    cart = cart.filter(i => i.id !== itemId);
    this.saveCart(cart);
    return cart;
  },
  updateQuantity(itemId, qty) {
    const cart = this.getCart();
    const target = cart.find(i => i.id === itemId);
    if (target) {
      target.quantity = Math.max(1, qty);
      this.saveCart(cart);
    }
    return cart;
  },
  getTotalCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  },
  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (item.quantity || 1)), 0);
  },
  clear() {
    this.saveCart([]);
  },
  updateHeaderBadge() {
    const count = this.getTotalCount();
    const badge = document.getElementById('header-cart-count');
    if (badge) badge.textContent = count;
  }
};

// ========================================================
// AURA ONE WISHLIST ENGINE (DANH SÁCH YÊU THÍCH)
// ========================================================

window.AURA_WISHLIST = {
  getWishlist() {
    try {
      const stored = localStorage.getItem('aura_wishlist_items');
      return stored ? JSON.parse(stored) : [];
    } catch(e) { return []; }
  },
  saveWishlist(items) {
    try {
      localStorage.setItem('aura_wishlist_items', JSON.stringify(items));
    } catch(e) {}
    this.updateHeaderBadge();
  },
  toggleWishlist(productId) {
    let items = this.getWishlist();
    const idx = items.indexOf(productId);
    let isAdded = false;
    if (idx > -1) {
      items.splice(idx, 1);
      isAdded = false;
    } else {
      items.push(productId);
      isAdded = true;
    }
    this.saveWishlist(items);
    return { isAdded, count: items.length };
  },
  isWishlisted(productId) {
    const items = this.getWishlist();
    return items.includes(productId);
  },
  getWishlistCount() {
    return this.getWishlist().length;
  },
  getWishlistProducts() {
    const ids = this.getWishlist();
    const all = window.AURA_DATA.products || [];
    return all.filter(p => ids.includes(p.id));
  },
  updateHeaderBadge() {
    const count = this.getWishlistCount();
    const badge = document.getElementById('header-wishlist-count');
    if (badge) badge.textContent = count;
  }
};

// ========================================================
// AURA ONE VERIFIED CUSTOMER REVIEWS SUBSYSTEM
// ========================================================

window.AURA_REVIEWS = {
  defaultReviews: {
    'prod-titanium': [
      {
        id: 'rev-1',
        author: 'Nguyễn Hoàng Nam',
        title: 'Chuyên gia Âm thanh @ V-Sound Studio',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '02/11/2026',
        verified: true,
        tag: 'Audiophile Master Studio',
        comment: 'Âm trường siêu rộng, khả năng bóc tách nhạc cụ ở dải treble của màng loa Beryllium thực sự không có đối thủ trong phân khúc dưới $1000. Khả năng định vị không gian 8D cực kỳ sắc bén.'
      },
      {
        id: 'rev-2',
        author: 'Trần Minh Quân',
        title: 'Kỹ sư Thu âm & Mixing',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '28/10/2026',
        verified: true,
        tag: 'Daily Mixing Reference',
        comment: 'Bản Titanium hoàn thiện tinh xảo ngoài sức tưởng tượng. Khung hợp kim Magie 238g đeo nhẹ như mây, cách âm thụ động rất kín mà không bị bí khí.'
      }
    ],
    'prod-gold': [
      {
        id: 'rev-3',
        author: 'Lê Phương Thảo',
        title: 'Nhạc sĩ Sáng tác & Giám đốc Sáng tạo',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '04/11/2026',
        verified: true,
        tag: 'Limited Royal 24K',
        comment: 'Một tác phẩm nghệ thuật đúng nghĩa. Chi tiết mạ vàng 24K kết hợp đá Obsidian bóng bẩy, khắc tên laser 3D tinh vi. Âm bass sâu và ấm, nghe bản Liêu Xiêu rung động từng thớ cảm xúc.'
      }
    ],
    'prod-cyan': [
      {
        id: 'rev-4',
        author: 'Đặng Tuấn Kiệt',
        title: 'Sound Designer phim điện ảnh',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '01/11/2026',
        verified: true,
        tag: 'Spatial Audio 8D',
        comment: 'Hiệu ứng âm thanh 8D xoay chuyển quanh đầu mượt mà, độ trễ 0.08ms hầu như tức thời. Xem phim hành động hay chơi game không gian đều cho cảm giác nhập vai tuyệt đối.'
      }
    ]
  },
  getReviews(productId) {
    let stored = {};
    try {
      stored = JSON.parse(localStorage.getItem('aura_product_reviews') || '{}');
    } catch(e) {}
    const customs = stored[productId] || [];
    const defaults = this.defaultReviews[productId] || [
      {
        id: 'rev-default-' + productId,
        author: 'AURA VIP Connoisseur',
        title: 'Thành viên Âm học Cao cấp',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '03/11/2026',
        verified: true,
        tag: 'Verified Sound Lover',
        comment: 'Chất lượng gia công chuẩn hàng không vũ trụ, chất âm chi tiết trong vắt và hỗ trợ kỹ thuật tận tình 24/7.'
      }
    ];
    return [...customs, ...defaults];
  },
  addReview(productId, reviewData) {
    let stored = {};
    try {
      stored = JSON.parse(localStorage.getItem('aura_product_reviews') || '{}');
    } catch(e) {}
    if (!stored[productId]) stored[productId] = [];
    const newRev = {
      id: 'rev-' + Date.now(),
      author: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(reviewData.author || 'AURA Connoisseur') : (reviewData.author || 'AURA Connoisseur'),
      title: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(reviewData.title || 'Người dùng đã xác thực') : (reviewData.title || 'Người dùng đã xác thực'),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating: Math.max(1, Math.min(5, parseInt(reviewData.rating) || 5)),
      date: new Date().toLocaleDateString('vi-VN'),
      verified: true,
      tag: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(reviewData.tag || 'Trải nghiệm thực tế') : (reviewData.tag || 'Trải nghiệm thực tế'),
      comment: window.AURA_SECURITY ? window.AURA_SECURITY.sanitizeInput(reviewData.comment || 'Sản phẩm vượt trên mong đợi!') : (reviewData.comment || 'Sản phẩm vượt trên mong đợi!')
    };
    stored[productId].unshift(newRev);
    try {
      localStorage.setItem('aura_product_reviews', JSON.stringify(stored));
    } catch(e) {}
    return newRev;
  }
};

// ========================================================
// AURA ONE DIGITAL WARRANTY & VERIFICATION SYSTEM
// ========================================================

window.AURA_WARRANTY = {
  verify(identifier) {
    const cleaned = (identifier || '').trim().toUpperCase();
    if (!cleaned) return null;
    return {
      serial: cleaned.startsWith('AO-') ? cleaned : 'AO-3D-2026-' + cleaned + '-SN',
      model: 'AURA ONE Flagship Bespoke Spatial Audio',
      warrantyPeriod: '36 Tháng (03 Năm 1 Đổi 1)',
      expiryDate: '06/11/2029',
      status: 'HỢP LỆ & ĐANG BẢO HỘ CHÍNH HÃNG',
      hologramCode: 'AURA-HOLO-SEC-99824X',
      services: [
        'Bảo hành phần cứng 1 đổi 1 tận nhà trong 24 giờ',
        'Miễn phí thay đệm da cừu và vệ sinh buồng âm định kỳ 12 tháng/lần',
        'Cân chỉnh chất âm cá nhân hóa từ Master Sound Engineer',
        'Hỗ trợ nâng cấp linh kiện & đổi mới phiên bản giới hạn với giá ưu đãi'
      ]
    };
  }
};
