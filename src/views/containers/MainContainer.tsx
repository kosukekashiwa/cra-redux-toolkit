import React from 'react';
import Box from '@mui/material/Box';
import { FLEXIBLE_MIN_WIDTH, FLEXIBLE_MAX_WIDTH } from '../theme';

type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer: React.VFC<MainContainerProps> = (props) => {
  return (
    <Box flexGrow={1} sx={{ overflowY: 'auto' }}>
      <Box
        width="100vw"
        minWidth={`${FLEXIBLE_MIN_WIDTH}px`}
        maxWidth={`${FLEXIBLE_MAX_WIDTH}px`}
        margin="auto"
        px="32px"
        py="16px"
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default MainContainer;
