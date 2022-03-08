import React from 'react';
import { Box, Stack } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppRouterLayout from './AppRouterLayout';
import User from './User';
import Article from './Article';

const App: React.VFC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="cra-app" />} />
        <Route path="cra-app" element={<AppRouterLayout />}>
          <Route index element={<Navigate to="sample" />} />
          <Route path="sample" element={<SampleComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const SampleComponent: React.VFC = () => {
  return (
    <Box>
      <Stack spacing={1}>
        <User />
        <Article />
      </Stack>
    </Box>
  );
};

export default App;
