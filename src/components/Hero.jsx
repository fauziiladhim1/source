"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import 'boxicons/css/boxicons.min.css';
import { TextGenerateEffect } from "./ui/text-generate-effect";
import MagicButton from "./MagicButton";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonRef = useRef(null);
    const videoRef = useRef(null);
    const overlayRef = useRef(null);

    const words = `WebGIS ini menyajikan informasi geografis dan data demografis terkini, termasuk profil wilayah, informasi penduduk, dan fasilitas umum di Dusun Sumber, Desa Sumberarum.`;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero entrance animation
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(titleRef.current, {
                y: 120,
                opacity: 0,
                duration: 1.5,
                delay: 0.2,
            })
            .from(descriptionRef.current, {
                y: 80,
                opacity: 0,
                duration: 1.2,
            }, "-=1") 
            .from(buttonRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
            }, "-=0.8");

            // Initial background video animation
            gsap.fromTo(videoRef.current, {
                scale: 1.15,
                opacity: 0.6,
            }, {
                scale: 1,
                opacity: 1,
                duration: 2.5,
                ease: "power2.out",
            });

            // Scroll-triggered animations for parallax and fade effects
            gsap.to(heroRef.current, {
                yPercent: -20, // Move hero up as we scroll
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5, // Smooth scrubbing
                }
            });

            gsap.to(videoRef.current, {
                scale: 1.3, // Zoom out video slightly more
                yPercent: 30, // Move video down slower than hero
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                }
            });

            gsap.to(overlayRef.current, {
                opacity: 0.8, // Increase overlay opacity on scroll
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                }
            });

        }, heroRef); // Context scope

        return () => ctx.revert(); // Clean up animations on unmount
    }, []);

    return (
        <main ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center p-4">
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/background.mp4" type="video/mp4" />
                <source src="/videos/background.webm" type="video/webm" />
                {/* Fallback for video not loading - a subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
            </video>

            <div
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"
            ></div>

            {/* Content Text - Centered and enhanced readability */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 py-16">
                {/* Main Title */}
                <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-extrabold tracking-tight mb-6 text-white leading-tight drop-shadow-lg">
                    <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Sumber:</span> Optimized Understanding & Resource Center
                    <br />
                    <div className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-4 font-medium drop-shadow-md">
                        Desa Sumberarum, Kecamatan Tempuran
                    </div>
                </h1>

                {/* Description */}
                <div ref={descriptionRef} className="text-base sm:text-lg md:text-xl tracking-wide text-gray-200 mx-auto max-w-3xl mb-10 drop-shadow-lg">
                    <TextGenerateEffect words={words} className="text-lg leading-relaxed" />
                </div>

                {/* Action Button */}
                <div ref={buttonRef} className="mt-10">
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
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <p className="text-sm text-white/80 mt-3 text-center tracking-wider">Scroll Down</p>
            </div>
        </main>
    );
};

export default Hero;