import React, { useRef, useState, useEffect } from 'react'
import styles from "../style";
import { Footer } from "../components";
import { Navbar, Hero, Listperusahaan } from "../components/detail_perusahaan";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { gojek, gps, req, bg, email, male, female } from "../assets";
import "@fontsource/dm-sans";
import '@fontsource/libre-baskerville';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RevealOnScroll = ({ children }) => {
      const [isVisible, setIsVisible] = useState(false);
      const ref = useRef(null);

      useEffect(() => {
            const scrollObserver = new IntersectionObserver(([entry]) => {
                  if (entry.isIntersecting || entry.boundingClientRect.top <= 0) {
                        setIsVisible(true);
                  } else {
                        setIsVisible(false);
                  }
            }, { threshold: 0.5 });

            scrollObserver.observe(ref.current);

            return () => {
                  if (ref.current) {
                        // eslint-disable-next-line react-hooks/exhaustive-deps
                        scrollObserver.unobserve(ref.current);
                  }
            };
      }, []);

      useEffect(() => {
            async function fetchData() {
                  const data = await axios
            }
      }, [])
      const classes = `transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`;

      return (
            <div ref={ref} className={classes}>
                  {children}
            </div>
      );
}

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
      const [posisi, setPosisi] = useState([])
      const [loaded, setLoaded] = useState(false)

      const isVisible = useIsVisible(ref);
      useEffect(() => {

            async function fetchData() {
                  const data = await axios.get('https://goship-apii.vercel.app/api/perusahaan/' + id)
                  setCompanyName(data.data[0].nama_perusahaan)
                  setAddress(data.data[0].alamat)
                  setImage(data.data[0].logo_perusahaan)
                  setPosisi(data.data[0].posisi)
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
                              <section id="" className={` flex md:flex-row flex-col`}>
                                    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-10`}>
                                          <div className="flex flex-row justify-between items-center w-full">
                                                <h1 className="flex-1 font-poppins font-semibold ss:text-[30px] text-orange ss:leading-[50.8px]">
                                                      OUR COMPANIES <br className="sm:block hidden" />{" "}
                                                </h1>
                                          </div>
                                          <div className="flex flex-row justify-between items-center w-full">
                                                <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-black ss:leading-[75.8px] leading-[60px]">
                                                      <span className="text-black ">Get information about your</span>{" "}
                                                      <span className="text-orange">dream company</span>{" "}
                                                </h1>
                                          </div>
                                    </div>

                              </section>
                              <div className={`${styles.flexCenter} content-center items-center py-5`}>
                                    <div className="flex flex-col space-y-4">
                                          {posisi.map((role, index) => (
                                                <RevealOnScroll>
                                                      <div className='py-6'>
                                                            <div key={index} className=" flex-row rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.08)] md:w-auto md:flex-row">
                                                                  <div className="flex justify-between p-4 bg-cream md:w-auto rounded-lg ">
                                                                        <h2 className="text-orange text-xl font-semibold mb-2 px-10 font-[500]">
                                                                              {role.nama_posisi}
                                                                        </h2>
                                                                        <div className="flex justify-center bg-white px-4 py-2 rounded-lg">
                                                                              <p className=" text-sm font-[500] text-[20px]"> {role.siswa.length} Mahasiswa</p>
                                                                        </div>
                                                                  </div>
                                                                  <div className="  flex flex-wrap max-w-full p-20 bg-white rounded-b-lg  w-[1200px]">
                                                                        {role.siswa.map((siswa, index) => (
                                                                              <div
                                                                                    key={siswa.id_siswa}
                                                                                    className={`flex justify-start p-4 bg-white rounded-lg md:rounded-b-none w-full md:w-1/3 ${(index + 1) % 3 === 0 ? '' : ''
                                                                                          }`}
                                                                              >
                                                                                    <div className="flex flex-col rounded-lg shadow-md md:w-auto md:flex-row">
                                                                                          <div className="justify-start px-2 py-2 rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                                                                                                <img src={siswa.jenis_kelamin == 'Laki-laki' ? male : female} className="rounded object-cover w-20 h-18" alt="" />
                                                                                          </div>
                                                                                          <div className="flex flex-col justify-start py-2 pr-10 bg-white rounded-b-lg md:rounded-r-lg md:rounded-b-none md:w-auto">
                                                                                                <a href={'/detail-student/' + siswa.id_siswa}><p className="font-[700]">{siswa.nama_siswa}</p></a>
                                                                                                <div className="flex-row flex items-center ">
                                                                                                      <img src={email} className="pr-2" alt="" />
                                                                                                      <p className="text-dimBlack">{siswa.email}</p>
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        ))}
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </RevealOnScroll>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </div >

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