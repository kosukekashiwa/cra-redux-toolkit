import { Box, Card, CardContent, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { User } from '../../../state/ducks/user/models';
import { putUser } from '../../../state/ducks/user/slices';
import { useAppDispatch } from '../../../state/hooks';
import EditButton from '../../atoms/buttons/EditButton';
import BaseTextField from '../../atoms/inputs/BaseTextField';

export type UserCardProps = {
  user: User;
};

const UserCard: React.VFC<UserCardProps> = (props) => {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const handleChange = useCallback((val: string) => {
    setValue(val);
  }, []);
  const handleEditButtonClick = useCallback(() => {
    dispatch(putUser({ id: props.user.id, name: value }));
  }, [dispatch, props.user, value]);

  return (
    <Card>
      <CardContent>
        <Box>name: {props.user.name}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box>
            <BaseTextField
              value={value}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
          </Box>
          <Box>
            <EditButton onClick={handleEditButtonClick} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserCard;
