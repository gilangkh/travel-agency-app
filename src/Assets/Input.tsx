import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface InputProps {
  id:String;
  name:String;
  label: string;
  icon: IconDefinition;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const { id,name,label, icon, type, value, onChange, onBlur, error } = props;

  return (
    <div>
      <label className={`block text-gray-700 text-sm font-bold mb-2 
        ${error && 'border-red-500'}`}>
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {label}:
      </label>
      <input
        id={`${id}`} name={`${name}`} className={`border rounded w-full py-2 px-3 focus:bg-blue-200 focus:border-blue-800 outline-none
        ${error && 'border-red-500 '}`}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="h-5">
       {error && <p className='text-red-500'>{label} tidak boleh kosong!</p>}
      </div>
         
    </div>
  );
};

export default Input;
