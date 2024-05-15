import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';


const CardCompany = () => {
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://103.127.135.153:5000/api/perusahaan');
        const fetchedData = await response.json();
        setData(fetchedData); // Assuming the API response directly matches the structure of the provided JSON data
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error gracefully, e.g., display a fallback message
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id_perusahaan) => {
  
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="card--container">
      <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px', gridRowGap: '20px' }}>
        {data.slice(0, showMore ? data.length : 8).map((company, index) => (
            <div key={company.id_perusahaan} >
              <Link to="/detail">
              <button onClick={() => handleCardClick(company.id_perusahaan)} >
                <div className="rounded-lg overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] items-center justify-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="card-image ">
                    {company.logo_perusahaan && (
                        <img className='w-[100px] h-[100px] ss:text-[10px] rounded' src={company.logo_perusahaan} alt={company.nama_perusahaan} />
                    )}
                    {!company.logo_perusahaan && (
                        <div className="placeholder-icon">
                        <i className="fas fa-image-not-found"></i>
                        </div>
                    )}                   
                    </div>              
                </div>
                <div className="card-title ss:text-[12px] font-bold py-2">{company.nama_perusahaan}</div>
                </button>
                </Link>
            </div>
        ))}
        {data.length > 9 && (
        <div key="show-more" className="card ss:text-[30px] font-bold">
            <div className='md:h-[100px] h-max-[1200px] rounded-lg overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex items-center justify-center '>
                <div className='px-3 outline rounded-lg'>
                    <button className=''  onClick={toggleShowMore}>{showMore  ? '-' : '+' }</button>
                    
                </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default CardCompany;
