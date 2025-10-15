import cors from 'cors';
import express from 'express';
import * as path from 'path';

import { contentTypeRouter } from '../routes/content-type.routes';

// Maps the URL path assets to serve files from the assets directory
// express.static() is middleware that serves static files (images, CSS, JS, etc.)
// path.join(__dirname, 'assets') creates the full filesystem path to the assets folder
// src/
// ├── assets/
// │   ├── logo.png      → http://localhost:3333/assets/logo.png
// │   └── images/
// │       └── hero.jpg  → http://localhost:3333/assets/images/hero.jpg

const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: 如果越來越多router, 直接把router集中做設定
app.use('/content', contentTypeRouter);

// Add this after all routers
app.use((req, res, next) => {
  console.log('Unmatched request:', req.method, req.originalUrl);
  res.status(404).send('Not found');
});

export default app;
