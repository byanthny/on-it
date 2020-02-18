import _axios from "axios";
import { token } from "./auth";
import { User } from "./models";

const API_URI = "http://localhost:7000/api"; //"https://onitapp.herokuapp.com/api";

const axios = _axios.create({
  baseURL: API_URI,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * On-It API wrapper instance.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
class API {
  /**
   * Creates a new user.
   *
   * @param {User} user - The new user to create
   * @returns {Promise<User>} The created User or null if it failed.
   *
   * @since 0.1.0
   */
  async createUser(user) {
    try {
      const { data } = await axios.post("/user/", user, {
        headers: { token }
      });

      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new API();
