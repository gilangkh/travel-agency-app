import React, { useState } from 'react';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, } from 'react-router-dom';
import Input from '../../Assets/Input';
import Button from '../../Assets/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')
  const handleBlur = (field: String) => {
    switch (field) {
      case 'email':
        setEmailError(!email.trim());
        break;
      case 'password':
        setPasswordError(!email.trim())
    }
  }

  const handleLogin = async () => {
    try {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
      };

      const response = await fetch("https://biroperjalanan.datacakra.com/api/authaccount/login", requestOptions);
      const result = await response.json();
      if (!response.ok) {
        console.error('Login failed:', result);
        setLoginError(true)
        setLoginMessage(result.message)
        return;

      }

      const token = result.data.Token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem('id', result.data.Id)
      let url = sessionStorage.getItem('url')
      if (!url) {
        window.location.href = '/tourists'
        return
      }
      window.location.href = `/${url}`

      alert(url)
    } catch (error) {
      console.error('Error during login:', error);

    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-200 to-gray-50">
      <div className="bg-blue-50 p-8 rounded shadow-md w-96">
        <h2 className="text-3xl text-blue-500 font-bold text-center mb-6">Login</h2>
        <form className="space-y-4">
          {loginError && <p className='text-red-500'>{loginMessage}</p>}
          <Input
            id={''}
            name={' '}
            label="Email"
            icon={faEnvelope}
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError(false)
            }}
            onBlur={() => handleBlur('email')}
            error={emailError}
          />
          <Input
            id={''}
            name={' '}
            label="Password"
            icon={faLock}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            onBlur={() => handleBlur('password')}
            error={passwordError}
          />
          <Button colors={['from-green-400 to-blue-500', 'from-orange-500 hover:to-red-800']} text="Masuk" onClick={handleLogin} />

          <hr className="my-4 bg border-t border-gray-300" />
          <div className="text-center ">
            <p className="text-gray-700 my-5">Belum punya akun?</p>
            <Link
              className="text-white bg-gradient-to-bl from-green-500 to-lime-300 rounded py-2 px-10  font-bold hover:scale-[1.11] hover:from-green-700 hover:to-lime-500 active:scale-[1.01] focus:outline-none"
              to={'/register? '}
            >
              Daftar disini
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



