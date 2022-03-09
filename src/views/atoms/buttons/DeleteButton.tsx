import React from 'react';
import BaseSmallButton, { BaseSmallButtonProps } from './BaseSmallButton';

export type DeleteButtonProps = Pick<BaseSmallButtonProps, 'onClick'>;

const DeleteButton: React.VFC<DeleteButtonProps> = (props) => {
  return (
    <BaseSmallButton color="secondary" onClick={props.onClick}>
      Delete
    </BaseSmallButton>
  );
};

export default DeleteButton;
