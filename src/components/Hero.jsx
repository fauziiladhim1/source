"use client";

import 'boxicons/css/boxicons.min.css';
import Spline from '@splinetool/react-spline';
import { TextGenerateEffect } from "./ui/text-generate-effect";
import MagicButton from "./MagicButton";

const Hero = () => {
    const words = `WebGIS ini menyajikan informasi geografis dan data demografis terkini, termasuk profil wilayah, data statistik, dan fasilitas umum di Dusun Sumber, Desa Sumberarum.`;

    return (
        <main className="flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)]">
            {/* Konten Teks */}
            <div
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                className="max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:mt-0"
            >

                {/* Judul Utama */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold tracking-wider my-8 text-white">
                    <span className="text-gradient">Sumber:</span> Optimized Understanding & Resource Center
                    <br />
                    <div className="text-base sm:text-lg md:text-xl text-gray-500 mt-2">
                        Desa Sumberarum, Kecamatan Tempuran
                    </div>
                </h1>

                {/* Deskripsi */}
                <div className="text-sm sm:text-base tracking-wider text-gray-300 max-w-[25rem] lg:max-w-lg">
                    <TextGenerateEffect words={words} className="text-sm" />
                </div>

                {/* Tombol Aksi */}
                <div className="mt-6">
                    <MagicButton
                        title="Mulai"
                        icon={<i className="bx bx-right-arrow-alt text-xl" />}
                        position="right"
                        handleClick={() => {
                            const target = document.getElementById("profile");
                            if (target) {
                                target.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        otherClasses="rounded-full"
                    />

                </div>

            </div>

            {/* Spline 3D */}
            <Spline
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="300"
                data-aos-offset="0"
                data-aos-duration="3000"
                className="absolute lg:top-0 top-[-20%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full"
                scene="https://prod.spline.design/tZcFKmyeIFClPhm1/scene.splinecode"
            />
        </main>
    );
};

export default Hero;
