import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  GlobalPositionStrategy,
  OverlayPositionBuilder,

} from '@angular/cdk/overlay';
import { ElementRef } from '@angular/core';


/**
 * Generates a global center position strategy for an overlay.
 *
 * This function uses the provided `OverlayPositionBuilder` to create a `GlobalPositionStrategy` that centers the overlay both horizontally
 * and vertically on the screen.
 *
 * @param builder - The `OverlayPositionBuilder` used to create the position strategy.
 * @returns A `GlobalPositionStrategy` that centers the overlay on the screen.
 */
export function generateGlobalCenterPosition(
  builder: OverlayPositionBuilder
): GlobalPositionStrategy {
  return builder.global().centerHorizontally().centerVertically();
}

/**
 * Generates a flexible connected position strategy for an overlay.
 *
 * @param builder - The OverlayPositionBuilder used to create the position strategy.
 * @param target - The target element to which the overlay will be connected. This can be an ElementRef or an Element.
 * @param connectedPositions - An array of ConnectedPosition objects that define the preferred positions for the overlay.
 * @returns A FlexibleConnectedPositionStrategy configured with the specified positions.
 */
export function generateFlexiblePosition(
  builder: OverlayPositionBuilder,
  target: ElementRef<unknown> | Element,
  connectedPositions: ConnectedPosition[]
): FlexibleConnectedPositionStrategy {
  return builder.flexibleConnectedTo(target).withPositions([...connectedPositions]);
}
