import { STRING, BOOLEAN } from '../utils/dataTypes';
import { testData, testTypes } from '../utils/testData';
import formatData, { UpperStringFormat, LowerStringFormat, ReplaceBooleanFormat } from '../services/formatService';

function getTestFormatOptions(type, format) {
    return [{
        type,
        format
    }];
}

describe('format service', () => {
    
    describe('should exit for null', () => {
        
        test('data', () => {
            const result = formatData(null, testTypes);
    
            expect(result).toBeUndefined();
        });

        test('types', () => {
            const result = formatData(testData, null);
    
            expect(result).toBeUndefined();
        });
    });
    
    describe('should exit for empty', () => {
        
        test('data', () => {
            const result = formatData([], testTypes);
    
            expect(result).toBeUndefined();
        });
        
        test('types', () => {
            const result = formatData(testData, {});
    
            expect(result).toBeUndefined();
        });
    });

    describe('should return not formatted data for empty ', () => {
        
        test('format options', () => {
            const result = formatData(testData, testTypes, null);
    
            expect(result).toEqual(testData);
        });
    
        test('format option type', () => {
            const options = getTestFormatOptions(undefined);
            const result = formatData(testData, testTypes, options);
    
            expect(result).toEqual(testData);
        });

        test('fromat option format', () => {
            const options = getTestFormatOptions('test', undefined);
            const result = formatData(testData, testTypes, options);
    
            expect(result).toEqual(testData);
        });
    });

    describe('should format data as', () => {

        test('string to upper case', () => {
            const options = getTestFormatOptions(STRING, UpperStringFormat);
            const result = formatData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[STRING]; })).toEqual(['STRING 1', 'STR 2', 'S 3']);
        });

        test('string to lower case', () => {
            const options = getTestFormatOptions(STRING, LowerStringFormat);
            const result = formatData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[STRING]; })).toEqual(['string 1', 'str 2', 's 3']);
        });

        test('boolean should be replaced with text', () => {
            const options = getTestFormatOptions(BOOLEAN, ReplaceBooleanFormat);
            const result = formatData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[BOOLEAN]; })).toEqual(['Yes', 'No', 'Yes']);
        });
    });
});