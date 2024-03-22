import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Main() {
  return (
    <div>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
}
