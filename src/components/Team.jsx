"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { WavyBackground } from "./ui/wavy-background";

const teamMembers = [
  {
    name: "Muhammad Fauzil Adhim S.",
    title: "Ketua Kelompok",
    quote: "Memimpin kelompok dengan visi dan kejelasan.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=fauzil",
  },
  {
    name: "Myla Aulia S.",
    title: "Divisi Teknis",
    quote: "Membangun sistem yang kuat dan bertanggung jawab atas teknis.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=myla",
  },
  {
    name: "Rezky Meiva A.",
    title: "Divisi Perlengkapan",
    quote: "Memastikan semua peralatan yang dibutuhkan siap dan efisien.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=rezky",
  },
  {
    name: "Sheryn Alya A.",
    title: "Divisi Konsumsi",
    quote: "Mengurus kebutuhan logistik dan kenyamanan tim.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=sheryn",
  },
  {
    name: "Aditya Suryo A.",
    title: "Divisi Medis",
    quote: "Menjaga keselamatan dan kesehatan seluruh anggota tim.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=aditya",
  },
];

const Team = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black pt-16 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 mt-16 z-0">
        <WavyBackground
          waveOpacity={0.4}
          blur={12}
          backgroundFill="#000000"
          speed="slow"
        />
      </div>

      <h2
        className="relative z-10 text-4xl font-bold text-center text-gray-800 dark:text-white mb-10"
        data-aos="fade-up"
      >
        <span className="text-gradient-2">Kenali </span>Tim Kami
      </h2>
      <div className="relative z-10">
        <InfiniteMovingCards items={teamMembers} speed="normal" direction="left" />
      </div>

    </div>
  );
};

export default Team;