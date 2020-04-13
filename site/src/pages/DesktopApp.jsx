import { API, Task, Project } from "../api";
import render, { clear } from "../render";
import { app } from "firebase";

const DesktopApp = () => {
  const setBackground = hex => {
    root.style.backgroundColor = hex;
  };

  //TODO Date update on new day
  /* Gets current date on "MAR. 4" format*/
  const date = () => {
    var dt = new Date();
    Date.shortMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return Date.shortMonths[dt.getMonth()].toUpperCase() + ". " + dt.getDay();
  };

  const projects = <div id="__projects" class="usr-projects"></div>;

  const appendProject = p => render(createProject(p), true, projects);

  const loadProjects = () => {
    API.projects.getAll().then(ps => ps.forEach(appendProject));
  };

  API.user.onUpdate(async user => {
    if (user) {
      clear(projects);
      loadProjects();
    }
  });

  /**
   *
   * @param {Project} project
   */
  const createProject = project => {
    const display = <h5>{project.name}</h5>;
    return (
      <a
        class="project-name"
        onClick={() => {
          project
            .setName("NEW_NAME_" + Date.now().toFixed())
            .then(p => {
              display.textContent = p.name;
            })
            .catch(e => console.log(e));
        }}
      >
        {display}
      </a>
    );
  };

  return (
    <div class="container">
      <div id="settings"></div>
      {/* TODO customizable background*/
      setBackground("#242424")}

      <div class="flex-box-col">
        <div id="header">
          <h4>{date()}</h4>
        </div>
        <div class="flex-box-row">
          <div id="projects">
            {/* TODO load in list of projects and  */}
            {createProject({ name: "🥴 Inbox" })}
            {createProject({ name: "🔥 Today" })}

            <hr></hr>
            <h4>Projects</h4>
            {projects}
          </div>

          <div id="data">
            <div id="task" class="view">
              <div id="projs">
                <button
                  onClick={e => {
                    e.preventDefault();
                    API.projects
                      .create("Project" + Date.now().toFixed())
                      .then(appendProject);
                  }}
                >
                  Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TODO */}
      <div class="help">
        <a>?</a>
        <div class="help-info"></div>
      </div>
    </div>
  );
};

export default DesktopApp;
