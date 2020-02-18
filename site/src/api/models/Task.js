/**
 * Task object.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
class Task {
  /**
   *
   * @param {string} uid
   * @param {string} tid
   * @param {string} parent
   * @param {string} text
   * @param {number} due
   * @param {Array<number>} reminders
   * @param {string} state
   * @param {boolean} pinned
   * @param {Array<string>} tags
   */
  constructor(uid, tid, parent, text, due, reminders, state, pinned, tags) {
    this.uid = uid;
    this.tid = tid;
    this.parent = parent;
    this.text = text;
    this.due = due;
    this.reminders = reminders;
    this.state = state;
    this.pinned = pinned;
    this.tags = tags;
  }
}
