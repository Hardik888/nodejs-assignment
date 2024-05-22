import Server from "./drivers/server";

const server = new Server();

server.init().then(() => server.start());
