import React, { forwardRef } from 'react';

interface FunctionCardProps {
  index: number;
  equation: string;
  nextFunction?: number;
  onEquationChange: (index: number, equation: string) => void;
}

const FunctionCard = forwardRef<HTMLDivElement, FunctionCardProps>(
  ({ index, equation, nextFunction, onEquationChange }, ref) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onEquationChange(index, e.target.value);
    };

    return (
      <div
        ref={ref}
        className="border border-gray-300 rounded-[15px] shadow-lg p-[20px] bg-white w-[235px] "
      >
        <h2 className="text-sm font-medium mb-[20px] mt-[-5px] text-customGray">Function: {index + 1}</h2>

        <div className='text-customBlack text-xs'>Equation</div>
        <input
          type="text"
          value={equation}
          onChange={handleInputChange}
          placeholder="e.g., x^2 + 3"
          className="border border-gray-300 h-[33px] text-xs rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500 mt-[4px]"
        />
         <div className='text-customBlack mt-[17px] text-xs'>Next function</div>
        <select
          disabled
          className="border border-gray-300 h-[33px] text-xs rounded-md w-full p-2 bg-gray-100 text-gray-500 mt-[4px] mb-[51px]"
        >
          {nextFunction ? (
            <option>Function: {nextFunction}</option>
          ) : (
            <option>-</option>
          )}
        </select>
      </div>
    );
  }
);

export default FunctionCard;
