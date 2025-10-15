import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { DecorateOverlayRef } from '../decorate-overlay-ref';
import { DefaultDialogConfig, DialogComponentConfig, DialogType } from '../models';
import { DIALOG_COMPONENT_PROVIDER, DIALOG_DEFAULT_PROVIDER, ProviderTypes } from '../providers';
import { createRefBuilder, createRefInjector, DecorateRefBuilder } from '../utils';
import { WebFeaturesDialogComponent } from '../web-features-dialog/web-features-dialog.component';

/**
 * Service to manage and open dialog overlays in the application.
 *
 * The `DialogService` provides methods to open default dialogs and component-based dialogs
 * with specified configurations and providers. It utilizes an internal reference builder
 * and injector to create and manage dialog overlays.
 *
 * @example
 * // Injecting DialogService in a component
 * constructor(private dialogService: DialogService) {}
 *
 * // Opening a default dialog
 * const config: DefaultDialogConfig = { /* configuration options *\/ };
 * const dialogRef = this.dialogService.openDefaultDialog(config);
 *
 * // Opening a component-based dialog
 * const componentConfig: DialogComponentConfig = { /* configuration options *\/ };
 * const dialogRef = this.dialogService.openComponentDialog(componentConfig);
 *
 * @publicApi
 */
@Injectable({ providedIn: 'root' })
export class DialogService {
  #refBuilder: DecorateRefBuilder = createRefBuilder(inject(OverlayPositionBuilder), inject(Overlay));
  #refInjector = createRefInjector(inject(Injector));
  constructor() { }

  /**
   * Opens a default dialog with the specified configuration.
   *
   * @param {DefaultDialogConfig} config - The configuration object for the default dialog.
   * @returns {DecorateOverlayRef} - A reference to the created dialog overlay.
   */
  public openDefaultDialog(config: DefaultDialogConfig): DecorateOverlayRef {
    const dialogProvider = { provide: DIALOG_DEFAULT_PROVIDER, useValue: config };
    return this.createDialog(config, WebFeaturesDialogComponent, [dialogProvider]);
  }

  /**
   * Opens a component dialog with the specified configuration and providers.
   *
   * @param {DialogComponentConfig} config - The configuration object for the component dialog.
   * @param {ProviderTypes} [providers=[]] - Optional array of providers to be injected into the dialog.
   * @returns {DecorateOverlayRef} - A reference to the created dialog overlay.
   */
  public openComponentDialog<T = any>(config: DialogComponentConfig, providers: ProviderTypes = []): DecorateOverlayRef<T> {
    const dialogComponentProvider = { provide: DIALOG_COMPONENT_PROVIDER, useValue: config };
    return this.createDialog(config, config.componentRef(), [...providers, dialogComponentProvider]);
  }

  /**
   * Creates and opens a dialog with the specified configuration and component.
   *
   * @template T - The type of the dialog configuration.
   * @template C - The type of the component to be rendered inside the dialog.
   *
   * @param {T} dialogConfig - The configuration object for the dialog, including overlay settings.
   * @param {ComponentType<C>} component - The component to be rendered inside the dialog.
   * @param {ProviderTypes} [providers=[]] - Optional array of providers to be injected into the dialog.
   *
   * @returns {DecorateOverlayRef} - A reference to the created dialog overlay.
   */
  private createDialog<T extends DialogType, C>(
    dialogConfig: T, component: ComponentType<C>, providers: ProviderTypes = []
  ): DecorateOverlayRef {
    // Sets up the dialog reference, injector, and portal.
    const { overlayConfig, autoClose, injectorID } = dialogConfig;
    const decorateRef = this.#refBuilder(overlayConfig, autoClose);
    const injector = this.#refInjector(injectorID, decorateRef, providers);
    const portal = new ComponentPortal(component, null, injector);
    return this.attachDialog(decorateRef, portal);
  }

  /**
   * Attaches the portal to the dialog reference and returns the dialog reference.
   * @param {DecorateOverlayRef} decorateRef - The dialog reference.
   * @param {ComponentPortal<any>} portal - The portal to be attached.
   * @returns {DecorateOverlayRef} - The dialog reference with the attached portal.
   */
  private attachDialog<T>(decorateRef: DecorateOverlayRef<T>, portal: ComponentPortal<any>): DecorateOverlayRef<T> {
    decorateRef.attachPortal(portal);
    return decorateRef;
  }
}
