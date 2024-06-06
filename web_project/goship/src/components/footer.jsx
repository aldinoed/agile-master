import React from 'react'
import { socialMedia } from "../constant";
import styles from "../style";
import { logo2 } from "../assets";

const Footer = () => {
      document.addEventListener('contextmenu', event => event.preventDefault());
      useEffect(() => {
            const handleKeyDown = (event) => {
                  if (event.ctrlKey || event.shiftKey) {
                        event.preventDefault();
                  }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                  document.removeEventListener('keydown', handleKeyDown);
            };
      }, []);
      return (

            <div className={`bg-orange w-full flex justify-between items-center md:flex-row xs:flex-col sm:px-32 xs:px-6  border-t-[1px]`}>
                  <div className={` flex ${styles.flexCenter} md:my-0 my-5 relative items-center -pe-4`}>
                        <img src={logo2} alt="billing" className="w-[100%] h-100%] relative z-[5] xs:ms-10 md:me-0" />
                  </div>
                  <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
                        Goship Corporation © 2024
                  </p>

                  <div className="flex flex-row md:mt-0 mt-2 md:py-12 py-4">
                        {socialMedia.map((social, index) => (
                              <img
                                    key={social.id}
                                    src={social.icon}
                                    alt={social.id}
                                    className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                                          }`}
                                    onClick={() => window.open(social.link)}
                              />
                        ))}
                  </div>
            </div>
      )
}

export default Footer