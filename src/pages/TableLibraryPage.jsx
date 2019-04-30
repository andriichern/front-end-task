import React from "react";
import { connect } from 'react-redux';
import DataLoad from '../components/table-library/TableDataLoad.jsx';
import TableComponent from '../components/table-library/TableComponent.jsx';

const TableLibraryPage = ({
	types,
	headers,
	data
}) => {
	const headerEntries = Object.entries(headers);

	return (
		<>
			<DataLoad />
			{data.length > 0 &&
				<TableComponent
					data={data}
					dataTypes={types}
					dataHeaders={headerEntries} />
			}
		</>
	);
}

function mapStateToProps(state) {
	return {
		types: state.types,
		headers: state.headers,
		data: state.data,
		loading: state.loading
	}
}

export default connect(
	mapStateToProps,
)(TableLibraryPage);
