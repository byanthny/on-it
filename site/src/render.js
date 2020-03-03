const root = document.getElementById("root");

/**
 * Appends the given child element to the given parent element.
 * The parent element will be cleared of all children.
 *
 * @param {HTMLELement} child - The child element to render
 * @param {HTMLElement} parent - The parent element to append to, defaults to the root div
 * @returns {HTMLELement} The parent element with the child appended
 */
const render = (child, parent = root) => {
  for (const e of parent.children) e.remove();
  parent.appendChild(child);
  return parent;
};

export default render;
