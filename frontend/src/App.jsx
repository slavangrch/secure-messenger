import Main from './pages/Main';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import SignupPage, { action as signupAction } from './pages/SignupPage';
import { loader as mainLoader } from './pages/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: '/auth',
      errorElement: <Error />,
      children: [
        { path: 'login', element: <LoginPage />, action: loginAction },
        { path: 'signup', element: <SignupPage />, action: signupAction },
      ],
    },
    { path: '/user', element: <Main />, id: 'main', loader: mainLoader },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
