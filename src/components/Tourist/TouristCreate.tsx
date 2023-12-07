import React, { useState } from 'react';
import Header from '../../Assets/Header';
import { faUser, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Input from '../../Assets/Input';

const TambahTourist: React.FC = () => {
  const [touristData, setTouristData] = useState({
    tourist_name: '',
    tourist_email: '',
    tourist_location: '',
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  
  const [isCreateError, setIsCreateError] = useState(false);
  const [createMessage, setCreateMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouristData({
      ...touristData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (field: string) => {
    switch (field) {
      case 'tourist_name':
        setNameError(!touristData.tourist_name.trim());
        break;
      case 'tourist_email':
        setEmailError(!touristData.tourist_email.trim());
        break;
      case 'tourist_location':
        setLocationError(!touristData.tourist_location.trim());
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for errors before submitting the form
    if (!nameError && !emailError && !locationError) {
      const token = sessionStorage.getItem('token');

      if (!token) {
        console.error('Token not found in sessionStorage');
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: new URLSearchParams(touristData).toString(),
      };

      try {
        const response = await fetch('https://biroperjalanan.datacakra.com/api/Tourist', requestOptions);
        const result = await response.json();
        
        if (!response.ok) {
          setIsCreateError(true);
          setCreateMessage(result.message);
          return;
        }

        console.log('Tourist created:', result);
        alert('Berhasil');
        window.location.href=`/tourists/${result.id}`
      } catch (error) {
        console.error('Error creating tourist:', error);
        setIsCreateError(true);
        setCreateMessage('An error occurred while creating the tourist.');
      }
    } else {
      alert('Form contains errors. Please check the fields.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-green-100 to-gray-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-3xl font-semibold mb-4">Tambah Turis</h2>
          <form onSubmit={handleSubmit}>
            <div className='pt-2'>
              <Input
                id="tourist_name"
                name="tourist_name"
                label="Nama"
                icon={faUser}
                type="text"
                value={touristData.tourist_name}
                onChange={handleChange}
                onBlur={() => handleBlur('tourist_name')}
                error={nameError}
              />
            </div>
            <div className="pt-2">
              <Input
                id="tourist_email"
                name="tourist_email"
                label="Email"
                icon={faEnvelope}
                type="email"
                value={touristData.tourist_email}
                onChange={handleChange}
                onBlur={() => handleBlur('tourist_email')}
                error={emailError}
              />
            </div>
            <div className="pt-2">
              <Input
                id="tourist_location"
                name="tourist_location"
                label="Lokasi"
                icon={faMapMarkerAlt}
                type="text"
                value={touristData.tourist_location}
                onChange={handleChange}
                onBlur={() => handleBlur('tourist_location')}
                error={locationError}
              />
            </div>
            {isCreateError && <p className="text-red-500">{createMessage}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-800 text-white px-4 py-2 my-8 mt-8 rounded-md hover:from-blue-600 hover:scale-[1.03] hover:to-indigo-900 focus:outline-none focus:bg-blue-600"
              >
                Tambah Turis
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TambahTourist;
