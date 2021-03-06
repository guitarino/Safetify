import { ITuple } from '@/interfaces/ITuple';
import { ITupleDefinition } from '@/interfaces/ITupleDefinition';
import { Resolver } from '@/base/Resolver';
import { Result } from '@/Result';
import { Util } from '@/utils/Util';
import { OptionalResolver } from '@/base/OptionalResolver';



export class TupleResolver<T extends ITuple> extends OptionalResolver<T> {

    public type: string = 'tuple';

    /**
     * @hidden
     */
    constructor (
        /**
         * @hidden
         */
        private definition: ITupleDefinition<T>
    ) {
        super();
    }

    /**
     * @hidden
     */
    protected resolver (input: any): Result<T> {
        let result: any = [];
        let errors: string[] = [];
        let len: number = this.definition.length;

        if (!Util.isArray(input)) {
            for (let i = 0; i < len; i++) {              
                result.push(this.definition[i].resolve(undefined));
            }

            return new Result<T>(false, result, [ 'value is not a tuple' ]);
        }

        

        for (let i = 0; i < len; i++) {
            const resolved: Result<any> = this.definition[i].resolve(input[i]);
            
            result.push(resolved.result);
            if (!resolved.success) {
                errors.push(`${i}: ${resolved.error}`);
            }
        }

        return new Result<T>(errors.length == 0, result, errors);
    } 
}