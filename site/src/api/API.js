import _axios from "axios";
import auth, { token } from "./auth";
import { User, Name } from "./models";

const API_URI = "/api";

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
   * Register a new user.
   *
   * @param {string} email - User's email
   * @param {string} password - User's password
   *
   * @returns {Promise<User>} The newly created User
   */
  async register(email, password) {
    let result;
    try {
      result = await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }

    return result.user;
  }

  /**
   * Logs in to Firebase auth.
   *
   * @param {string} email - User's email
   * @param {string} password - User's password
   *
   * @returns
   */
  async login(email, password) {
    let result;
    try {
      result = await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }

    return result;
  }

  /**
   *
   * @param {string} newUsername - String value to set the username to.
   *
   * @returns {string} The current user's new username/displayname or null if it failed
   */
  async setUsername(username) {
    if (!auth.currentUser) {
      return null;
    }

    try {
      await auth.currentUser.updateProfile({ displayName: username });
    } catch (error) {
      return null;
    }

    return username;
  }
}

export default new API();
