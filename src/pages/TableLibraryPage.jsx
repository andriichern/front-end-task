import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dataActions from '../store/actions/dataActions';
import TableDataLoad from '../components/table-library/TableDataLoad.jsx';
import TableComponent from '../components/table-library/TableComponent.jsx';

const TableLibraryPage = ({
	types,
	headers,
	data,
	actions
}) => {
	return (
		<>
			<TableDataLoad {...actions} />
			{data.length > 0 &&
				<TableComponent
					data={data}
					types={types}
					dataHeaders={headers} />
			}
		</>
	);
}

function mapStateToProps(state) {
	return {
		types: state.types,
		headers: Object.entries(state.headers),
		data: state.data
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(dataActions, dispatch)
	}	
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TableLibraryPage);
