"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { DirectionAwareHover } from "./ui/direction-aware-hover"; 

const Profile = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      id="profile"
      className="relative py-20 bg-black overflow-hidden" 
    >

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-20"> {/* Increased z-index for content */}
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Profil <span className="text-gradient-3">Dusun Sumber</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-center justify-between"> {/* Added justify-between */}
          {/* Gambar dengan efek hover interaktif */}
          <div data-aos="fade-right" className="w-full md:w-1/2 flex justify-center">
            <DirectionAwareHover
              imageUrl="/images/sumber.png"
              className="rounded-xl shadow-2xl"
              imageClassName="rounded-xl"
              childrenClassName="text-lg font-semibold"
            >
              <p className="text-white bg-blur">
                Dusun Sumber – Kelompok B1
              </p>
            </DirectionAwareHover>
          </div>

          {/* Deskripsi */}
          <div
            data-aos="fade-left"
            className="w-full md:w-1/2 space-y-6 p-6 text-white bg-black bg-opacity-70 rounded-lg shadow-lg" // Increased padding, added shadow
          >
            <h3 className="text-2xl font-bold">Tentang Dusun Sumber</h3>
            <p className="text-gray-300 leading-relaxed">
              Dusun Sumber adalah sebuah wilayah kecil yang terletak di Desa Sumberarum, Kecamatan Tempuran.
              Dusun ini terkenal dengan pemandangan alamnya yang indah, kegiatan pertanian,
              dan ikatan masyarakat yang kuat. Dikelilingi oleh sawah yang hijau dan pemandangan yang indah, 
              dusun ini menawarkan gaya hidup pedesaan yang damai bagi para penghuni dan pengunjungnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;