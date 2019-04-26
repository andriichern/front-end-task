import { STRING, NUMBER, BOOLEAN } from './dataTypes';

export const testData = [
    {
        [STRING]: 'String 1',
        [NUMBER]: 1,
        [BOOLEAN]: true
    },
    {
        [STRING]: 'Str 2',
        [NUMBER]: 2,
        [BOOLEAN]: false
    },
    {
        [STRING]: 'S 3',
        [NUMBER]: 3,
        [BOOLEAN]: true
    }
];

export const testTypes = {
    [STRING]: STRING,
    [NUMBER]: NUMBER,
    [BOOLEAN]: BOOLEAN
};