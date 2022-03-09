import React from 'react';
import { Outlet } from 'react-router-dom';
import AppContainer from './atoms/containers/AppContainer';
import MainContainer from './atoms/containers/MainContainer';

const AppRouterLayout: React.VFC = () => {
  return (
    <AppContainer>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </AppContainer>
  );
};

export default AppRouterLayout;
