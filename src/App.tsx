import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Main from './layouts/Main';

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route path='/' element={<Main />}>
              <Route index element={<></>} />
              <Route path='users' element={<p>users</p>} />
              <Route path='products' element={<p>products</p>} />
            </Route>
            <Route path='*' element={<p>error</p>} />
          </>,
        ),
      )}
    />
  );
}

export default App;
