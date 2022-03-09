import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import AddButton from './AddButton';

export default {
  component: AddButton,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof AddButton>;

export const Default: ComponentStoryObj<typeof AddButton> = {
  args: {},
};
