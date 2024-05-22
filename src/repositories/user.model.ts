import { Collection, Document, Filter, FindOptions } from "mongodb";
import MongoDB from "../lib/mongo";
import { UserEntity } from "./user.interface";
import config from "../config";
import { isValidUserEntity } from "./user.validation";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

export class UserModel extends MongoDB {
  private collection: Collection<UserEntity>;
  private readonly jwtsecret = config.express.jwt.secret;

  constructor() {
    super();
    this.collection = this.getCollection<UserEntity>("users")!;
    console.log("user route ");
  }

  async create(data: UserEntity): Promise<any> {
    // Validate data
    if (!isValidUserEntity(data)) {
      throw new Error(
        "Invalid data: Missing required fields or incorrect types"
      );
    }
    // Check if user with the same email already exists
    const existingUser = await this.collection.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("A user with this email already exists");
    }
    // Hash password
    const hashedPassword = await argon2.hash(data.pass);
    data.pass = hashedPassword;

    return await this.collection.insertOne(data);
  }

  async login(email: string, pass: string) {
    try {
      const existingUser = await this.collection.findOne({ email: email });
      if (!existingUser) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = await argon2.verify(existingUser.pass, pass);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        this.jwtsecret || "",
        { expiresIn: "6d" }
      );

      return token;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed. Please try again later.");
    }
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
