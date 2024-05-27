import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CardCompany = () => {
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://103.127.135.153:5000/api/perusahaan');
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id_perusahaan) => {
    // Handle card click
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div style={{ padding: '16px', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px',
        }}
      >
        {data.slice(0, showMore ? data.length : 8).map((company, index) => (
          <div key={company.id_perusahaan} style={{ textAlign: 'center' }}>
            <Link to="/detail">
              <button
                onClick={() => handleCardClick(company.id_perusahaan)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                  borderRadius: '12px',
                  boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)',
                  backgroundColor: 'white',
                  width: '100%',
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  {company.logo_perusahaan ? (
                    <img
                      src={company.logo_perusahaan}
                      alt={company.nama_perusahaan}
                      style={{ width: '100px', height: '100px', borderRadius: '8px' }}
                    />
                  ) : (
                    <div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                      <i className="fas fa-image-not-found" style={{ fontSize: '24px', color: '#ccc' }}></i>
                    </div>
                  )}
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'black' }}>{company.nama_perusahaan}</div>
              </button>
            </Link>
          </div>
        ))}
        {data.length > 8 && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={toggleShowMore}
              style={{
                width: '100%',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)',
                backgroundColor: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              {showMore ? '-' : '+'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCompany;
