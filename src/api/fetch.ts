import axios from "axios";
import { Fetch } from "./types/fetchtype";
const getToken = () => localStorage.getItem("jwtToken");
const fetch = async (): Promise<Fetch> => {
  try {
    const token = getToken();
    const response = await axios.get("http://localhost:5001/getinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export default fetch;
