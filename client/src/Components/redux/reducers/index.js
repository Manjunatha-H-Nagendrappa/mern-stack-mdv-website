import { productReducer } from "./productReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  productReducer: productReducer,
});

export default rootReducer;
