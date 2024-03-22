import React from 'react';

type TableProps = {
  headers: string[];
  data: unknown[];
  renderRow: (item: unknown, index: number) => React.ReactNode;
};

export default function Table({ headers, data, renderRow }: TableProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>{renderRow(item, index)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
