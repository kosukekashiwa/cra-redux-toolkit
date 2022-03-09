import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import BaseSmallButton from './BaseSmallButton';

export default {
  component: BaseSmallButton,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof BaseSmallButton>;

export const Default: ComponentStoryObj<typeof BaseSmallButton> = {
  args: {
    children: 'Button',
  },
};

export const Secondary: ComponentStoryObj<typeof BaseSmallButton> = {
  args: {
    children: 'Button',
    color: 'secondary',
  },
};

export const Error: ComponentStoryObj<typeof BaseSmallButton> = {
  args: {
    children: 'Button',
    color: 'error',
  },
};
