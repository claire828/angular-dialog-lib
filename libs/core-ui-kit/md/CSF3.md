# Component Story Format 3 (CSF3) in Storybook

CSF3 is the latest standard for writing Storybook stories. It simplifies story files and improves type safety and maintainability.

## Key Differences

- **Default Export**: Still used for metadata (`title`, `component`, `argTypes`).
- **Named Exports**: Each story is a named export, but now as a plain object (not a function).
- **No Template Functions or `.bind({})`**: Stories are just objects with an `args` property.
- **Type Safety**: You can type the default export with your component type for better TypeScript support.

---

## Old Format (CSF2)

```typescript
// Old CSF2 format
import { Meta, Story } from '@storybook/angular';
import { MyButtonComponent } from './my-button.component';

export default {
  title: 'Button',
  component: MyButtonComponent,
} as Meta;

const Template: Story = (args) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  primary: true,
};
```

### Explanation

- **Template Function**:  
  The `Template` is a function that receives `args` and returns an object with `props`.  
  This is how Storybook passes dynamic values to your component.

- **`.bind({})`**:  
  `Template.bind({})` creates a copy of the `Template` function for each story.  
  This allows each story to have its own set of `args` without affecting others.

- **`args`**:  
  The `args` property on a story defines the default values for the component's inputs/props in that story.  
  You can override these in the Storybook UI.

---

## New Format (CSF3)

```typescript
// New CSF3 format
import { Meta } from '@storybook/angular';
import { MyButtonComponent } from './my-button.component';

export default {
  title: 'Button',
  component: MyButtonComponent,
} as Meta<MyButtonComponent>;

export const Primary = {
  args: {
    label: 'Primary Button',
    primary: true,
  },
};
```

### Explanation

- **No Template Function**:  
  You no longer need to define a `Template` function or use `.bind({})`.

- **Story as Object**:  
  Each story is a plain object with an `args` property.

- **`args`**:  
  Works the same as before—defines the default values for the component's inputs/props.

---

## Summary

- **CSF3**: Stories are objects with `args`, no need for template functions or `.bind({})`.
- **CSF2**: Stories use template functions and `.bind({})`.

CSF3 is recommended for Storybook 7+ and is the default in Storybook 8+.
