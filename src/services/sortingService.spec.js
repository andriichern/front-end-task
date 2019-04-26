import { ASC, DESC }from '../utils/sortingOrder';
import { testData, testTypes } from '../utils/testData';
import { STRING, NUMBER, BOOLEAN } from '../utils/dataTypes';
import sortData from './sortingService';

function getTestSortOptions(key, order) {
    return { key, order };
}

describe('sorting service', () => {
    
    describe('should exit for null', () => {
        
        test('data', () => {
            const result = sortData(null, testTypes);
    
            expect(result).toBeUndefined();
        });

        test('types', () => {
            const result = sortData(testData, null);
    
            expect(result).toBeUndefined();
        });
    });
    
    describe('should exit for empty', () => {
        
        test('data', () => {
            const result = sortData([], testTypes);
    
            expect(result).toBeUndefined();
        });
        
        test('types', () => {
            const result = sortData(testData, {});
    
            expect(result).toBeUndefined();
        });
    });

    describe('should return not sorted data for empty ', () => {
        
        test('sort options', () => {
            const result = sortData(testData, testTypes, null);
    
            expect(result).toEqual(testData);
        });
    
        test('sort option key', () => {
            const options = getTestSortOptions(undefined);
            const result = sortData(testData, testTypes, options);
    
            expect(result).toEqual(testData);
        });

        test('sort option direction', () => {
            const options = getTestSortOptions('key', undefined);
            const result = sortData(testData, testTypes, options);
    
            expect(result).toEqual(testData);
        });
    });

    describe('should sort data', () => {
        
        test('by numbers desc', () => {
            const options = getTestSortOptions(NUMBER, DESC);
            const result = sortData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[NUMBER]; })).toEqual([3, 2, 1]);
        });

        test('by string desc', () => {
            const options = getTestSortOptions(STRING, DESC);
            const result = sortData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[STRING]; })).toEqual(['String1', 'Str2', 'S3']);
        });

        test('by boolean asc', () => {
            const options = getTestSortOptions(BOOLEAN, ASC);
            const result = sortData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[BOOLEAN]; })).toEqual([false, true, true]);
        });
    });
});