"use client";

import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// Chart.js Registrasi
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// CardStack Component
const CardStack = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    setCards(items);
    startFlipping();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items]);

  const startFlipping = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCards((prev) => {
        const newArray = [...prev];
        newArray.unshift(newArray.pop());
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-96 w-full md:h-[30rem] md:w-[40rem] flex items-center justify-center">
      {cards.map((card, index) => (
        <motion.div
          key={card.id || index}
          className="absolute dark:bg-black bg-white h-96 w-full md:h-[30rem] md:w-[40rem] rounded-3xl p-4 sm:p-6 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-start"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          <div className="flex-grow overflow-y-auto" data-aos="fade-up">
            {card.content}
          </div>
          {card.name && (
            <div className="mt-4" data-aos="fade-up" data-aos-delay="300">
              <p className="text-neutral-500 font-medium dark:text-white text-lg">
                {card.name}
              </p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Chart Options
const commonLineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: { color: "#E5E7EB" },
    },
    title: {
      display: true,
      font: { size: 18 },
      color: "#FFFFFF",
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#FFFFFF",
      bodyColor: "#FFFFFF",
    },
  },
  scales: {
    x: {
      ticks: { color: "#9CA3AF" },
      grid: { color: "rgba(255, 255, 255, 0.1)" },
    },
    y: {
      ticks: { color: "#9CA3AF" },
      grid: { color: "rgba(255, 255, 255, 0.1)" },
    },
  },
};

// Data
const LABELS_TAHUNAN = ["2021", "2022", "2023", "2024"];

const DATA_KEPENDUDUKAN = {
  labels: ["Laki-laki", "Perempuan"],
  datasets: [
    {
      data: [45, 34],
      backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(236, 72, 153, 0.8)"],
      borderColor: ["#3B82F6", "#EC4899"],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
};

const DATA_PERTANIAN = {
  labels: LABELS_TAHUNAN,
  datasets: [
    {
      label: "Padi (Ton)",
      data: [520, 540, 530, 580],
      borderColor: "#34D399",
      backgroundColor: "rgba(16, 185, 129, 0.5)",
      tension: 0.3,
    },
    {
      label: "Jagung (Ton)",
      data: [310, 300, 350, 370],
      borderColor: "#FBBF24",
      backgroundColor: "rgba(251, 191, 36, 0.5)",
      tension: 0.3,
    },
  ],
};

const DATA_PERKEBUNAN = {
  labels: LABELS_TAHUNAN,
  datasets: [
    {
      label: "Pepaya (Ton)",
      data: [80, 95, 90, 110],
      borderColor: "#A78BFA",
      backgroundColor: "rgba(167, 139, 250, 0.5)",
      tension: 0.3,
    },
    {
      label: "Tebu (Ton)",
      data: [1200, 1250, 1180, 1300],
      borderColor: "#F472B6",
      backgroundColor: "rgba(244, 114, 182, 0.5)",
      tension: 0.3,
    },
  ],
};

const DATA_PETERNAKAN = {
  labels: LABELS_TAHUNAN,
  datasets: [
    {
      label: "Sapi (Ekor)",
      data: [450, 480, 520, 530],
      borderColor: "#60A5FA",
      backgroundColor: "rgba(96, 165, 250, 0.5)",
      tension: 0.3,
    },
    {
      label: "Ayam (Ekor)",
      data: [15000, 16500, 16000, 17500],
      borderColor: "#F87171",
      backgroundColor: "rgba(248, 113, 113, 0.5)",
      tension: 0.3,
    },
  ],
};

// Table Component
const DataTable = ({ headers, data }) => (
  <div className="overflow-x-auto mt-4" data-aos="fade-up">
    <table className="w-full text-sm text-left text-gray-300">
      <thead className="text-xs text-gray-100 uppercase bg-gray-700/50">
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-4 py-3">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((dataset, index) => (
          <tr
            key={index}
            className="border-b border-gray-700 hover:bg-gray-800/50"
          >
            <th
              scope="row"
              className="px-4 py-3 font-medium text-white whitespace-nowrap"
            >
              {dataset.label}
            </th>
            {dataset.data.map((value, i) => (
              <td key={i} className="px-4 py-3">
                {value.toLocaleString("id-ID")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Card Contents
const PopulationContent = () => {
  const total = DATA_KEPENDUDUKAN.datasets[0].data.reduce((a, b) => a + b, 0);
  return (
    <div>
      <h3 className="text-xl font-bold text-white text-center mb-4" data-aos="fade-up">
        Statistik Kependudukan
      </h3>
      <div className="h-64 w-full flex items-center justify-center" data-aos="zoom-in">
        <Doughnut
          data={DATA_KEPENDUDUKAN}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "60%",
            plugins: {
              legend: {
                position: "bottom",
                labels: { color: "#E5E7EB" },
              },
              title: { display: false },
            },
          }}
        />
      </div>
      <div className="mt-4 text-center" data-aos="fade-up">
        <p className="text-white text-lg">
          Total Populasi:{" "}
          <span className="font-bold">{total.toLocaleString("id-ID")}</span>
        </p>
      </div>
    </div>
  );
};

const AgricultureContent = () => (
  <div>
    <div className="h-64" data-aos="fade-up">
      <Line
        options={{
          ...commonLineChartOptions,
          plugins: {
            ...commonLineChartOptions.plugins,
            title: {
              ...commonLineChartOptions.plugins.title,
              text: "Produksi Hasil Pertanian (Ton)",
            },
          },
        }}
        data={DATA_PERTANIAN}
      />
    </div>
    <DataTable headers={["Produk", ...LABELS_TAHUNAN]} data={DATA_PERTANIAN.datasets} />
  </div>
);

const PlantationContent = () => (
  <div>
    <div className="h-64" data-aos="fade-up">
      <Line
        options={{
          ...commonLineChartOptions,
          plugins: {
            ...commonLineChartOptions.plugins,
            title: {
              ...commonLineChartOptions.plugins.title,
              text: "Produksi Hasil Perkebunan (Ton)",
            },
          },
        }}
        data={DATA_PERKEBUNAN}
      />
    </div>
    <DataTable headers={["Produk", ...LABELS_TAHUNAN]} data={DATA_PERKEBUNAN.datasets} />
  </div>
);

const LivestockContent = () => (
  <div>
    <div className="h-64" data-aos="fade-up">
      <Line
        options={{
          ...commonLineChartOptions,
          plugins: {
            ...commonLineChartOptions.plugins,
            title: {
              ...commonLineChartOptions.plugins.title,
              text: "Populasi Hasil Peternakan (Ekor)",
            },
          },
        }}
        data={DATA_PETERNAKAN}
      />
    </div>
    <DataTable headers={["Ternak", ...LABELS_TAHUNAN]} data={DATA_PETERNAKAN.datasets} />
  </div>
);

// Main Component
// Main Component
const Statistics = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const CARDS = [
    { id: 1, content: <PopulationContent />, },
    { id: 2, content: <AgricultureContent /> },
    { id: 3, content: <PlantationContent /> },
    { id: 4, content: <LivestockContent /> },
  ];

  return (
    <section className="py-20 px-4 bg-black bg-opacity-50 min-h-screen flex flex-col items-center justify-center">
      <h2
        className="text-4xl font-bold text-center mb-10 text-white"
        data-aos="fade-up"
      >
        <span className="text-gradient-2">Statistik </span>Sektoral
      </h2>

      {/* Spacer antara judul dan Card */}
      <div className="mt-12">
        <CardStack items={CARDS} />
      </div>
    </section>
  );
};

export default Statistics;