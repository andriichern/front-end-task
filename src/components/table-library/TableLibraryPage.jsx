import React from "react";
import { connect } from 'react-redux';
import * as reportActions from '../../store/actions/reportsActions';
import TableComponent from './TableComponent.jsx';
import Spinner from '../common/Spinner.jsx'

class TableLibraryPage extends React.Component {

	componentDidMount() {
		if (this.hasNoData()) {
			this.props.loadReports100();
		}
	}

	hasNoData = () => this.props.headers.length === 0 && this.props.columns.length === 0;

	render() {
		return (
			<>
			{this.hasNoData() 
				? (<Spinner />) 
				: (<TableComponent 
					headers={this.props.headers}
					columns={this.props.columns}
				/>)}
			</>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		headers: state.headers,
		columns: state.reports
	}
}

const mapDispatchToProps = {
	loadReports100: reportActions.loadReports100,
	loadReports1000: reportActions.loadReports1000,
	loadReports1000: reportActions.loadReports10000
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TableLibraryPage);