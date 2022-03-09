import React from 'react';
import Box from '@mui/material/Box';

type AppContainerProps = {
  children: React.ReactNode;
};

const AppContainer: React.VFC<AppContainerProps> = (props) => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {props.children}
    </Box>
  );
};

export default AppContainer;
