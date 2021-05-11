import API from "../API";

class Project {
  constructor({ name, color, createdAt }) {
    this.name = name;
    this.color = color;
    this.createdAt = new Date(createdAt);
  }

  /**
   *
   */
  setName = async newName => {
    const r = await API.projects.update(this, { name: newName });
    this.name = r.name;
    return this;
  };

  /**
   *
   */
  setColor = async newColor => {
    const r = await API.projects.update(this, { color: newColor });
    this.color = r.color;
    return this;
  };
}

export default Project;
