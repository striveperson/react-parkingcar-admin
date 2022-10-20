import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { RootState } from '../../store';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({children}: AuthGuardProps) => {
  const {isAuthenticated, role} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  
  const url = location.pathname

  let navigateElement = getNavigateAfterCheckLogin(url, isAuthenticated, navigate) || getNavigateAfterCheckAuthority(url, role, navigate);
  if (navigateElement) {
    return navigateElement;
  }

  return <React.Fragment>{children}</React.Fragment>
}

const getNavigateAfterCheckLogin = (url: string, isAuthenticated: boolean, navigate: NavigateFunction): ReactElement | null => {
  if (isAuthenticated) {
    if (url === '/sign-in' || url === '/sign-up') {
      return <Navigate to='/customers/customer'/>;
    }
  } else {
    if (!(url === '/sign-in' || url === '/sign-up')) {
      localStorage.clear();
      return <Navigate to='/sign-in'/>;
    }
  }

  return null;
}

const getNavigateAfterCheckAuthority = (url: string, role: string, navigate: NavigateFunction): ReactElement | null => {
  if (url.startsWith('/admins') && !(role === 'A' || role === 'M')) {
    alert('접근 권한이 없습니다.');

    return <Navigate to='/customers/customer'/>;
  }
  
   if ((url.startsWith('/customers') || url.startsWith('/boards')) && role === 'S') {
      alert('접근 권한이 없습니다.');
      return <Navigate to='/cars/car'/>;
  }

  return null;
}

export default AuthGuard;