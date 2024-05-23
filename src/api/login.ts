import axios from "axios";
import { Login } from "./types/logintype";

const login = async (body: Login): Promise<any> => {
  try {
    const response = await axios.post("http://localhost:5001/login/user", body);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export default login;
