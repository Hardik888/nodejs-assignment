import { Response, Request } from "express";
import { UserEntity } from "../repositories/user.interface";
import { UserModel } from "../repositories/user.model";
import JWTMiddleware from "../middleware/jwt.middleware";

const model = new UserModel();
export const signupHandler = async (req: Request, res: Response) => {
  const body: UserEntity = req.body;

  try {
    const response = await model.create(body);

    if (response) {
      return res.status(200).send({ response });
    } else {
      return res.status(401).send("Invalid data");
    }
  } catch (error) {
    return res.status(500).send(`${error} Internal Error`);
  }
};
export const loginHandler = async (req: Request, res: Response) => {
  const { email, pass } = req.body;
  try {
    const response = await model.login(email, pass);
    if (response) {
      return res.status(200).send({ jwttoken: response });
    } else {
      return res.status(401).send("Invalid data");
    }
  } catch (error) {
    return res.status(500).send(`${error} Internal Error`);
  }
};
export const getUserHandler = async (req: Request, res: Response) => {
  try {
    // Ensure the request is authorized by using the JWT middleware
    JWTMiddleware.verifyToken(req, res, async () => {
      try {
        // Extract user ID from decoded JWT payload
        const userId = req.body.userId;
        const userEmail = req.body.email;
        console.log(userEmail);
        const user = await model.getByEmail(userEmail);
        if (!user) {
          return res.status(404).send("User not found");
        }
        // Send user information as a response
        return res.status(200).json(user);
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
