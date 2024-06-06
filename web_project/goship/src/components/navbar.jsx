import React, { useEffect, useState } from "react";
import { logo1 } from "../assets";
import { navLinks } from "../constant";
import ButtonSignIn from "./button_SignIn.jsx";
import { Link } from "react-router-dom";

const Navbar = (user) => {
      // console.log("🚀 ~ Navbar ~ loginState:", loginState)
      const [isOpen, setIsOpen] = React.useState(false);
      const [active, setActive] = useState("Home");
      const [iniNavbar, setIniNavbar] = useState(false);
      const loggedUser = user.user;

      const scrollHeader = () => {
            console.log(window.scrollY);
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
            <div className={`py-2 fixed z-[1000] w-full transition duration-300 ${isOpen ? 'bg-orange-gradient-navbar' : iniNavbar ? 'bg-transparent backdrop-blur-lg' : 'bg-transparent'}`}>
                  <nav className="px-6 sm:px-16 w-full flex justify-between items-center navbar">
                        <img src={logo1} alt="Goship" className="xs:w-[130px] sm:w-[150px] h-[40px]" />

                        <div className="flex sm:hidden">
                              <button className="text-orange-500" onClick={() => setIsOpen(!isOpen)}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                              </button>
                        </div>

                        <ul className={`list-none sm:flex hidden justify-end items-center flex-1 ${isOpen ? 'block' : 'hidden'} sm:block`}>
                              {navLinks.map((nav, index) => (
                                    <li
                                          key={nav.id}
                                          className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-orange" : "text-dimblack"} ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                                          onClick={() => setActive(nav.title)}
                                    >
                                          <a href={`/#${nav.id}`}>{nav.title}</a>
                                    </li>
                              ))}
                              <div className="sm:px-10 px-5 sm:py-3">
                                    {loggedUser !== null ? <Link to='/student-profile' state={{ user: loggedUser }}>{loggedUser}</Link> : <ButtonSignIn />}
                              </div>
                        </ul>
                  </nav>

                  <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'} bg-orange-gradient-navbar`}>
                        <ul className="list-none flex flex-col items-center">
                              {navLinks.map((nav, index) => (
                                    <li
                                          key={nav.id}
                                          className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-orange" : "text-dimblack"} my-2`}
                                          onClick={() => setActive(nav.title)}
                                    >
                                          <a href={`#${nav.id}`}>{nav.title}</a>
                                    </li>
                              ))}
                              <div className="px-5 py-3">
                                    {loggedUser !== null ? <Link to='/student-profile' state={{ user: loggedUser }}>{loggedUser}</Link> : <ButtonSignIn />}
                              </div>
                        </ul>
                  </div>
            </div>
      );
};

export default Navbar;
