import { Navigate } from 'react-router-dom';
import { getAccessLevel, type AccessLevel } from '../../utils/auth';
import type { JSX } from 'react';

export const ProtectedRoute = ({
  children,
  requiredLevel
}: {
  children: JSX.Element;
  requiredLevel: AccessLevel;
}) => {
  const level = getAccessLevel();

  const hasAccess =
    level === 'config' || (level === 'user' && requiredLevel === 'user');

  return hasAccess ? children : <Navigate to="/" />;
};