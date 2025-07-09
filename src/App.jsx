"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statistics from "./components/Statistics";
import Documentation from "./components/Documentation";
import Footer from "./components/Footer";
import Facilities from "./components/Facilities";
import Geographical from "./components/Geographical";
import Profile from "./components/Profile";
import Map from "./components/Map";
import Team from "./components/Team";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const [isMapVisible, setMapVisible] = useState(false);
  const pendingScrollRef = useRef(null);

  const toggleMap = () => {
    setMapVisible(!isMapVisible);
  };

  const navigateToSection = (id) => {
    if (isMapVisible) {
      pendingScrollRef.current = id;
      setMapVisible(false);
    } else {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      mirror: false,
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  useEffect(() => {
    if (!isMapVisible && pendingScrollRef.current) {
      const targetId = pendingScrollRef.current;
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
      pendingScrollRef.current = null;
    }
  }, [isMapVisible]);

  return (
    <div className="overflow-x-hidden">
      <Header
        onMapClick={toggleMap}
        isMapVisible={isMapVisible}
        navigateToSection={navigateToSection}
      />

      {isMapVisible ? (
        <Map isVisible={isMapVisible} toggleMap={toggleMap} />
      ) : (
        <main>
          <img
            className="absolute top-0 right-0 opacity-60 -z-10"
            src="/gradient.png"
            alt="Gradient-img"
          />
          <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_1500px_35px_#91C8E4] -rotate-[30deg] -z-10"></div>

          <div id="hero">
            <Hero />
          </div>
          <div id="profile">
            <Profile />
          </div>
          <div id="geographical">
            <Geographical />
          </div>
          <div id="facilities">
            <Facilities />
          </div>
          <div id="statistics">
            <Statistics />
          </div>
          <div id="documentation">
            <Documentation />
          </div>
          <div>
            <Team />
          </div>

          <Footer />
        </main>
      )}
    </div>
  );
}