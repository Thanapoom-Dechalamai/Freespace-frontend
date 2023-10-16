import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, setUser } from './redux/authSlice';
import jwtDecode from 'jwt-decode';
import HomePage from './pages/Home';
import Authentication from './pages/Authentication';
import Navbar from './components/navbar';
import './App.css';
import ProfilePage from "./pages/Profile";
import { useIsAuthenticated } from './hooks/users';
import { useGetUserInfoQuery } from "./redux/apiSlice";
import { useEffect } from "react";
import SearchPage from './pages/Search';

function App()
{
  const dispatch = useDispatch();
  let accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = useIsAuthenticated();
  // Check if there's an access token and handle authentication
  if (accessToken)
  {
    const decodedToken = jwtDecode(accessToken);
    const tokenExpirationTime = decodedToken.exp * 1000;
    if (tokenExpirationTime > Date.now())
    {
      dispatch(login(accessToken)); // Log in the user if the token is valid
    }
  }

  // Fetch user info and handle data and error
  const { data: userInfo, error, refetch } = useGetUserInfoQuery(undefined, {
    skip: !isAuthenticated, // Skip the query when not authenticated
  });

  useEffect(() =>
  {
    if (isAuthenticated && userInfo)
    {
      refetch(); // Manually trigger a refetch of user info
      dispatch(setUser(userInfo)); // Set user info in the Redux store
    }
  }, [isAuthenticated, userInfo, dispatch, error]);

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path='/' element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <>
          <Route path="authentication" element={<Authentication />} />
          <Route path="*" element={<Navigate to="/authentication" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
