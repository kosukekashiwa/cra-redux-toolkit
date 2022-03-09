import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export type BaseTextFieldProps = Pick<TextFieldProps, 'value' | 'onChange'>;

const BaseTextField: React.VFC<BaseTextFieldProps> = (props) => {
  return <TextField size="small" value={props.value} onChange={props.onChange} />;
};

export default BaseTextField;
