import { Navigate } from 'react-router-dom';
import Dock from '../components/Dock';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user'));

  const isGuest = user?.isGuest;

  if (token || isGuest) {
    return (
      <>
        <Dock />
        {children}
      </>
    );
  }

  return <Navigate to="/Welcome" />;
};

export default PrivateRoute;
