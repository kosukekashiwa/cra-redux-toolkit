import React from 'react';
import BaseSmallButton, { BaseSmallButtonProps } from './BaseSmallButton';

export type EditButtonProps = Pick<BaseSmallButtonProps, 'onClick'>;

const EditButton: React.VFC<EditButtonProps> = (props) => {
  return (
    <BaseSmallButton color="secondary" onClick={props.onClick}>
      Edit
    </BaseSmallButton>
  );
};

export default EditButton;
