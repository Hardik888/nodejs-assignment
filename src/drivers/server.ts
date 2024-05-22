import express, { Express } from "express";
import MongoDB from "../lib/mongo";
import config from "../config";

class Server {
  private app: Express;
  private mongo: MongoDB;

  constructor() {
    this.app = express();
    this.mongo = new MongoDB();
  }
  async init(): Promise<void> {
    try {
      await this.mongo?.connect();
    } catch (error: any) {
      console.log(error);
      console.error(`ServerError:${error?.message || error}`);
      await this.mongo?.disconnect();
      process.exit(1);
    }
  }
  public start(): void {
    this.app.listen(config.express.port, () => {
      console.log(`Server is running on port ${config.express.port}`);
    });
  }
}
export default Server;
