import { filterData } from '../services/filterService';
import { STRING, BOOLEAN } from '../utils/dataTypes';
import { testData, testTypes } from '../utils/testData';
import { GTE, LTE, CONTAINS } from '../utils/filterOperators';

function getTestFilterOptions(key, operator, criteria) {
    return {
        key,
        operator,
        criteria
    };
}

describe('filter service', () => {
    
    describe('should exit for null', () => {
        
        test('data', () => {
            const options = getTestFilterOptions();
            const result = filterData(null, testTypes);
    
            expect(result).toBeUndefined();
        });

        test('types', () => {
            const options = getTestFilterOptions();
            const result = filterData(testData, null);
    
            expect(result).toBeUndefined();
        });
    });
    
    describe('should exit for empty', () => {
        
        test('data', () => {
            const options = getTestFilterOptions();
            const result = filterData([], testTypes);
    
            expect(result).toBeUndefined();
        });
        
        test('types', () => {
            const options = getTestFilterOptions();
            const result = filterData(testData, {});
    
            expect(result).toBeUndefined();
        });
    });

    describe('should return not formatted data for empty ', () => {
        
        test('format options', () => {
            const result = filterData(testData, testTypes, null);
    
            expect(result).toEqual(testData);
        });
    
        test('format option type', () => {
            const options = getTestFilterOptions(undefined);
            const result = filterData(testData, testTypes, options);
    
            expect(result).toEqual(testData);
        });

        test('fromat option format', () => {
            const options = getTestFilterOptions('test', undefined);
            const result = filterData(testData, testTypes, options);
    
            expect(result).toEqual(testData);
        });
    });

    describe('should format data as', () => {

        test('string to upper case', () => {
            const options = getTestFilterOptions(STRING, );
            const result = filterData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[STRING]; })).toEqual(['STRING 1', 'STR 2', 'S 3']);
        });

        test('string to lower case', () => {
            const options = getTestFilterOptions(STRING);
            const result = filterData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[STRING]; })).toEqual(['string 1', 'str 2', 's 3']);
        });

        test('boolean should be replaced with text', () => {
            const options = getTestFilterOptions(BOOLEAN);
            const result = filterData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[BOOLEAN]; })).toEqual(['Yes', 'No', 'Yes']);
        });
    });
});