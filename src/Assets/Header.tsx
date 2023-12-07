import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';

const Header: React.FC = () => {
    const [isHidden, setHidden] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleMenu = () => {
        setHidden(!isHidden);
    }

    const handleLogout = () => {
        const shouldLogout = window.confirm("Apakah Anda yakin ingin logout?");
        if (shouldLogout) {
            sessionStorage.clear()
            console.log('User logged out.');
            window.location.href = "/login? "
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setHidden(true);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header className="px-11 shadow-2xl bg-gradient-to-br text-white from-gray-800 to-gray-600 text-gray-800 p-2 flex justify-between items-center shadow-md">
            <Link to={"/tourists"} className="text-lg text-white font-extrabold font-serif text-shadow-lg">
                Tourist App
            </Link>

            <div className="flex items-center space-x-4">
                <Menu />
                <div className="relative" ref={dropdownRef}>
                    <button onClick={handleMenu} className={`text-gray-300 p-2 px-4  active:outline-none hover:bg-purple-600 hover:text-white  ${isHidden?' ':'text-white bg-purple-600 rounded '}  hover:rounded`} >
                        <FontAwesomeIcon icon={faUser} />
                    </button>

                    <div className={`absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg ${isHidden && 'hidden'}`}>
                        <ul className="py-2">
                            <li>
                                <Link to="/user/profile" className="flex items-center px-4 py-2 text-white hover:bg-gray-600">
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-4 py-2 text-white hover:bg-gray-600 w-full text-left"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
