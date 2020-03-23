import { API, Task } from "../api";


const DesktopApp = ()  => {
    
      return (
        <div class="container">
            <div class="flex-box-col">
                <div id="settings">
                <h1>MARCH</h1>
                </div>
            <div class="flex-box-row">
                <div id="projects">
                {/* TODO load in list of projects and  */}
                x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>x<br/>
                <div id="task" class="view">
            <div id="projs">
              <button
                onClick={e => {
                  e.preventDefault();
                  //API.projects.create("TesT-prOject-name");
                  //API.projects.delete("Project-Name-One").then(r => console.log(r));
                  loadProjects();
                }}
              >
                Test
              </button>
            </div>
          </div>
                </div>

                <div id="data">

                </div>
            </div>
            </div>
        </div>
      );
}

export default DesktopApp;