import { Collection, Document, Filter, FindOptions, ObjectId } from "mongodb";
import MongoDB from "../lib/mongo";
import { UserEntity } from "./user.interface";
import configService from "../config";
import { isValidUserEntity } from "./user.validation";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

export class UserModel extends MongoDB {
  private collection: Collection<UserEntity>;
  private readonly jwtsecret = configService.express.jwt.secret;

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
      console.log(this.jwtsecret);

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
  async getByEmail(email: string) {
    try {
      const user = await this.collection.findOne({ email });
      if (!user) {
        console.error("User not found for email:", email);
      }
      return {
        username: user?.name,
        email: user?.email,
        dob: user?.dateofBirth,
      };
    } catch (error) {
      console.error("Error retrieving user by email:", error);
      return null;
    }
  }
}
