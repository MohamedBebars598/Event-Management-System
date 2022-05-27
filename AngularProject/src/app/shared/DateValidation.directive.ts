import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


@Directive({
    selector:'[DateValidator]',
    providers:[{

        provide:NG_VALIDATORS,
        useExisting:DateValidatorDirective,
        multi:true
    }]

})
export class DateValidatorDirective implements Validator{

    validate(control: AbstractControl): ValidationErrors | null {
        
        const DateRegx = RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gm);

          return DateRegx.test(control.value)?null:{'invalidDate':true};

        
    }

}