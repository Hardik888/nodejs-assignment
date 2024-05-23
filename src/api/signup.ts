import axios from "axios";
import { SignupType } from "./types/signuptype";

const signup = async (body: SignupType): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:5001/create/user",
      body
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export default signup;
