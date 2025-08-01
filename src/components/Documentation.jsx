import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import clsx from "clsx";
import MagicButton from "./MagicButton";

const BentoGrid = ({ className, children }) => {
  return (
    <div className={clsx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};

const BentoGridItem = ({ title, description, img, category, index, onClick }) => {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-delay={index * 100}
      className="group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer backdrop-blur-xl bg-slate-900 bg-opacity-50"
      onClick={onClick}
    >
      <img
        src={img}
        alt={title}
        className="h-64 w-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
      />
      <div className="p-5 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-300 mt-1">{description}</p>
        <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-blue-700/80 rounded-full">
          {category}
        </span>
      </div>
    </div>
  );
};

const Documentation = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: false });
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const allImages = [
    { title: "Pengukuran Batas Dusun", description: "Pengukuran Titik 10 (Sumber-Boto).", img: "/images/survei1.jpg", category: "Survei dan Pengukuran" },
    { title: "Pengukuran Batas Dusun", description: "Pengukuran Titik 10 (Sumber-Boto).", img: "/images/survei2.jpg", category: "Survei dan Pengukuran" },
    { title: "Foto Kelompok B1", description: "Dokumentasi Anggota Kelompok B1.", img: "/images/tim1.jpg", category: "Anggota Tim" },
    { title: "Foto Kelompok B1", description: "Dokumentasi Anggota Kelompok B1.", img: "/images/tim2.jpg", category: "Anggota Tim" },
    { title: "Penerbangan Drone", description: "Bermain Bersama Anak-anak Sekolah.", img: "/images/anak.jpg", category: "Kegiatan Desa" },
    { title: "Gotong Royong Warga", description: "Gotong Royong membersihkan Terpal.", img: "/images/gotongroyong.jpg", category: "Kegiatan Desa" },
    { title: "Kerja Kelompok", description: "Diskusi dan Penyelesaian tiap Jobdesk.", img: "/images/tim3.jpg", category: "Anggota Tim" },
    { title: "Last Day PKL 2", description: "Bersama Ibu Umi, Tuan Rumah Rempat Menginap.", img: "/images/tim4.jpg", category: "Anggota Tim" },
    { title: "Pengukuran Batas Dusun", description: "Pengukuran Titik 12 (Sumber-Dasekan).", img: "/images/survei3.jpg", category: "Survei dan Pengukuran" },
    { title: "Pengukuran Batas Dusun", description: "Pengukuran Titik 12 (Sumber-Dasekan).", img: "/images/survei4.jpg", category: "Survei dan Pengukuran" },
    { title: "Peta Foto Udara", description: "Peta Batas Admin Citra Foto Udara.", img: "/images/PETA FU FIX.png", category: "Hasil Peta" },
    { title: "Peta Penggunaan Lahan", description: "Peta Penggunaan Lahan di Dusun Sumber.", img: "/images/PETA PL.png", category: "Hasil Peta" },
    { title: "Kerajinan Warga", description: "Miniatur Handmade oleh Warga Setempat.", img: "/images/kerajinan.jpg", category: "Kegiatan Desa" },
    { title: "Peta Sarana dan Prasarana", description: "Peta Sarana-Prasarana dan Bangunan di Dusun Sumber.", img: "/images/PETA SARPRAS BANGUNAN.png", category: "Hasil Peta" },
  ];

  const categories = ["Semua", "Survei dan Pengukuran", "Kegiatan Desa", "Anggota Tim", "Hasil Peta"];

  const filteredImages =
    selectedCategory === "Semua"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  const imagesToShow = showAll ? filteredImages : filteredImages.slice(0, 6);

  return (
    <section id="documentation" className="py-20 bg-black text-white">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 data-aos="fade-up" className="text-4xl font-bold mb-4">Dokumentasi <span className="text-gradient-3">Kami</span></h2>
        </div>

        {/* Filter Category Buttons */}
        <div data-aos="fade-up" className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category, i) => (
            <MagicButton
              key={i}
              title={category}
              position="left"
              handleClick={() => {
                setSelectedCategory(category);
                setShowAll(false);
              }}
              otherClasses={clsx(
                selectedCategory === category
                  ? "border-2 rounded-full"
                  : "opacity-70 rounded-full"
              )}
            />
          ))}
        </div>

        {/* Grid Items */}
        <BentoGrid>
          {imagesToShow.map((img, index) => (
            <BentoGridItem
              key={index}
              title={img.title}
              description={img.description}
              img={img.img}
              category={img.category}
              index={index}
              onClick={() => setSelectedImage(img.img)}
            />
          ))}
        </BentoGrid>

        {/* Show More Button */}
        {filteredImages.length > 6 && !showAll && (
          <div className="text-center mt-10">
            <MagicButton
              title="Lihat Lebih Lanjut"
              position="right"
              handleClick={() => setShowAll(true)}
              otherClasses="rounded-full"
            />
          </div>
        )}

        {/* Modal Full Image */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                className="absolute -top-10 right-0 text-white text-lg"
                onClick={() => setSelectedImage(null)}
              >
                × Close
              </button>
              <img
                src={selectedImage}
                alt="Enlarged View"
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Documentation;
