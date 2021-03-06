import { ObjectResolver, StringResolver, NumberResolver, BooleanResolver, ArrayResolver, Result } from '..';



interface ITestC {
    d: string;
    e: boolean;
}

interface ITestG {
    h: string;
}

interface ITest {
    a: string;
    b: number;
    c: ITestC;
}

interface ITestExtended extends ITest {
    f: string[];
    g: ITestG;
}

describe('Object Resolver', () => {
    
    describe('correct input', () => {
        let result: Result<ITest>;
        
        beforeEach(() => {
            result = ObjectResolver<ITest>({
                a: StringResolver(),
                b: NumberResolver(),
                c: ObjectResolver<ITestC>({
                    d: StringResolver(),
                    e: BooleanResolver()
                })
            }).resolve({
                a: 'a',
                b: 10,
                c: {
                    d: 'd',
                    e: true
                }
            });
        });

        it('should return success as true', () => {
            expect(result.success).toBe(true);
        });

        it('should return result equals to input', () => {
            expect(result.result).toEqual({
                a: 'a',
                b: 10,
                c: {
                    d: 'd',
                    e: true
                }
            });
        });

        it('should not return error', () => {
            expect(result.error.length).toBe(0);
        });
    });

    describe('incorrect input', () => {
        let result: Result<ITestExtended>;

        beforeEach(() => {
            result = ObjectResolver<ITestExtended>({
                a: StringResolver(),
                b: NumberResolver(),
                c: ObjectResolver<ITestC>({
                    d: StringResolver(),
                    e: BooleanResolver()
                }),
                f: ArrayResolver(StringResolver()),
                g: ObjectResolver<ITestG>({
                    h: StringResolver()
                })
            }).resolve({
                a: false,
                b: 10,
                c: {
                    d: 'd',
                    e: 'trust me im boolean'
                },
                f: 'a',
                g: 'a',
                superExtra: 'this shouldnt be here'
            });
        });

        it('should return success as false', () => {
            expect(result.success).toBe(false);
        });

        it('should return safe value', () => {
            expect(result.result).toEqual(<any> {
                a: '',
                b: 10,
                c: {
                    d: 'd',
                    e: true
                },
                f: [],
                g: {
                    h: ''
                }
            });
        });

        it('should return 4 errors', () => {
            expect(result.error.length).toBe(4);
        });
    });

    describe('nullable value', () => {
        
        describe('correct value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).nullable().resolve({
                    a: 'a',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true
                    }
                });
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual({
                    a: 'a',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true
                    }
                });
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).nullable().resolve(null);
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
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).nullable().resolve(undefined);
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
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).optional().resolve({
                    a: 'a',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true
                    }
                });
            });

            it('should return success as true', () => {
                expect(result.success).toBe(true);    
            });

            it('should return result equal to input', () => {
                expect(result.result).toEqual({
                    a: 'a',
                    b: 10,
                    c: {
                        d: 'd',
                        e: true
                    }
                });
            });

            it('should not return error', () => {
                expect(result.error.length).toBe(0);
            });
        });

        describe('null value', () => {
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).optional().resolve(null);
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
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).optional().resolve(undefined);
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
            let result: Result<ITest>;

            beforeEach(() => {
                result = ObjectResolver<ITest>({
                    a: StringResolver(),
                    b: NumberResolver(),
                    c: ObjectResolver<ITestC>({
                        d: StringResolver(),
                        e: BooleanResolver()
                    })
                }).optional().resolve(23);
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