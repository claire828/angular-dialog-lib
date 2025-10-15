import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { DialogEvent } from './dialog-event.enum';

/**
 * Type representing CSS class names
 */
export type ClassType = string | string[] | { [key: string]: boolean };

/**
 * Configuration interface for a dialog component.
 *
 * @template T - The type of the component.
 * @template D - The type of the data passed to the component.
 */
export interface DialogComponentConfig<T = unknown, D = unknown> {
  injectorID: string;
  componentRef: () => ComponentType<T>;
  overlayConfig: OverlayConfig;
  autoClose?: boolean;
  data?: D;
}

export interface DefaultDialogConfig {
  injectorID: string;
  title: string;
  content?: string;
  contentComponent?: () => ComponentType<any>;
  contentClasses: ClassType;
  btns: DialogBtnSetting[];
  overlayConfig: OverlayConfig;
  autoClose?: boolean;
}

export interface DialogBtnSetting {
  type: DialogEvent;
  displayName: string;
  classes?: ClassType;
}

/**
 * Represents the configuration type for a dialog.
 * It can be either a `DialogComponentConfig` or a `DefaultDialogConfig`.
 */
export type DialogType = DialogComponentConfig | DefaultDialogConfig;
