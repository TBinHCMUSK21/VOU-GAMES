import React from 'react';

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, style = {}, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full relative mb-3"
      style={{
        minWidth: '320px',
        boxShadow:
          'inset -4px -4px 10px rgba(255, 255, 255, 0.6), inset 4px 4px 10px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style, // Allow overriding default styles
      }}
    >
      {label}
      {children}
      <span
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: '5px',
          height: '5px',
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.5)',
        }}
      />
    </button>
  );
};

export default CustomButton;
