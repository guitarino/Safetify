import { DictionaryResolver, StringResolver, NumberResolver, Result } from '..';



interface IDictionary<T> {
    [key: number]: T;
}

describe('Dictionary Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<IDictionary<string>>;
        let result2: Result<IDictionary<number>>;
        
        beforeEach(() => {
            result = DictionaryResolver<string>(StringResolver()).resolve({
                a: 'a',
                b: 'b',
                c: 'c'
            });
            result2 = DictionaryResolver<number>(NumberResolver()).resolve({
                a: 3,
                b: 27,
                c: 41
            });
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);
            expect(result2.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(result.result).toEqual(<any> {
                a: 'a',
                b: 'b',
                c: 'c'
            });
            expect(result2.result).toEqual(<any> {
                a: 3,
                b: 27,
                c: 41
            })
        });

        it('should not return error', () => {
            expect(result.error.length).toBe(0);
            expect(result2.error.length).toBe(0);
        });
    });

    describe('incorrect input', () => {
        let result: Result<IDictionary<string>>;

        beforeEach(() => {
            result = DictionaryResolver(StringResolver()).resolve(undefined);
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual({});
        });

        it('should return error', () => {
            expect(result.error.length).toBeGreaterThan(0);
        });
    });

    describe('incorrect input values', () => {
        let result: Result<IDictionary<string>>;

        beforeEach(() => {
            result = DictionaryResolver(StringResolver()).resolve({
                a: 'a',
                b: 10,
                c: {
                    d: 'd',
                    e: 'trust me im boolean'
                }
            });
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual(<any> {
                a: 'a',
                b: '',
                c: ''
            });
        });

        it('should return 2 errors', () => {
            expect(result.error.length).toBe(2);
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).nullable().resolve({
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual(<IDictionary<string>> {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).nullable().resolve(null);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('incorrect value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).nullable().resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);    
            });

            it('should return null as result', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error.length).toBeGreaterThan(0);
            });
        });
    });

    describe('optional value', () => {
        describe('correct value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).optional().resolve({
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual(<IDictionary<string>> {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).optional().resolve(null);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('undefined value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).optional().resolve(undefined);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('incorrect value', () => {
            let result: Result<IDictionary<string>>;

            beforeEach(() => {
                result = DictionaryResolver<string>(StringResolver()).optional().resolve(23);
            });

            it('should return success as true', () => {
                expect(result.success).toBe(false);    
            });

            it('should return null as result', () => {
                expect(result.result).toBe(null);
            });

            it('should not return error', () => {
                expect(result.error.length).toBeGreaterThan(0);
            });
        });
    });
});