import React, { useState } from "react";
import BreedComboBox from "./BreedComboBox";

function Filter() {
//   const [range, setRange] = useState({ min: 0, max: 15 });

//   const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Math.min(Number(event.target.value), range.max - 1);
//     setRange({ ...range, min: value });
//   };

//   const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Math.max(Number(event.target.value), range.min + 1);
//     setRange({ ...range, max: value });
//   };

  return (
    <>
      <BreedComboBox />
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Age Range
        </label>
        <div className="relative pt-6 pb-2">
          <div
            id="range-slider"
            className="h-2 bg-gray-200 rounded-full relative"
          >
            <div
              className="absolute h-2 bg-blue-500 rounded-full"
              style={{
                left: `${(range.min / 15) * 100}%`,
                right: `${100 - (range.max / 15) * 100}%`,
              }}
            ></div>
            <input
              type="range"
              min="0"
              max="15"
              value={range.min}
              onChange={handleMinChange}
              className="absolute w-full h-2 opacity-0 cursor-pointer"
              style={{ left: 0, zIndex: 1 }}
            />
            <input
              type="range"
              min="0"
              max="15"
              value={range.max}
              onChange={handleMaxChange}
              className="absolute w-full h-2 opacity-0 cursor-pointer"
              style={{ left: 0, zIndex: 2 }}
            />
            <div
              className="absolute w-4 h-4 -mt-1 -ml-2 bg-white border-2 border-blue-500 rounded-full cursor-pointer"
              style={{ left: `${(range.min / 15) * 100}%` }}
            ></div>
            <div
              className="absolute w-4 h-4 -mt-1 -ml-2 bg-white border-2 border-blue-500 rounded-full cursor-pointer"
              style={{ left: `${(range.max / 15) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{range.min} years</span>
            <span>{range.max} years</span>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Filter;
