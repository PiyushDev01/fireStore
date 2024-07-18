import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from './context/Context';
export default function ProtectedRoutes() {
    const { isuser } = useContext(Context); // Destructure the context object
  return (
    <>
      {isuser ? <Outlet />: <Navigate to="/" />}
    </>
  );
}