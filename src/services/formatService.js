import { DATE, STRING, NUMBER, BOOLEAN } from '../utils/dataTypes';

export const AsIsFormat = 'As Is';
export const FullDateFormat = 'Full Date';
export const ShortDateFormat = 'Short Date';
export const UTCDateFormat = 'UTC Date';
export const ToUpperStringFormat = 'UPPER case';
export const ToLowerStringFormat = 'lower case';
export const ToCapitalStrongFormat = 'Capital case';
export const MoneyNumberFormat = 'Money';
export const ReplaceBooleanFormat = 'Replace with Yes & No';

export const typeFormatOptions = {
    [DATE]: [AsIsFormat, FullDateFormat, ShortDateFormat, UTCDateFormat],
    [STRING]: [AsIsFormat, ToUpperStringFormat, ToLowerStringFormat, ToCapitalStrongFormat],
    [NUMBER]: [AsIsFormat, MoneyNumberFormat],
    [BOOLEAN]: [AsIsFormat, ReplaceBooleanFormat]
};