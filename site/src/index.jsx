import "./React";
import { DesktopApp, MobileApps, Login } from "./pages";
import render from "./render";
import { API } from "./api";

API.user.onUpdate(u => console.log(u));

render(API.user.currentUser ? DesktopApp : Login);

