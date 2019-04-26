import { DATE, STRING, NUMBER, BOOLEAN } from '../utils/dataTypes';

export const DateFormat = 'Date value';
export const TimeFormat = 'Time value';
export const UTCDateFormat = 'UTC Format';
export const UpperStringFormat = 'UPPER case';
export const LowerStringFormat = 'lower case';
export const CapitalStringFormat = 'Capital case';
export const MoneyFormat = 'Money';
export const ReplaceBooleanFormat = 'Replace with Yes & No';

const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const typeFormatters = {
    [DateFormat]: value => { return new Date(value).toDateString(); },
    [TimeFormat]: value => { return new Date(value).toTimeString(); },
    [UTCDateFormat]: value => { return new Date(value).toUTCString(); },
    [UpperStringFormat]: value => { return value.toUpperCase(); },
    [LowerStringFormat]: value => { return value.toLowerCase(); },
    [MoneyFormat]: value => { return moneyFormatter.format(value); },
    [ReplaceBooleanFormat]: value => { return value ? 'Yes' : 'No'; },
    [CapitalStringFormat]: value => {
        const lower = value.toLowerCase(); 
        return (lower.charAt(0).toUpperCase() + lower.slice(1));
    }
};

export const typeFormatOptions = {
    [DATE]: [DateFormat, TimeFormat, UTCDateFormat],
    [STRING]: [UpperStringFormat, LowerStringFormat, CapitalStringFormat],
    [NUMBER]: [MoneyFormat],
    [BOOLEAN]: [ReplaceBooleanFormat]
};

export default function formatData(data, types, formatOptions) {
    if (!data || !data.length || !types ||
        (Object.entries(types).length === 0 && types.constructor === Object)) {
        return;
    }

    if (!formatOptions || !formatOptions.length) {
        return data;
    }

    let result = [];
    let formatters = {};
    const typeEntries = Object.entries(types);
    
    for (let i = 0; i < formatOptions.length; i++) {
        const option = formatOptions[i];
        formatters[option.type] = typeFormatters[option.format];
    }

    for (let i = 0; i < data.length; i++) {
        let formattedObj = {};
        const currentObj = data[i];

        for (let [prop, type] of typeEntries) {
            if (currentObj[prop] !== undefined && formatters[type]) {
                formattedObj[prop] = formatters[type](currentObj[prop]);
            } else {
                formattedObj[prop] = currentObj[prop];
            }
        }

        result.push(formattedObj);
    }

    return result;
}
