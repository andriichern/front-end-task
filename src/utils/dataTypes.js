export const STRING = 'String';
export const NUMBER = 'Number';
export const BOOLEAN = 'Boolean';

export function isOfDateType(value) {
    return !!Date.parse(value) && Boolean(+(new Date(value)));
}

export function getDataType(value) { 
    return Object.prototype.toString.call(value).slice(8, -1);
}