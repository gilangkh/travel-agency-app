import React, { useState, useEffect } from 'react';
import Header from '../../Assets/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TouristList: React.FC = () => {
  const [tourists, setTourists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 6;

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.error('Token not found in sessionStorage');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`https://biroperjalanan.datacakra.com/api/Tourist?page=${currentPage}&per_page=${pageSize}`, requestOptions);
        const data = await response.json();

        if (data && data.data) {
          setTourists(data.data);
          setTotalPages(data.total_pages);
        } else {
          console.error('Invalid response format:', data);
        }
      } catch (error) {
        console.error('Error fetching tourist list:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Header />
      <div className='bg-gray-200'>
        <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 text-2xl font-semibold mb-4 my-5 pt-20 "></div>
        <div className="flex justify-center my-8">
          {currentPage >= 1 && (
            <button
              className="mx-2 px-3 border-solid border-2 border-gray-600 text-gray-600 only: py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-600 hover:text-slate-50 active::outline-none active::bg-gray-600 text-sm"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          <span className="mx-2 px-3 py-1 bg-gray-500 text-white rounded-md">
            {currentPage}
          </span>

          {currentPage < totalPages && (
            <button
              className="mx-2 px-3 py-1 text-gray-600 border-solid border-2 border-gray-600 font-bold bg-gray-200 text-gray-800 rounded-md hover:bg-gray-600 hover:text-white active:outline-none active:first-letter::bg-blue-600 text-sm"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
        <div className='mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32 bg-gra '>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {tourists.map((tourist: any) => (
              <Link to={`/tourists/${tourist.id}`} key={tourist.id} className="bg-white p-4 rounded-md shadow-md hover:scale-105">
                <img
                  src={tourist.tourist_profilepicture}
                  alt={tourist.tourist_name}
                  className="w-full h-48 object-cover mb-2 rounded-md"
                />
                <h3 className="text-lg font-semibold mb-1">{tourist.tourist_name}</h3>
                <p className="text-gray-600 text-sm">{tourist.tourist_location}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TouristList;
