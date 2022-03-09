import React from 'react';
import BaseSmallButton, { BaseSmallButtonProps } from './BaseSmallButton';

export type AddButtonProps = Pick<BaseSmallButtonProps, 'onClick'>;

const AddButton: React.VFC<AddButtonProps> = (props) => {
  return (
    <BaseSmallButton color="primary" onClick={props.onClick}>
      Add
    </BaseSmallButton>
  );
};

export default AddButton;
