import './App.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Main from './layouts/Main';
import Home from './pages/Home';
import Users from './pages/Users';
import Products from './pages/Products';

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path='/' element={<Main />}>
              <Route index element={<Home />} />
              <Route path='users' element={<Users />} />
              <Route path='products' element={<Products />} />
            </Route>
            <Route path='*' element={<p>error</p>} />
          </>,
        ),
      )}
    />
  );
}

export default App;
