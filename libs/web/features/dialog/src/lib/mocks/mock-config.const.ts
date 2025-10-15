
import { DEFAULT_OVERLAY_CONFIG } from "../default-configs";
import { DialogComponentConfig, DefaultDialogConfig, DialogEvent } from "../models";
import { WebFeatureMockComponent } from "../web-features-mock/web-features-mock.component";
import { WebFeatureMockNoInjectorComponent } from "../web-features-mock/web-features-mock-no-injector.component";

export const MOCK_CONFIG: DefaultDialogConfig = {
  injectorID: 'a1',
  title: 'Dialog Default Title',
  // content: 'Dialog Content',
  contentClasses: ['bg-gray-200'],
  contentComponent: () => WebFeatureMockNoInjectorComponent,
  btns: [
    {
      type: DialogEvent.Enter,
      displayName: 'Enter',
      classes: ['outline-none', 'text-base', 'border', 'px-2', 'py-1', 'rounded-md', 'border-red-400', 'bg-pink-200', 'transition-colors', 'hover:bg-pink-300']
    },
    {
      type: DialogEvent.Cancel,
      displayName: 'Close',
      classes: ['outline-none', 'text-base', 'border', 'px-2', 'py-1', 'rounded-md', 'border-blue-400', 'bg-blue-200', 'transition-colors', 'hover:bg-blue-300']
    }
  ],
  overlayConfig: DEFAULT_OVERLAY_CONFIG,
}

export const MOCK_CONFIG2: DialogComponentConfig = {
  injectorID: 'a2',
  componentRef: () => WebFeatureMockComponent,
  overlayConfig: DEFAULT_OVERLAY_CONFIG,
  data: {
    test: 'hello world'
  }
}
