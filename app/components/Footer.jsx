import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#000d1f] py-3 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0">
          <p className="text-[#CCD6F6] text-sm text-center md:text-left font-stretch-semi-expanded">
            The app is made for students to study without distraction.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://linkedin.com/in/Karamjeet-Sony"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <Image src="/images/linkedin.png" alt="LinkedIn" width={24} height={24} className="filter brightness-0 invert" />
            </a>
            <a
              href="https://github.com/AayushVerma02"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <Image src="/images/github.png" alt="LinkedIn" width={24} height={24} className="filter brightness-0 invert" />
            </a>
          </div>
        </div>

        {/* Optional: Copyright Text */}
        <div className="mt-4 text-center">
          <p className="text-[#8892B0] text-xs">
            &copy; {new Date().getFullYear()} Focus Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;