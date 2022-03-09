import { Box, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { postUser } from '../../../state/ducks/user/slices';
import { useAppDispatch } from '../../../state/hooks';
import AddButton from '../../atoms/buttons/AddButton';
import BaseTextField from '../../atoms/inputs/BaseTextField';

const UserForm: React.VFC = () => {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const handleChange = useCallback((val: string) => {
    setValue(val);
  }, []);
  const handleAddButtonClick = useCallback(() => {
    dispatch(postUser(value));
  }, [dispatch, value]);

  return (
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
        <AddButton onClick={handleAddButtonClick} />
      </Box>
    </Stack>
  );
};

export default UserForm;
