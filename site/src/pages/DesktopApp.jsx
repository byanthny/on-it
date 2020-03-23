import { API, Task } from "../api";


const DesktopApp = ()  => {
    //TODO Date update on new day
    /* Gets current date on "MAR. 4" format*/
    var date = () => {
        var dt = new Date();
        Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return Date.shortMonths[dt.getMonth()].toUpperCase() + ". " + dt.getDay();
    }

    var projects = API.projects.getAll();

    var createProject = (p) => {
        //<a class="project-name current"><h5>{p}</h5></a>
        return (
            <a class="project-name"><h5>{p}</h5></a>
        );
    }



    return (
        <div class="container">
            <div class="flex-box-col">
                <div id="settings">
                    <h3>{date()}</h3>
                </div>
                <div class="flex-box-row">
                    <div id="projects">
                        {/* TODO load in list of projects and  */}
                        {createProject("🥴 Inbox")}
                        {createProject("🔥 Today")}

                        <hr></hr>
                        <h4>Projects</h4>
                        <div class="usr-projects">
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}
                            {createProject("🔥 Test")}

                            {/*projects.array.forEach(element => {
                                createProject(element.name);
                            })*/}

                        </div>
                    </div>

                    <div id="data">
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
                </div>
            </div>
            

            {/* TODO */}
            <div class="help">
                <a>?</a>
                <div class="help-info">

                </div>
            </div>
        </div>
      );
}

export default DesktopApp;