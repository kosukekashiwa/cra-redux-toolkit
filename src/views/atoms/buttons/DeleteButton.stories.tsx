import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import DeleteButton from './DeleteButton';

export default {
  component: DeleteButton,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof DeleteButton>;

export const Default: ComponentStoryObj<typeof DeleteButton> = {
  args: {},
};
