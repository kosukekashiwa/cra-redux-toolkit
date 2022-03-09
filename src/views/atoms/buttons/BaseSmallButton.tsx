import { Button, ButtonProps } from '@mui/material';
import React from 'react';

export type BaseSmallButtonProps = Pick<ButtonProps, 'onClick' | 'color'> & {
  children: React.ReactNode;
};

const BaseSmallButton: React.VFC<BaseSmallButtonProps> = (props) => {
  return (
    <Button variant="contained" size="small" color={props.color} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default BaseSmallButton;
