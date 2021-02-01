import { TestVariable } from '../detective/model/test-dto.model';

export default class Variable {
    public static replace(vars: TestVariable[], str: string) {
        let newStr = str;
        vars.forEach(v => {
            const reg = new RegExp(v.name, 'g');
            newStr = newStr.replace(reg, v.value);
        });

        return newStr;
    }
}