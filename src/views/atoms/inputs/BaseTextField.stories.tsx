import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import BaseTextField from './BaseTextField';

export default {
  component: BaseTextField,
  argTypes: {
    onChange: { action: 'changed' },
  },
} as ComponentMeta<typeof BaseTextField>;

export const Default: ComponentStoryObj<typeof BaseTextField> = {
  args: {},
};
