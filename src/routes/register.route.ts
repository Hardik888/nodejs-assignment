import { Response, Request } from "express";
import { UserEntity } from "../repositories/user.interface";
import { UserModel } from "../repositories/user.model";

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
