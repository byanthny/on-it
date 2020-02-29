const readStyle = style => {
  if (style === null) return "";
  if (typeof style === "string") return style;
  let s = "";
  for (var k in style) {
    s =
      s +
      k.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase() +
      ":" +
      style[k] +
      ";";
  }
  return s;
};

window["React"] = {
  createElement: function(tag, attrs, children) {
    var element = document.createElement(tag);

    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        let value = attrs[name];
        if (value === true) {
          element.setAttribute(name, name);
        } else if (value !== false && value != null) {
          if (typeof value === "function") {
            element[name.toLowerCase()] = value;
          } else if (name === "style") {
            element.setAttribute(name, readStyle(value));
          } else {
            element.setAttribute(name, value.toString());
          }
        }
      }
    }

    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i];
      element.appendChild(
        child.nodeType == null
          ? document.createTextNode(child.toString())
          : child
      );
    }
    return element;
  }
};
