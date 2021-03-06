import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';



export class ArrayResolver<T> extends OptionalResolver<Array<T>> {

    public type: string = 'array';

    /**
     * @hidden
     */
    constructor (
        /**
         * @hidden
         */
        private definition: Resolver<T>
    ) {
        super();
    }
    
    /**
     * @hidden
     */
    protected resolver (input: any): Result<Array<T>> {
        if (!Util.isArray(input)) {
            return new Result(false, SafeUtil.makeSafeArray(input), ['value is not an array']);
        }

        let errors: string[] = [];

        let result: Array<T> = [];

        for (let i = 0; i < input.length; i++) {
            let dec = this.definition.resolve(input[i]);
            
            if (!dec.success) {
                if (this.definition.type === 'object' || this.definition.type === 'array') {
                    for (let i = 0; i < dec.error.length; i++) {
                        errors.push(`${i}.${dec.error[i]}`);
                    }
                } else {
                    errors.push(`${i}: ` + dec.error[0]);
                }
            }

            result.push(dec.result);
        }

        return new Result<Array<T>>(errors.length == 0, result, errors);
    }
}