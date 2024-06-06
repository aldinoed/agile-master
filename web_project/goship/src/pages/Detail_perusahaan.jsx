import React, { useRef, useState, useEffect } from 'react'
import styles from "../style";
import { Footer, Navbar } from "../components";
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
      document.addEventListener('contextmenu', event => event.preventDefault());
      useEffect(() => {
            const handleKeyDown = (event) => {
                  if (event.ctrlKey) {
                        event.preventDefault();
                  }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                  document.removeEventListener('keydown', handleKeyDown);
            };
      }, []);

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

      // useEffect(() => {
      //       async function fetchData() {
      //             const data = await axios
      //       }
      // }, [])
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
      const [posisi, setPosisi] = useState([]);
      const [profil, setProfil] = useState(null)
      const [loaded, setLoaded] = useState(false)

      const isVisible = useIsVisible(ref);
      useEffect(() => {

            async function fetchData() {
                  const data = await axios.get('https://goship-apii.vercel.app/api/perusahaan/' + id)
                  console.log("🚀 ~ fetchData ~ data:", data)
                  setCompanyName(data.data[0].nama_perusahaan ?? '-');
                  setAddress(data.data[0].alamat ?? '-');
                  setImage(data.data[0].logo_perusahaan ?? '-');
                  setPosisi(data.data[0].posisi ?? '-');
                  setProfil(data.data[0].profil_perusahaan ?? '-');
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
                              <div className=" pb-16 ">
                                    <Navbar />
                              </div>
                              <div ref={ref} className={`transition-opacity ease-in duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                                    <div className={``} style={{ backgroundImage: `url(${bg})` }}>
                                          <section id="about" className=" flex flex-col md:flex-row ">
                                                <div className={` flex-col py-8 px-4 md:py-28 md:px-16 `}>
                                                      <div className={`  ${styles.flexCenter} md:my-0 my-10 relative`}>
                                                            <div className='bg-white border rounded-lg shadow '>
                                                                  <img style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }} src={image} alt="billing" className=" object-contain border rounded-lg w-72  z-[5]" />
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className={`  font-libre flex ${styles.flexCenter} md:my-0 my-10 relative px-4 md:px-20`}>
                                                      <div className={`  font-libre ${styles.flexStart} flex-col pr-22 `}>
                                                            <div className=" flex-row items-center justify-between w-full font-libre">
                                                                  <div className=" font-libre ml-2 font-semibold text-black text-[50px] ss:text-[60px]">
                                                                        {companyName}
                                                                  </div>
                                                            </div>
                                                            <div className="flex flex-row justify-between items-center w-full py-2 font-libre">
                                                                  <img src={gps} className='pr-10' alt="" />
                                                                  <div className="text-dimBlack flex-1 font-semibold text-[20px] ss:text-[30px] text-black ss:leading-[25.8px]">
                                                                        Lokasi<br className="sm:block hidden ]" />{" "}
                                                                        <p className="font-sans max-w-[800px] text-[20px] ss:text-[30px] py-2 ">{address}</p>{" "}
                                                                  </div>
                                                            </div>
                                                            <div className="flex flex-row justify-between items-center w-full font-libre">
                                                                  <div><i className="fas fa-building"></i></div>
                                                                  <h1 className="text-dimBlack flex-1 font-semibold text-[20px] ss:text-[30px] text-black ss:leading-[35.8px] py-2">
                                                                        Tentang Perusahaan<br className="sm:block hidden" />{" "}
                                                                        <span className=" font-sans text-[20px] ss:text-[30px]">
                                                                              {profil ?? '- '}
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
                                                      PERUSAHAAN KAMI <br className="sm:block hidden" />{" "}
                                                </h1>
                                          </div>
                                          <div className="flex flex-row justify-between items-center w-full">
                                                <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-black ss:leading-[75.8px] leading-[60px]">
                                                      <span className="text-black ">Dapatakan Informasi</span>{" "}
                                                      <span className="text-orange">Perusahaan Impian Anda</span>{" "}
                                                </h1>
                                          </div>
                                    </div>

                              </section>
                              <div className={`${styles.flexCenter} content-center items-center py-5`}>
                                    <div className="flex flex-col space-y-4 w-full px-4 md:px-20">
                                          {posisi.map((role, index) => (
                                                <RevealOnScroll>
                                                      <div className='py-6'>
                                                            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} key={index} className="flex flex-col md:flex-col rounded-lg md:w-auto">
                                                                  <div className="flex justify-between items-center p-4 bg-cream md:w-auto rounded-lg md:rounded-t-lg ">
                                                                        <h2 className="text-orange text-xl font-semibold mb-2 px-2 md:px-10 font-[500]">
                                                                              {role.nama_posisi}
                                                                        </h2>
                                                                        <div className="flex justify-center items-center bg-white px-4 py-2 rounded-lg max-h-[50px] max-w-[250px] max-h-[100px] w-auto">
                                                                              <p className=" flex justify-center md:items-center text-sm font-[500] text-[20px] "> {role.siswa.length} Mahasiswa</p>
                                                                        </div>
                                                                  </div>
                                                                  <div className="flex flex-wrap max-w-full p-4 md:p-8 bg-white rounded-b-lg md:rounded-b-none w-full">
                                                                        {role.siswa.map((siswa, index) => (
                                                                              <div
                                                                                    key={siswa.id_siswa}
                                                                                    className={`flex justify-start p-4 bg-white rounded-lg md:rounded-b-none w-full md:w-1/3 ${(index + 1) % 3 === 0 ? '' : ''
                                                                                          }`}
                                                                              >
                                                                                    <div
                                                                                          style={{
                                                                                                width: '300px', // Set fixed width for the card
                                                                                                boxShadow:
                                                                                                      'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
                                                                                          }}
                                                                                          className="flex flex-row rounded-lg shadow-md md:w-auto md:flex-row max-w-[300px]"
                                                                                    >
                                                                                          <div className="w-20 h-18 md:w-20 md:h-18 overflow-hidden pr-2 rounded-t-lg md:rounded-l-lg md:rounded-t-none relative">
                                                                                                <img
                                                                                                      src={siswa.jenis_kelamin === 'Laki-laki' ? male : female}
                                                                                                      className="rounded object-cover w-full h-full"
                                                                                                      alt=""
                                                                                                />
                                                                                          </div>
                                                                                          <div className="flex flex-col justify-center items-start py-2 bg-white rounded-b-lg md:rounded-r-lg md:rounded-b-none md:w-auto">
                                                                                                <a href={'/detail-student/' + siswa.id_siswa}>
                                                                                                      <p className="font-[700] truncate" style={{ maxWidth: '200px' }}>
                                                                                                            {siswa.nama_siswa}
                                                                                                      </p>
                                                                                                </a>
                                                                                                <div className="flex-row flex items-center">
                                                                                                      <img src={email} className="pr-2 w-8 h-4" alt="" />
                                                                                                      <p className="text-dimBlack truncate" style={{ maxWidth: '200px' }}>
                                                                                                            {siswa.email}
                                                                                                      </p>
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