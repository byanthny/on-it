/**
 * Task object.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
class Task {
  /**
   *
   * @param {object} Raw - Raw task data
   * @param {string} Raw.uid
   * @param {string} Raw.tid
   * @param {string} Raw.parent
   * @param {string} Raw.text
   * @param {string} Raw.due
   * @param {Array<string>} Raw.reminders
   * @param {string} Raw.state
   * @param {boolean} Raw.pinned
   * @param {Array<string>} Raw.tags
   * @param {string} Raw.createdAt
   * @param {string} Raw.updatedAt
   */
  constructor({
    uid,
    tid,
    parent,
    text,
    due,
    reminders,
    state,
    pinned,
    tags,
    createdAt,
    updatedAt
  }) {
    this.uid = uid;
    this.tid = tid;
    this.parent = parent || null;
    this.text = text;
    this.due = new Date(due);
    this.reminders = reminders.map(r => new Date(r));
    this.state = state;
    this.pinned = pinned;
    this.tags = tags;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

export default Task;
