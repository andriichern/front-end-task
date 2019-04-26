import { filterHeaders, filterData } from '../services/filterService';
import { STRING, NUMBER, BOOLEAN } from '../utils/dataTypes';
import { testData, testTypes } from '../utils/testData';
import { GTE, LT, CONTAINS } from '../utils/filterOperators';

function getTestFilterOptions(key, operator, criteria) {
    return {
        key,
        operator,
        criteria
    };
}

function getTestHeaderEntries() {
    return [
        [STRING, true],
        [NUMBER, false],
        [BOOLEAN, true]
    ];
}

describe('filter service', () => {

    describe('filterHeaders method', () => {

        describe('should return empty result when entries', () => {
            
            test('null', () => {
                const result = filterHeaders(null, true);
        
                expect(result).toHaveLength(0);
            });

            test('empty', () => {
                const result = filterHeaders([], false);
        
                expect(result).toHaveLength(0);
            });
        });

        describe('should return headers', () => {
            
            test('all headers', () => {
                const headers = getTestHeaderEntries();
                const result = filterHeaders(headers, true);
        
                expect(result).toHaveLength(headers.length);
            });

            test('filtered headers', () => {
                const headers = getTestHeaderEntries();
                const result = filterHeaders(headers, false);

                const shownHeadersCount = headers.filter(([key, display]) => display).length;
        
                expect(result).toHaveLength(shownHeadersCount);
            });
        });
    });
    
    describe('filterData method', () => {
        
        describe('should exit for null', () => {
        
            test('data', () => {
                const result = filterData(null, testTypes);
        
                expect(result).toBeUndefined();
            });
    
            test('types', () => {
                const result = filterData(testData, null);
        
                expect(result).toBeUndefined();
            });
        });
        
        describe('should exit for empty', () => {
            
            test('data', () => {
                const result = filterData([], testTypes);
        
                expect(result).toBeUndefined();
            });
            
            test('types', () => {
                const result = filterData(testData, {});
        
                expect(result).toBeUndefined();
            });
        });
    
        describe('should return not filtered data for empty ', () => {
            
            test('filter options', () => {
                const result = filterData(testData, testTypes, null);
        
                expect(result).toEqual(testData);
            });
        
            test('filter key', () => {
                const options = getTestFilterOptions(undefined);
                const result = filterData(testData, testTypes, options);
        
                expect(result).toEqual(testData);
            });
    
            test('filter operator', () => {
                const options = getTestFilterOptions('test', undefined);
                const result = filterData(testData, testTypes, options);
        
                expect(result).toEqual(testData);
            });
            
            test('filter criteria', () => {
                const options = getTestFilterOptions('test', GTE);
                const result = filterData(testData, testTypes, options);
        
                expect(result).toEqual(testData);
            });
        });
    
        describe('should filter data where', () => {
    
            test('number greater than or equal to criteria', () => {
                const options = getTestFilterOptions(NUMBER, GTE, 2);
                const result = filterData(testData, testTypes, options);
        
                expect(result).toHaveLength(2);
                expect(result.map(item => { return item[NUMBER]; })).toEqual([2, 3]);
            });
    
            test('number less than criteria', () => {
                const options = getTestFilterOptions(NUMBER, LT, 2);
                const result = filterData(testData, testTypes, options);
        
                expect(result).toHaveLength(1);
                expect(result.map(item => { return item[NUMBER]; })).toEqual([1]);
            });
    
            test('string contains criteria', () => {
                const options = getTestFilterOptions(STRING, CONTAINS, 'st');
                const result = filterData(testData, testTypes, options);
        
                expect(result).toHaveLength(2);
                expect(result.map(item => { return item[STRING]; })).toEqual(['String1', 'Str2']);
            });
        });
    });
});