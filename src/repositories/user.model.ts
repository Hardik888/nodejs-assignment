import { Collection, Document, Filter, FindOptions } from "mongodb";
import MongoDB from "../lib/mongo";
import { UserEntity } from "./user.interface";
import config from "../config";

export class UserModel extends MongoDB {
  private collection: Collection<UserEntity>;
  private readonly database = config.mongo.database;

  constructor() {
    super();
    this.collection = this.getCollection<UserEntity>("users")!;
    console.log("user route ");
  }

  async create(
    data: Pick<UserEntity, "name" | "dateofBirth" | "email" | "pass">
  ) {
    return await this.collection.insertOne(data);
  }

  getAllUsersPaginated({
    skip = 0,
    limit = 10,
  }: {
    skip: number;
    limit: number;
  }) {
    return this.collection.find(
      {},
      {
        skip,
        limit,
      }
    );
  }
}
