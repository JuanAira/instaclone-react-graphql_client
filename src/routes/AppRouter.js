import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { DashboardRoutes } from './DashboardRoutes';
import Auth from '../pages/Auth';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={(<PublicRoute><Auth /></PublicRoute>)}
        />
        <Route
          path="/*"
          element={(<PrivateRoute><DashboardRoutes /></PrivateRoute>)}
        />
      </Routes>
    </BrowserRouter>
  );
}
