const root = document.getElementById("root");

/**
 * Removes all child nodes from an element.
 *
 * @param {HTMLElement} p - Element to clear
 * @returns {HTMLElement} The given element
 */
export const clear = p => {
  for (const e of p.children) e.remove();
  return p;
};

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
  if (!preserve) clear(parent);

  parent.appendChild(typeof child === "function" ? await child() : child);
  return parent;
};

export default render;
