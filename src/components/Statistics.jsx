"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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
  UserIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

// --- Registrasi Library ---
ChartJS.register(ArcElement, Tooltip, Legend);

// --- 1. Komponen Layout Inti (Dengan Efek Hover) ---

const BentoGrid = ({ className, children }) => (
  <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto group ${className}`}>
    {children}
  </div>
);

const BentoGridItem = ({ className, title, description, children, icon, aosType }) => (
  <div
    data-aos={aosType}
    className={`
      row-span-1 rounded-2xl group/bento transition-all duration-300
      p-4 bg-slate-900 border-slate-800 border
      justify-between flex flex-col space-y-4 relative overflow-hidden
      group-hover:blur-[2px] hover:!blur-none
      group-hover:scale-[0.98] hover:!scale-100
      hover:shadow-2xl hover:shadow-blue-500/20
      ${className}
    `}
  >
    {/* Efek Glow Saat Hover */}
    <div className="absolute -inset-px opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-20 blur-2xl"></div>
    </div>
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex-shrink-0">
        {icon}
        <div className="font-sans font-bold text-slate-200 text-lg mb-1 mt-2">{title}</div>
        <div className="font-sans font-normal text-slate-400 text-xs">{description}</div>
      </div>
      <div className="flex-grow mt-4 flex flex-col justify-center">
        {children}
      </div>
    </div>
  </div>
);

// --- 2. Data Chart ---
const DATA_KEPENDUDUKAN = {
  labels: ["Laki-laki", "Perempuan"],
  datasets: [{
    data: [178, 156],
    backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(236, 72, 153, 0.8)"],
    borderColor: "transparent",
    borderWidth: 0,
    hoverOffset: 8,
  }],
};

// --- 3. Komponen Konten & UI Pembantu ---

const PopulationChart = () => (
  <div className="relative w-full h-full flex items-center justify-center -mt-4">
    <Doughnut data={DATA_KEPENDUDUKAN} options={{ 
      responsive: true, 
      maintainAspectRatio: false,
      cutout: "75%", 
      plugins: { legend: { display: false } } 
    }} />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
      <span className="text-4xl font-bold">{178 + 156}</span>
      <span className="text-sm text-slate-400">Total Jiwa</span>
    </div>
  </div>
);

const FeatureItem = ({ icon, text }) => (
  <li className="flex items-center gap-3 text-slate-300">
    <div className="flex-shrink-0 bg-slate-800 p-1.5 rounded-full">
      {React.cloneElement(icon, { className: "h-4 w-4" })}
    </div>
    <span className="text-sm">{text}</span>
  </li>
);

const StatPill = ({ text, colorClass }) => (
    <span className={`text-base font-semibold ${colorClass} py-1.5 px-4 rounded-full text-center`}>
        {text}
    </span>
);

// --- 4. Konfigurasi Grid Items (Layout & Konten Baru) ---
const items = [
  {
    title: "Demografi Penduduk",
    description: "Komposisi warga berdasarkan jenis kelamin.",
    className: "md:col-span-1 md:row-span-2",
    icon: <UserIcon className="h-5 w-5 text-slate-400" />,
    aosType: "fade-right",
    content: (
      <div className="w-full h-full flex flex-col justify-center gap-4">
        <div className="h-48"><PopulationChart /></div>
        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold text-blue-400">178 Laki-laki</p>
          <p className="text-lg font-semibold text-pink-400">156 Perempuan</p>
        </div>
      </div>
    ),
  },
  {
    title: "Spiritualitas & Budaya",
    description: "Kultur keagamaan dan musyawarah yang mengakar.",
    className: "md:col-span-2",
    icon: <MoonIcon className="h-5 w-5 text-slate-400" />,
    aosType: "fade-left",
    content: (
      <ul className="space-y-3">
        <FeatureItem icon={<ClockIcon className="text-cyan-400"/>} text="Kesadaran tinggi sholat di awal waktu." />
        <FeatureItem icon={<ChatBubbleBottomCenterTextIcon className="text-green-400"/>} text="Setiap keputusan melalui musyawarah kritis." />
        <FeatureItem icon={<ScaleIcon className="text-purple-400"/>} text="Kultur NU & Jawa dengan manajemen modern." />
      </ul>
    ),
  },
  {
    title: "Potensi Lokal",
    description: "Produk khas dan keunggulan daerah.",
    className: "md:col-span-1",
    icon: <SparklesIcon className="h-5 w-5 text-slate-400" />,
    aosType: "fade-up",
    content: (
      <div className="flex flex-col gap-3 items-center">
        <StatPill text="Gula Jawa" colorClass="bg-yellow-900/60 text-yellow-300" />
        <StatPill text="Pothil" colorClass="bg-amber-900/60 text-amber-300" />
      </div>
    ),
  },
  {
    title: "Karakteristik Sosial",
    description: "Ciri khas dan dinamika masyarakat.",
    className: "md:col-span-1",
    icon: <ShieldCheckIcon className="h-5 w-5 text-slate-400" />,
    aosType: "fade-up",
    content: (
      <div className="text-center">
        <p className="text-xl font-bold text-slate-200">"Ga Neko-neko"</p>
        <p className="text-sm text-slate-400">Dusun yang tenang dan sederhana.</p>
        <p className="text-xs text-red-400/80 mt-2">(Cenderung resisten terhadap perubahan)</p>
      </div>
    ),
  },
  {
    title: "Visi Pengembangan",
    description: "Rencana dan aspirasi untuk masa depan dusun.",
    className: "md:col-span-2",
    icon: <LightBulbIcon className="h-5 w-5 text-slate-400" />,
    aosType: "fade-up",
    content: (
      <ul className="space-y-3">
        <FeatureItem icon={<CubeTransparentIcon className="text-blue-400"/>} text="Mendirikan museum seni tradisional." />
        <FeatureItem icon={<BuildingStorefrontIcon className="text-teal-400"/>} text="Mengadakan bazar kuliner tradisional bulanan." />
      </ul>
    ),
  },
  {
    title: "Infrastruktur",
    description: "Fasilitas dasar yang menunjang kehidupan warga.",
    className: "md:col-span-1",
    icon: <WrenchScrewdriverIcon className="h-5 w-5 text-slate-400" />,
    aosType: "fade-up",
    content: (
        <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
            <li>Akses Jalan & Listrik</li>
            <li>Tempat Ibadah</li>
            <li>Pendidikan</li>
        </ul>
    ),
  },
];

// --- 5. Komponen Halaman Utama ---
const Statistics = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      mirror: false,
      delay: 100,
    });
  }, []);

  return (
    <section className="relative py-24 px-4 min-h-screen w-full">
      <div className="absolute inset-0 -z-10 h-full w-full"></div>
      <div className="text-center z-10 mb-16">
        <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-center text-white">
          <span  className="text-gradient-2">Informasi</span> Masyarakat
        </h2>
      </div>
      <div className="w-full z-10">
        <BentoGrid>
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              className={item.className}
              icon={item.icon}
              aosType={item.aosType}
            >
              {item.content}
            </BentoGridItem>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default Statistics;