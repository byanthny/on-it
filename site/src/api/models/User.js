import Name from "./Name";

/**
 * User object with UID, Name, email, createdAt & updatedAt.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
class User {
  /**
   *
   * @param {string} uid - User ID
   * @param {Name} name - User's name
   * @param {string} email - User's email
   * @param {number} createdAt - When the user was created (server side)
   * @param {number} updatedAt - When the user was last updated (server side)
   */
  constructor(uid, name, email, createdAt, updatedAt) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default User;
