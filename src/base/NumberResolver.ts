import { PrimitiveResolver } from '@/base/PrimitiveResolver';
import { Result } from '@/Result';
import { SafeUtil } from '@/utils/SafeUtil';
import { Util } from '@/utils/Util';



export class NumberResolver extends PrimitiveResolver<number> {

    public type: string = 'number';

    /**
     * @hidden
     */
    protected resolver (input: any): Result<number> {
        let errors: string[] = [];
    
        if (!Util.isNumber(input) || !isFinite(input)) {
            errors.push('value is not a number');
        }
    
        return new Result<number>(errors.length === 0, SafeUtil.makeSafeNumber(input), errors);
    } 
}