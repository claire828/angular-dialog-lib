# Coding Style: Transition to Signals and Modern Angular Practices

This document outlines the best practices and coding style guidelines for transitioning to signals and modern Angular features.

---

## Why Use Signals?

1. **Reactive State Management**:

   - Signals provide a reactive way to manage state, making it easier to track and update the state of your application.
   - They integrate seamlessly with Angular's change detection.

2. **Cleaner Code**:

   - Signals reduce the need for imperative DOM manipulation, resulting in more declarative and maintainable code.

3. **Future-Proof**:
   - Signals align with Angular's modern reactive programming paradigm, ensuring compatibility with future updates.

---

## Best Practices for Signals

### 1. **Use Signals for State Management**

- Replace template-driven DOM manipulation with signals for better reactivity.
- Example:

  ```typescript
  // Before: Using DOM manipulation
  protected oldWay(inputElem: HTMLInputElement): void {
    if (inputElem.value.trim() === '') return;
    this.store.addTodo({
      id: uuid.v4(),
      name: inputElem.value,
      completed: false,
      ts: new Date().getTime().toString(),
    });
    inputElem.value = '';
  }

  // After: Using signals
  protected taskModel = model<string>('');
  protected addTaskHandler(): void {
    if (this.taskModel().trim() === '') return;
    this.store.addTodo({
      id: uuid.v4(),
      name: this.taskModel(),
      completed: false,
      ts: new Date().getTime().toString(),
    });
    this.taskModel.set('');
  }
  ```

### 2. **Bind Signals Directly to Templates**

- Use Angular's two-way binding with signals for cleaner templates.
- Example:

  ```html
  <!-- Before: Using DOM manipulation -->
  <input #addTaskInput (keydown.enter)="oldWay(addTaskInput)" />

  <!-- After: Using signals -->
  <input [(ngModel)]="taskModel" (keydown.enter)="addTaskHandler()" />
  ```

---

## Modern Angular Features to Adopt

### 1. **Standalone Components**

- Use `standalone: true` for components to reduce module dependencies.
- Example:
  ```typescript
  @Component({
    selector: 'app-example',
    standalone: true,
    imports: [CommonModule],
    template: `<p>Standalone Component</p>`,
  })
  export class ExampleComponent {}
  ```

### 2. **Typed Inputs and Outputs**

- Use `@input` and `@output` decorators with strong typing for better maintainability.
- Example:

  ```typescript
  @Component({
    selector: 'example',
    standalone: true,
    template: `<button (click)="onClick()">Click Me</button>`,
  })
  export class ExampleComponent {
    @input() label: string = '';
    @output() clicked = output<void>();

    onClick(): void {
      this.clicked.emit();
    }
  }
  ```

### 3. **Signal-based ViewChild**

- Use `viewChild()` function instead of `@ViewChild` decorator for reactive DOM references.
- Combine with `effect()` for reactive DOM manipulations.
- Example:

  ```typescript
  // Before: Using @ViewChild decorator
  @Component({
    selector: 'example-component',
    template: '<input #inputField>',
  })
  export class ExampleComponent implements AfterViewInit {
    @ViewChild('inputField') inputField?: ElementRef<HTMLInputElement>;

    ngAfterViewInit() {
      this.inputField?.nativeElement.focus();
    }

    focusInput() {
      this.inputField?.nativeElement.focus();
    }
  }

  // After: Using signal-based viewChild
  @Component({
    selector: 'example-component',
    template: '<input #inputField>',
  })
  export class ExampleComponent {
    protected inputField = viewChild.required<ElementRef<HTMLInputElement>>('inputField');

    constructor() {
      effect(() => {
        if (someCondition()) {
          // Automatically runs when dependencies change
          this.inputField().nativeElement.focus();
        }
      });
    }

    focusInput() {
      this.inputField().nativeElement.focus();
    }
  }
  ```

### 4. **Tailwind CSS for Styling**

- Use utility-first CSS frameworks like Tailwind for consistent and maintainable styles.
- Example:
  ```html
  <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">Click Me</button>
  ```

---

## Transition Checklist

1. Replace imperative DOM manipulation with signals.
2. Use `standalone: true` for all new components.
3. Adopt `@input` and `@output` with strong typing.
4. Replace `@ViewChild` with signal-based `viewChild`.
5. Use Tailwind CSS for styling.
6. Refactor existing components to align with these practices.

---

## Example: Refactored Todo List Component

### Before:

```typescript
protected oldWay(inputElem: HTMLInputElement): void {
  if (inputElem.value.trim() === '') return;
  this.store.addTodo({
    id: uuid.v4(),
    name: inputElem.value,
    completed: false,
    ts: new Date().getTime().toString(),
  });
  inputElem.value = '';
}
```

### After:

```typescript
protected taskModel = model<string>('');
protected addTaskHandler(): void {
  if (this.taskModel().trim() === '') return;
  this.store.addTodo({
    id: uuid.v4(),
    name: this.taskModel(),
    completed: false,
    ts: new Date().getTime().toString(),
  });
  this.taskModel.set('');
}
```

---

By following these guidelines, you can ensure your codebase is modern, maintainable, and aligned with Angular's best practices.
