import { EventEmitter, InputSignal, InputSignalWithTransform } from '@angular/core';

/**
 * Helper function to convert signal inputs and event emitters for Storybook
 * This allows us to use regular values for signal inputs and callbacks for event emitters
 */
export function toArgs<Component>(
  args: Partial<TransformSignalInputType<TransformEventType<Component>>>
): TransformEventType<Component> {
  return args as unknown as TransformEventType<Component>;
}

/** Convert event emitter to callback for storybook */
type TransformEventType<T> = {
  [K in keyof T]: T[K] extends EventEmitter<infer E> ? (e: E) => void : T[K];
};

/** Convert any input signal into the held type of the signal */
type TransformSignalInputType<T> = {
  [K in keyof T]: TransformInputType<T[K]>;
};

// Type to extract the type from InputSignal or InputSignalWithTransform
type TransformInputType<T> =
  T extends InputSignalWithTransform<infer U, any>
  ? U
  : T extends InputSignal<infer U>
  ? U
  : T;
