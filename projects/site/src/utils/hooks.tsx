import { Note, Tag, Task } from "common";
import { toast } from "react-toastify";
import OnItApi from "../services/OnItApi";

/* Loads all Notes or Tasks from the API
 * Creates map of Notes or Tasks by grouped by tags
 * returns map of Notes or Tasks
 * Uses fetch to get data from the API, a list of tags, and a dispatch function to update the state
 */
export function useLoadItems(fetch: Function, tags: Tag[], dispatch: Function) {
  tags.forEach(async (tag) => {
    const response = await fetch(tag._id);
    if (response.length > 0) dispatch({ type: "CREATE", payload: { tag: tag.name, response } });
    else toast(`Nothing found for tag: ${tag.name}`);
  });
}

/* Creates a new Note or Task based on itemType
 * Uses provided data
 * if handleResponse is provided the API payload is provided to that function
 * Otherwise the response is returned
 */
export async function useItemCreate(
  data: Task | Note,
  handleResponse?: Function,
) {
  let response;
  if (data as Task) {
    const task: Task = data as Task;
    response = await OnItApi.task.create(task);
  } else if (data as Note) {
    const temp: Task = await (await OnItApi.task.search({})).payload![0]; // Temp workaround till notes are decoupled from task

    const note: Note = data as Note;
    note.updated = new Date().toISOString();
    response = await OnItApi.note.create(note);
  } else {
    response = {
      error: "Unknown",
    };
  }

  if (handleResponse && !response.error) handleResponse(response.payload);

  return response;
};


// TODO useClickOutside to detect clicks outside of a component
// Use for modal