import { DATE, NUMBER, BOOLEAN } from '../utils/dataTypes';
import * as operators from '../utils/filterOperators';

export function filterHeaders(headerEntries, showAll = false) {
    let result = [];
    
    if (headerEntries) {
        headerEntries.map(([key, display]) => {
            if (display || showAll) {
                result.push(key);
            }
        });
    }    
    
    return result;
}

export function filterData(data, types, options) {
    if (!data || data.length === 0 || !types ||
        (Object.entries(types).length === 0 && types.constructor === Object)) {
        return;
    }
    
    if (!options || !options.key || !options.operator || !options.criteria) {
        return data;
    }

    const { key, operator, criteria } = options;
    const keyType = types[key];
    const typedCriteria = getTypedCriteria(keyType, criteria);
    const filterHandler = getFilterHandler(keyType, key, operator, typedCriteria);

    return data.filter(filterHandler);
}

function getFilterHandler(type, key, operator, criteria) {
    const operations = {
        [operators.LT]: entry => { return entry[key] !== undefined && toDateIfNeeded(type, entry[key]) < criteria; },
        [operators.GT]: entry => { return entry[key] !== undefined && toDateIfNeeded(type, entry[key]) > criteria; },
        [operators.EQ]: entry => { return entry[key] !== undefined && toDateIfNeeded(type, entry[key]) === criteria; },
        [operators.LTE]: entry => { return entry[key] !== undefined && toDateIfNeeded(type, entry[key]) <= criteria; },
        [operators.GTE]: entry => { return entry[key] !== undefined && toDateIfNeeded(type, entry[key]) >= criteria; },
        [operators.CONTAINS]: entry => { return entry[key] && entry[key].toLowerCase().includes(criteria.toLowerCase()); }
    };

    return operations[operator];
}

function getTypedCriteria(type, criteria) {
    if (type === NUMBER) {
        return +criteria;
    }

    if (type === DATE) {
        return new Date(criteria);
    }

    if (type === BOOLEAN) {
        return criteria === 'true' ? true : false;
    }

    return criteria;
}

function toDateIfNeeded(type, value) {
    if (type === DATE) {
        return new Date(value);
    }

    return value;
}
