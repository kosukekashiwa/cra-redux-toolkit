import { Box, Stack } from '@mui/material';
import React from 'react';
import UserList from '../ecosystems/user/UserList';
import ArticleList from '../ecosystems/article/ArticleList';

const SampleView: React.VFC = () => {
  return (
    <Box>
      <Stack spacing={1}>
        <UserList />
        <ArticleList />
      </Stack>
    </Box>
  );
};

export default SampleView;
