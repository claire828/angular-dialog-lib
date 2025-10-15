import { WebServer } from "./index";

const app = WebServer.app;
const port = process.env.PORT || 3333;
const server = app.listen(process.env.PORT || 3333, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
