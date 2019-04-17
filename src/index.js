// ================================
// START YOUR APP HERE
// ================================

// Load application styles
import "./styles/index.scss";
import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";
import configureStore from './store/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

const store = configureStore();

render(
	<ReduxProvider store={store}>
		<App />
	</ReduxProvider>,
	document.getElementById("mainContainer")
);
