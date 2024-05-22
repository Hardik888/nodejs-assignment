import express, { Express, Request, Response } from "express";
import MongoDB from "../lib/mongo";
import config from "../config";
import cors from "cors";

class Server {
  private app: Express;
  private mongo: MongoDB;

  constructor() {
    this.app = express();
    this.mongo = new MongoDB();
    this.app.use(express.json());
    this.app.use(cors(config.express.cors));
  }

  async init(): Promise<void> {
    try {
      await this.mongo.connect();
    } catch (error: any) {
      console.error(`ServerError: ${error.message || error}`);
      await this.mongo.disconnect();
      process.exit(1);
    }
  }

  public start(): void {
    this.init().then(() => {
      this.app.listen(config.express.port, () => {
        console.log(`Server is running on port ${config.express.port}`);
      });
    });
  }

  public postRoute(
    router: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.app.post(router, handler);
  }
}

export default Server;
