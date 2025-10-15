import type { Meta, StoryObj } from '@storybook/angular';
import { toArgs } from '../../storybook.helper';
import { CoreIconButtonComponent } from './core-icon-button.component';

const meta: Meta<CoreIconButtonComponent> = {
  title: 'Buttons/CoreIconButton',
  component: CoreIconButtonComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          A reusable icon button component built with Angular signals. Features:
          - Signal-based reactive inputs for optimal performance
          - Configurable colors, sizes, and disabled states
          - Built-in plus icon with responsive sizing
          - Accessibility attributes for screen readers
          - Smooth transitions and hover effects
        `,
      },
    },
  },
  tags: ['autodocs'],
  // @ts-ignore - Storybook signal input helper
  args: toArgs<CoreIconButtonComponent>({
    name: 'Add Source',
    color: 'secondary',
    size: 'medium',
    disabled: false,
  }),
  argTypes: {
    name: {
      control: 'text',
      description: 'Text displayed next to the icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Add Source' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'blue', 'red', 'green', 'gray'],
      description: 'Color theme variant for the button',
      table: {
        type: { summary: 'ButtonColor' },
        defaultValue: { summary: 'secondary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant affecting padding and icon size',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    buttonClick: {
      action: 'buttonClick',
      description: 'Emitted when button is clicked (only when not disabled)',
      table: {
        type: { summary: 'OutputEmitterRef<void>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CoreIconButtonComponent>;

/**
 * Default configuration with secondary color and medium size.
 * This is the most commonly used variant.
 */
export const Default: Story = {
  // @ts-ignore - Storybook signal input helper
  args: toArgs<CoreIconButtonComponent>({
    name: 'Add Source',
    color: 'secondary',
    size: 'medium',
    disabled: false,
  }),
};

/**
 * Primary color variant with clean white background.
 * Good for less prominent actions.
 */
export const Primary: Story = {
  // @ts-ignore - Storybook signal input helper
  args: toArgs<CoreIconButtonComponent>({
    name: 'Add Item',
    color: 'primary',
    size: 'medium',
    disabled: false,
  }),
};

/**
 * Accent color variant with green theming.
 * Ideal for positive actions like creation or confirmation.
 */
export const Accent: Story = {
  // @ts-ignore - Storybook signal input helper
  args: toArgs<CoreIconButtonComponent>({
    name: 'Create New',
    color: 'accent',
    size: 'medium',
    disabled: false,
  }),
};

/**
 * Small size variant with compact padding.
 * Perfect for space-constrained layouts.
 */
export const Small: Story = {
  // @ts-ignore - Storybook signal input helper
  args: toArgs<CoreIconButtonComponent>({
    name: 'Add',
    color: 'blue',
    size: 'small',
    disabled: false,
  }),
};

/**
 * Large size variant with generous padding.
 * Great for prominent calls-to-action.
 */
export const Large: Story = {
  // @ts-ignore - Storybook signal input helper
  args: toArgs<CoreIconButtonComponent>({
    name: 'Add New Source',
    color: 'green',
    size: 'large',
    disabled: false,
  }),
};

/**
 * Disabled state with reduced opacity.
 * Button will not emit click events when disabled.
 */
export const Disabled: Story = {
  // @ts-ignore - Storybook signal input helper
  args: toArgs<CoreIconButtonComponent>({
    name: 'Add Source',
    color: 'secondary',
    size: 'medium',
    disabled: true,
  }),
};

/**
 * Showcase of all available color variants.
 * Demonstrates the full color palette available.
 */
export const AllColors: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4 p-4">
        <core-icon-button name="Primary" color="primary"></core-icon-button>
        <core-icon-button name="Secondary" color="secondary"></core-icon-button>
        <core-icon-button name="Accent" color="accent"></core-icon-button>
        <core-icon-button name="Blue" color="blue"></core-icon-button>
        <core-icon-button name="Red" color="red"></core-icon-button>
        <core-icon-button name="Green" color="green"></core-icon-button>
        <core-icon-button name="Gray" color="gray"></core-icon-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All color variants displayed together for easy comparison.',
      },
    },
  },
};

/**
 * Showcase of all available size variants.
 * Shows responsive icon sizing and padding.
 */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4 p-4">
        <core-icon-button name="Small" color="blue" size="small"></core-icon-button>
        <core-icon-button name="Medium" color="blue" size="medium"></core-icon-button>
        <core-icon-button name="Large" color="blue" size="large"></core-icon-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All size variants with consistent color for size comparison.',
      },
    },
  },
};
