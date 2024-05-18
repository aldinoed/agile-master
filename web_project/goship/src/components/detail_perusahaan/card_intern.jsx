import React, { useRef, useState, useEffect } from 'react';
import { gojek, email } from "../../assets";

const InternData = [
      {
            id: 1,
            nama: 'Anantasya Aghni',
            program: 'FRONTEND DEVELOPER',
            email: 'anantasya12@gmail.com',
      },
      {
            id: 2,
            nama: 'Budi Santoso',
            program: 'BACKEND DEVELOPER',
            email: 'budisantoso@example.com',
      },
      {
            id: 3,
            nama: 'Citra Putri',
            program: 'TESTING SOFTWARE',
            email: 'citraputri123@gmail.com',
      },
      {
            id: 4,
            nama: 'Dimas Setiawan',
            program: 'FRONTEND DEVELOPER',
            email: 'dimas.setiawan@mail.com',
      },
      {
            id: 5,
            nama: 'Eka Rahmawati',
            program: 'BACKEND DEVELOPER',
            email: 'ekarahmawati@yahoo.com',
      },
      {
            id: 6,
            nama: 'Eka haha',
            program: 'BACKEND DEVELOPER',
            email: 'ekarahmawati@yahoo.com',
      },
      {
            id: 7,
            nama: 'yudhis',
            program: 'BACKEND DEVELOPER',
            email: 'ekarahmawati@yahoo.com',
      },
      {
            id: 8,
            nama: 'bayu',
            program: 'BACKEND DEVELOPER',
            email: 'ekarahmawati@yahoo.com',
      },
      {
            id: 9,
            nama: 'rama',
            program: 'BACKEND DEVELOPER',
            email: 'ekarahmawati@yahoo.com',
      },
];


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

      const classes = `transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`;

      return (
            <div ref={ref} className={classes}>
                  {children}
            </div>
      );
};


const CardIntern = () => {

      const groupedInterns = InternData.reduce((acc, intern) => {
            const program = intern.program;
            acc[program] = acc[program] || []; // Initialize empty array if program doesn't exist
            acc[program].push(intern);
            return acc;
      }, {});

      return (
            <div className="flex flex-col space-y-4">
                  {Object.entries(groupedInterns).map(([program, interns]) => (
                        <RevealOnScroll>
                              <div className='py-6'>
                                    <div key={program} className=" flex-row rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.08)] md:w-auto md:flex-row">
                                          <div className="flex justify-between p-4 bg-cream md:w-auto rounded-lg ">
                                                <h2 className="text-orange text-xl font-semibold mb-2 px-10 font-[500]">
                                                      {program}
                                                </h2>
                                                <div className="flex justify-center bg-white px-4 py-2 rounded-lg">
                                                      <p className=" text-sm font-[500] text-[20px]"> {interns.length} people</p>
                                                </div>
                                          </div>
                                          <div className="  flex flex-wrap max-w-full p-20 bg-white rounded-b-lg  w-[1200px]">
                                                {interns.map((intern, index) => (
                                                      <div
                                                            key={intern.id}
                                                            className={`flex justify-start p-4 bg-white rounded-lg md:rounded-b-none w-full md:w-1/3 ${(index + 1) % 3 === 0 ? '' : ''
                                                                  }`}
                                                      >
                                                            <div className="flex flex-col rounded-lg shadow-md md:w-auto md:flex-row">
                                                                  <div className="justify-start px-2 py-2 rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                                                                        <img src={gojek} className="object-cover w-20 h-18" alt="" />
                                                                  </div>
                                                                  <div className="flex flex-col justify-start py-2 pr-10 bg-white rounded-b-lg md:rounded-r-lg md:rounded-b-none md:w-auto">
                                                                        <p className="font-[700]">{intern.nama}</p>
                                                                        <div className="flex-row flex items-center ">
                                                                              <img src={email} className="pr-2" alt="" />
                                                                              <p className="text-dimBlack">{intern.email}</p>
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
      );
};

export default CardIntern;
