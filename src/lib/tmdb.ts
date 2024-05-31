import { TMDB } from "tmdb-ts";

import * as dotenv from "dotenv";

dotenv.config();

export const tmdb = new TMDB(process.env.TMDB_API_KEY as string);