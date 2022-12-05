import { createStore } from "redux";
import rowsReducer from "./reducers";

const store = createStore(rowsReducer);

export default store;