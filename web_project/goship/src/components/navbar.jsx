import React, { useEffect, useState } from "react"; // Menambahkan impor React
import { logo1 } from "../assets";
import { navLinks } from "../constant";
import ButtonSignIn from "./button_SignIn.jsx";

const Navbar = () => {
  const [active, setActive] = useState("Home");

  const [ini_navbar, set_navbarnya] = useState(false);

  const scrollHeader = () => {
    if(window.scrollY >= 20){
      set_navbarnya(true)
    }else{
      set_navbarnya(false)
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', scrollHeader)
    return ()=>{
      window.addEventListener('scroll', scrollHeader)
    }
  },[])


  return (
    <div className={ini_navbar ? "fixed z-10 w-[100%] bg-orange-gradient-navbar" : "bg-[transparent]"}>
    <nav className="header px-16 w-full flex justify-between items-center navbar">
      <img src={logo1} alt="Goship" className="w-[150px] h-[40px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-orange" : "text-dimblack"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
        <div className="sm:px-10 px-5 sm:py-5 py-4">
            <ButtonSignIn />
        </div>
    </nav>
    </div>
  );
};

export default Navbar;
