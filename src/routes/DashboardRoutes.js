import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from '../pages/Home';
import Error from '../pages/Error';
import User from '../pages/User';

import LayoutBasic from '../layouts/LayoutBasic';

export function DashboardRoutes() {
  return (
    <>
      <LayoutBasic />
      <div className="container">
        <Routes>
          <Route path="/:username" element={<User />} />
          <Route path="/" element={<Home />} />

          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </>

  );
}
