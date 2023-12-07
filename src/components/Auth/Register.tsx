import React, { useState } from 'react';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Input from '../../Assets/Input';
import Button from '../../Assets/Button';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [registError, setRegistError] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')


  const handleBlur = (field: string) => {
    switch (field) {
      case 'email':
        setEmailError(!email.trim());
        break;
      case 'password':
        setPasswordError(!password.trim());
        break;
      case 'name':
        setNameError(!name.trim());
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    setEmailError(!email.trim());
    setPasswordError(!password.trim());
    setNameError(!name.trim());

    const isFormValid = !emailError && !passwordError && !nameError;
    setFormValid(isFormValid);

    if (!isFormValid) {
      return;
    }

    try {
      const requestOptions = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ email, password, name }),
      };

      const response = await fetch('https://biroperjalanan.datacakra.com/api/authaccount/registration', requestOptions
      );

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        setRegistError(true)
        setResponseMessage(result.message)
        return
      }

      window.location.href = 'login? '
    } catch (error) {
      console.log('error', error);
      alert('fetch error :' + error)
    }

    setEmailError(false);
    setPasswordError(false);
    setNameError(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-green-100 to-gray-50">
      <div className="bg-blue-50  p-8 rounded shadow-md w-96">
        <h2 className="text-3xl text-green-500 font-bold text-center ">Register</h2>
        <p className='text-center mb-6 mt-2 text-slate-400'>buat akun singkat dan mudah </p>
        <hr className="my-4 border-t border-gray-300" />
        <form className="space-y-4">
          <div>
            <div className="h-14">
              {registError && <p className='text-red-500'>{responseMessage}</p>}
            </div>
            <Input
              id={''}
              name={' '}
              label='Email'
              icon={faEnvelope}
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              onBlur={() => handleBlur('email')}
              error={emailError} />
            <Input
              id={''}
              name={' '}
              label='Password'
              icon={faLock}
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              onBlur={() => handleBlur('password')}
              error={emailError} />
            <Input
              id={''}
              name={' '}
              label='Name'
              icon={faUser}
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
              onBlur={() => handleBlur('name')}
              error={nameError}
            />
          </div>

          <div className='text-center mx-20'>
            <Button colors={["from-emerald-500 to-green-700", "hover:from-emerald-500 hover:to-green-900"]} text='Register' onClick={handleRegister} />
          </div>
          {!formValid && (
            <p className="text-red-500 mt-2">Please fill in all fields</p>
          )}
        </form>
        <div className="text-center mt-4">
          <Link
            className=" font-bold text-blue-400  "
            to={'/login?'}
          >
            Sudah punya akun?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
