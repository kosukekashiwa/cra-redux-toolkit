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
  putUser,
  deleteUser,
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
  const hadleUsersPutClick = useCallback(() => {
    dispatch(putUser({ id: 2, name: 'edit123' }));
  }, [dispatch]);
  const hadleUsersDeleteClick = useCallback(() => {
    dispatch(deleteUser(3));
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
              <Button variant="outlined" onClick={hadleUsersPutClick}>
                Put
              </Button>
              <Button variant="outlined" onClick={hadleUsersDeleteClick}>
                Delete
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
