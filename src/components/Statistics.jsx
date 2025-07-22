"use client";

import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  MoonIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  ScaleIcon,
  SparklesIcon,
  CubeTransparentIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

// Chart.js Registrasi
ChartJS.register(ArcElement, Tooltip, Legend);

// CardStack Component (Tidak ada perubahan)
const CardStack = ({ items }) => {
  const CARD_OFFSET = 10;
  const SCALE_FACTOR = 0.06;
  const [cards, setCards] = useState(items);
  const intervalRef = useRef(null);

  useEffect(() => {
    const stopFlipping = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    stopFlipping();
    setCards(items);
    startFlipping();
    return stopFlipping;
  }, [items]);

  const startFlipping = () => {
    intervalRef.current = setInterval(() => {
      setCards((prev) => {
        const newArray = [...prev];
        newArray.unshift(newArray.pop());
        return newArray;
      });
    }, 6000);
  };

  return (
    <div className="relative h-[30rem] w-full md:h-[32rem] md:w-[42rem] flex items-center justify-center">
      {cards.map((card, index) => (
        <motion.div
          key={card.id || index}
          className="absolute backdrop-blur-xl bg-black bg-opacity-70 h-[30rem] w-full md:h-[32rem] md:w-[42rem] rounded-3xl p-1 shadow-lg border border-white/10"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          {/* Menambahkan efek border gradien */}
          <div className="w-full h-full p-6 sm:p-8 bg-slate-90 rounded-[22px] flex flex-col justify-center">
             <div className="overflow-y-auto" data-aos="fade-up" data-aos-duration="600">
               {card.content}
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Data Kependudukan
const DATA_KEPENDUDUKAN = {
  labels: ["Laki-laki", "Perempuan"],
  datasets: [{
    data: [178, 156],
    backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(236, 72, 153, 0.8)"],
    borderColor: "#0f172a",
    borderWidth: 0,
    hoverOffset: 8,
  }],
};

const PopulationContent = () => {
  const total = DATA_KEPENDUDUKAN.datasets[0].data.reduce((a, b) => a + b, 0);
  return (
    <div>
      <h3 className="text-2xl font-bold text-white text-center">Demografi Penduduk</h3>
      <div className="mt-6 flex flex-col md:flex-row items-center justify-around gap-6">
        <div className="relative h-48 w-48">
          <Doughnut data={DATA_KEPENDUDUKAN} options={{ responsive: true, cutout: "70%", plugins: { legend: { display: false } } }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
            <span className="text-4xl font-bold">{total}</span>
            <span className="text-sm text-gray-400">Total Jiwa</span>
          </div>
        </div>
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="p-2 bg-blue-500/20 rounded-full"><UserIcon className="h-6 w-6 text-blue-400" /></div>
            <div><p className="text-2xl font-semibold text-white">178 <span className="text-lg font-normal">Laki-laki</span></p></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="p-2 bg-pink-500/20 rounded-full"><UserIcon className="h-6 w-6 text-pink-400" /></div>
            <div><p className="text-2xl font-semibold text-white">156 <span className="text-lg font-normal">Perempuan</span></p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Konten Budaya
const InfoCard = ({ icon, title, children, delay }) => (
    <div className="bg-white/[.03] p-4 rounded-xl h-full flex flex-col transition-all duration-300 hover:bg-white/[.06] hover:scale-105" data-aos="fade-up" data-aos-delay={delay}>
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <h4 className="font-bold text-white">{title}</h4>
        </div>
        <p className="text-gray-300 text-sm flex-grow">{children}</p>
    </div>
);

const CultureContent = () => (
    <div>
        <h3 className="text-2xl font-bold text-white text-center mb-6">Spiritualitas & Budaya Musyawarah</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard icon={<MoonIcon className="h-6 w-6 text-yellow-400" />} title="Hafalan Malam Jumat" delay="100">
                Kegiatan rutin untuk memperdalam Al-Quran yang diadakan setiap malam Jumat bagi warga.
            </InfoCard>
            <InfoCard icon={<ClockIcon className="h-6 w-6 text-cyan-400" />} title="Sholat Tepat Waktu" delay="200">
                Masyarakat memiliki kesadaran tinggi untuk menjaga dan melaksanakan sholat di awal waktu.
            </InfoCard>
            <InfoCard icon={<ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-green-400" />} title="Musyawarah Kritis" delay="300">
                Setiap pengambilan keputusan komunal didasarkan pada diskusi yang mendalam dan kritis.
            </InfoCard>
            <InfoCard icon={<ScaleIcon className="h-6 w-6 text-purple-400" />} title="Manajemen Modern" delay="400">
                Walaupun kultur NU & Jawa kental, sistem kelembagaan menerapkan manajemen ala Muhammadiyah.
            </InfoCard>
        </div>
    </div>
);

// 3. Konten Potensi Lokal
const PotentialContent = () => (
    <div>
        <h3 className="text-2xl font-bold text-white text-center mb-6">Potensi Lokal & Visi ke Depan</h3>
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 space-y-4" data-aos="fade-right">
                <h4 className="font-semibold text-lg text-white border-b-2 border-green-500 pb-2">Potensi Unggulan</h4>
                <div className="bg-white/5 p-4 rounded-lg h-full">
                    <SparklesIcon className="h-6 w-6 text-green-400 mb-2"/>
                    <h5 className="font-bold text-white">Produk Khas</h5>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs font-semibold text-yellow-200 bg-yellow-900/50 py-1 px-3 rounded-full">Gula Jawa</span>
                        <span className="text-xs font-semibold text-amber-200 bg-amber-900/50 py-1 px-3 rounded-full">Pothil</span>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-3" data-aos="fade-left">
                <h4 className="font-semibold text-lg text-white border-b-2 border-blue-500 pb-2">Visi Pengembangan</h4>
                <div className="bg-white/5 p-4 rounded-lg h-full">
                <div className="flex items-start gap-3 mt-4">
                    <CubeTransparentIcon className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0"/>
                    <p className="text-gray-300">Mendirikan <strong>museum seni tradisional</strong> (alat tangkap ikan kuno).</p>
                </div>
                 <div className="flex items-start gap-3">
                    <BuildingStorefrontIcon className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0"/>
                    <p className="text-gray-300">Mengadakan <strong>bazar makanan tradisional</strong> bulanan di akhir pekan.</p>
                </div>
                </div>
            </div>
        </div>
    </div>
);

// 4. Konten Potret Sosial
const StatBlock = ({ icon, value, label, delay }) => (
    <div className="bg-white/[.03] p-4 rounded-xl text-center flex-1 transition-all duration-300 hover:bg-white/[.06] hover:scale-105" data-aos="fade-up" data-aos-delay={delay}>
        <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
            {icon}
        </div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);

const SocialContent = () => (
    <div>
        <h3 className="text-2xl font-bold text-white text-center mb-6">Potret Sosial Masyarakat</h3>
        <div className="flex flex-col md:flex-row justify-center gap-4">
             <StatBlock icon={<BriefcaseIcon className="h-6 w-6 text-teal-400"/>} value="~16 Orang" label="Aparatur Sipil Negara" delay="100"/>
             <StatBlock icon={<ShieldCheckIcon className="h-6 w-6 text-indigo-400"/>} value='"Ga Neko"' label="Karakteristik Dusun" delay="200"/>
             <StatBlock icon={<ExclamationTriangleIcon className="h-6 w-6 text-red-400"/>} value="Resisten" label="Tantangan Perubahan" delay="300"/>
        </div>
    </div>
);

// Komponen Utama
const Statistics = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, mirror: false });
  }, []);

  const CARDS = [
    { id: 1, content: <PopulationContent /> },
    { id: 2, content: <CultureContent /> },
    { id: 3, content: <PotentialContent /> },
    { id: 4, content: <SocialContent /> },
  ];

  return (
    <section className="relative py-20 px-4 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 -z-10 h-full w-full "></div>

      <div className="text-center z-10">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          <span className="text-gradient-2">Informasi</span> Masyarakat
        </h2>
      </div>
      
      {/* PERBAIKAN UTAMA:
        Wrapper di bawah ini memastikan CardStack berada di tengah secara horizontal.
      */}
      <div className="mt-16 w-full flex justify-center z-10">
        <CardStack items={CARDS} />
      </div>
    </section>
  );
};

export default Statistics;