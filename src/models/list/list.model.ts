import { Schema, model } from "mongoose";
import { List } from "../list/list.interface";
import { Film } from "../film/film.interface";


const listSchema = new Schema<List>({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    films: {
        type: Array<Film>,
        default: []
    },
    canDelete: {
        type: Boolean,
        default: true
    }
})

const List = model<List>("List", listSchema);

export default List;