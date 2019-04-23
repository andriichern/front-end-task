export const DATE = 'Date';
export const STRING = 'String';
export const NUMBER = 'Number';
export const BOOLEAN = 'Boolean';

export const AsIsFormat = 'As Is';
export const FullDateFormat = 'Full Date';
export const ShortDateFormat = 'Short Date';
export const UTCDateFormat = 'UTC Date';
export const ToUpperStringFormat = 'UPPER case';
export const ToLowerStringFormat = 'lower case';
export const ToCapitalStrongFormat = 'Capital case';
export const MoneyNumberFormat = 'Money';
export const ReplaceBooleanFormat = 'Replace with Yes & No';

export const allTypes = [DATE, STRING, NUMBER, BOOLEAN];

export const typeFormatOptions = {
    [DATE]: [AsIsFormat, FullDateFormat, ShortDateFormat, UTCDateFormat],
    [STRING]: [AsIsFormat, ToUpperStringFormat, ToLowerStringFormat, ToCapitalStrongFormat],
    [NUMBER]: [AsIsFormat, MoneyNumberFormat],
    [BOOLEAN]: [AsIsFormat, ReplaceBooleanFormat]
};

export function getDataType(value) { 
    const isDate = isOfDateType(value);
    const type = Object.prototype.toString.call(value).slice(8, -1);
    
    if (isDate && type === STRING) {
        return DATE;
    }

    return type;
}

export function getDefaultTypeValue(type) {
    if (type === DATE) {
        return new Date(0);
    }

    if (type === STRING) {
        return '';
    }

    if (type === NUMBER) {
        return 0;
    }

    if (type === BOOLEAN) {
        return false;
    }
}

export function transformValue(value, type) {
    if (type === DATE) {
        return new Date(value);
    }

    if (type === STRING) {
        return value.toLowerCase();
    }

    return value;
}

function isOfDateType(value) {
    return !!Date.parse(value) && Boolean(+(new Date(value)));
}