import React, { useRef, useState, useEffect } from 'react'
import styles from "../style";
import { Footer } from "../components";
import { Navbar, Hero, Listperusahaan } from "../components/detail_perusahaan";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { gojek, gps, req, bg } from "../assets";
import "@fontsource/dm-sans";
import '@fontsource/libre-baskerville';
import axios from 'axios';


const useIsVisible = (ref) => {
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
            const { current: observedElement } = ref;
            const observer = new IntersectionObserver(
                  ([entry]) => {
                        setIsVisible(entry.isIntersecting);
                  },
                  {
                        root: null, // viewport
                        rootMargin: '0px', // no margin
                        threshold: 0.5, // 50% of the element is visible
                  }
            );

            if (observedElement) {
                  observer.observe(observedElement);
            }

            return () => {
                  if (observedElement) {
                        observer.unobserve(observedElement);
                  }
            };
      }, [ref]);

      return isVisible;
};

const Detailperusahaan = () => {
      const location = useLocation()
      const params = useParams()
      const ref = useRef();
      const { id } = params;
      const [companyName, setCompanyName] = useState('')
      const [address, setAddress] = useState('')
      const [image, setImage] = useState('')
      const [loaded, setLoaded] = useState(false)

      const isVisible = useIsVisible(ref);
      useEffect(() => {

            async function fetchData() {
                  const data = await axios.get('https://goship-apii.vercel.app/api/perusahaan/' + id)
                  console.log("🚀 ~ useEffect ~ data:", data.data[0])
                  setCompanyName(data.data[0].nama_perusahaan)
                  setAddress(data.data[0].alamat)
                  setImage(data.data[0].logo_perusahaan)
            }
            fetchData()

      }, [])

      useEffect(() => {
            setLoaded(true)
      }, [companyName])


      return (
            <>

                  <div className={` overflow-visible ${styles.flexStart} `}>
                        <div className={`${styles.boxWidth}`}>
                              <div className=" pb-16">
                                    <Navbar />
                              </div>
                              <div ref={ref} className={`transition-opacity ease-in duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                                    <div className={``} style={{ backgroundImage: `url(${bg})` }}>
                                          <section id="about" className=" flex md:flex-row flex-col">
                                                <div className={` flex-col py-28 px-16`}>
                                                      <div className={`  ${styles.flexCenter} md:my-0 my-10 relative`}>
                                                            <img src={image} alt="billing" className=" w-72  z-[5]" />
                                                      </div>
                                                </div>
                                                <div className={`  font-libre flex ${styles.flexCenter} md:my-0 my-10 relative px-20`}>
                                                      <div className={`  font-libre ${styles.flexStart} flex-col pr-22 `}>
                                                            <div className=" flex-row items-center justify-between w-full font-libre">
                                                                  <div className=" font-libre ml-2 font-semibold text-black ss:text-[60px]">
                                                                        {companyName}
                                                                  </div>
                                                            </div>
                                                            <div className="flex flex-row justify-between items-center w-full py-2 font-libre">
                                                                  <img src={gps} className='pr-10' alt="" />
                                                                  <div className="text-dimBlack flex-1 font-semibold ss:text-[30px] text-black ss:leading-[25.8px]">
                                                                        Location<br className="sm:block hidden ]" />{" "}
                                                                        <p className="font-sans max-w-[800px] text-[20px] py-2 ">{address}</p>{" "}
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
                              </div>
                        </div>
                  </div>

                  <div className={` py-28  ${styles.flexStart} `}>
                        <div className={`${styles.boxWidth}`}>
                              <Listperusahaan />
                        </div>
                  </div>

                  <div>
                        <div className={`${styles.flexCenter} `}>
                              <div className={`${styles.boxWidth}`}>
                                    <Footer />
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default Detailperusahaan