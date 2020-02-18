/**
 * Simple Name object with first, last, and display names.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
class Name {
  /**
   * 
   * @param {string} first - First name
   * @param {string} last - Last name
   * @param {string} display - Display name
   */
  constructor(first, last, display) {
    this.first = first;
    this.last = last;
    this.display = display;
  }
}

export default Name;
