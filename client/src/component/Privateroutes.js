import { Navigate, Outlet } from "react-router-dom";

export function Privateroutes() {
    return (
      (localStorage.getItem('user')) ? <Outlet /> : <Navigate to='/login' />
    )
  }