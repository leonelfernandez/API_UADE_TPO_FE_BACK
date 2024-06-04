import { Schema, model } from "mongoose";
import { List } from "../list/list.interface";
import { filmSchema } from "../film/film.model";


export const listSchema = new Schema<List>({
    title: {
        type: String,
        required: true,
    },
    films: [filmSchema],
    canDelete: {
        type: Boolean,
        required: true,
        default: true
    }
})

const List = model<List>("List", listSchema);

export default List;