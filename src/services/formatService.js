import { DATE, STRING, NUMBER, BOOLEAN } from '../utils/dataTypes';

export const AsIsFormat = 'As Is';
const DateFormat = 'Date value';
const TimeFormat = 'Time value';
const UTCDateFormat = 'UTC Format';
const UpperStringFormat = 'UPPER case';
const LowerStringFormat = 'lower case';
const CapitalStrongFormat = 'Capital case';
const MoneyFormat = 'Money';
const ReplaceBooleanFormat = 'Replace with Yes & No';

const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const typeFormatters = {
    [AsIsFormat]: value => { return value; },
    [DateFormat]: value => { return new Date(value).toDateString(); },
    [TimeFormat]: value => { return new Date(value).toTimeString(); },
    [UTCDateFormat]: value => { return new Date(value).toUTCString(); },
    [UpperStringFormat]: value => { return value.toUpperCase(); },
    [LowerStringFormat]: value => { return value.toLowerCase(); },
    [MoneyFormat]: value => { return moneyFormatter.format(value); },
    [ReplaceBooleanFormat]: value => { return value ? 'Yes' : 'No'; },
    [CapitalStrongFormat]: value => {
        const lower = value.toLowerCase(); 
        return (lower.charAt(0).toUpperCase() + lower.slice(1));
    }
};

export const typeFormatOptions = {
    [DATE]: [AsIsFormat, DateFormat, TimeFormat, UTCDateFormat],
    [STRING]: [AsIsFormat, UpperStringFormat, LowerStringFormat, CapitalStrongFormat],
    [NUMBER]: [AsIsFormat, MoneyFormat],
    [BOOLEAN]: [AsIsFormat, ReplaceBooleanFormat]
};

export function formatData(data, types, formatOptions) {
    if (!data || !data.length) {
        return;
    }

    let result = [];
    const formatter = typeFormatters[formatOptions.format];
    const typeEntries = Object.entries(types);

    for (let i = 0; i < data.length; i++) {
        let formattedObj = {};
        const currentObj = data[i];

        for (let [prop, type] of typeEntries) {
            if (currentObj[prop] !== undefined && type === formatOptions.type) {
                formattedObj[prop] = formatter(currentObj[prop]);
            } else {
                formattedObj[prop] = currentObj[prop];
            }
        }

        result.push(formattedObj);
    }

    return result;
}
