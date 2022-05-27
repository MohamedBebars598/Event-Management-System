import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


@Directive({
    selector:'[CityValidator]',
    providers:[{

        provide:NG_VALIDATORS,
        useExisting:CityValidatorDirective,
        multi:true
    }]

})
export class CityValidatorDirective implements Validator{

    validate(control: AbstractControl): ValidationErrors | null {
        
        const CityRegex = RegExp(
            /[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
            console.log(CityRegex.test(control.value))

          return CityRegex.test(control.value)?null:{'invalidCity':true};

        
    }

}