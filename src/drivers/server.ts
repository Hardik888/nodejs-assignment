import express, { Express, Request, Response } from "express";
import MongoDB from "../lib/mongo";
import configService from "../config";
import cors from "cors";
import JWTMiddleware from "../middleware/jwt.middleware";

class Server {
  private app: Express;
  private mongo: MongoDB;

  constructor() {
    this.app = express();
    this.mongo = new MongoDB();
    this.app.use(express.json());
    this.app.use(cors(configService.express.cors));
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
      this.app.listen(configService.express.port, () => {
        console.log(`Server is running on port ${configService.express.port}`);
      });
    });
  }

  public postRoute(
    router: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.app.post(router, handler);
  }
  public getRoute(
    router: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.app.get(router, JWTMiddleware.verifyToken, handler);
  }
}

export default Server;
