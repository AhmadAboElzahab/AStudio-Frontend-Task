import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((path) => path !== '');
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          <Link to='/'>Home</Link>
        </li>
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
              {isLast ? path : <Link to={routeTo}>{path}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
