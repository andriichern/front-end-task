import * as sortOrder from  '../utils/sortingOrder';
import * as dataType from '../utils/dataTypes';

export default function sortData(data, { key, order }) {
    if (!data || data.length === 0) {
        return;
    }

    const keyDataValue = data[0][key];
    const handler = getSortHandler(keyDataValue, key, order);
    return data.concat().sort(handler);
}

function getdataKeyVale(data, key) {
    for (let i = 0; i < data.length; i++) {
        const currentValue = data[i][key];
    }
}

function getSortHandler(value, key, order) {
    const type = dataType.getDataType(value);
    const isDate = dataType.isOfDateType(value);    

    if (isDate && type === dataType.STRING) {
        return dateSortingHandler(key, order);
    } else if (type === dataType.NUMBER) {
        return numberSortingHandler(key, order);
    } else /*if (type === dataType.STRING)*/ {
        return stringSortingHandler(key, order);
    }
    //return booleanSortingHandler(key. order);
}

function dateSortingHandler(key, order) {
    const sortKey = key;

    if (order === sortOrder.ASC) {
        return function(prev, next) {
            const prevDate = new Date(prev[sortKey]);
            const nextDate = new Date(next[sortKey]);
            
            return prevDate - nextDate;
        }
    }

    return function(prev, next) {
        const prevDate = new Date(prev[sortKey]);
        const nextDate = new Date(next[sortKey]);
        
        return nextDate - prevDate;
    }
}

function numberSortingHandler(key, order) {
    let sortKey = key;
    
    if (order === sortOrder.ASC) {
        return function (prev, next) {
            return prev[sortKey] - next[sortKey];
        }
    }
    
    return function (prev, next) {
        return next[sortKey] - prev[sortKey];
    }
}

function stringSortingHandler(key, order) {
    let sortKey = key;

    if (order === sortOrder.ASC) {
        return function(prev, next) {
            const prevString = prev[sortKey].toLowerCase();
            const nextString = next[sortKey].toLowerCase();

            if (prevString < nextString) {
                return -1;
            }

            if (prevString > nextString) {
                return 1;
            }

            return 0;
        }
    }

    return function(prev, next) {
        const prevString = prev[sortKey].toLowerCase();
        const nextString = next[sortKey].toLowerCase();

        if (prevString > nextString) {
            return -1;
        }

        if (prevString < nextString) {
            return 1;
        }

        return 0;
    }
}

// function booleanSortingHandler(key, order) {
//     let sortKey = key;

//     if (order === sortOrder.ASC) {
//         return function(prev, next) {
//             if (prev[sortKey] && !next[sortKey])
//             return 
//         }
//     }
// }