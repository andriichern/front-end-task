import * as operators from '../utils/filterOperators';

export function filterHeaders(headerEntries, types, showAll) {
    let result = [];
    
    headerEntries.map(([key, display]) => {
        if (display || showAll) {
            result.push(key);
        }
    });
    
    return result;
}

export function filterData(data, options) {
    const { key, operator, criteria } = options;

    if (key && operator && criteria) {
        const filterHandler = getFilterHandler(key, operator, criteria);
        return data.filter(filterHandler);
    }
    
    return data;
}

function getFilterHandler(key, operator, criteria) {
    const numCriteria = +criteria;
    if (operator === operators.LT) {
        return function(entry) {
            return entry[key] && (entry[key] < criteria);
        }
    }

    if (operator === operators.LTE) {
        return function(entry) {
            return entry[key] && (entry[key] <= criteria);
        }
    }

    if (operator === operators.GT) {
        return function(entry) {
            return entry[key] && (entry[key] > criteria);
        }
    }

    if (operator === operators.GTE) {
        return function(entry) {
            return entry[key] && (entry[key] >= criteria);
        }
    }
    
    if (operator === operators.CONTAINS) {
        return function(entry) {
            return entry[key] && entry[key].includes(criteria);
        }
    }
    
    return function(entry) {
        if (entry[key] && (entry[key] === numCriteria)) {
            return entry;
        }
    }
}