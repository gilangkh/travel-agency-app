import React from 'react';

interface ButtonProps {
  text: string;
  colors:String[]
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({colors, text, onClick }) => {
  return (
    <button
      className={`bg-gradient-to-r ${colors[0]} text-white w-full py-2 px-4 font-bold rounded hover:bg-gradient-to-r ${colors[1]} active:outline-none  hover:scale-[1.01] active:scale-[1.01] focus:shadow-emerald-600`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
