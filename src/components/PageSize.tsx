import React from 'react';
interface PageSizeProps {
  data: number;
  onPageSizeChange?: (newSize: string) => void;
}
const PageSize: React.FC<PageSizeProps> = ({ onPageSizeChange, data }) => {
  return (
    <div>
      <select
        value={data ?? 5}
        onChange={(e) => {
          if (onPageSizeChange) {
            onPageSizeChange(e.target.value);
          }
        }}
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='30'>30</option>
      </select>
    </div>
  );
};
export default PageSize;
