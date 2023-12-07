import React, { useEffect, useState } from 'react';
import Header from '../../Assets/Header';

const TouristDetail: React.FC = () => {
  const [tourist, setTourist] = useState<any>({});
  const [isEditing, setEditing] = useState(false);
  const [updatedTourist, setUpdatedTourist] = useState<any>({});
  const token = sessionStorage.getItem('token');
  const id = window.location.pathname.split('/')[2];

  const handleTourist = async (id: string) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    try {
      const response = await fetch(`https://biroperjalanan.datacakra.com/api/Tourist/${id}`, requestOptions);
      const result = await response.json();
      setTourist(result);
      setUpdatedTourist(result);
    } catch (error) {
      console.error('Error fetching tourist detail:', error);
    }
  };

  const handleUpdateTourist = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: new URLSearchParams({
        tourist_email: updatedTourist.tourist_email,
        tourist_location: updatedTourist.tourist_location,
        tourist_name: updatedTourist.tourist_name,
      }),
    };

    try {
      const response = await fetch(`https://biroperjalanan.datacakra.com/api/Tourist/${id}`, requestOptions);
      const result = await response.json();
      setTourist(result);
      setEditing(false);
    } catch (error) {
      console.error('Error updating tourist data:', error);
    }
  };

  const handleDeleteTourist = async () => {
    const confimDelete = window.confirm("apakah ada yakin ingin menghapus tourist ini?")

    if (confimDelete) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: new URLSearchParams({
          tourist_email: updatedTourist.tourist_email,
          tourist_location: updatedTourist.tourist_location,
          tourist_name: updatedTourist.tourist_name,
        }),
      };

      try {
        const response = await fetch(`https://biroperjalanan.datacakra.com/api/Tourist/${id}`, requestOptions);
        const result = response.json()
        console.log(result)
        alert("response nya apa")
        window.location.href = '/tourists';
      } catch (error) {
        console.error('Error deleting tourist:', error);
      }
    }
  };

  useEffect(() => {
    handleTourist(id);
  }, [id]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-green-100 to-gray-50">
        <div className="bg-white p-8  rounded shadow-md max-w-2xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="flex justify-center items-center">
            <img
              src={tourist.tourist_profilepicture}
              alt={tourist.tourist_name}
              className="w-48 h-48 object-cover rounded-full"
            />
          </div>
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  className="text-3xl font-bold italic mb-4 w-full border-b-2 border-gray-300"
                  value={updatedTourist.tourist_name}
                  onChange={(e) => setUpdatedTourist({ ...updatedTourist, tourist_name: e.target.value })}
                />
                <input
                  type="text"
                  className="text-gray-600 italic font-[-apple-system] text-sm mb-2 w-full border-b-2 border-gray-300"
                  value={updatedTourist.tourist_location}
                  onChange={(e) => setUpdatedTourist({ ...updatedTourist, tourist_location: e.target.value })}
                />
                <input
                  type="text"
                  className="text-gray-600 italic text-sm mb-2 w-full border-b-2 border-gray-300"
                  value={updatedTourist.tourist_email}
                  onChange={(e) => setUpdatedTourist({ ...updatedTourist, tourist_email: e.target.value })}
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold italic mb-4">{tourist.tourist_name}</h2>
                <p className="text-gray-600 italic font-[-apple-system] text-sm mb-2">Location: {tourist.tourist_location}</p>
                <p className="text-gray-600 italic text-sm mb-2">Email: {tourist.tourist_email}</p>
              </>
            )}

            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    onClick={handleUpdateTourist}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                    onClick={handleDeleteTourist}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-800  "
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TouristDetail;
