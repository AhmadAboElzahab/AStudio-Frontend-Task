import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='text-4xl flex flex-col justify-center items-center h-60  '>
      <Link to='/users' className='hover:bg-yellow p-5 rounded'>
        Users
      </Link>
      <Link to='/products' className='hover:bg-yellow p-5 rounded'>
        Products
      </Link>
    </div>
  );
}
