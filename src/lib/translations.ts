
export type Language = "en" | "id";

export const translations = {
  en: {
    hero: {
      proposal: "Sustainable Partnership Proposal",
      title1: "Hortensia Field",
      title2: "Glamping Village",
      subtitle: "A low-impact mountain retreat designed to create sustainable tourism, local employment, investor repayment, and long-term village income.",
      features: [
        { title: "4 Boutique Yurts", sub: "Low-impact design" },
        { title: "Village Partnership", sub: "Shared monthly success" },
        { title: "Eco-Conscious", sub: "Preserving landscape" }
      ],
      scroll: "Scroll to Explore"
    },
    vision: {
      tag: "The Vision",
      title: "A Respectful Partnership",
      description: "Our vision is to transform the existing hydrangea field into a premium yet sustainable glamping destination. By building on wooden platforms, we ensure the natural beauty of the field remains protected and untouched, creating a bridge between modern comfort and village heritage.",
      points: [
        "Preserving the hydrangea field",
        "Low-impact construction",
        "Community land partnership",
        "Sustainable local tourism",
        "Shared benefit structure",
        "Long-term village income",
        "Natural mountain atmosphere",
        "100% Local staff employment"
      ]
    },
    investment: {
      tag: "Phased Development",
      title: "Stage 1 Investment Breakdown",
      description: "A clear, itemized breakdown of the initial capital required to launch the glamping operation.",
      totalLabel: "Total Initial Investment",
      items: {
        "Yurts": "Yurts",
        "Wooden Platforms": "Wooden Platforms",
        "Queen Beds + Bedding": "Queen Beds + Bedding",
        "Basic Interior Furnishing": "Basic Interior Furnishing",
        "Shared Bathroom Building": "Shared Bathroom Building",
        "Electrical + Outdoor Lighting": "Electrical + Outdoor Lighting",
        "Light Landscaping + Pathways": "Light Landscaping + Pathways",
        "Decor, Styling, and Signage": "Decor, Styling, and Signage",
        "Contingency Buffer": "Contingency Buffer",
        "Lump sum": "Lump sum",
        "units": "units"
      }
    },
    operations: {
      tag: "Sustainable Growth",
      title: "Monthly Operations & Distribution",
      description: "Our business model ensures that all partners benefit directly from the retreat's performance. After fixed operating costs are met, the remaining profit follows a transparent \"waterfall\" distribution.",
      fixedCostsTitle: "Fixed Operating Costs",
      fixedCostsItems: {
        "Staff overhead": "Staff overhead",
        "Electricity": "Electricity",
        "Laundry, guest supplies, internet": "Laundry, guest supplies, internet",
        "Maintenance reserve": "Maintenance reserve"
      },
      totalFixedCosts: "Total Monthly Fixed Costs",
      waterfallTitle: "Profit Waterfall Model",
      waterfallItems: {
        village: { label: "Village Share", desc: "Direct community monthly benefit" },
        investor: { label: "Investor Repayment", desc: "Temporary share until 115% ROI reached" },
        marketing: { label: "Marketing Budget", desc: "Generating new guest bookings" },
        resto: { label: "Stage 2 Reserve", desc: "Funding the future restaurant expansion" },
        operator: { label: "Operator Profit", desc: "Remaining share for management" }
      },
      note: "Allocations are calculated as a percentage of \"Profit Before Distributions\" (Revenue minus Operating Costs)."
    },
    calculator: {
      tag: "Transparency Tool",
      title: "Interactive Performance Calculator",
      description: "Adjust the occupancy rate to visualize the dynamic impact on partner distributions and repayment timelines.",
      occupancyLabel: "Occupancy Rate",
      marketTarget: "Market Target (80%)",
      conservative: "Conservative",
      optimal: "Optimal",
      maximum: "Maximum",
      scalingTitle: "Scaling Success",
      scalingDesc: "Distributions grow linearly as occupancy increases, ensuring everyone wins together.",
      bufferTitle: "Fixed Cost Buffer",
      bufferDesc: "Costs remain fixed, creating high leverage as revenue climbs.",
      baselineNotMet: "Baseline Not Met",
      baselineDesc: (cost: string) => `Occupancy must be high enough to cover the monthly fixed costs of ${cost}.`,
      results: {
        grossRevenue: "Gross Room Revenue",
        villageShare: "Village Monthly Share",
        investorShare: "Investor Share",
        restoReserve: "Restaurant Reserve",
        operatorProfit: "Operator Profit",
        annualVillage: "Annual Village Share",
        monthlyTotal: "Monthly Total",
        communityBenefit: "Community Benefit",
        investorTarget: "Target: 227.7M",
        expansionFund: "Expansion Fund",
        retainedEarnings: "Retained Earnings",
        projection: "12-Month Projection"
      },
      timeline: {
        investorTitle: "Investor Repayment",
        investorSub: "Months to 115% ROI",
        restoTitle: "Stage 2 Funding",
        restoSub: "Months to Restaurant Fund"
      }
    },
    investor: {
      tag: "Financial Model",
      title: "Investor Return Structure",
      description: "The investor receives a temporary share of operating profits until the original investment plus a 15% return bonus has been fully repaid. This structure ensures a clean exit for investors and long-term sustainability for the village.",
      targetLabel: "Investor Repayment Target",
      points: [
        { title: "No Permanent Equity", desc: "Project remains 100% locally controlled after exit." },
        { title: "115% Repayment Cap", desc: "Total repayment is capped at IDR 227.7M." },
        { title: "Direct Profit Share", desc: "Investor receives 25% of monthly operating profit." },
        { title: "Performance Based", desc: "Repayment speed scales with actual business success." }
      ]
    },
    expansion: {
      tag: "Phase 2 Strategy",
      title: "Expansion: Forest Kitchen & Lounge",
      description: "Once the initial project is proven successful, we will activate Stage 2. This communal dining space will enhance the guest experience and provide a second revenue stream for the village.",
      cards: [
        { title: "Funding from Profit", desc: "Stage 2 is funded entirely from the 10% monthly reserve, removing any immediate construction risk for partners." },
        { title: "Timeline Trigger", desc: "Construction begins as soon as the IDR 85,000,000 reserve target is reached through operational success." }
      ]
    },
    scenarios: {
      title: "Performance Scenarios",
      description: "\"We believe in presenting realistic projections. Here is how the project performs under different market conditions.\"",
      labels: {
        conservative: "Conservative",
        moderate: "Moderate",
        marketTarget: "Market Target",
        maximum: "Maximum",
        occupancy: "Occupancy",
        grossRevenue: "Gross Revenue",
        villageShare: "Village Share",
        investorRepay: "Investor Repay",
        restoReserve: "Resto Reserve",
        repaymentSpeed: "Repayment Speed",
        months: "Months"
      }
    },
    footer: {
      tagline: "Designed for community prosperity and landscape preservation.",
      copy: "2026 Proposal · All Rights Reserved",
      location: "Local Village Partnership · Bali"
    },
    closing: {
      title: "Building a Sustainable Future Together"
    }
  },
  id: {
    hero: {
      proposal: "Proposal Kemitraan Berkelanjutan",
      title1: "Hortensia Field",
      title2: "Glamping Village",
      subtitle: "Resor pegunungan berdampak rendah yang dirancang untuk menciptakan pariwisata berkelanjutan, lapangan kerja lokal, pembayaran investor, dan pendapatan desa jangka panjang.",
      features: [
        { title: "4 Yurt Butik", sub: "Desain dampak rendah" },
        { title: "Kemitraan Desa", sub: "Keberhasilan bulanan bersama" },
        { title: "Sadar Lingkungan", sub: "Menjaga lanskap" }
      ],
      scroll: "Gulir untuk Menjelajah"
    },
    vision: {
      tag: "Visi",
      title: "Kemitraan yang Terhormat",
      description: "Visi kami adalah mengubah ladang hortensia yang ada menjadi destinasi glamping premium namun berkelanjutan. Dengan membangun di atas platform kayu, kami memastikan keindahan alam ladang tetap terlindungi dan tidak tersentuh, menciptakan jembatan antara kenyamanan modern dan warisan desa.",
      points: [
        "Menjaga ladang hortensia",
        "Konstruksi berdampak rendah",
        "Kemitraan lahan masyarakat",
        "Pariwisata lokal berkelanjutan",
        "Struktur manfaat bersama",
        "Pendapatan desa jangka panjang",
        "Suasana pegunungan alami",
        "100% Karyawan staf lokal"
      ]
    },
    investment: {
      tag: "Pengembangan Bertahap",
      title: "Rincian Investasi Tahap 1",
      description: "Rincian yang jelas dan terperinci dari modal awal yang diperlukan untuk meluncurkan operasi glamping.",
      totalLabel: "Total Investasi Awal",
      items: {
        "Yurts": "Yurt",
        "Wooden Platforms": "Platform Kayu",
        "Queen Beds + Bedding": "Tempat Tidur Queen + Perlengkapan",
        "Basic Interior Furnishing": "Perabotan Interior Dasar",
        "Shared Bathroom Building": "Bangunan Kamar Mandi Bersama",
        "Electrical + Outdoor Lighting": "Kelistrikan + Pencahayaan Luar Ruangan",
        "Light Landscaping + Pathways": "Penataan Taman + Jalur Pejalan Kaki",
        "Decor, Styling, and Signage": "Dekorasi, Penataan, dan Papan Nama",
        "Contingency Buffer": "Dana Cadangan Darurat",
        "Lump sum": "Total",
        "units": "unit"
      }
    },
    operations: {
      tag: "Pertumbuhan Berkelanjutan",
      title: "Operasi & Distribusi Bulanan",
      description: "Model bisnis kami memastikan bahwa semua mitra mendapat manfaat langsung dari kinerja resor. Setelah biaya operasional tetap terpenuhi, sisa keuntungan mengikuti distribusi \"waterfall\" yang transparan.",
      fixedCostsTitle: "Biaya Operasional Tetap",
      fixedCostsItems: {
        "Staff overhead": "Biaya staf",
        "Electricity": "Listrik",
        "Laundry, guest supplies, internet": "Laundry, perlengkapan tamu, internet",
        "Maintenance reserve": "Cadangan pemeliharaan"
      },
      totalFixedCosts: "Total Biaya Tetap Bulanan",
      waterfallTitle: "Model Waterfall Keuntungan",
      waterfallItems: {
        village: { label: "Bagian Desa", desc: "Manfaat bulanan langsung masyarakat" },
        investor: { label: "Pembayaran Investor", desc: "Bagian sementara hingga ROI 115% tercapai" },
        marketing: { label: "Anggaran Pemasaran", desc: "Menghasilkan pemesanan tamu baru" },
        resto: { label: "Cadangan Tahap 2", desc: "Pendanaan ekspansi restoran masa depan" },
        operator: { label: "Keuntungan Operator", desc: "Sisa bagian untuk manajemen" }
      },
      note: "Alokasi dihitung sebagai persentase dari \"Keuntungan Sebelum Distribusi\" (Pendapatan dikurangi Biaya Operasional)."
    },
    calculator: {
      tag: "Alat Transparansi",
      title: "Kalkulator Kinerja Interaktif",
      description: "Sesuaikan tingkat hunian untuk memvisualisasikan dampak dinamis pada distribusi mitra dan jadwal pembayaran.",
      occupancyLabel: "Tingkat Hunian",
      marketTarget: "Target Pasar (80%)",
      conservative: "Konservatif",
      optimal: "Optimal",
      maximum: "Maksimum",
      scalingTitle: "Keberhasilan Berskala",
      scalingDesc: "Distribusi tumbuh secara linier seiring meningkatnya hunian, memastikan semua orang menang bersama.",
      bufferTitle: "Penyangga Biaya Tetap",
      bufferDesc: "Biaya tetap memberikan pengaruh besar saat pendapatan meningkat.",
      baselineNotMet: "Garis Dasar Tidak Terpenuhi",
      baselineDesc: (cost: string) => `Hunian harus cukup tinggi untuk menutupi biaya tetap bulanan sebesar ${cost}.`,
      results: {
        grossRevenue: "Pendapatan Kamar Kotor",
        villageShare: "Bagian Bulanan Desa",
        investorShare: "Bagian Investor",
        restoReserve: "Cadangan Restoran",
        operatorProfit: "Keuntungan Operator",
        annualVillage: "Bagian Desa Tahunan",
        monthlyTotal: "Total Bulanan",
        communityBenefit: "Manfaat Masyarakat",
        investorTarget: "Target: 227.7jt",
        expansionFund: "Dana Ekspansi",
        retainedEarnings: "Laba Ditahan",
        projection: "Proyeksi 12 Bulan"
      },
      timeline: {
        investorTitle: "Pembayaran Investor",
        investorSub: "Bulan menuju 115% ROI",
        restoTitle: "Pendanaan Tahap 2",
        restoSub: "Bulan menuju Dana Restoran"
      }
    },
    investor: {
      tag: "Model Keuangan",
      title: "Struktur Imbal Hasil Investor",
      description: "Investor menerima bagian sementara dari keuntungan operasional sampai investasi awal ditambah bonus imbal hasil 15% telah dibayar penuh. Struktur ini memastikan pintu keluar yang bersih bagi investor dan keberlanjalan jangka panjang bagi desa.",
      targetLabel: "Target Pembayaran Investor",
      points: [
        { title: "Tidak Ada Ekuitas Permanen", desc: "Proyek tetap 100% dikendalikan secara lokal setelah keluar." },
        { title: "Batas Pembayaran 115%", desc: "Total pembayaran dibatasi pada Rp 227,7 Juta." },
        { title: "Pembagian Keuntungan Langsung", desc: "Investor menerima 25% dari keuntungan operasional bulanan." },
        { title: "Berdasarkan Kinerja", desc: "Kecepatan pembayaran sebanding dengan keberhasilan bisnis nyata." }
      ]
    },
    expansion: {
      tag: "Strategi Fase 2",
      title: "Ekspansi: Dapur & Lounge Hutan",
      description: "Setelah proyek awal terbukti berhasil, kami akan mengaktifkan Tahap 2. Ruang makan komunal ini akan meningkatkan pengalaman tamu dan menyediakan sumber pendapatan kedua bagi desa.",
      cards: [
        { title: "Pendanaan dari Keuntungan", desc: "Tahap 2 didanai sepenuhnya dari cadangan bulanan 10%, menghilangkan risiko konstruksi bagi mitra." },
        { title: "Pemicu Jadwal", desc: "Konstruksi dimulai segera setelah target cadangan Rp 85.000.000 tercapai melalui keberhasilan operasional." }
      ]
    },
    scenarios: {
      title: "Skenario Kinerja",
      description: "\"Kami percaya dalam menyajikan proyeksi yang realistis. Berikut adalah kinerja proyek dalam berbagai kondisi pasar.\"",
      labels: {
        conservative: "Konservatif",
        moderate: "Moderat",
        marketTarget: "Target Pasar",
        maximum: "Maksimum",
        occupancy: "Hunian",
        grossRevenue: "Pendapatan Kotor",
        villageShare: "Bagian Desa",
        investorRepay: "Bayar Investor",
        restoReserve: "Cadangan Resto",
        repaymentSpeed: "Kecepatan Bayar",
        months: "Bulan"
      }
    },
    footer: {
      tagline: "Dirancang untuk kemakmuran masyarakat dan pelestarian lanskap.",
      copy: "Proposal 2026 · Hak Cipta Dilindungi",
      location: "Kemitraan Desa Lokal · Bali"
    },
    closing: {
      title: "Membangun Masa Depan Berkelanjutan Bersama"
    }
  }
};
