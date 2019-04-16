// ================================
// START YOUR APP HERE
// ================================

// Load application styles
import "./styles/index.scss";
//import data100 from "./data/report_100.json";
import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";

render(
	<App />,
	document.getElementById("mainContainer")
);
