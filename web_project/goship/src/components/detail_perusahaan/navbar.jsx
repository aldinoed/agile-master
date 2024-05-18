import React, { useEffect, useState } from "react";
import { logo1, gojek } from "../../assets";
import { navLinks_detail } from "../../constant";


const Navbar = () => {
      const [active, setActive] = useState("about");
      const [iniNavbar, setIniNavbar] = useState(false);

      const scrollHeader = () => {
            if (window.scrollY >= 20) {
                  setIniNavbar(true);
            } else {
                  setIniNavbar(false);
            }
      };

      useEffect(() => {
            window.addEventListener('scroll', scrollHeader);
            return () => {
                  window.removeEventListener('scroll', scrollHeader);
            };
      }, []);

      return (
            <div className={` fixed z-10 w-full transition duration-300 ${iniNavbar ? 'bg-orange-gradient-navbar' : 'bg-transparent'}`}>
                  <nav className="header px-16 w-full flex justify-between items-center navbar">
                        <img src={logo1} alt="Goship" className="w-[150px] h-[40px] " />

                        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                              {navLinks_detail.map((nav, index) => (
                                    <li
                                          key={nav.id}
                                          className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-orange" : "text-dimblack"
                                                } ${index === navLinks_detail.length - 1 ? "mr-0" : "mr-10"}`}
                                          onClick={() => setActive(nav.title)}
                                    >
                                          <a href={`#${nav.id}`}>{nav.title}</a>
                                    </li>
                              ))}
                              {/* <p className="pl-20 ">
          halo, ridwan
        </p>
        <div className="sm:pl-2 sm:py-3">
          <img src={gojek} alt="Goship" className="w-[40px] h-[40px]" />
        </div> */}
                        </ul>
                  </nav>
            </div>
      );
};

export default Navbar;
