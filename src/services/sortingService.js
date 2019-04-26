import * as sortOrder from  '../utils/sortingOrder';
import { DATE, NUMBER, getDefaultTypeValue, transformValue } from '../utils/dataTypes';

export default function sortData(data, types, sorting) {
    if (!data || data.length === 0 || !types ||
        (Object.entries(types).length === 0 && types.constructor === Object)) {
        return;
    }

    if (!sorting || !sorting.key || !sorting.order) {
        return data;
    }
    
    const { key, order } = sorting;
    const keyDataValue = types[key];
    const handler = getSortHandler(keyDataValue, key, order);
    return data.concat().sort(handler);
}

function getSortHandler(type, key, order) {
    if (type === DATE || type === NUMBER) {
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
    const fPrepared = fValue === undefined ? getDefaultTypeValue(type) : transformValue(fValue, type);
    const sPrepared = sValue === undefined ? getDefaultTypeValue(type) : transformValue(sValue, type);

    return [fPrepared, sPrepared];
}
