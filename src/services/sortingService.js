import * as sortOrder from  '../utils/sortingOrder';
import * as dataType from '../utils/dataTypes';

export default function sortData(data, types, { key, order }) {
    if (!data || data.length === 0) {
        return;
    }

    const keyDataValue = types[key];
    const handler = getSortHandler(keyDataValue, key, order);
    return data.concat().sort(handler);
}

function getSortHandler(type, key, order) {
    if (type === dataType.DATE || type === dataType.NUMBER) {
        return dateAndNumberSortHandler(type, key, order);
    }

    return stringAndBooleanSortHandler(type, key, order)
}

function dateAndNumberSortHandler(type, key, order) {
    return function (first, second) {
        const [fSort, sSort] = prepareSortValues(first, second, type, key);

        if (order === sortOrder.ASC) {
            return fSort - sSort;        
        }

        return sSort - fSort;
    }
}

function stringAndBooleanSortHandler(type, key, order) {
    return function(first, second) {
        const [fSort, sSort] = prepareSortValues(first, second, type, key);

        if (fSort === sSort) {
            return 0;
        }

        if (order === sortOrder.ASC && fSort < sSort || 
            order === sortOrder.DESC && fSort > sSort) {
            return -1;
        } 
        
        return 1;
    }
}

function prepareSortValues(firstObj, secondObj, type, key) {
    const fValue = firstObj[key];
    const sValue = secondObj[key];
    const fPrepared = fValue === undefined ? dataType.getDefaultTypeValue(type) : dataType.transformValue(fValue, type);
    const sPrepared = sValue === undefined ? dataType.getDefaultTypeValue(type) : dataType.transformValue(sValue, type);

    return [fPrepared, sPrepared];
}