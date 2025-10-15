import 'zone.js'; // Import Zone.js for Angular's change detection
import '../styles.scss'; // Import Tailwind CSS styles from the todolist app
import { NO_ERRORS_SCHEMA } from '@angular/core';

export const decorators = [
  (Story, context) => ({
    component: Story, // Render the Story as an Angular component
    props: context.args, // Pass the args to the component
    moduleMetadata: {
      schemas: [NO_ERRORS_SCHEMA], // Allow unknown elements like <story>
    },
  }),
];
