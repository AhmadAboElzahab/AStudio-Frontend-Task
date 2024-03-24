import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className='border-x-2 border-gray-300 p-2 px-3 relative'>
      <input
        type='text'
        className={`transition-all  duration-300 ease-in-out ${
          show ? 'opacity-100 visible' : 'opacity-0 invisible'
        } w-0 h-full px-2 py-1`}
        placeholder='Search...'
        style={{ minWidth: show ? '150px' : '0px' }}
        value={value}
        onChange={(e) => onChange(e.target.value)} 
      />
      <button
        className='absolute inset-y-0 right-2 flex items-center justify-center bg-transparent border-none outline-none focus:outline-none focus:ring-0'
        onClick={() => setShow((prev) => !prev)}
      >
        <BiSearchAlt size={20} />
      </button>
    </div>
  );
};

export default Search;
