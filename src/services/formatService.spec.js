import { STRING, BOOLEAN, NUMBER } from '../utils/dataTypes';
import { testData, testTypes } from '../utils/testData';
import formatData, { UpperStringFormat, LowerStringFormat, ReplaceBooleanFormat } from '../services/formatService';

function getTestFormatOptions(type, format) {
    return {
        [type]: format
    };
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
            expect(result.map(item => { return item[STRING]; })).toEqual(['STRING1', 'STR2', 'S3']);
        });

        test('string to lower case', () => {
            const options = getTestFormatOptions(STRING, LowerStringFormat);
            const result = formatData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[STRING]; })).toEqual(['string1', 'str2', 's3']);
        });

        test('boolean should be replaced with text', () => {
            const options = getTestFormatOptions(BOOLEAN, ReplaceBooleanFormat);
            const result = formatData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[BOOLEAN]; })).toEqual(['Yes', 'No', 'Yes']);
        });

        test('replace empty values', () => {
            const options = {};
            for (let i = 0; i < testData.length; i++) {
                if (i % 2 === 0) {
                    testData[i][NUMBER] = null;
                } else {
                    testData[i][NUMBER] = undefined;
                }
            }
            
            const result = formatData(testData, testTypes, options, true);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[NUMBER]; })).toEqual([' --- ', ' --- ', ' --- ']);
        });
    });

    describe('complex formatting test', () => {
        let options = getTestFormatOptions(STRING, UpperStringFormat);

        test('should format string to upper case', () => {            
            const result = formatData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[STRING]; })).toEqual(['STRING1', 'STR2', 'S3']);
        });

        test('then should replace booleans with text', () => {
            options[BOOLEAN]=ReplaceBooleanFormat;
            const result = formatData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[STRING]; })).toEqual(['STRING1', 'STR2', 'S3']);
            expect(result.map(item => { return item[BOOLEAN]; })).toEqual(['Yes', 'No', 'Yes']);
        });

        test('then should format string to lower case', () => {
            options[STRING]=LowerStringFormat;
            const result = formatData(testData, testTypes, options);
    
            expect(result).toHaveLength(testData.length);
            expect(result.map(item => { return item[BOOLEAN]; })).toEqual(['Yes', 'No', 'Yes']);
            expect(result.map(item => { return item[STRING]; })).toEqual(['string1', 'str2', 's3']);
        });
    });
});