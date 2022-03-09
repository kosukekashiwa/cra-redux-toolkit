import { Box, Grid, Paper, Stack } from '@mui/material';
import React from 'react';
import { useAppSelector, useFetch } from '../../../state/hooks';
import UserForm from './UserForm';
import {
  userStateIdling,
  fetchUsers,
  getUserDataStatus,
  getUsers,
} from '../../../state/ducks/user/slices';
import UserCard from './UserCard';
import { grey } from '@mui/material/colors';

const UserList: React.VFC = () => {
  const userDataStatus = useAppSelector(getUserDataStatus);
  const users = useAppSelector(getUsers);
  useFetch(userDataStatus, userStateIdling, fetchUsers());

  return (
    <Paper variant="outlined" sx={{ padding: 2, background: grey[50] }}>
      <Stack spacing={2}>
        <Box>User List</Box>
        <UserForm />
        <Box>
          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid key={user.id} item xs={4}>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Paper>
  );
};

export default UserList;
