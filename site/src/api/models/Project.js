class Project {
  constructor({ name, color, createdAt }) {
    this.name = name;
    this.color = color;
    this.createdAt = new Date(createdAt);
  }
}

export default Project;
