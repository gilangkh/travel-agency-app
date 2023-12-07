import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <ul className='flex'>

      <li>
        <Link to="/tourists" className="flex items-center text-white py-2 px-4 hover:bg-purple-600 hover:text-white hover:rounded">
          <span className="mr-2">&#127965;</span> Tourists
        </Link>
      </li>
      <li>
        <Link to="/tourists/create" className="flex items-center text-white py-2 px-4 hover:bg-purple-600 hover:text-white hover:rounded">
          <span className="mr-2 ">&#10133;</span> Add Tourist
        </Link>
      </li>
    </ul>

  );
};

export default Menu;
