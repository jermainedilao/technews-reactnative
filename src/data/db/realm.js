import Realm from "realm";
import { Article } from "../models";

export default new Realm({ schema: [Article] });