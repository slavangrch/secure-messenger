import Main from './pages/Main';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
// import AuthPage, { action as authAction } from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SigninPage';
import { action as signAction } from './pages/SigninPage';
import { action as loginAction } from './pages/LoginPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/auth',
      errorElement: <Error />,
      children: [
        { path: 'login', element: <LoginPage />, action: loginAction },
        { path: 'signup', element: <SigninPage />, action: signAction },
      ],
    },
    { path: '/user', element: <Main /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
