import { testData, testTypes, testHeaders } from '../utils/testData';
import getDataKeysAndTypes from './dataKeysService';

describe.only('datatKeys service', () => {
    
    describe('should exit if data is', () => {
        test('null', () => {
            const result = getDataKeysAndTypes(null);

            expect(result).toBeUndefined();
        });

        test('empty', () => {
            const result = getDataKeysAndTypes([]);

            expect(result).toBeUndefined();
        });
    });

    test('should process data and return result array', () => {
        const [resultKeys, resultTypes] = getDataKeysAndTypes(testData);

        expect(resultKeys).toBeDefined();
        expect(resultTypes).toBeDefined();
        expect(resultKeys).toEqual(testHeaders);
        expect(resultTypes).toEqual(testTypes);
    });    
});