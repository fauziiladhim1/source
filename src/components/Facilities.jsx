// facilities.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "boxicons/css/boxicons.min.css";
import clsx from "clsx";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

const Facilities = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const testimonialsData = [
    {
      name: "Telekomunikasi",
      designation: "Infrastruktur Komunikasi",
      quote: "Ketersediaan sinyal seluler dan akses jaringan yang memadai untuk kebutuhan komunikasi warga.",
      src: "/images/sumber.png", // Ganti dengan path gambar yang sesuai
    },
    {
      name: "Sarana Air Bersih",
      designation: "Sumber Kehidupan Warga",
      quote: "Akses air bersih yang terjamin dari sumber mata air untuk seluruh lingkungan.",
      src: "/images/sumber.png", // Ganti dengan path gambar yang sesuai
    },
    {
      name: "Pemakaman Umum",
      designation: "Tempat Peristirahatan Terakhir",
      quote: "Menyediakan area pemakaman yang layak dan terkelola dengan baik untuk warga.",
      src: "/images/sumber.png", // Ganti dengan path gambar yang sesuai
    },
    {
      name: "Sekolah",
      designation: "Fasilitas Pendidikan Berkualitas",
      quote: "Sarana pendidikan berkualitas untuk semua kelompok usia.",
      src: "/images/sumber.png", // Ganti dengan path gambar yang sesuai
    },
    {
      name: "Masjid",
      designation: "Tempat Ibadah",
      quote: "Tempat yang tenang untuk beribadah dan refleksi diri.",
      src: "/images/sumber.png", // Ganti dengan path gambar yang sesuai
    },
    {
      name: "Akses Jalan",
      designation: "Konektivitas & Aksesibilitas",
      quote: "Infrastruktur jalan yang memadai untuk menghubungkan antar dusun dan memperlancar aktivitas warga.",
      src: "/images/sumber.png", // Ganti dengan path gambar yang sesuai
    },
  ];

  return (
    <div id="facilities" className="py-20">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Fasilitas <span className="text-gradient-3">Umum</span>
        </h2>

        <AnimatedTestimonials testimonials={testimonialsData} autoplay={true} />
      </div>
    </div>
  );
};

export default Facilities;