import { Meta } from '@storybook/angular';
import { CoreCheckboxComponent } from './core-checkbox.component';

export default {
  title: 'Checkbox/CoreCheckbox',
  component: CoreCheckboxComponent,
  argTypes: {
    checked: { control: 'boolean' },
    uniqId: { control: 'text' },
    color: { control: { type: 'select' }, options: ['black', 'blue', 'red', 'green', 'gray'] },
  },
} as Meta<CoreCheckboxComponent>;

export const Default = {
  args: {
    checked: false,
    uniqId: 'default-checkbox',
    color: 'black',
  },
};

export const Checked = {
  args: {
    checked: true,
    uniqId: 'checked-checkbox',
    color: 'blue',
  },
};

export const RedCheckbox = {
  args: {
    checked: false,
    uniqId: 'red-checkbox',
    color: 'red',
  },
};

export const GreenCheckbox = {
  args: {
    checked: true,
    uniqId: 'green-checkbox',
    color: 'green',
  },
};
