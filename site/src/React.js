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
      try {
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
      } catch (error) {
        console.log(error);
      }
    }

    for (let i = 2; i < arguments.length; i++) {
      try {
        let child = arguments[i];
        if (child) {
          element.appendChild(
            child.nodeType == null
              ? document.createTextNode(child.toString())
              : child
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    return element;
  }
};
