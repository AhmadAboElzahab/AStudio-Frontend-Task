import React from 'react';

interface FilterOptionProps {
  filters: string[];
  selectedOption: string;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  filters,
  selectedOption,
  handleCheckboxChange,
}) => {
  return (
    <div className='flex pt-1'>
      {filters.map((item, index) => (
        <label
          key={index}
          className={`${selectedOption === item ? 'bg-grey' : ''} px-4 py-2 rounded hover:cursor-pointer`}
        >
          <input
            className='hidden'
            type='checkbox'
            name={item.toLowerCase()}
            value={item}
            checked={selectedOption === item}
            onChange={handleCheckboxChange}
          />
          {item.toUpperCase()}
        </label>
      ))}
    </div>
  );
};

export default FilterOption;
