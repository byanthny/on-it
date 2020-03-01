import _axios from "axios";
import auth, { token } from "./auth";
import { Note, Task, User, Project } from "./models";

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
  constructor() {
    this.currentUser = null;

    auth.onAuthStateChanged(async _user => {
      console.log("user updated");
      if (_user) {
        this.currentUser = await this.user.get();
      }
    });
  }

  /**
   * Map of User API functions
   *
   * TODO: Settings functions
   */
  user = {
    root: "/users/",
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
     * @returns {string} The current user's new username or null if it failed
     */
    setUsername: async username => {
      if (!auth.currentUser) {
        return null;
      }

      try {
        await auth.currentUser.updateProfile({ displayName: username });
      } catch (error) {
        throw error;
      }

      return username;
    },

    get: async function() {
      if (!auth.currentUser) {
        return null;
      }

      let result;
      try {
        result = await axios.get(`${this.root}${auth.currentUser.uid}`, {
          headers: { token: await token() }
        });
      } catch (error) {
        throw error;
      }

      return new User(result.data.payload.user);
    }
  };

  projects = {
    root: "/projects/",
    getAll: async function(limit = 100) {
      if (!auth.currentUser) {
        return null;
      }

      let result;
      try {
        result = await axios.get(`${this.root}${auth.currentUser.uid}`, {
          headers: { token: await token() }
        });
      } catch (error) {
        throw error;
      }

      return result.data.payload.projects.map(p => new Project(p));
    },
    /**
     *
     * @param {string} name - Name of the project
     * @param {string} color - The color of the project
     */
    create: async function(name, color) {
      if (!auth.currentUser) {
        return null;
      }

      const pjt = { name };

      if (color && color[0] !== "#") {
        color = "#" + color;
        pjt.color = color;
      }

      let result;
      try {
        result = await axios.post(`${this.root}${auth.currentUser.uid}`, pjt, {
          headers: {
            token: await token()
          }
        });
      } catch (error) {
        throw error;
      }

      return new Project(result.data.payload.project);
    }
  };

  /**
   * Map of task-related API functions.
   */
  task = {
    root: "/tasks/",
    getAll: async function(state = null, limit = 100) {
      let result;
      try {
        result = await axios.get(
          `${this.root}${auth.currentUser.uid}?limit=${limit}${
            state ? `&state=${state}` : ""
          }`,
          {
            headers: {
              token: await token()
            }
          }
        );
      } catch (error) {
        throw error;
      }

      return result.data.payload.tasks.map(t => new Task(t));
    },

    /**
     * Get all Tasks that have state "todo"
     *
     * @param {number} limit - Max number of results
     */
    getAllTodo: async function(limit = 100) {
      return this.getAll("todo", limit);
    },

    /**
     * Get all Tasks that have state "done"
     *
     * @param {number} limit
     */
    getAllDone: async function(limit = 100) {
      return this.getAll("done", limit);
    },

    getOne: async function(task) {
      const tid = typeof task === "string" ? task : task.tid;

      let result;
      try {
        result = await axios.get(`${this.root}${auth.currentUser.uid}/${tid}`, {
          headers: {
            token: await token()
          }
        });
      } catch (error) {
        throw error;
      }

      return new Task(result.data.payload.task);
    },

    /**
     * @param {string} text
     * @param {number} due
     * @param {Array<number>} reminders
     * @param {Array<string>} tags
     *
     * @returns {Promise<Task>}
     */
    create: async function(text, due, reminders = [], tags = []) {
      let result;
      try {
        result = await axios.post(
          `${this.root}${auth.currentUser.uid}`,
          { text, due, reminders, tags },
          { headers: { token: await token() } }
        );
      } catch (error) {
        throw error;
      }

      return new Task(result.data.payload.task);
    },

    updateOne: async function(task, updateData) {
      const tid = typeof task === "string" ? task : task.tid;

      let result;
      try {
        result = await axios.put(
          `${this.root}${auth.currentUser.uid}/${tid}`,
          updateData,
          { headers: { token: await token() } }
        );
      } catch (error) {
        throw error;
      }

      return new Task(result.data.payload.task);
    },

    /**
     *
     * @param {*} task
     * @returns {boolean} `true` if the task was deleted
     */
    deleteOne: async function(task) {
      const tid = typeof task === "string" ? task : task.tid;

      let result;
      try {
        result = await axios.delete(
          `${this.root}${auth.currentUser.uid}/${tid}`,
          { headers: { token: await token() } }
        );
      } catch (error) {
        throw error;
      }

      return result.data.payload.deleted;
    }
  };

  // TODO Notes & Projects
}

export default new API();
