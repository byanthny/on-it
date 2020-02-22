import _axios from "axios";
import auth, { token } from "./auth";
import { Note, Task } from "./models";

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
  user = {
    /**
     * Register a new user.
     *
     * @param {string} email - User's email
     * @param {string} password - User's password
     *
     * @returns The newly created User
     */
    register: async (email, password) => {
      let result;
      try {
        result = await auth.createUserWithEmailAndPassword(email, password);
      } catch (error) {
        throw error;
      }

      return result.user;
    },

    /**
     * Logs in to Firebase auth.
     *
     * @param {string} email - User's email
     * @param {string} password - User's password
     *
     * @returns
     */
    login: async (email, password) => {
      let result;
      try {
        result = await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        throw error;
      }

      return result;
    },

    /**
     *
     * @param {string} newUsername - String value to set the username to.
     *
     * @returns {string} The current user's new username/displayname or null if it failed
     */
    setUsername: async username => {
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
  };

  task = {
    /**
     * @param {string} text
     * @param {number} due
     * @param {Array<number>} reminders
     * @param {Array<string>} tags
     *
     * @returns {Promise<Task>}
     */
    create: async (text, due, reminders = [], tags = []) => {
      let result;
      try {
        result = await axios.post(
          `/tasks/${auth.currentUser.uid}`,
          {
            text,
            due,
            reminders,
            tags
          },
          {
            headers: {
              token: await token()
            }
          }
        );
      } catch (error) {
        throw error;
      }

      return result.data.payload.task;
    }
  };
}

export default new API();
