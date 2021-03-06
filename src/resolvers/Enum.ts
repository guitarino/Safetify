import { EnumResolver as EnumResolverBase } from '@/base/EnumResolver';
import { IEnum } from '@/interfaces/IEnum';




/**
 * Resolves enum
 * @param definition enum representation in array, object or passed TypeScript's enum declaration
 * @example
 * <caption>
 * // Array representation
 * EnumResolver([ 'option1', 'option2', 'option3' ]).resolve('option1');
 * 
 * // Object representation
 * EnumResolver({ opt1: 'option1', opt2: 'option2', opt3: 'option3' }).resolve('option1');
 * 
 * // TypeScript's enum 
 * EnumResolver<someEnum>(someEnum).resolve('option1');
 * 
 * // output will be the same as input
 * 
 * EnumResolver<someEnum>(someEnum).resolve('option4');
 * // output will be the first enum item, in this case 'option1'
 * </caption>
 */
export function EnumResolver<T>(definition: Array<string | number> | IEnum) {
    return new EnumResolverBase<T>(definition);
}