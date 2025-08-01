"use client";
import 'boxicons/css/boxicons.min.css';
import MagicButton from './MagicButton';

const Header = ({ onMapClick, isMapVisible, navigateToSection }) => {
    const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
    };

    const handleMobileLinkClick = (id) => {
        const mobileMenu = document.getElementById('mobileMenu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        navigateToSection(id);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center py-4 px-4 lg:px-20 bg-opacity-90 backdrop-blur-lg shadow-lg font-['Poppins']">
            <a href="/" className="flex items-center text-3xl md:text-4xl lg:text-2xl font-bold m-0 text-gradient tracking-tight" data-aos="fade-down" data-aos-duration="1500">
                <img src="logo.png" alt="Logo Sumber Arum" className="h-12 w-auto mr-3" />
                Source.
            </a>

            {/* Navigasi Desktop */}
            <nav className="hidden md:flex items-center gap-10 group"> {/* Add group class here */}
                <button onClick={() => navigateToSection("profile")} className="text-base tracking-wide transition-all duration-300 text-gray-200 group-hover:text-gray-400 group-hover:blur-[1px] hover:!text-blue-300 hover:!blur-none z-50" data-aos="fade-down" data-aos-duration="1000">Profil</button>
                <button onClick={() => navigateToSection("geographical")} className="text-base tracking-wide transition-all duration-300 text-gray-200 group-hover:text-gray-400 group-hover:blur-[1px] hover:!text-blue-300 hover:!blur-none z-50" data-aos="fade-down" data-aos-duration="2500">Geografis</button>
                <button onClick={() => navigateToSection("facilities")} className="text-base tracking-wide transition-all duration-300 text-gray-200 group-hover:text-gray-400 group-hover:blur-[1px] hover:!text-blue-300 hover:!blur-none z-50" data-aos="fade-down" data-aos-duration="2000">Fasilitas Umum</button>
                <button onClick={() => navigateToSection("documentation")} className="text-base tracking-wide transition-all duration-300 text-gray-200 group-hover:text-gray-400 group-hover:blur-[1px] hover:!text-blue-300 hover:!blur-none z-50" data-aos="fade-down" data-aos-duration="3000">Dokumentasi</button>
            </nav>

            {/* Tombol MagicButton Desktop */}
            <div className="hidden md:block" data-aos="fade-down" data-aos-duration="1500">
                <MagicButton
                    title={isMapVisible ? "Tutup Peta" : "Lihat Peta"}
                    icon={<i className={`bx ${isMapVisible ? 'bx-x' : 'bx-map'} text-xl`} />}
                    position="right"
                    handleClick={onMapClick}
                    otherClasses="rounded-full"
                />
            </div>

            {/* Tombol Menu Mobile */}
            <button onClick={toggleMobileMenu} className="md:hidden text-3xl p-2 z-50 text-white focus:outline-none">
                <i className="bx bx-menu"></i>
            </button>

            {/* Menu Mobile */}
            <div id="mobileMenu" className='hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-opacity-95 backdrop-blur-md'>
                <nav className="flex flex-col gap-6 items-center pt-8">
                    <button onClick={() => handleMobileLinkClick("profile")} className="text-lg tracking-wide text-gray-100 hover:text-blue-300 transition-colors duration-200">Profil</button>
                    <button onClick={() => handleMobileLinkClick("geographical")} className="text-lg tracking-wide text-gray-100 hover:text-blue-300 transition-colors duration-200">Kondisi Geografis</button>
                    <button onClick={() => handleMobileLinkClick("facilities")} className="text-lg tracking-wide text-gray-100 hover:text-blue-300 transition-colors duration-200">Fasilitas Umum</button>
                    <button onClick={() => handleMobileLinkClick("documentation")} className="text-lg tracking-wide text-gray-100 hover:text-blue-300 transition-colors duration-200">Dokumentasi</button>

                    {/* Tombol MagicButton Mobile */}
                    <MagicButton
                        title={isMapVisible ? "Close Map" : "View Map"}
                        icon={<i className={`bx ${isMapVisible ? 'bx-x' : 'bx-map'} text-xl`} />}
                        position="right"
                        handleClick={() => {
                            onMapClick();
                            const mobileMenu = document.getElementById('mobileMenu');
                            if (!mobileMenu.classList.contains('hidden')) {
                                mobileMenu.classList.add('hidden');
                            }
                        }}
                        otherClasses="rounded-full px-4 py-2 text-sm w-auto"
                    />
                </nav>
            </div>
        </header>
    );
};

export default Header;