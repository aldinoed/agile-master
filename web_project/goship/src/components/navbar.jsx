import { useState } from "react";
import { logo1 } from "../assets";
import { navLinks } from "../constant";
import ButtonSignIn from "./button_SignIn.jsx";

const Navbar = () => {
  const [active, setActive] = useState("Home");

  return (
    <nav className=" w-full flex py-6 justify-between items-center navbar">
      <img src={logo1} alt="Goship" className="w-[200px] h-[50px]" />

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
  );
};

export default Navbar;
