import React from 'react';

type TableProps = {
  headers: string[];
  size: number;
  data: unknown[];
  renderRow: (item: any, index: number) => React.ReactNode;
};

export default function Table({ headers, data, renderRow, size }: TableProps) {
  return (
    <div>
      <table className='w-full text-left '>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className='w-fit border px-[20px] py-3 border-gray bg-blue uppercase   text-nowrap font-semibold '
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, size).map((item, index) => (
            <tr key={index} className='hover:bg-grey'>
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
