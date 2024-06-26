import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Main() {
  return (
    <div className='w-[90%] mx-auto pt-10'>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
