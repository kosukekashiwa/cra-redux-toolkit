import React from 'react';
import { Outlet } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import MainContainer from './containers/MainContainer';

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
