import { Box, Button, Card, CardContent, Stack } from '@mui/material';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector, useFetch } from '../state/hooks';
import {
  userStateIdling,
  fetchUsers,
  getUserDataStatus,
  getUser,
  getUsers,
  postUser,
} from '../state/ducks/user/slices';
import { RootState } from '../state/store';

const User: React.VFC = () => {
  const userDataStatus = useAppSelector(getUserDataStatus);
  const users = useAppSelector(getUsers);
  const user = useAppSelector((state: RootState) => getUser(state, 1));
  useFetch(userDataStatus, userStateIdling, fetchUsers());

  const dispatch = useAppDispatch();
  const hadleUsersPostClick = useCallback(() => {
    dispatch(postUser('posted1'));
  }, [dispatch]);

  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Box>
            <Box>Users</Box>
            <Box>
              <Button variant="outlined" onClick={hadleUsersPostClick}>
                Post
              </Button>
            </Box>
            {users.map((user) => (
              <Box key={user.id}>{user.name}</Box>
            ))}
          </Box>
          <Box>
            <Box>User</Box>
            <Box></Box>
            {user && <Box>id1: {user.name}</Box>}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default User;
