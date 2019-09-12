import React from "react";
import { connect } from 'react-redux';
import TableDataLoad from '../components/table-library/TableDataLoad.jsx';
import TableComponent from '../components/table-library/TableComponent.jsx';

const TableLibraryPage = ({
	types,
	headers,
	data
}) => {
	const headerEntries = Object.entries(headers);

	return (
		<>
			<TableDataLoad />
			{data.length > 0 &&
				<TableComponent
					data={data}
					types={types}
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
