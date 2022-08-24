import { ApiResponse, Note, Tag, Task } from "common";
import { toast } from "react-toastify";

/* Loads all Notes or Tasks from the API
 * Creates map of Notes or Tasks by grouped by tags
 * returns map of Notes or Tasks
 */
function useLoadItems(fetch: Function, tags: Tag[], dispatch: Function) {
    tags.forEach(async (tag) => {
        const response = await fetch(tag._id);
        if (response.length > 0)
            dispatch({ type: "CREATE", payload: { tag: tag.name, response } });
        else
            toast(`Nothing found for tag: ${tag.name}`);
    });
};

export default useLoadItems;
