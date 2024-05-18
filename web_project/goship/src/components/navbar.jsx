import React, { useEffect, useState } from "react";
import { logo1 } from "../assets";
import { navLinks } from "../constant";
import ButtonSignIn from "./button_SignIn.jsx";
import { Link } from "react-router-dom";

const Navbar = (user) => {
      // console.log("🚀 ~ Navbar ~ loginState:", loginState)
      const [active, setActive] = useState("Home");
      const [iniNavbar, setIniNavbar] = useState(false);
      const loggedUser = user.user;

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
            <div className={`fixed z-10 w-full transition duration-300 ${iniNavbar ? 'bg-orange-gradient-navbar' : 'bg-transparent'}`}>
                  <nav className="header px-16 w-full flex justify-between items-center navbar">
                        <img src={logo1} alt="Goship" className="w-[150px] h-[40px]" />

                        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                              {navLinks.map((nav, index) => (
                                    <li
                                          key={nav.id}
                                          className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-orange" : "text-dimblack"
                                                } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                                          onClick={() => setActive(nav.title)}
                                    >
                                          <a href={`#${nav.id}`}>{nav.title}</a>
                                    </li>
                              ))}
                        </ul>
                  </nav>
            </div>
      );
};

export default Navbar;
