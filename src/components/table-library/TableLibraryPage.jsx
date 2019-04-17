import React from "react";
import TableComponent from './TableComponent.jsx';

export default class TableLibraryPage extends React.Component {
	render() {
		return <TableComponent headers={['test1', 'test2', 'test3', 'test4']} />;
	}
}
