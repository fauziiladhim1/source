import { useEffect } from "react"; // Impor useEffect
import AOS from "aos"; // Impor AOS
import "aos/dist/aos.css"; // Impor CSS AOS

// Data untuk media sosial
const socialMedia = [
  { id: 1, iconClass: "bx bxl-instagram", link: "https://instagram.com/sumber.berkana", colorClass: "text-blue-400" },
  { id: 2, iconClass: "bx bx-phone", link: "tel:+628985580408", colorClass: "text-blue-400" },
  // Tambahkan tautan media sosial lainnya dengan kelas Boxicons yang sesuai
];

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Animasi hanya berjalan sekali
    });
  }, []);

  return (
    <footer className="w-full pt-0 pb-10 relative overflow-hidden" id="kontak">
      <div className="flex flex-col items-center px-6 lg:px-20">
        {/* Judul utama ajakan bertindak */}
        <h1 className="heading lg:max-w-[45vw] text-center text-white text-lg font-semibold" data-aos="fade-up">
          Jelajahi lebih jauh keindahan dan potensi <span className="text-gradient text- font-bold">Dusun Sumber</span>?
        </h1>
        <p className="text-gray-400 md:mt-10 my-5 text-center max-w-lg mx-auto" data-aos="fade-up" data-aos-delay="200">
          Mari terhubung dan diskusikan bagaimana platform WebGIS kami dapat membantu Anda memahami Dusun Sumber lebih baik.
        </p>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center px-6 lg:px-20 relative z-10">
        <p className="md:text-base text-sm md:font-normal font-light text-gray-500 text-center md:text-left mb-4 md:mb-0">
          Copyright © {new Date().getFullYear()} Source. All rights reserved.
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 group-hover:bg-blue-500 transition-colors duration-300">
                <i className={`${info.iconClass} text-2xl ${info.colorClass} group-hover:text-white`}></i>
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;