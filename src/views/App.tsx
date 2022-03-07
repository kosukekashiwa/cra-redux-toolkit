import React, { useCallback } from 'react';
import { Counter } from '../features/counter/Counter';
import { Box, Button, Card, CardContent, Stack } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchUsers, getUsers } from '../state/ducks/user/slices';

const App: React.VFC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="cra-app" />} />
        <Route path="cra-app">
          <Route index element={<Navigate to="dashbord" />} />
          <Route path="dashbord" element={<SampleComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const SampleComponent: React.VFC = () => {
  const users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();
  const hadleClick = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box>
      <Stack spacing={1}>
        <Card>
          <CardContent>
            <Counter />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Box>Users</Box>
            <Box>
              <Button variant="outlined" onClick={hadleClick}>
                fetch
              </Button>
            </Box>
            {users.map((user) => (
              <Box key={user.id}>{user.name}</Box>
            ))}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default App;