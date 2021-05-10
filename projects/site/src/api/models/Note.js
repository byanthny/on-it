/**
 * Note object
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
class Note {
  /**
   *
   * @param {object} Raw.Raw
   * @param {string} Raw.uid
   * @param {string} Raw.nid
   * @param {string} Raw.parent
   * @param {string} Raw.title
   * @param {string} Raw.text
   * @param {Array<string>} Raw.tags
   * @param {string} Raw.createdAt
   * @param {string} Raw.updatedAt
   */
  constructor({ uid, nid, parent, title, text, tags, createdAt, updatedAt }) {
    this.uid = uid;
    this.nid = nid;
    this.parent = parent;
    this.title = title;
    this.text = text;
    this.tags = tags;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

export default Note;
