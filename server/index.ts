import http from "http";
import next from "next";
import { initSocket } from "./sockets/main";

const app = next({ dev: true });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer(handler);

  initSocket(server);

  server.listen(3000, () => {
    console.log("🚀 Startup server running on http://localhost:3000");
  });
});
