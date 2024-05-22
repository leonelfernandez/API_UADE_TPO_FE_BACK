import { Schema, model } from "mongoose";
import { List } from "../list/list.interface";
import FilmSchema from "../film/film.model";


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
        type: [],
        default: []
    },
    canDelete: {
        type: Boolean,
        default: true
    }
})

const List = model<List>("List", listSchema);

export default List;