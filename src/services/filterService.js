import * as types from '../utils/dataTypes';
import * as operators from '../utils/filterOperators';

export function filterHeaders(headerEntries, showAll) {
    let result = [];
    
    headerEntries.map(([key, display]) => {
        if (display || showAll) {
            result.push(key);
        }
    });
    
    return result;
}

export function filterData(data, types, options) {
    const { key, operator, criteria } = options;

    if (key && operator && criteria) {
        const keyType = types[key];
        const typedCriteria = getTypedCriteria(keyType, criteria);
        const filterHandler = getFilterHandler(keyType, key, operator, typedCriteria);

        return data.filter(filterHandler);
    }
    
    return data;
}

function getFilterHandler(type, key, operator, criteria) {
    const operations = {
        [operators.LT]: entry => { return entry[key] && (toDateIfNedded(type, entry[key]) < criteria); },
        [operators.GT]: entry => { return entry[key] && (toDateIfNedded(type, entry[key]) > criteria); },
        [operators.EQ]: entry => { return entry[key] && (toDateIfNedded(type, entry[key]) === criteria); },
        [operators.LTE]: entry => { return entry[key] && (toDateIfNedded(type, entry[key]) <= criteria); },
        [operators.GTE]: entry => { return entry[key] && (toDateIfNedded(type, entry[key]) >= criteria); },
        [operators.CONTAINS]: entry => { return entry[key] && entry[key].includes(criteria); }
    };

    return operations[operator];
}

function getTypedCriteria(type, criteria) {
    if (type === types.NUMBER) {
        return +criteria;
    }

    if (type === types.DATE) {
        return new Date(criteria);
    }

    return criteria;
}

function toDateIfNedded(type, value) {
    if (type === types.DATE) {
        return new Date(value);
    }
}