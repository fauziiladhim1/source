"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Timeline } from "./ui/timeline";

const Geographical = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: false });
  }, []);

  const geoData = [
  {
    title: "Topografi",
    description:
      "Desa Sumberarum terletak di tepi Sungai Progo dan di kaki bukit Menoreh. Wilayah desa ini memiliki ketinggian sekitar 125 meter di atas permukaan air laut, memberikan pemandangan alam yang indah dan khas pedesaan.",
    image: "/images/topografi.jpg",
  },
  {
    title: "Iklim & Cuaca",
    description:
      "Dusun ini memiliki curah hujan rata-rata tahunan sebesar 2225 mm. Suhu rata-rata harian berkisar antara 17°C hingga 25°C.",
    image: "/images/iklim.jpg",
  },
  {
    title: "Sumber Daya Air",
    description:
      "Keberadaan Sungai Progo yang mengalir di tepi desa menjadi sumber daya air yang signifikan dan sumber kehidupan bagi masyarakat sekitar.",
    image: "/images/sumberair.jpg",
  },
  {
    title: "Batas Wilayah",
    description:
      "Secara administratif, Dusun Sumber berbatasan dengan Dusun Boto di sebelah Utara, Dusun Dasekan di Barat Daya, Dusun Teluk di Selatan, dan Dusun Wareng di sebelah Barat Laut.",
    image: "/images/batas.png",
  },
];

  const timelineData = geoData.map((item) => ({
    title: item.title,
    content: (
      <div data-aos="fade-up" className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-full md:w-64 h-48 object-cover rounded-xl shadow-lg"
        />
        <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
          {item.description}
        </p>
      </div>
    ),
  }));

  return (
    <div id="geographical" className="py-20">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold mt-20 mb-6 text-center text-white"
        >
          <span className="text-gradient-2">Kondisi</span> Geografis
        </h2>

        <Timeline data={timelineData} />
      </div>
    </div>
  );
};

export default Geographical;
