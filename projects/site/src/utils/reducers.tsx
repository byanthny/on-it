import { Tag } from "common";
import { toKeyValueMap } from "./utils";

const itemReducer = (state: Map<any, any>, action: any) => {
    switch (action.type) {
        case "CREATE":
            return new Map(state.set(action.payload.tag, toKeyValueMap(action.payload.response)));
        case "UPDATE": {
            const tags = action.payload.response.tags ?? [{ "name": "untagged" }];
            tags.forEach((tag: Tag) => {
                state.set(tag.name, new Map(state.get(tag.name).set(action.payload.id, action.payload.response)));
            });
            return new Map(state);
        }
        case "DELETE":
            action.payload.response.tags.forEach((tag: Tag) => {
                state.set(tag, state.get(tag).delete(action.payload.id, action.payload.response));
            });
            return new Map(state);
        default:
            return state;
    };
};

export default itemReducer;