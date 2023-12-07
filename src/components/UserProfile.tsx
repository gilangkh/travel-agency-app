import React, { useState, useEffect } from 'react';
import Header from '../Assets/Header';

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
  });

  const token = sessionStorage.getItem('token');

  const handleUser = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const id = sessionStorage.getItem('id')
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      const response = await fetch(`https://biroperjalanan.datacakra.com/api/users/${id}`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to fetch user data response tidak oke');
      }

      const result = await response.json();
      setUser(result);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <>
      <Header />
      <div className='min-h-screen flex items-center  bg-gradient-to-br from-slate-50 via-gray-100 to-slate-50-50'>
        <div className="min-h-screen flex items-center justify-center w-full">
          <div className="bg-blue-50 p-8 rounded shadow-md sm:w-96 w-full mx-4">
            <h2 className="text-3xl text-gray-600 font-bold text-center mb-6">User Profile</h2>
            <div className="flex flex-col items-center space-y-4">
              <img
                src={user.avatar}
                alt="Profile"
                className="rounded-full h-32 w-32 object-cover mb-4"
              />
              <div className="text-center">
                <p className="text-gray-900 shadow-sm text-2xl font-extrabold font-serif">{user.name}</p>
                <p className="text-gray-700 text-lg">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
