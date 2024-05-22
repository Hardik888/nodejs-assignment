import { MongoClient, Collection, Document } from "mongodb";
import configService from "../config";

class MongoDB {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(configService.mongo.connectionString!, {
      appName: configService.mongo.appName,
    });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
    }
  }

  async healthCheck(): Promise<any> {
    try {
      const res = await this.client.db("admin").command({ ping: 1 });
      console.log("MongoDB health check passed");
      return res;
    } catch (error) {
      console.error("MongoDB health check failed:", error);
    }
  }

  getCollection<T extends Document>(
    collection: string
  ): Collection<T> | undefined {
    const db = this.client.db(configService.mongo.database);
    return db.collection(collection);
  }
}

export default MongoDB;
