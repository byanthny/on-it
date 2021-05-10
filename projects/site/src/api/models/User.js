/**
 * Model for User information.
 * TODO
 */
class User {
  /**
   *
   * @param {object} Raw -
   * @param {string} Raw.uid -
   * @param {Settings} Raw.settings -
   * @param {Array<Project>} Raw.projects -
   * @param {string} Raw.createdAt -
   * @param {string} Raw.updatedAt -
   */
  constructor({ uid, settings, projects, createdAt, updatedAt }) {
    this.uid = uid;
    this.settings = settings;
    this.projects = projects;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

export default User;
