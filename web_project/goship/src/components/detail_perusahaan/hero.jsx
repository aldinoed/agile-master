import React, { useEffect, useState } from 'react'
import styles from "../../style";
import { gojek, gps, req, bg } from "../../assets";
import "@fontsource/dm-sans";
import '@fontsource/libre-baskerville';

const Hero = (company) => {
      console.log("🚀 ~ Hero ~ company:", company)
      const [companyName, setCompanyName] = useState('');
      useEffect(() => {
            console.log("🚀 ~ Hero ~ company:", company.company)
            // setCompanyName(company.companyName)
      }, [])

      return (
            <>
                  <div className={``} style={{ backgroundImage: `url(${bg})` }}>
                        <section id="about" className=" flex md:flex-row flex-col">
                              <div className={` flex-col py-28 px-16`}>
                                    <div className={`  ${styles.flexCenter} md:my-0 my-10 relative`}>
                                          <img src={gojek} alt="billing" className=" w-72  z-[5]" />
                                    </div>
                              </div>
                              <div className={`  font-libre flex ${styles.flexCenter} md:my-0 my-10 relative px-20`}>
                                    <div className={`  font-libre ${styles.flexStart} flex-col pr-22 `}>
                                          <div className=" flex-row items-center justify-between w-full font-libre">
                                                <div className=" font-libre ml-2 font-semibold text-black ss:text-[60px]">
                                                      {company.nama_perusahaan}
                                                </div>
                                          </div>
                                          <div className="flex flex-row justify-between items-center w-full py-2 font-libre">
                                                <img src={gps} className='pr-10' alt="" />
                                                <div className="text-dimBlack flex-1 font-semibold ss:text-[30px] text-black ss:leading-[25.8px]">
                                                      Location<br className="sm:block hidden ]" />{" "}
                                                      <p className="font-sans max-w-[800px] text-[20px] py-2 ">{'heroCompany.alamat'}</p>{" "}
                                                </div>
                                          </div>
                                          <div className="font-sans flex flex-row justify-between items-center w-full ">
                                                <img src={req} className='px-3 pr-14' alt="" />
                                                <h1 className="font-sans text-dimBlack  flex-1 font-poppins font-semibold ss:text-[30px] text-black ss:leading-[35.8px] py-2">
                                                      Requirement<br className="sm:block hidden" />{" "}
                                                      <span className=" font-sans ss:text-[20px]">
                                                            <li>lulusan S1 </li>
                                                            <li>bisa ngoding</li>
                                                            <li>lulusan pens</li>
                                                      </span>{" "}
                                                </h1>
                                          </div>

                                    </div>
                              </div>
                        </section>
                  </div>
            </>)

}

export default Hero