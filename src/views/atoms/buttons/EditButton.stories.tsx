import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import EditButton from './EditButton';

export default {
  component: EditButton,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof EditButton>;

export const Default: ComponentStoryObj<typeof EditButton> = {
  args: {},
};
