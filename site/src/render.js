const root = document.getElementById("root");

/**
 * Appends the given child element to the given parent element.
 * The parent element will be cleared of all children.
 *
 * @param {HTMLElement} child - The child element to render
 * @param {boolean} preserve - `true` if the parent sould not be cleared of child elements before rendering. Defaults to false
 * @param {HTMLElement} parent - The parent element to append to, defaults to the root div
 * @returns {HTMLELement} The parent element with the child appended
 */
const render = async (child, preserve = false, parent = root) => {
  if (!preserve) {
    for (const e of parent.children) e.remove();
  }

  parent.appendChild(typeof child === "function" ? await child() : child);
  return parent;
};

export default render;
