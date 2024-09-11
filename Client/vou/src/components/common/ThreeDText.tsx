import React from 'react';

interface ThreeDTextProps {
  text: string;
  color?: string;  // Optional: default color if not provided
  size?: string;   // Optional: default size if not provided
}

const ThreeDText: React.FC<ThreeDTextProps> = ({ text, color = 'text-gray-800', size = 'text-4xl' }) => {
  return (
    <div className="relative inline-block">
      <span className={`absolute top-[4px] left-[4px] ${size} font-bold ${color} opacity-70`}>{text}</span>
      {/* <span className={`absolute top-2 left-2 ${size} font-bold ${color} opacity-50`}>{text}</span> */}
      <span className={`absolute top-[2px] left-[2px] ${size} font-bold ${color} opacity-50`}>{text}</span>
      <span className={`relative ${size} font-bold ${color}`}>{text}</span>
    </div>
  );
};

export default ThreeDText;
