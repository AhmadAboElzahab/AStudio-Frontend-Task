import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((path) => path !== '');

  return (
    <nav>
      <ol className='m-0 p-0 flex flex-wrap'>
        <li>
          <Link to='/' className='pr-1'>
            Home
          </Link>
        </li>
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={index}>
              /
              <Link
                to={routeTo}
                className={`${isLast ? 'halfColor w-fit fo font-bold ml-2' : 'pr-1'}`}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
