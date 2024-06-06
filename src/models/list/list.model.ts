import { Schema, model } from "mongoose";
import { List, ListTag } from "../list/list.interface";
import { filmSchema } from "../film/film.model";


export const listSchema = new Schema<List>({
    title: {
        type: String,
        required: true,
    },
    films: [filmSchema],
    canDelete: {
        type: Boolean,
        required: false,
        default: true
    },
    tag: {
        type: String,
        required: false,
        enum: ["to_watch", "watched", "favorite"]
    }
})

const List = model<List>("List", listSchema);

export default List;