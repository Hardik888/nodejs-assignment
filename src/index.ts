import Server from "./drivers/server";
import {
  getUserHandler,
  loginHandler,
  signupHandler,
} from "./routes/register.route";
const server = new Server();

(async () => {
  await server.init(); // Initialize the server (e.g., connect to MongoDB)
  server.postRoute("/create/user", signupHandler); // Register the route and handler
  server.postRoute("/login/user", loginHandler);
  server.getRoute("/getinfo", getUserHandler);
  server.start(); // Start the server
})();
