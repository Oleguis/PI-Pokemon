import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

import reduxDevTools from './enhancers.js';

const store = createStore(
	rootReducer,
	undefined,
	compose(applyMiddleware(thunk),reduxDevTools)
	// applyMiddleware(thunk)
);

export default store;
