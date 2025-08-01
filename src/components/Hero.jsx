"use client";

import { useEffect, useRef } from 'react';
import 'boxicons/css/boxicons.min.css';
import { TextGenerateEffect } from "./ui/text-generate-effect";
import MagicButton from "./MagicButton";

const Hero = () => {
    const heroRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    const words = `WebGIS ini menyajikan informasi geografis dan data demografis terkini, termasuk profil wilayah, informasi penduduk, dan fasilitas umum di Dusun Sumber, Desa Sumberarum.`;

    useEffect(() => {
        // Bouncing animation for scroll indicator
        const animateScrollIndicator = () => {
            if (scrollIndicatorRef.current) {
                scrollIndicatorRef.current.animate(
                    [
                        { transform: 'translateY(0px)' },
                        { transform: 'translateY(-10px)' },
                        { transform: 'translateY(0px)' }
                    ],
                    {
                        duration: 1500,
                        iterations: Infinity,
                        easing: 'ease-in-out',
                    }
                );
            }
        };

        animateScrollIndicator();
    }, []);

    return (
        <main
            ref={heroRef}
            className="relative flex flex-col items-center justify-center min-h-screen text-center p-4 bg-cover bg-center"
            style={{ backgroundImage: "url('/Hero.png')" }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 z-10"></div>

            {/* Content Text - Centered and enhanced readability */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 py-16">
                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-extrabold tracking-tight mb-6 text-white leading-tight drop-shadow-lg">
                    <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Sumber:</span> Optimized Understanding & Resource Center
                    <br />
                </h1>

                {/* Description */}
                <div className="text-base sm:text-lg md:text-xl tracking-wide text-gray-200 mx-auto max-w-3xl mb-10 drop-shadow-lg">
                    <TextGenerateEffect words={words} className="text-lg leading-relaxed" />
                </div>

                {/* Action Button */}
                <div className="mt-10">
                    <MagicButton
                        title="Mulai Eksplorasi"
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

            {/* Scroll indicator */}
            <div ref={scrollIndicatorRef} className="absolute bottom-8 transform -translate-x-1/2 z-20">
                <i className='bx bx-chevrons-down text-white text-4xl animate-bounce'></i>
                <p className="text-sm text-white/80 mt-3 text-center tracking-wider">Scroll Down</p>
            </div>
        </main>
    );
};

export default Hero;