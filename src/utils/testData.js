import { STRING, NUMBER, BOOLEAN } from './dataTypes';

export const testData = [
    {
        [STRING]: 'String1',
        [NUMBER]: 1,
        [BOOLEAN]: true
    },
    {
        [STRING]: 'Str2',
        [NUMBER]: 2,
        [BOOLEAN]: false
    },
    {
        [STRING]: 'S3',
        [NUMBER]: 3,
        [BOOLEAN]: true
    }
];

export const testTypes = {
    [STRING]: STRING,
    [NUMBER]: NUMBER,
    [BOOLEAN]: BOOLEAN
};

export const testHeaders = {
    [STRING]: true,
    [NUMBER]: true,
    [BOOLEAN]: true
};