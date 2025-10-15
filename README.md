# Angular Dialog Library

A flexible and feature-rich dialog/modal library for Angular 19 applications.

## Project Structure

This is an NX monorepo with the following structure:

```
angular-dialog-lib/
├── apps/
│   └── skeleton/          # Demo application showcasing the dialog library
├── libs/
│   └── dialog/            # The dialog library
└── md/                    # Documentation and guides
```

## Getting Started

### Installation

```bash
npm install
```

### Run Demo Application

```bash
npm start
```

The skeleton app will run on `http://localhost:4300`

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

## Dialog Library

The dialog library is located in `libs/dialog/` and provides:

- Flexible dialog/modal components
- Overlay positioning utilities
- Customizable dialog configurations
- Event handling for dialog lifecycle

### Usage

```typescript
import { DialogService, MOCK_CONFIG } from 'dialog';

// In your component
export class MyComponent {
  private dialogService = inject(DialogService);

  openDialog() {
    const ref = this.dialogService.openDefaultDialog(MOCK_CONFIG);
    ref.event$.subscribe((event) => console.log(event));
  }
}
```

For detailed documentation, see:

- [User Guide](libs/dialog/DIALOG_USER_GUIDE.md)
- [Developer Guide](libs/dialog/DIALOG_DEVELOPER_GUIDE.md)

## Technology Stack

- Angular 19
- RxJS 7
- Tailwind CSS 4
- NX Workspace
- Jest (Testing)

## Scripts

- `npm start` - Start the demo application (skeleton)
- `npm run build` - Build all projects
- `npm test` - Run tests
- `npm run lint` - Lint the codebase
- `npm run format` - Format code with Prettier
- `npm run graph` - View NX dependency graph

## License

MIT
