import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppRouterLayout from './AppRouterLayout';
import SampleView from './environments/SampleView';

const App: React.VFC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="cra-app" />} />
        <Route path="cra-app" element={<AppRouterLayout />}>
          <Route index element={<Navigate to="sample" />} />
          <Route path="sample" element={<SampleView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
