import React from "react";
import TableComponent from './TableComponent.jsx';
import * as dataService from '../../services/dataService';
import { processDataHeaders } from '../../services/dataProcessingService'

export default class TableLibraryPage extends React.Component {
  render() {
    const test = dataService.getData100();
    processDataHeaders(test);
    return <TableComponent headers={['test1', 'test2', 'test3', 'test4']} />;
  }
}
