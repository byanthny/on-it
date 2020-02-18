/**
 * Note object
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
class Note {
  /**
   *
   * @param {string} uid
   * @param {string} nid
   * @param {string} parent
   * @param {string} title
   * @param {string} text
   * @param {Array<string>} tags
   * @param {number} createdAt
   * @param {number} updatedAt
   */
  constructor(uid, nid, parent, title, text, tags, createdAt, updatedAt) {
    this.uid = uid;
    this.nid = nid;
    this.parent = parent;
    this.title = title;
    this.text = text;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
